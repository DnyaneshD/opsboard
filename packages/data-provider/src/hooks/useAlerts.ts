import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDataProvider } from '../context';
import { queryKeys } from '../queryKeys';
import type { AlertFilter } from '../types';

export function useAlerts(filter?: AlertFilter) {
  const provider = useDataProvider();
  return useQuery({
    queryKey: queryKeys.alerts(filter),
    queryFn: () => provider.getAlerts(filter),
  });
}

export function useAcknowledgeAlert() {
  const provider = useDataProvider();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => provider.acknowledgeAlert(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });
}
