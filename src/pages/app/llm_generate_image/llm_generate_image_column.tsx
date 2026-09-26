import { ProColumns } from '@ant-design/pro-components';

export const llm_generate_image_columns = (): ProColumns<any>[] => [
  {
    title: 'topic',
    dataIndex: 'topic',
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
    title: 'topic_md5',
    dataIndex: 'topic_md5',
    valueType: 'text',
  },
  {
    title: 'url',
    dataIndex: 'url',
    valueType: 'image',
  },
  {
    title: 'update_time',
    dataIndex: 'update_time',
    valueType: 'dateTime',
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: 'elapsed',
    dataIndex: 'elapsed',
    valueType: 'text',
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
