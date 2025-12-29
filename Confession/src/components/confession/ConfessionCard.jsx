import { formatDate } from '../../utils/dateFormatter';

const ConfessionCard = ({ confession }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200">
      <div className="mb-4">
        <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
          {confession.content}
        </p>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span className="font-medium">Anonymous Student</span>
        <span>{formatDate(confession.created_at)}</span>
      </div>
    </div>
  );
};

export default ConfessionCard;