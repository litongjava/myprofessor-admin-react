import ApiTable from '@/components/common/ApiTable';
import { app_user2_columns } from '@/pages/app/app_user2/app_user2_column';

export default () => {
  const from = 'app_users2';
  const beforePageRequest = (params: any, isRecoveryMode?: boolean) => {
    if (isRecoveryMode) {
      params.deleted = 1;
    } else {
      params.deleted = 0;
    }
    params.orderBy = 'update_time';
    params.isAsc = 'false';

    params.update_time_op = 'bt';
    params.usernameOp = 'ct';
    params.emailOp = 'ct';
    return params;
  };

  const beforeCreateRequest = (formValues: any) => {
    return {
      ...formValues,
    };
  };
  return (
    <ApiTable
      from={from}
      columns={app_user2_columns()}
      beforePageRequest={beforePageRequest}
      beforeCreateRequest={beforeCreateRequest}
    />
  );
};
