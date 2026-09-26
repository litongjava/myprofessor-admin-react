import {ProColumns} from '@ant-design/pro-components';
import { Link } from '@umijs/max';

export const ef_generated_video_columns = (): ProColumns<any>[] => [
  {
    title: '费用', key: 'cost', hideInSearch: true, hideInForm: true,
    render: (_, row) => <Link to={`/app/llm_costs?view=videos&videoId=${row.id}`}>查看费用</Link>,
  },
  {
    "title": "AI 标题",
    "dataIndex": "title",
    "valueType": "text",
    ellipsis:true,
    copyable: true,
  },
  {title: "用户提问", dataIndex: "question", valueType: "textarea", ellipsis: true, copyable: true},
  {
    "title": "生成输入（会话子视频）",
    "dataIndex": "prompt",
    "valueType": "text",
    ellipsis:true,
    copyable: true,
  },
  {
    "title": "language",
    "dataIndex": "language",
    "valueType": "text"
  },
  {
    "title": "python_code",
    "dataIndex": "python_code",
    "valueType": "textarea",
    ellipsis:true,
    copyable: true,
  },
  {
    "title": "voice_provider",
    "dataIndex": "voice_provider",
    "valueType": "text"
  },
  {
    "title": "voice_id",
    "dataIndex": "voice_id",
    "valueType": "text",
  },
  {
    "title": "video_url",
    "dataIndex": "video_url",
    "valueType": "text",
    ellipsis:true,
    copyable: true,
  },
  {
    "title": "video_length",
    "dataIndex": "video_length",
    "valueType": "text"
  },
  {
    "title": "cover_url",
    "dataIndex": "cover_url",
    "valueType": "image",
  },
  {
    "title": "elapsed",
    "dataIndex": "elapsed",
    "valueType": "text",
  },
  {
    title: "update_time",
    dataIndex: "update_time",
    valueType: "dateTime",
    hideInSearch: true,
    hideInForm: true,
  },
  {
    key: "update_time",
    title: "update_time",
    dataIndex: "update_time_range",
    valueType: "dateTimeRange",
    hideInTable: true,
    hideInForm: true,
    hideInDescriptions: true,
  },
];
