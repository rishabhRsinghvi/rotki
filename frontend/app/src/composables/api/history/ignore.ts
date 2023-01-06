import { type ActionResult } from '@rotki/common/lib/data';
import { axiosSnakeCaseTransformer } from '@/services/axios-tranformers';
import { api } from '@/services/rotkehlchen-api';
import { handleResponse, validStatus } from '@/services/utils';
import { type IgnorePayload } from '@/types/history/ignored';

export const useHistoryIgnoringApi = () => {
  const ignoreActions = async (payload: IgnorePayload): Promise<boolean> => {
    const response = await api.instance.put<ActionResult<boolean>>(
      '/actions/ignored',
      axiosSnakeCaseTransformer(payload),
      {
        validateStatus: validStatus
      }
    );

    return handleResponse(response);
  };

  const unignoreActions = async (payload: IgnorePayload): Promise<boolean> => {
    const response = await api.instance.delete<ActionResult<boolean>>(
      '/actions/ignored',
      {
        data: axiosSnakeCaseTransformer(payload),
        validateStatus: validStatus
      }
    );

    return handleResponse(response);
  };

  return {
    ignoreActions,
    unignoreActions
  };
};