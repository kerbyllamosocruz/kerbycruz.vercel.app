import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Phone, Copy, Check, ExternalLink, AlertCircle } from 'lucide-react';

const FORMSUBMIT_TOKEN = '561aa39f9f9fcc2479de8c42d7ff8df8';

const Connect = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('kerbyllamosocruz@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Save message locally so it is immediately viewable in Admin dashboard
    try {
      const stored = JSON.parse(localStorage.getItem('messages') || '[]');
      stored.unshift({
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('messages', JSON.stringify(stored));
    } catch (storageError) {
      console.warn('LocalStorage save error:', storageError);
    }

    let isSent = false;
    let failureDetail = '';

    // 1. Submit through FormSubmit using the activated token
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_TOKEN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _template: 'table'
        })
      });

      const result = await response.json();
      if (response.ok && (result.success === 'true' || result.success === true)) {
        isSent = true;
      } else {
        failureDetail = result.message || 'FormSubmit submission failed.';
      }
    } catch (fsError) {
      console.warn('FormSubmit request failed:', fsError);
      failureDetail = fsError.message;
    }

    // 2. Web3Forms fallback if FormSubmit fails
    if (!isSent) {
      try {
        const w3Response = await fetch('https://api.web3forms.com/submit', {
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
            subject: `New Portfolio Contact from ${formData.name}`,
            from_name: 'Portfolio Website'
          })
        });

        const w3Result = await w3Response.json();
        if (w3Response.ok && w3Result.success) {
          isSent = true;
        } else {
          failureDetail = w3Result.message || failureDetail;
        }
      } catch (w3Error) {
        console.warn('Web3Forms fallback also failed:', w3Error);
      }
    }

    if (isSent) {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', message: '' });
      }, 5000);
    } else {
      setStatus('error');
      setErrorMessage(failureDetail || 'Could not send message automatically.');
    }
  };

  const mailSubject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || 'Visitor'}`);
  const mailBody = encodeURIComponent(`${formData.message || ''}\n\n---\nSender: ${formData.name || 'Anonymous'}\nEmail: ${formData.email || 'N/A'}`);

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
            <span className="text-sm text-slate-400 mb-4 select-all font-mono">kerbyllamosocruz@gmail.com</span>
            <div className="flex items-center gap-3">
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=kerbyllamosocruz@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#a395e9] hover:text-[#b8abf5] text-sm font-medium flex items-center gap-1 transition-colors"
              >
                Write Me <span className="text-lg leading-none">→</span>
              </a>
              <span className="text-slate-700">|</span>
              <button 
                type="button" 
                onClick={handleCopyEmail}
                className="text-slate-400 hover:text-slate-200 text-sm font-medium flex items-center gap-1.5 transition-colors"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Check size={14} /> Copied
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Copy size={14} /> Copy
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center shadow-lg hover:border-[#a395e9]/50 transition-colors">
            <Phone size={28} className="text-[#a395e9] mb-3" />
            <h4 className="text-lg font-bold text-slate-200 mb-1">Phone</h4>
            <span className="text-sm text-slate-400 mb-4 font-mono">+63 920 458 7096</span>
            <a href="tel:+639204587096" className="text-[#a395e9] hover:text-[#b8abf5] text-sm font-medium flex items-center gap-1 transition-colors">
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
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-12"
              >
                <CheckCircle size={64} className="text-[#a395e9]" />
                <h3 className="text-2xl font-bold text-slate-200">Message Sent!</h3>
                <p className="text-slate-400 text-center max-w-sm">
                  Thank you for reaching out. Your message has been delivered to my inbox and saved.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="mt-4 px-4 py-2 text-sm text-[#a395e9] border border-[#a395e9]/30 hover:bg-[#a395e9]/10 rounded-xl transition-all"
                >
                  Send another message
                </button>
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

                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-sm flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-2 font-semibold">
                      <AlertCircle size={18} className="text-red-400 shrink-0" />
                      <span>Could not send automatically ({errorMessage})</span>
                    </div>
                    <p className="text-slate-300 text-xs">
                      Your message was saved locally. You can also send it directly with your email client:
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a 
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=kerbyllamosocruz@gmail.com&su=${mailSubject}&body=${mailBody}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-[#a395e9] text-slate-950 hover:bg-[#b8abf5] text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        Send via Gmail <ExternalLink size={13} />
                      </a>
                      <a 
                        href={`mailto:kerbyllamosocruz@gmail.com?subject=${mailSubject}&body=${mailBody}`}
                        className="px-3 py-1.5 border border-slate-700 text-slate-200 hover:border-[#a395e9] hover:text-[#a395e9] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        Send via Mail App <Send size={13} />
                      </a>
                    </div>
                  </motion.div>
                )}

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

