import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 mt-auto">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
        <a href="#home" className="mb-8">
          <h1 className="text-3xl font-bold gradient-text">Kerby Cruz</h1>
        </a>
        
        <ul className="flex flex-wrap justify-center gap-6 mb-8 text-sm font-medium text-slate-300">
          <li><a href="#home" className="hover:text-[#a395e9] transition-colors">Home</a></li>
          <li><a href="#about" className="hover:text-[#a395e9] transition-colors">About</a></li>
          <li><a href="#project" className="hover:text-[#a395e9] transition-colors">Works</a></li>
          <li><a href="#connect" className="hover:text-[#a395e9] transition-colors">Connect</a></li>
        </ul>

        <div className="flex gap-6 mb-12">
          <a href="https://facebook.com/kerbyllamosocruz" target="_blank" rel="noreferrer" aria-label="Kerby Cruz Facebook Profile" className="text-slate-400 hover:text-[#a395e9] transition-colors">
            <FaFacebook size={24} />
          </a>
          <a href="https://linkedin.com/in/kerbyllamosocruz" target="_blank" rel="noreferrer" aria-label="Kerby Cruz LinkedIn Profile" className="text-slate-400 hover:text-[#a395e9] transition-colors">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com/kerbyllamosocruz" target="_blank" rel="noreferrer" aria-label="Kerby Cruz GitHub Profile" className="text-slate-400 hover:text-[#a395e9] transition-colors">
            <FaGithub size={24} />
          </a>
        </div>

        <span className="text-sm text-slate-500">
          &#169; {new Date().getFullYear()} Kerby Llamoso Cruz. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
