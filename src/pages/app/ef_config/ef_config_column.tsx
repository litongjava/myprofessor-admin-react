import { ProColumns } from '@ant-design/pro-components';

export const ef_config_columns = (): ProColumns<any>[] => [
  {
    title: 'name',
    dataIndex: 'name',
    valueType: 'text',
  },
  {
    title: 'value',
    dataIndex: 'value',
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
