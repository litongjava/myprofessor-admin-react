import { ProColumns } from '@ant-design/pro-components';

export const app_user2_columns = (): ProColumns<any>[] => [
  {
    title: 'username',
    dataIndex: 'username',
    valueType: 'text',
  },
  {
    title: 'email',
    dataIndex: 'email',
    valueType: 'text',
    copyable: true,
  },
  {
    title: 'first_name',
    dataIndex: 'first_name',
    valueType: 'text',
  },
  {
    title: 'last_name',
    dataIndex: 'last_name',
    valueType: 'text',
  },
  {
    title: 'stripe_customer_id',
    dataIndex: 'stripe_customer_id',
    valueType: 'text',
  },
  {
    title: 'subscription_status',
    dataIndex: 'subscription_status',
    valueType: 'text',
  },
  {
    title: 'credit',
    dataIndex: 'credit',
    valueType: 'text',
  },
  {
    title: 'avatar',
    dataIndex: 'avatar',
    valueType: 'image',
    ellipsis: true,
    copyable: true,
  },
  {
    title: 'activated',
    dataIndex: 'activated',
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
