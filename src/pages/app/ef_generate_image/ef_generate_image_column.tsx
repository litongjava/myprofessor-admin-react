import { ProColumns } from '@ant-design/pro-components';

export const ef_generate_image_columns = (): ProColumns<any>[] => [
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
    title: 'md5',
    dataIndex: 'md5',
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
    key: 'update_time',
    title: 'update_time',
    dataIndex: 'update_time_range',
    valueType: 'dateTimeRange',
    hideInTable: true,
    hideInForm: true,
    hideInDescriptions: true,
  },
];
