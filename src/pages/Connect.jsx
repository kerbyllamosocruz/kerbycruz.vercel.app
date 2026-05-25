import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Phone } from 'lucide-react';

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
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '74a15b31-ea2a-43e2-866f-18e28108baa5',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: 'New Contact Form Submission from Portfolio',
          from_name: 'Portfolio Website'
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          setFormData({ name: '', email: '', message: '' });
        }, 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error(error);
      setStatus('idle');
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <section className="py-16" id="contact">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2 className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Get in touch</h2>
        <h3 className="text-center text-3xl font-bold mb-12">
          <span className="gradient-text">Contact Me</span>
        </h3>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
        {/* Contact Info Cards */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <h3 className="text-xl font-bold mb-2 text-center md:text-left text-slate-200">Talk to me</h3>
          
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center shadow-lg hover:border-[#a395e9]/50 transition-colors">
            <Send size={28} className="text-[#a395e9] mb-3" />
            <h4 className="text-lg font-bold text-slate-200 mb-1">Email</h4>
            <span className="text-sm text-slate-400 mb-4">kerbyllamosocruz@gmail.com</span>
            <a href="mailto:user@gmail.com" className="text-[#a395e9] hover:text-[#a395e9] text-sm font-medium flex items-center gap-1 transition-colors">
              Write Me <span className="text-lg leading-none">→</span>
            </a>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center shadow-lg hover:border-[#a395e9]/50 transition-colors">
            <Phone size={28} className="text-[#a395e9] mb-3" />
            <h4 className="text-lg font-bold text-slate-200 mb-1">Phone</h4>
            <span className="text-sm text-slate-400 mb-4">+63 920 458 7096</span>
            <a href="tel:+639204587096" className="text-[#a395e9] hover:text-[#a395e9] text-sm font-medium flex items-center gap-1 transition-colors">
              Call Me <span className="text-lg leading-none">→</span>
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold mb-8 text-center md:text-left text-slate-200">Write Me your Message</h3>
          
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-lg">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-12"
              >
                <CheckCircle size={64} className="text-[#a395e9]" />
                <h3 className="text-2xl font-bold text-slate-200">Message Sent!</h3>
                <p className="text-slate-400">Thank you for reaching out.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="relative">
                  <label htmlFor="name" className="absolute -top-3 left-4 bg-slate-900 px-2 text-sm font-semibold text-slate-400">Name</label>
                  <input 
                    type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full bg-transparent border border-slate-700 rounded-xl px-4 py-4 text-slate-200 focus:outline-none focus:border-[#a395e9] transition-colors"
                    placeholder="Enter name"
                  />
                </div>
                
                <div className="relative mt-2">
                  <label htmlFor="email" className="absolute -top-3 left-4 bg-slate-900 px-2 text-sm font-semibold text-slate-400">Mail</label>
                  <input 
                    type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full bg-transparent border border-slate-700 rounded-xl px-4 py-4 text-slate-200 focus:outline-none focus:border-[#a395e9] transition-colors"
                    placeholder="Enter email"
                  />
                </div>

                <div className="relative mt-2">
                  <label htmlFor="message" className="absolute -top-3 left-4 bg-slate-900 px-2 text-sm font-semibold text-slate-400">Message</label>
                  <textarea 
                    id="message" name="message" value={formData.message} onChange={handleChange} required
                    className="w-full bg-transparent border border-slate-700 rounded-xl px-4 py-4 text-slate-200 focus:outline-none focus:border-[#a395e9] transition-colors min-h-[160px] resize-y"
                    placeholder="Write your Message"
                  ></textarea>
                </div>

                <button type="submit" disabled={status === 'submitting'} className="btn btn-primary mt-2">
                  {status === 'submitting' ? 'Sending...' : (
                    <>Send Message <Send size={20} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Connect;
