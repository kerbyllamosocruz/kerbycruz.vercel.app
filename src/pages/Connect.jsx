import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const Connect = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Trying to connect to the local json-server database
      const response = await fetch('http://localhost:3001/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() })
      });

      if (response.ok) {
        setStatus('success');
      } else {
        throw new Error('Server returned an error');
      }
    } catch (error) {
      console.warn("Local server not running, saving to localStorage instead.");
      // Fallback for "free database" approach without server running
      const existing = JSON.parse(localStorage.getItem('messages') || '[]');
      existing.push({ ...formData, id: Date.now(), timestamp: new Date().toISOString() });
      localStorage.setItem('messages', JSON.stringify(existing));
      setStatus('success');
    }

    setTimeout(() => {
      setStatus('idle');
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div style={{ padding: '2rem 0', maxWidth: '600px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
          <span className="gradient-text">Let's Connect</span>
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Send me a message and I'll get back to you as soon as possible.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-panel"
      >
        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem 0' }}
          >
            <CheckCircle size={64} color="var(--primary)" />
            <h3>Message Sent!</h3>
            <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="name" style={{ fontSize: '0.9rem', fontWeight: '500' }}>Name</label>
              <input 
                type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                style={{ padding: '0.8rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }}
                placeholder="John Doe"
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="email" style={{ fontSize: '0.9rem', fontWeight: '500' }}>Email</label>
              <input 
                type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                style={{ padding: '0.8rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }}
                placeholder="john@example.com"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="message" style={{ fontSize: '0.9rem', fontWeight: '500' }}>Message</label>
              <textarea 
                id="message" name="message" value={formData.message} onChange={handleChange} required
                style={{ padding: '0.8rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none', minHeight: '150px', resize: 'vertical' }}
                placeholder="Hello Kerby..."
              ></textarea>
            </div>

            <button type="submit" disabled={status === 'submitting'} className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
              {status === 'submitting' ? 'Sending...' : (
                <>Send Message <Send size={18} /></>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Connect;
