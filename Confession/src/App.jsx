
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfessionProvider } from './context/ConfessionContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Write from './pages/Write';

function App() {
  return (
    <ConfessionProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/write" element={<Write />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ConfessionProvider>
  );
}

export default App;
