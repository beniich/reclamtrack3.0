import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useAuditLogs(table?: string) {
  const url = table ? `/api/audit?table=${table}` : '/api/audit';
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    logs: data?.data || [],
    isLoading,
    isError: error
  };
}

export function useFlashback(table: string, id: string, dateAt: string) {
  const url = `/api/flashback?table=${table}&id=${id}&at=${dateAt}`;
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    snapshot: data?.data || null,
    isLoading,
    isError: error
  };
}
