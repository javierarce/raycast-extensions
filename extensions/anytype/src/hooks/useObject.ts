import { useCachedPromise } from "@raycast/utils";
import { getObject } from "../api";
import { BodyFormat } from "../models";

export function useObject(spaceId: string, objectId: string, format: BodyFormat) {
  const { data, error, isLoading, mutate } = useCachedPromise(
    async (spaceId: string, objectId: string, format: BodyFormat) => {
      const response = await getObject(spaceId, objectId, format);
      return response.object;
    },
    [spaceId, objectId, format],
    {
      keepPreviousData: true,
      execute: !!spaceId && !!objectId && !!format,
    },
  );

  return {
    object: data,
    objectError: error,
    isLoadingObject: isLoading,
    mutateObject: mutate,
  };
}
