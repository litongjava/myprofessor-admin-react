import ApiTable from '@/components/common/ApiTable';
import { ef_manin_sence_code_columns } from '@/pages/app/ef_manin_sence_code/ef_manin_sence_code_column';

export default () => {
  const from = 'ef_manin_scene_code';
  const beforePageRequest = (params: any, isRecoveryMode?: boolean) => {
    params.idType = 'long';

    if (isRecoveryMode) {
      params.deleted = 1;
    } else {
      params.deleted = 0;
    }
    params.orderBy = 'update_time';
    params.isAsc = 'false';
    params.update_time_op = 'bt';
    params.topicOp = 'ct';
    params.codeOp = 'ct';
    return params;
  };

  const beforeCreateRequest = (formValues: any) => {
    return {
      ...formValues,
      idType: 'long',
    };
  };
  return (
    <ApiTable
      from={from}
      columns={ef_manin_sence_code_columns()}
      beforePageRequest={beforePageRequest}
      beforeCreateRequest={beforeCreateRequest}
    />
  );
};
