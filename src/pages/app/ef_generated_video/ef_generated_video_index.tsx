import ApiTable from '@/components/common/ApiTable';
import {ef_generated_video_columns} from "@/pages/app/ef_generated_video/ef_generated_video_column";

export default () => {
  const from = 'ef_generated_video';
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
    params.questionOp = 'ct';
    params.promptOp = 'ct';
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
      columns={ef_generated_video_columns()}
      beforePageRequest={beforePageRequest}
      beforeCreateRequest={beforeCreateRequest}
    />
  );
};
