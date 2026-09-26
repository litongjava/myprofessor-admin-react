import ApiTable from '@/components/common/ApiTable';
import {ef_user_blocked_columns} from "@/pages/app/ef_user_blocked/ef_user_blocked_column";

export default () => {
  const from = 'ef_user_blocked';
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
    params.user_id_op = 'ct';
    params.comment_op = 'ct';
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
      columns={ef_user_blocked_columns()}
      beforePageRequest={beforePageRequest}
      beforeCreateRequest={beforeCreateRequest}
    />
  );
};
