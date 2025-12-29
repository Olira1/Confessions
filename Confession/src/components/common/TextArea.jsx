const TextArea = ({ 
  value, 
  onChange, 
  placeholder = '', 
  rows = 4,
  maxLength,
  className = '',
  disabled = false 
}) => {
  return (
    <div className="w-full">
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`}
      />
      {maxLength && (
        <div className="text-right text-sm text-gray-500 mt-1">
          {value?.length || 0}/{maxLength}
        </div>
      )}
    </div>
  );
};

export default TextArea;