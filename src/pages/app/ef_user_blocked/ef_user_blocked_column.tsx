import { ProColumns } from '@ant-design/pro-components';

export const ef_user_blocked_columns = (): ProColumns<any>[] => [
  {
    title: 'user_id',
    dataIndex: 'user_id',
    valueType: 'text',
  },
  {
    title: 'comment',
    dataIndex: 'comment',
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
