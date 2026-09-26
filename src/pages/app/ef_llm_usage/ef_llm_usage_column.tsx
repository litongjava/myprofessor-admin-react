import { ProColumns } from '@ant-design/pro-components';

export const ef_llm_usage_columns = (): ProColumns<any>[] => [
  {
    title: 'group_id',
    dataIndex: 'group_id',
    valueType: 'text',
  },
  {
    title: 'group_name',
    dataIndex: 'group_name',
    valueType: 'text',
    ellipsis: true,
    copyable: true,
  },
  {
    title: 'task_id',
    dataIndex: 'task_id',
    valueType: 'text',
  },
  {
    title: 'task_name',
    dataIndex: 'task_name',
    valueType: 'text',
  },
  {
    title: 'platform',
    dataIndex: 'provider',
    valueType: 'text',
  },
  {
    title: 'model',
    dataIndex: 'model',
    valueType: 'text',
  },
  {
    title: 'messages',
    dataIndex: 'messages',
    valueType: 'textarea',
    ellipsis: true,
    copyable: true,
  },
  {
    title: 'usage',
    dataIndex: 'usage',
    valueType: 'textarea',
    copyable: true,
  },
  {
    title: 'elapsed',
    dataIndex: 'elapsed',
    valueType: 'text',
  },
  {
    title: 'status',
    dataIndex: 'status',
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
