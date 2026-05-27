import { motion } from 'framer-motion';
import { Download, ChevronRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex-center pt-32" style={{ minHeight: 'calc(100vh - 250px)' }}>
      <div className="grid-2" style={{ alignItems: 'center' }}>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>
            Greetings, I'm <br />
            <span className="gradient-text">Kerby Cruz.</span>
          </h1>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: '500' }}>
            IT Student
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2.5rem', maxWidth: '500px' }}>
            A dedicated college student pursuing a Bachelor of Science in Information Technology at Pamantasan ng Lungsod ng Valenzuela. I have a strong passion for technology and always strive to expand my knowledge in programming, software development, and emerging tech trends.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/Kerby_Cruz_Resume.pdf" download="Kerby_Cruz_Resume.pdf" target="_blank" rel="noreferrer" className="btn btn-primary">
              <Download size={20} />
              Download Resume
            </a>
            <a href="/#project" className="btn btn-outline">
              View Projects
              <ChevronRight size={20} />
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-center"
        >
          <div style={{ 
            position: 'relative', 
            width: '350px', 
            height: '350px', 
            borderRadius: '50%',
            background: '#a395e9',
            padding: '5px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            <img 
              src="/assets/profile.jpg" 
              alt="Kerby Cruz" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: '50%',
                border: '4px solid var(--bg)'
              }} 
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Home;
