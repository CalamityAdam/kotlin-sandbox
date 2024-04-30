// import OGPreview from './OGPreview';
import OGCard from '../components/OGPreview/OGExternalPreview';

function App() {
  return (
    <div className="relative overflow-hidden bg-white">
      <h1>app, poop</h1>
      {/* <OGPreview url="/internal-page.html" /> */}
      <OGCard url="https://www.youtube.com/watch?v=MNowaEHjHCY" />
    </div>
  );
}

export default App;
