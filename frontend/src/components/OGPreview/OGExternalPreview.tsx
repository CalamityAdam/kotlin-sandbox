import { useOpenGraphData } from '../../hooks/useOpenGraphData';

interface OGCardProps {
  url: string;
}

const OGCard: React.FC<OGCardProps> = ({ url }) => {
  const { error, isLoading, ogData } = useOpenGraphData(url);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      {ogData['og:image'] && (
        <a href={url}>
          <img
            className="rounded-t-lg"
            src={ogData['og:image']}
            alt="Preview"
          />
        </a>
      )}
      <div className="p-5">
        <a href={url}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {ogData['og:title'] || 'Title'}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {ogData['og:description'] || 'Description'}
        </p>
        <a
          href={url}
          className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            className="ms-2 size-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default OGCard;
