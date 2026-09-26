import {ProColumns} from '@ant-design/pro-components';

export const ef_manin_image_code_columns = (): ProColumns<any>[] => [
  {
    "title": "question",
    "dataIndex": "question",
    "valueType": "text",
    ellipsis:true,
    copyable: true,
  },
  {
    "title": "code",
    "dataIndex": "code",
    "valueType": "textarea",
    ellipsis:true,
    copyable: true,
  },
  {
    "title": "status",
    "dataIndex": "status",
    "valueType": "text"
  },
  {
    "title": "elapsed",
    "dataIndex": "elapsed",
    "valueType": "text"
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
