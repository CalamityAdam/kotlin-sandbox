import React, { useState, useEffect } from 'react';

interface OpenGraphData {
  'og:title'?: string;
  'og:description'?: string;
  'og:image'?: string;
}

interface OGPreviewProps {
  url: string;
}

const OGPreview: React.FC<OGPreviewProps> = ({ url }) => {
  const [ogData, setOgData] = useState<OpenGraphData>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOpenGraphData = async () => {
      setLoading(true);
      const response = await fetch(url);
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const metas = doc.getElementsByTagName('meta');
      const data: OpenGraphData = {};

      Array.from(metas).forEach((meta) => {
        const property = meta.getAttribute('property');
        if (property && property.startsWith('og:')) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          data[property] = meta.getAttribute('content');
        }
      });

      setOgData(data);
      setLoading(false);
    };

    fetchOpenGraphData();
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-sm overflow-hidden rounded p-4 shadow-lg">
      {ogData['og:image'] && (
        <img
          className="w-full"
          src={ogData['og:image']}
          alt={ogData['og:title'] || 'Preview image'}
        />
      )}
      <div className="px-6 py-4">
        {ogData['og:title'] && (
          <div className="mb-2 text-xl font-bold">{ogData['og:title']}</div>
        )}
        {ogData['og:description'] && (
          <p className="text-base text-gray-700">{ogData['og:description']}</p>
        )}
      </div>
    </div>
  );
};

export default OGPreview;
