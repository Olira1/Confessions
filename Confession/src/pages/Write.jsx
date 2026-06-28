import ConfessionForm from '../components/confession/ConfessionForm';

const Write = () => {
  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Define the model for storing anonymous
          </h1>
          <p className="text-gray-600">Share your thoughts anonymously</p>
        </div>

        {/* Confession Form */}
        <ConfessionForm />
      </div>
    </div>
  );
};

export default Write;