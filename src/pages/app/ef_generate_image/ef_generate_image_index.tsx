import ApiTable from '@/components/common/ApiTable';
import {ef_generated_video_columns} from "@/pages/app/ef_generated_video/ef_generated_video_column";
import {ef_generate_image_columns} from "@/pages/app/ef_generate_image/ef_generate_image_column";

export default () => {
  const from = 'ef_generate_image';
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
      columns={ef_generate_image_columns()}
      beforePageRequest={beforePageRequest}
      beforeCreateRequest={beforeCreateRequest}
    />
  );
};
