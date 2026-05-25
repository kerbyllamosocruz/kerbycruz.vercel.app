import { useEffect, useRef, useState } from 'react';
import mixitup from 'mixitup';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const projectsData = [
  { 
    id: 'care-osa', 
    title: 'CARE-OSA', 
    category: 'Web', 
    img: '/assets/care-osa.png',
    desc: 'A full-stack web application designed to digitize university document requests and workflows, featuring automated document generation, a custom AI chatbot, and OCR processing.',
    livePreview: 'https://care-osa.runasp.net', 
    github: 'https://github.com/Protocol-4/CARE-OSA' 
  },
  { 
    id: 'vcsmashers', 
    title: 'VCSmashers', 
    category: 'Web', 
    img: '/assets/VCSmashers.png',
    desc: 'A badminton court reservation system that allows players to schedule games, manage bookings, and make secure payments online.',
    github: 'https://github.com/kerbyllamosocruz/VCSmashers' 
  },
  { 
    id: 'bask-cafe', 
    title: 'BASK CAFÉ', 
    category: 'Web', 
    img: '/assets/baskcafe.png', 
    desc: 'A minimalist and modern online storefront designed for Bask Café. This project showcases the café’s menu, signature products, brand story, and store information through a clean and user-friendly interface.',
    livePreview: 'https://bask-cafe.vercel.app', 
    github: 'https://github.com/kerbyllamosocruz/bask-cafe.vercel.app' 
  },
  { id: 'java-store', title: 'Java Mini Store', category: 'Java', img: '/assets/javaministore.png', desc: 'A simple store management system built with Java.', github: 'https://github.com/kerbyllamosocruz/java-mini-store' },
  { id: 'string-manipulation', title: 'String Manipulation', category: 'Java', img: '/assets/stringmanipulation.png', desc: 'A Java program demonstrating various string manipulation techniques.', github: 'https://github.com/kerbyllamosocruz/string-manipulation' },
  { id: 'oop-project', title: 'OOP Final Project', category: 'App', img: '/assets/finalproject.png', desc: 'A project created using Visual Studio .NET Windows Forms.', github: '#' },
  { id: 'marine-infographics', title: 'Marine Infographics', category: 'Design', img: '/assets/marineinfographics.png', desc: 'An informative infographic about marine life.', livePreview: '/assets/marineinfographics.png' },
  { id: 'book-cover', title: 'Multimedia: Book Cover', category: 'Design', img: '/assets/bookcover.png', desc: 'A creative book cover design project.', livePreview: '/assets/bookcover.png' },
  { id: 'grunge', title: 'Multimedia: Grunge Activity', category: 'Design', img: '/assets/grunge.png', desc: 'A grunge-style design project.', livePreview: '/assets/grunge.png' },
  { id: 'minimalist', title: 'Multimedia: Minimalist', category: 'Design', img: '/assets/minimalist.png', desc: 'A minimalist design activity.', livePreview: '/assets/minimalist.png' }
];

const categories = ['All', 'Web', 'Java', 'App', 'Design'];

const Projects = () => {
  const containerRef = useRef(null);
  const mixerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !mixerRef.current) {
      mixerRef.current = mixitup(containerRef.current, {
        selectors: {
          target: '.work__card',
        },
        animation: {
          duration: 300,
        },
      });

      // Handle active class natively to avoid React re-renders which break mixitup
      const workLinks = document.querySelectorAll(".work__item");
      workLinks.forEach((wl) => {
        wl.addEventListener("click", function() {
          workLinks.forEach((link) => link.classList.remove("active-work"));
          this.classList.add("active-work");
        });
      });
    }

    return () => {
      if (mixerRef.current) {
        mixerRef.current.destroy();
        mixerRef.current = null;
      }
    };
  }, []);

  return (
    <section className="work section" id="work" style={{ padding: '2rem 0' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
        <span className="gradient-text">Recent Works</span>
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>My Portfolio</p>

      <div className="work__filters">
        {categories.map((cat, index) => {
          const filterClass = cat.toLowerCase();
          return (
            <span 
              key={cat}
              className={`work__item ${index === 0 ? 'active-work' : ''}`} 
              data-filter={filterClass === 'all' ? 'all' : `.${filterClass}`}
            >
              {cat}
            </span>
          );
        })}
      </div>

      <div ref={containerRef} className="work__container">
        {projectsData.map((project) => (
          <div key={project.id} className={`work__card mix flex flex-col ${project.category.toLowerCase()}`}>
            <img src={project.img} alt={project.title} className="work__img" />
            <h3 className="work__title">{project.title}</h3>
            {project.desc && <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem', marginBottom: '1rem' }}>{project.desc}</p>}
            
            {project.bullets && (
              <ul style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.75rem', marginBottom: '1rem', paddingLeft: '1.25rem', listStyleType: 'disc', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {project.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            )}
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '1rem' }}>
              {project.livePreview && (
                <a href={project.livePreview} target="_blank" rel="noreferrer" className="work__button">
                  Demo <ExternalLink size={16} className="work__icon" style={{ marginLeft: '4px' }} />
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="work__button">
                  Code <FaGithub size={16} className="work__icon" style={{ marginLeft: '4px' }} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
