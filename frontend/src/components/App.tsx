import { useState } from 'react';
import OGCard from '../components/OGPreview/OGExternalPreview';

function App() {
  const [urls, setUrls] = useState([
    'https://www.youtube.com/watch?v=MNowaEHjHCY',
  ]);
  const [newUrl, setNewUrl] = useState('');

  const handleAddUrl = () => {
    if (newUrl) {
      setUrls([...urls, newUrl]);
      setNewUrl('');
    }
  };

  return (
    <div className="relative overflow-hidden bg-white">
      <h1>Open Graph preview</h1>
      <input
        type="text"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <button onClick={handleAddUrl}>Add URL</button>

      <div className="flex columns-4">
        {urls.map((url, index) => (
          <OGCard key={index} url={url} />
        ))}
      </div>
    </div>
  );
}

export default App;
