import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Connect from './pages/Connect';
import Admin from './pages/Admin';
import InteractiveBackground from './components/InteractiveBackground';

const MainPage = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
    <section id="home"><Home /></section>
    <section id="about"><About /></section>
    <section id="project"><Projects /></section>
    <section id="connect"><Connect /></section>
  </div>
);

function App() {
  return (
    <Router>
      <InteractiveBackground />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
