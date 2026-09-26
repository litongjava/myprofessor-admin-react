import { ReloadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { request, useLocation } from '@umijs/max';
import { Alert, Button, Card, Col, Descriptions, Drawer, Input, Row, Space, Statistic, Table, Tabs, Tag, Typography, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';

type Kind = 'inferences' | 'videos' | 'conversations';
type CostRow = Record<string, any>;
type Report = { list: CostRow[]; total: number; summary: CostRow };
const stages: Record<string, string> = { video: '视频生成', repair: '视频修复', cover: '封面（含修复）', context: '上下文整理', other: '其他推理' };
const statuses: Record<string, string> = {
  estimated: '已估算', estimated_cross_period: '跨时段估算', unsupported_provider: '厂商价格未配置',
  missing_usage: '缺少用量', invalid_usage: '用量异常', unknown_tariff: '模型价格未配置',
  missing_calendar: '节假日日历待维护', missing_time: '缺少调用时间', pricing_error: '计价失败',
};
const money = (value: unknown) => value === null || value === undefined ? '—' : `¥${Number(value).toFixed(8)}`;
const time = (value: unknown) => value ? new Date(typeof value === 'number' || /^\d+$/.test(String(value)) ? Number(value) : String(value)).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false }) : '—';

export default function LlmCosts() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [kind, setKind] = useState<Kind>((params.get('view') as Kind) || 'inferences');
  const [videoId, setVideoId] = useState(params.get('videoId') || '');
  const [conversationId, setConversationId] = useState(params.get('conversationId') || '');
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [revision, setRevision] = useState(0);
  const [report, setReport] = useState<Report>({ list: [], total: 0, summary: {} });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [detail, setDetail] = useState<CostRow>();
  useEffect(() => {
    let active = true;
    setLoading(true); setError(false);
    request(`/api/admin/llm-costs/${kind}`, { params: { current: page, pageSize, videoId: videoId || undefined, conversationId: conversationId || undefined, query: search || undefined } })
      .then((res) => {
        if (res.code !== 1 || !res.data?.list) throw new Error('Invalid cost response');
        if (active) setReport(res.data);
      })
      .catch(() => { if (active) { setError(true); setReport({ list: [], total: 0, summary: {} }); message.error('费用加载失败，请检查后台权限或重试'); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [kind, videoId, conversationId, search, page, pageSize, revision]);
  const navigate = (next: Kind, video = '', conversation = '') => {
    setKind(next); setVideoId(video); setConversationId(conversation); setPage(1); setSearch(''); setQuery('');
  };
  const stateColumn = { title: '计价状态', key: 'state', width: 160, render: (_: unknown, r: CostRow) => kind === 'inferences'
    ? <Tag color={r.total_cost == null ? 'orange' : r.crosses_billing_period ? 'gold' : 'green'}>{statuses[r.pricing_status] || '待计价'}</Tag>
    : <Tag color={!Number(r.call_count) ? 'default' : Number(r.unpriced_count) ? 'orange' : 'green'}>{!Number(r.call_count) ? '暂无用量' : Number(r.unpriced_count) ? `${r.unpriced_count} 次待计价` : '已记录用量均已计价'}</Tag> };
  const breakdown: ColumnsType<CostRow> = [
    { title: '视频生成', dataIndex: 'video_cost', render: money, width: 150 },
    { title: '视频修复', dataIndex: 'repair_cost', render: money, width: 150 },
    { title: '封面（含修复）', dataIndex: 'cover_cost', render: money, width: 170 },
    { title: '上下文整理', dataIndex: 'context_cost', render: money, width: 150 },
    { title: '其他推理', dataIndex: 'other_cost', render: money, width: 150 },
  ];
  const columns: ColumnsType<CostRow> = kind === 'inferences' ? [
    { title: '推理 ID', dataIndex: 'id', width: 200, render: (id, r) => <Button type="link" style={{ padding: 0 }} onClick={() => setDetail(r)}>{id}</Button> },
    { title: '视频 ID', dataIndex: 'group_id', width: 200, render: id => id ? <a onClick={() => navigate('videos', id)}>{id}</a> : '—' },
    { title: '用途', dataIndex: 'cost_stage', width: 150, render: stage => stages[stage] || '其他推理' },
    { title: '任务 / 修复点', dataIndex: 'task_name', width: 200 },
    { title: '模型', dataIndex: 'model', width: 210 },
    { title: '缓存命中', dataIndex: 'cache_hit_tokens', width: 110, render: v => v ?? '—' },
    { title: '未命中输入', dataIndex: 'cache_miss_tokens', width: 120, render: v => v ?? '—' },
    { title: '输出 token', dataIndex: 'completion_tokens', width: 110, render: v => v ?? '—' },
    { title: '计价时段', dataIndex: 'billing_period', width: 100, render: p => p === 'peak' ? '高峰' : p === 'off_peak' ? '闲时' : '—' },
    { title: '本次费用', dataIndex: 'total_cost', fixed: 'right', width: 150, render: money }, stateColumn,
    { title: '调用时间（北京时间）', dataIndex: 'request_started_at', width: 210, render: time },
  ] : [
    { title: kind === 'videos' ? '视频 ID' : '会话 ID', dataIndex: 'id', width: 200, render: (id, r) => <a onClick={() => kind === 'videos' ? navigate('inferences', id, conversationId) : navigate('videos', '', r.id)}>{id}</a> },
    { title: kind === 'videos' ? '视频主题' : '会话标题', dataIndex: 'title', width: 280, ellipsis: true },
    ...(kind === 'conversations' ? [{ title: '生成视频数', dataIndex: 'video_count', width: 110 }] : [
      { title: 'Ask 会话', dataIndex: 'conversation_id', width: 200, render: (id: string) => id ? <a onClick={() => navigate('conversations', '', id)}>{id}</a> : '独立视频' },
    ]),
    { title: '推理次数', dataIndex: 'call_count', width: 100 },
    { title: '已计价合计', dataIndex: 'total_cost', width: 160, render: money },
    ...breakdown, stateColumn,
    { title: '明细', key: 'detail', fixed: 'right', width: 130, render: (_, r) => <Button type="link" onClick={() => navigate('inferences', kind === 'videos' ? r.id : '', kind === 'conversations' ? r.id : conversationId)}>推理明细</Button> },
  ];
  return <PageContainer title="AI 推理费用" subTitle="按推理、视频和 Ask 会话查看费用（人民币）">
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Alert type="info" showIcon message="费用按调用时间和官方单价在后端实时计算。合计包含已记录的模型推理费用，不含语音、渲染机器及存储；历史漏记用量无法补回。"
        description="Ask 会话只累计本会话新生成的视频及上下文整理，不重复计入引用的源视频。封面修复计入封面。— 表示暂无可计价记录，待计价调用不按零费用处理。" />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}><Card><Statistic title="当前筛选 · 已计价合计" value={money(report.summary.total_cost)} /></Card></Col>
        <Col xs={12} sm={8}><Card><Statistic title="推理次数" value={report.summary.call_count || 0} /></Card></Col>
        <Col xs={12} sm={8}><Card><Statistic title="待计价次数" value={report.summary.unpriced_count || 0} valueStyle={{ color: Number(report.summary.unpriced_count) ? '#d46b08' : undefined }} /></Card></Col>
      </Row>
      <Card>
        <Tabs activeKey={kind} onChange={key => navigate(key as Kind)} items={[{ key: 'inferences', label: '每次推理' }, { key: 'videos', label: '每个视频' }, { key: 'conversations', label: 'Ask 会话' }]} />
        <Space wrap style={{ marginBottom: 16 }}>
          <Input.Search aria-label="搜索费用" value={query} placeholder={kind === 'inferences' ? '任务、模型或推理 ID' : '标题或 ID'} onChange={e => setQuery(e.target.value)} onSearch={() => { setSearch(query); setPage(1); }} allowClear style={{ width: 300 }} />
          <Button icon={<ReloadOutlined />} onClick={() => setRevision(v => v + 1)}>刷新</Button>
          {videoId && <Tag closable onClose={() => { setVideoId(''); setPage(1); }}>视频：{videoId}</Tag>}
          {conversationId && <Tag closable onClose={() => { setConversationId(''); setPage(1); }}>会话：{conversationId}</Tag>}
          {(videoId || conversationId) && <Button onClick={() => navigate(kind)}>清除筛选</Button>}
        </Space>
        {error && <Alert type="error" message="加载失败，点击刷新重试" style={{ marginBottom: 16 }} />}
        <Table<CostRow> rowKey="id" columns={columns} dataSource={report.list} loading={loading} size="middle" scroll={{ x: 'max-content' }}
          pagination={{ current: page, pageSize, total: Number(report.total), showSizeChanger: true, pageSizeOptions: [10, 20, 50, 100], showTotal: total => `共 ${total} 条`, onChange: (p, s) => { setPage(s !== pageSize ? 1 : p); setPageSize(s); } }} />
      </Card>
    </Space>
    <Drawer title="单次推理费用明细" open={!!detail} onClose={() => setDetail(undefined)} width={640}>
      {detail && <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Statistic title="本次费用（人民币）" value={money(detail.total_cost)} />
        <Descriptions column={1} bordered size="small" items={[
          { key: 'id', label: '推理 ID', children: detail.id },
          { key: 'task', label: '任务 / 修复点', children: detail.task_name || '—' },
          { key: 'model', label: '模型 / 供应商', children: `${detail.model} / ${detail.provider}` },
          { key: 'time', label: '调用时间', children: time(detail.request_started_at) },
          { key: 'basis', label: '时间依据', children: detail.pricing_time_basis === 'request_start' ? '实际请求开始时刻' : '由历史完成时间和耗时推算' },
          { key: 'version', label: '价格版本', children: detail.pricing_version || '—' },
          { key: 'status', label: '计价状态', children: statuses[detail.pricing_status] || '待计价' },
        ]} />
        <Table pagination={false} size="small" rowKey="name" dataSource={[
          { name: '缓存命中输入', tokens: detail.cache_hit_tokens, rate: detail.cache_hit_rate, cost: detail.cache_hit_cost },
          { name: '缓存未命中输入', tokens: detail.cache_miss_tokens, rate: detail.cache_miss_rate, cost: detail.cache_miss_cost },
          { name: '输出（含思考）', tokens: detail.completion_tokens, rate: detail.output_rate, cost: detail.output_cost },
        ]} columns={[{ title: '类型', dataIndex: 'name' }, { title: 'Tokens', dataIndex: 'tokens', render: v => v ?? '—' }, { title: '元 / 百万 token', dataIndex: 'rate', render: v => v ?? '—' }, { title: '费用', dataIndex: 'cost', render: money }]} />
        <Typography.Text type="secondary">思考 token 已包含在输出中，不重复计费。跨时段请求按开始时刻估算，并标记以便与官方账单核对。</Typography.Text>
        {detail.group_id && <Button onClick={() => { setDetail(undefined); navigate('videos', detail.group_id); }}>查看所属视频费用</Button>}
      </Space>}
    </Drawer>
  </PageContainer>;
}
