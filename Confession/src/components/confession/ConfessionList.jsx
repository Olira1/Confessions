import { useEffect } from 'react';
import { useConfessions } from '../../hooks/useConfessions';
import ConfessionCard from './ConfessionCard';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';

const ConfessionList = () => {
  const { confessions, loading, error, fetchConfessions } = useConfessions();

  useEffect(() => {
    fetchConfessions();
  }, []);

  if (loading && confessions.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Loader size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (confessions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-gray-50 rounded-lg p-8">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            extract confession card to reusable component
          </h3>
          <p className="text-gray-600">
            Be the first to share an anonymous confession!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {confessions.map((confession) => (
        <ConfessionCard key={confession.id} confession={confession} />
      ))}
      
      {loading && (
        <div className="flex justify-center py-4">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ConfessionList;