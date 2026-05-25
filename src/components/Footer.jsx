import { FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="footer glass-panel" style={{ marginTop: 'auto', borderRadius: '1rem 1rem 0 0', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
      <div className="footer_left">
        <a href="/">
          <img src={logo} alt="KC Logo" className="footer_logo" style={{ height: '50px' }} />
        </a>
      </div>
      
      <div className="footer_center" style={{ textAlign: 'center', flex: 1, minWidth: '200px' }}>
        <p style={{ fontWeight: 'bold' }}>Kerby Llamoso Cruz © {new Date().getFullYear()}</p>
        <p className="rights" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>All Rights Reserved</p>
      </div>
      
      <div className="footer_right" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <a href="https://facebook.com/kerbyllamosocruz" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaFacebook size={20} className="social_icon" />
          <span>Facebook.com/kerbyllamosocruz</span>
        </a>
        <a href="https://instagram.com/kerbyllamosocruz" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaInstagram size={20} className="social_icon" />
          <span>Instagram.com/kerbyllamosocruz</span>
        </a>
        <a href="https://github.com/kerbycruz" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaGithub size={20} className="social_icon" />
          <span>Github.com/kerbycruz</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
