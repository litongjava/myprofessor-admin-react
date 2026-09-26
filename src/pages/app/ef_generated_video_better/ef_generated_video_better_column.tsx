import { ProColumns } from '@ant-design/pro-components';

export const ef_generated_video_better_columns = (): ProColumns<any>[] => [
  {
    title: 'title',
    dataIndex: 'title',
    valueType: 'textarea',
    ellipsis: true,
    copyable: true,
  },
  {
    title: 'language',
    dataIndex: 'language',
    valueType: 'text',
  },
  {
    title: 'video_id',
    dataIndex: 'video_id',
    valueType: 'text',
  },
  {
    title: 'embedding',
    dataIndex: 'embedding',
    valueType: 'textarea',
    ellipsis: true,
    copyable: true,
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
