import ApiTable from '@/components/common/ApiTable';

import { ef_generated_video_better_columns } from '@/pages/app/ef_generated_video_better/ef_generated_video_better_column';

export default () => {
  const from = 'ef_generated_video_better';
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
    params.titleOp = 'ct';
    params.jsonFields="embedding";
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
      columns={ef_generated_video_better_columns()}
      beforePageRequest={beforePageRequest}
      beforeCreateRequest={beforeCreateRequest}
    />
  );
};
