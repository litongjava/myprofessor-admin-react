import {ProColumns} from '@ant-design/pro-components';

export const ef_manin_sence_code_columns = (): ProColumns<any>[] => [
  {
    "title": "group_id",
    "dataIndex": "group_id",
    "valueType": "text"
  },
  {
    "title": "topic",
    "dataIndex": "topic",
    "valueType": "text",
    ellipsis:true,
    copyable: true,
  },
  {
    "title": "scene",
    "dataIndex": "scene",
    "valueType": "text"
  },
  {
    "title": "loop",
    "dataIndex": "loop",
    "valueType": "text"
  },
  {
    "title": "code",
    "dataIndex": "code",
    "valueType": "textarea",
    ellipsis:true,
    copyable: true,
  },
  {
    "title": "script",
    "dataIndex": "script",
    "valueType": "textarea",
    ellipsis:true,
    copyable: true,
  },
  {
    "title": "std_out",
    "dataIndex": "std_out",
    "valueType": "textarea",
    ellipsis:true,
    copyable: true,
  },
  {
    "title": "std_err",
    "dataIndex": "std_err",
    "valueType": "textarea",
    ellipsis:true,
    copyable: true,

  },
  {
    "title": "uri",
    "dataIndex": "uri",
    "valueType": "text",
    copyable: true,
  },
  {
    "title": "image_url",
    "dataIndex": "image_url",
    "valueType": "image",
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
