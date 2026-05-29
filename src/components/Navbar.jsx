import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Detect scroll to transition the navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/#home' },
    { name: 'About', path: '/#about' },
    { name: 'Projects', path: '/#project' },
    { name: 'Connect', path: '/#connect' },
  ];

  return (
    <>
      {/* Full-screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'pt-2 md:pt-4' : 'pt-4 md:pt-6'}`}
      >
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className={`relative flex justify-between items-center px-4 md:px-6 py-3 rounded-2xl md:rounded-full border transition-all duration-500
          ${scrolled 
            ? 'bg-slate-950/80 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.2)]' 
            : 'bg-slate-900/40 backdrop-blur-md border-white/5 shadow-none'}`}
        >
          {/* Logo */}
          <NavLink to="/" onClick={closeMenu} className="relative z-10 flex items-center gap-2 group">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="overflow-hidden"
            >
              <img 
                id="logo" 
                src={logo} 
                className="h-10 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-all" 
                alt="Kerby Cruz Logo" 
              />
            </motion.div>
          </NavLink>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              className="relative z-10 p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all" 
              onClick={toggleTheme} 
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button 
              className="relative z-10 p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all" 
              onClick={toggleMenu} 
              aria-label="Menu"
            >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.path} 
                className="relative px-5 py-2 text-sm font-semibold tracking-wide text-slate-300 hover:text-white transition-colors group"
              >
                {link.name}
                <span className="absolute inset-0 w-full h-full bg-[#a395e9]/0 group-hover:bg-[#a395e9]/20 rounded-full transition-colors duration-300 -z-10"></span>
              </a>
            ))}
            <a 
              href="/Cruz_Kerby_Resume.pdf" 
              download="Cruz_Kerby_Resume.pdf"
              className="ml-4 px-6 py-2.5 text-sm font-bold text-[#a395e9] bg-[#a395e9]/10 border border-[#a395e9]/30 hover:bg-[#a395e9]/20 hover:border-[#a395e9]/50 rounded-full shadow-[0_0_15px_rgba(163,149,233,0.1)] hover:shadow-[0_0_25px_rgba(163,149,233,0.3)] transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Resume
            </a>
            <button 
              className="ml-2 relative z-10 p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all" 
              onClick={toggleTheme} 
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>
          
          {/* Mobile Navigation Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute top-full left-0 w-full mt-3 p-4 bg-slate-900/95 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl md:hidden flex flex-col gap-2 overflow-hidden z-0"
              >
                {navLinks.map((link, i) => (
                  <motion.a 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={link.name}
                    href={link.path} 
                    onClick={closeMenu} 
                    className="block px-5 py-3.5 text-base font-medium text-slate-200 hover:text-[#a395e9] hover:bg-white/5 rounded-xl transition-all"
                  >
                    {link.name}
                  </motion.a>
                ))}
                <motion.a 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  href="/Cruz_Kerby_Resume.pdf" 
                  download="Cruz_Kerby_Resume.pdf"
                  className="block px-5 py-3.5 mt-2 text-base font-semibold text-center text-[#a395e9] bg-[#a395e9]/10 border border-[#a395e9]/30 hover:bg-[#a395e9]/20 hover:border-[#a395e9]/50 rounded-xl transition-all shadow-[0_0_15px_rgba(163,149,233,0.1)]"
                >
                  Download Resume
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
    </>
  );
};

export default Navbar;
