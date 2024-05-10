import { useEffect, useState } from 'react';
import { OpenGraphData } from '../types/OpenGraphData';

function useOpenGraphData(url: string): {
  ogData: OpenGraphData;
  isLoading: boolean;
  error: string | null;
} {
  const [ogData, setOgData] = useState<OpenGraphData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOGData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/og?url=${encodeURIComponent(url)}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        setOgData(data);
      } catch (error: unknown) {
        let message = 'Failed to fetch Open Graph data: ';

        if (error instanceof Error) {
          message += error.message || 'Unknown error';
        } else {
          message += 'Unknown error';
        }

        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOGData();
  }, [url]);

  return {
    ogData,
    isLoading,
    error,
  };
}

export { useOpenGraphData };
