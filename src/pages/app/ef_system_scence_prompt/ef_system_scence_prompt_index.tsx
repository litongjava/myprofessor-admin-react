import ApiTable from '@/components/common/ApiTable';
import { ef_system_scence_prompt_columns } from '@/pages/app/ef_system_scence_prompt/ef_system_scence_prompt_column';

export default () => {
  const from = 'ef_system_scene_prompt';
  const beforePageRequest = (params: any, isRecoveryMode?: boolean) => {
    params.idType = 'long';

    if (isRecoveryMode) {
      params.deleted = 1;
    } else {
      params.deleted = 0;
    }
    params.orderBy = 'order_num';
    params.isAsc = 'true';

    params.update_time_op = 'bt';
    params.topicOp = 'ct';
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
      columns={ef_system_scence_prompt_columns()}
      beforePageRequest={beforePageRequest}
      beforeCreateRequest={beforeCreateRequest}
    />
  );
};
