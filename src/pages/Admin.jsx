import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const Admin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:3001/messages');
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          throw new Error('Failed to fetch from server');
        }
      } catch (error) {
        console.warn("Using localStorage fallback");
        const localData = JSON.parse(localStorage.getItem('messages') || '[]');
        setMessages(localData);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/messages/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setMessages(messages.filter(m => m.id !== id));
      } else {
        throw new Error('Failed to delete on server');
      }
    } catch (error) {
      const updated = messages.filter(m => m.id !== id);
      setMessages(updated);
      localStorage.setItem('messages', JSON.stringify(updated));
    }
  };

  if (loading) {
    return <div className="flex-center" style={{ minHeight: '50vh' }}>Loading messages...</div>;
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
          <span className="gradient-text">Admin Dashboard</span>
        </h2>
        
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
            Messages
            <span style={{ fontSize: '1rem', background: 'var(--primary)', padding: '0.2rem 0.8rem', borderRadius: '1rem' }}>
              {messages.length}
            </span>
          </h3>

          {messages.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>No messages yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((msg, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={msg.id} 
                  style={{ 
                    background: 'rgba(0,0,0,0.2)', 
                    border: '1px solid var(--border)', 
                    borderRadius: '0.5rem', 
                    padding: '1.5rem',
                    position: 'relative'
                  }}
                >
                  <button 
                    onClick={() => handleDelete(msg.id)}
                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--secondary)', cursor: 'pointer' }}
                    title="Delete Message"
                  >
                    <Trash2 size={20} />
                  </button>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <strong style={{ color: 'var(--primary)' }}>{msg.name}</strong>
                    <span style={{ color: 'var(--text-muted)' }}>{msg.email}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: 'auto' }}>
                      {new Date(msg.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p style={{ lineHeight: '1.5', marginTop: '1rem' }}>{msg.message}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Admin;
