import { useQuery } from '@tanstack/react-query';
import { useDataProvider } from '../context';
import { queryKeys } from '../queryKeys';

export function useMetrics(entityId?: string) {
  const provider = useDataProvider();
  return useQuery({
    queryKey: queryKeys.metrics(entityId),
    queryFn: () => provider.getMetrics(entityId),
  });
}
