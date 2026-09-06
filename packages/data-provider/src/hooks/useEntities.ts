import { useQuery } from '@tanstack/react-query';
import { useDataProvider } from '../context';
import { queryKeys } from '../queryKeys';

export function useEntities() {
  const provider = useDataProvider();
  return useQuery({
    queryKey: queryKeys.entities(),
    queryFn: () => provider.getEntities(),
  });
}

export function useEntity(id: string) {
  const provider = useDataProvider();
  return useQuery({
    queryKey: queryKeys.entity(id),
    queryFn: () => provider.getEntity(id),
    enabled: Boolean(id),
  });
}
