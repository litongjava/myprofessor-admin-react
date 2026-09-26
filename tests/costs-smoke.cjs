// Live backend read-only smoke test. Provide ADMIN_TEST_TOKEN, never print or persist it.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const path = require('path');
const assert = require('assert');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1500, height: 1000 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('requestfailed', r => console.log('Request failed:', r.url().split('?')[0], r.failure()?.errorText));
  await page.addInitScript(token => localStorage.setItem('token', token), process.env.ADMIN_TEST_TOKEN);
  await page.route('**/api/**', route => new URL(route.request().url()).origin === 'http://127.0.0.1:8001' ? route.continue() : route.abort());
  await page.route('**/api/currentUser', route => route.fulfill({ json: { code: 1, data: { id: '0', nickname: '费用验证', access: 'admin' } } }));
  let last;
  page.on('response', async response => {
    if (response.url().includes('/api/admin/llm-costs/')) {
      try { last = await response.json(); } catch {}
    }
  });
  await page.goto('http://127.0.0.1:8001/#/app/llm_costs', { waitUntil: 'networkidle' });
  await page.getByRole('tab', { name: '每次推理' }).waitFor();
  await page.screenshot({path:path.resolve('../myprofessor-backend/target/admin-costs-debug.png'),fullPage:true});
  console.log('Initial report:', last?.code, last?.data?.total, 'runtime errors:', errors.length);
  await page.waitForFunction(() => document.querySelectorAll('.ant-table-tbody tr.ant-table-row').length > 0);
  assert(last?.code === 1 && Number(last.data.total) > 0, 'Live inference response missing');
  assert(last.data.list[0].id && last.data.summary.call_count, 'Flat JSON report required');
  const first = page.locator('.ant-table-tbody tr.ant-table-row').first();
  await first.getByRole('button').first().click();
  await page.getByText('单次推理费用明细', { exact: true }).waitFor();
  await page.getByText('缓存未命中输入', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Close' }).click();
  await Promise.all([page.waitForResponse(r => r.url().includes('/llm-costs/videos') && r.status() === 200), page.getByRole('tab', { name: '每个视频' }).click()]);
  await page.waitForFunction(() => document.querySelectorAll('.ant-table-tbody tr.ant-table-row').length > 0);
  await page.screenshot({ path: path.resolve('../myprofessor-backend/target/admin-costs-videos.png'), fullPage: true });
  const [drill] = await Promise.all([page.waitForResponse(r => r.url().includes('/llm-costs/inferences?') && r.url().includes('videoId=')), page.locator('.ant-table-tbody tr.ant-table-row').first().getByRole('button', { name: '推理明细' }).click()]);
  assert(drill.status() === 200, 'Video drilldown failed');
  await Promise.all([page.waitForResponse(r => r.url().includes('/llm-costs/conversations') && r.status() === 200), page.getByRole('tab', { name: 'Ask 会话' }).click()]);
  await page.screenshot({ path: path.resolve('../myprofessor-backend/target/admin-costs-conversations.png'), fullPage: true });
  await page.getByRole('tab', { name: '每次推理' }).click();
  await page.getByPlaceholder('任务、模型或推理 ID').fill('no-such-cost-987654321');
  await Promise.all([page.waitForResponse(r => r.url().includes('no-such-cost-987654321')), page.getByPlaceholder('任务、模型或推理 ID').press('Enter')]);
  await page.locator('.ant-empty-description').waitFor();
  assert.deepStrictEqual(errors, [], 'Browser runtime errors');
  console.log('PASS: live inference/video/conversation queries, fee drawer, drilldown, empty search, no browser errors');
  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });
