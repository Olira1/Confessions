import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfessions } from '../../hooks/useConfessions';
import Button from '../common/Button';
import TextArea from '../common/TextArea';
import ErrorMessage from '../common/ErrorMessage';

const ConfessionForm = () => {
  const [content, setContent] = useState('');
  const { submitConfession, loading, error } = useConfessions();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) return;

    try {
      await submitConfession(content.trim());
      setContent('');
      navigate('/');
    } catch (err) {
      // Error is already handled by the hook
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const isSubmitDisabled = !content.trim() || loading;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Share Your Confession</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="confession" className="block text-sm font-medium text-gray-700 mb-2">
              Your anonymous confession
            </label>
            <TextArea
              value={content}
              onChange={handleChange}
              placeholder="Share what's on your mind anonymously..."
              rows={6}
              maxLength={500}
              disabled={loading}
            />
          </div>

          {error && <ErrorMessage message={error} />}

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitDisabled}
              className="flex-1"
            >
              {loading ? 'Submitting...' : 'Submit Confession'}
            </Button>
            
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfessionForm;