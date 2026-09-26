import { ProColumns } from '@ant-design/pro-components';

export const ef_ugvideo_columns = (): ProColumns<any>[] => [
  {title: '用户提问', dataIndex: 'question', valueType: 'textarea', ellipsis: true, copyable: true},
  {title: '生成输入', dataIndex: 'prompt', valueType: 'textarea', ellipsis: true, copyable: true},
  {
    title: 'AI 标题',
    dataIndex: 'title',
    valueType: 'text',
    ellipsis: true,
    copyable: true,
  },
  {
    title: 'language',
    dataIndex: 'language',
    valueType: 'text',
  },
  {
    title: 'video_length',
    dataIndex: 'video_length',
    valueType: 'text',
  },
  {
    title: 'video_url',
    dataIndex: 'video_url',
    valueType: 'text',
    ellipsis: true,
    copyable: true,
  },
  {
    title: 'cover_url',
    dataIndex: 'cover_url',
    valueType: 'text',
    ellipsis: true,
    copyable: true,
  },
  {
    title: 'voice_id',
    dataIndex: 'voice_id',
    valueType: 'text',
    ellipsis: true,
    copyable: true,
  },
  {
    title: 'view_count',
    dataIndex: 'view_count',
    valueType: 'text',
  },
  {
    title: 'user_id',
    dataIndex: 'user_id',
    valueType: 'text',
    ellipsis: true,
    copyable: true,
  },
  {
    title: 'type',
    dataIndex: 'type',
    valueType: 'text',
  },
  {
    title: 'is_public',
    dataIndex: 'is_public',
    valueType: 'text',
  },
  {
    title: 'viewed',
    dataIndex: 'viewed',
    valueType: 'text',
  },
  {
    title: 'group_id',
    dataIndex: 'group_id',
    valueType: 'text',
  },
  {
    title: 'update_time',
    dataIndex: 'update_time',
    valueType: 'dateTime',
    hideInSearch: true,
    hideInForm: true,
  },
  {
    key: 'update_time',
    title: 'update_time',
    dataIndex: 'update_time_range',
    valueType: 'dateTimeRange',
    hideInTable: true,
    hideInForm: true,
    hideInDescriptions: true,
  },
];
