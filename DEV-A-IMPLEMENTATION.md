# Dev-A Implementation Documentation

## Overview
Dev-A is responsible for the logic layer of the Student Anonymous Confession SPA, including API integration, global state management, error handling, and business logic.

## Files Created/Modified

### 1. API Layer - `src/api/confessions.api.js`

#### Real API Configuration
```javascript
const API_BASE_URL = "https://anonymous-confession-api.onrender.com/api/v1/confessions";
```

#### Exported Functions
- **`getConfessions()`**: Fetches all confessions from real backend API
- **`postConfession(content)`**: Creates new confession via real backend API

#### Confession Object Structure
```javascript
{
  id: number,           // Unique identifier
  content: string,      // The confession text
  created_at: string    // ISO timestamp string
}
```

#### API Implementation Details
- **Error Handling**: Comprehensive error handling for network issues and HTTP errors
- **Content Validation**: Client-side validation before API calls
- **Sorting**: Ensures newest confessions appear first
- **Network Resilience**: Proper error messages for connection issues

### 2. Context Layer - `src/context/ConfessionContext.jsx`

#### Context Provider Object
```javascript
const ConfessionProvider = ({ children }) => {
  // State objects:
  const [confessions, setConfessions] = useState([]);  // Array of confession objects
  const [loading, setLoading] = useState(false);       // Boolean loading state
  const [error, setError] = useState(null);            // String error message or null
}
```

#### Context Value Object
```javascript
{
  confessions: Array,      // Current confessions list
  setConfessions: Function, // State setter for confessions
  loading: Boolean,        // Loading indicator
  setLoading: Function,    // State setter for loading
  error: String|null,      // Error message
  setError: Function       // State setter for error
}
```

#### Exported Components/Hooks
- **`ConfessionProvider`**: Context provider component
- **`useConfessionContext()`**: Hook to access context (with error boundary)

### 3. Business Logic Hook - `src/hooks/useConfessions.js`

#### Hook Return Object
```javascript
{
  confessions: Array,              // Current confessions from context
  loading: Boolean,                // Loading state from context
  error: String|null,              // Error state from context
  fetchConfessions: Function,      // Async function to load confessions
  submitConfession: Function       // Async function to submit new confession
}
```

#### Function Signatures
- **`fetchConfessions()`**: `async () => void`
  - Sets loading to true
  - Clears previous errors
  - Fetches data via real API
  - Updates confessions state
  - Handles errors gracefully

- **`submitConfession(content)`**: `async (content: string) => void`
  - Validates content
  - Submits via real API
  - Refreshes confession list
  - Throws errors for UI handling

### 4. Utility Layer - `src/utils/dateFormatter.js`

#### Exported Functions
- **`formatDate(isoString)`**: `(isoString: string) => string`
  - Input: ISO date string
  - Output: Formatted date (e.g., "Dec 29, 2025")
  - Handles null/undefined gracefully

## State Flow Architecture

```
Real API Backend (anonymous-confession-api.onrender.com)
    ↓
API Layer (confessions.api.js)
    ↓
Context Layer (ConfessionContext.jsx)
    ↓
Business Logic Hook (useConfessions.js)
    ↓
UI Components (handled by Dev-B)
```

## Error Handling Strategy

### API Level Errors
- Network connectivity issues
- HTTP status code errors
- JSON parsing errors
- Content validation errors
- Proper error message propagation

### Hook Level Errors
- Try-catch blocks around all API calls
- Error state management via context
- Error re-throwing for UI handling when needed

### Context Level Errors
- Boundary check for context usage
- Throws error if used outside provider

## Integration Points for Dev-B

### Required App Setup
```jsx
// In App.jsx
import { ConfessionProvider } from './context/ConfessionContext';

function App() {
  return (
    <ConfessionProvider>
      {/* Your app components */}
    </ConfessionProvider>
  );
}
```

### Component Integration Examples

#### ConfessionForm Component
```jsx
import { useConfessions } from '../hooks/useConfessions';

const ConfessionForm = () => {
  const { submitConfession, loading, error } = useConfessions();
  
  // Use submitConfession(content) to submit
  // Use loading for button states
  // Use error for error display
};
```

#### ConfessionList Component
```jsx
import { useConfessions } from '../hooks/useConfessions';

const ConfessionList = () => {
  const { confessions, fetchConfessions, loading, error } = useConfessions();
  
  // Call fetchConfessions() on mount
  // Use confessions array for rendering
  // Use loading for skeleton states
  // Use error for error display
};
```

## Real API Integration

### API Endpoints
- **GET** `https://anonymous-confession-api.onrender.com/api/v1/confessions`
  - Fetches all confessions
  - Returns array of confession objects
  - Sorted by newest first

- **POST** `https://anonymous-confession-api.onrender.com/api/v1/confessions`
  - Creates new confession
  - Requires JSON body: `{ "content": "confession text" }`
  - Returns created confession object

### API Features
- **Content-Type**: `application/json`
- **CORS**: Enabled for web applications
- **Error Responses**: Proper HTTP status codes and error messages
- **Validation**: Server-side content validation

## Dev-A Checklist ✅

- [x] Real API integration with proper error handling
- [x] Global state management via Context
- [x] Business logic hook with clean interface
- [x] Error handling at all levels (network, HTTP, validation)
- [x] Loading state management
- [x] Date formatting utility
- [x] Production-ready API implementation
- [x] No UI or styling code
- [x] Clean separation of concerns
- [x] Proper error boundaries

## Notes
- All objects follow consistent naming conventions
- Error messages are user-friendly
- State updates are immutable
- API contract matches backend implementation
- Real backend provides persistent data storage
- Network error handling for production reliability