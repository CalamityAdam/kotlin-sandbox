import React, { useState, useEffect } from 'react';

interface OpenGraphData {
  'og:title'?: string;
  'og:description'?: string;
  'og:image'?: string;
}

interface OGCardProps {
  url: string;
}

const OGCard: React.FC<OGCardProps> = ({ url }) => {
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
      } catch (error: any) {
        setError('Failed to fetch Open Graph data: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOGData();
  }, [url]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg">
      {ogData['og:image'] && (
        <img
          className="h-48 w-full object-cover"
          src={ogData['og:image']}
          alt="Preview"
        />
      )}
      <div className="p-4">
        {ogData['og:title'] && (
          <h2 className="mb-2 text-xl font-bold">{ogData['og:title']}</h2>
        )}
        {ogData['og:description'] && (
          <p className="text-base text-gray-700">{ogData['og:description']}</p>
        )}
      </div>
    </div>
  );
};

export default OGCard;
