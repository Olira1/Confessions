import { Link } from 'react-router-dom';
import ConfessionList from '../components/confession/ConfessionList';
import Button from '../components/common/Button';

const Home = () => {
  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Confessions</h1>
          <p className="text-gray-600 mb-6">Anonymous thoughts from fellow students</p>
          
          <Link to="/write">
            <Button className="inline-flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Write a Confession
            </Button>
          </Link>
        </div>

        {/* Confession List */}
        <ConfessionList />
      </div>
    </div>
  );
};

export default Home;