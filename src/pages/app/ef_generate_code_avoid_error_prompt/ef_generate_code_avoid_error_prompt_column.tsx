import {ProColumns} from '@ant-design/pro-components';

export const ef_generate_code_avoid_error_prompt_columns = (): ProColumns<any>[] => [
  {
    "title": "title",
    "dataIndex": "title",
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
    "title": "final_request_json",
    "dataIndex": "final_request_json",
    "valueType": "textarea",
    ellipsis:true,
    copyable: true,
  },
  {
    "title": "error_code",
    "dataIndex": "error_code",
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
    "title": "fixed_code",
    "dataIndex": "fixed_code",
    "valueType": "textarea",
    ellipsis:true,
    copyable: true,
  },
  {
    "title": "prompt",
    "dataIndex": "prompt",
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
