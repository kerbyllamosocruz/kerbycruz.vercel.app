import { useEffect, useRef, useState } from "react";
import mixitup from "mixitup";
import { ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import "./Projects.css";

const projectsData = [
  {
    id: "care-osa",
    title: "CARE-OSA",
    category: "Web",
    img: "/assets/care-osa.png",
    images: ["/assets/care-osa.png", "/assets/care-osa1.png"],
    desc: "A full-stack web application designed to digitize university document requests and workflows, featuring automated document generation, a custom AI chatbot, and OCR processing.",
    livePreview: "http://care-osa.runasp.net",
    github: "https://github.com/Protocol-4/CARE-OSA",
    role: "Full Stack Developer",
  },
  {
    id: "vcsmashers",
    title: "VCSmashers",
    category: "Web",
    img: "/assets/VCSmashers.png",
    desc: "A badminton court reservation system that allows players to schedule games, manage bookings, and make secure payments online.",
    livePreview: "https://vcsmashers.vercel.app",
    github: "https://github.com/kerbyllamosocruz/VCSmashers",
    role: "Full Stack Developer",
  },
  {
    id: "bask-cafe",
    title: "BASK CAFÉ",
    category: "Web",
    img: "/assets/baskcafe.png",
    images: ["/assets/baskcafe.png", "/assets/baskcafe1.png"],
    desc: "A minimalist and modern online storefront designed for Bask Café. This project showcases the café’s menu, signature products, brand story, and store information through a clean and user-friendly interface.",
    livePreview: "https://bask-cafe.vercel.app",
    github: "https://github.com/kerbyllamosocruz/bask-cafe.vercel.app",
    role: "Full Stack Developer",
  },
  {
    id: "datus-dominion",
    title: "The Isle: Datu's Dominion",
    category: "Game",
    img: "/assets/game1.png",
    images: ["/assets/game1.png", "/assets/game2.png"],
    desc: "A single-player 2D PC adaptation of the original tabletop game using Unity, faithfully recreating the core mechanics, rules, and gameplay flow of the physical experience through accurate implementation of duels, card interactions, Hill Control mechanics, and event trigger systems to ensure the digital version remained fully aligned with the design and strategic experience of the base game.",
    livePreview: "https://j3no.itch.io/the-isle-datus-dominion",
    role: "Lead Developer",
  },
  { id: "java-store", title: "Java Mini Store", category: "Java", img: "/assets/javaministore.png", desc: "A simple store management system built with Java.", github: "https://github.com/kerbyllamosocruz/java-mini-store" },
  { id: "string-manipulation", title: "String Manipulation", category: "Java", img: "/assets/stringmanipulation.png", desc: "A Java program demonstrating various string manipulation techniques.", github: "https://github.com/kerbyllamosocruz/string-manipulation" },
  { id: "oop-project", title: "OOP Final Project", category: "App", img: "/assets/finalproject.png", desc: "A project created using Visual Studio .NET Windows Forms.", github: "#" },
  { id: "marine-infographics", title: "Marine Infographics", category: "Design", img: "/assets/marineinfographics.png", desc: "An informative infographic about marine life.", livePreview: "/assets/marineinfographics.png" },
  { id: "book-cover", title: "Multimedia: Book Cover", category: "Design", img: "/assets/bookcover.png", desc: "A creative book cover design project.", livePreview: "/assets/bookcover.png" },
  { id: "grunge", title: "Multimedia: Grunge Activity", category: "Design", img: "/assets/grunge.png", desc: "A grunge-style design project.", livePreview: "/assets/grunge.png" },
  { id: "minimalist", title: "Multimedia: Minimalist", category: "Design", img: "/assets/minimalist.png", desc: "A minimalist design activity.", livePreview: "/assets/minimalist.png" },
];

const categories = ["All", "Web", "Game", "Java", "App", "Design"];

const ProjectCard = ({ project, onImageClick }) => {
  const images = project.images && project.images.length > 1 ? project.images : [project.img];
  const hasCarousel = images.length > 1;
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={`work__card mix flex flex-col md:flex-row gap-6 lg:gap-8 ${project.category.toLowerCase()}`}>
      <div className="w-full md:w-5/12 shrink-0 overflow-hidden rounded-2xl relative group">
        <img src={images[currentImgIdx]} alt={project.title} className="work__img cursor-pointer transition-transform duration-500 hover:scale-[1.05]" onClick={() => onImageClick({ images, index: currentImgIdx })} />
        {hasCarousel && (
          <>
            <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md z-10">
              <ChevronLeft size={20} />
            </button>
            <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md z-10">
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 pointer-events-none">
              {images.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${i === currentImgIdx ? "bg-white w-4" : "bg-white/50 w-1.5"}`} />
              ))}
            </div>
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-[0.65rem] font-bold px-2.5 py-0.5 rounded-full z-10 pointer-events-none shadow-sm">
              {currentImgIdx + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col flex-1 text-left justify-center">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>

        {project.role && (
          <div className="mb-3">
            <span className="text-[0.7rem] font-bold px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md uppercase tracking-wider">{project.role}</span>
          </div>
        )}

        {project.desc && <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginTop: "0.5rem", marginBottom: "1.5rem", lineHeight: "1.6" }}>{project.desc}</p>}

        {project.bullets && (
          <ul style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: "1.5rem", paddingLeft: "1.25rem", listStyleType: "disc", textAlign: "left", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {project.bullets.map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-3 mt-auto pt-2">
          {project.livePreview && (
            <a href={project.livePreview} target="_blank" rel="noreferrer" className="flex-1 min-w-[140px] max-w-[200px] flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-all shadow-sm hover:shadow-md">
              {project.category === "Design" ? "View Design" : "Live Preview"} <ExternalLink size={16} />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 min-w-[140px] max-w-[200px] flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-all shadow-sm hover:shadow-md">
              Source Code <FaGithub size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const mixerRef = useRef(null);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalData) return;
      if (e.key === "Escape") {
        setModalData(null);
      } else if (modalData.images.length > 1) {
        if (e.key === "ArrowLeft") {
          setModalData((prev) => ({ ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }));
        } else if (e.key === "ArrowRight") {
          setModalData((prev) => ({ ...prev, index: (prev.index + 1) % prev.images.length }));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalData]);
  useEffect(() => {
    if (containerRef.current && !mixerRef.current) {
      mixerRef.current = mixitup(containerRef.current, {
        selectors: {
          target: ".work__card",
        },
        animation: {
          duration: 300,
        },
      });

      // Handle active class natively to avoid React re-renders which break mixitup
      const workLinks = document.querySelectorAll(".work__item");
      workLinks.forEach((wl) => {
        wl.addEventListener("click", function () {
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
    <section className="work section" id="work" style={{ padding: "2rem 0" }}>
      <h2 style={{ fontSize: "2.5rem", marginBottom: "0.5rem", textAlign: "center" }}>
        <span className="gradient-text">Recent Works</span>
      </h2>
      <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "3rem", fontSize: "1.1rem" }}>My Portfolio</p>

      <div className="work__filters">
        {categories.map((cat, index) => {
          const filterClass = cat.toLowerCase();
          return (
            <span key={cat} className={`work__item ${index === 0 ? "active-work" : ""}`} data-filter={filterClass === "all" ? "all" : `.${filterClass}`}>
              {cat}
            </span>
          );
        })}
      </div>

      <div ref={containerRef} className="work__container">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} onImageClick={setModalData} />
        ))}
      </div>

      {/* Fullscreen Image Modal */}
      {modalData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-zoom-out" onClick={() => setModalData(null)}>
          <div className="relative max-w-6xl w-full flex justify-center items-center cursor-default">
            <button className="fixed top-4 right-4 md:top-8 md:right-8 flex items-center justify-center w-12 h-12 bg-slate-900/80 backdrop-blur-md border border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700 hover:border-slate-400 rounded-full transition-all shadow-2xl z-50" onClick={() => setModalData(null)}>
              <X size={24} />
            </button>

            <div className="flex flex-col items-center">
              <div className="relative group inline-block">
                <img src={modalData.images[modalData.index]} alt="Fullscreen Preview" className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain" onClick={(e) => e.stopPropagation()} />

                {modalData.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-black/40 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md z-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalData((prev) => ({ ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }));
                      }}
                    >
                      <ChevronLeft size={24} />
                    </button>

                    <button
                      className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-black/40 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-md z-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalData((prev) => ({ ...prev, index: (prev.index + 1) % prev.images.length }));
                      }}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

              {modalData.images.length > 1 && (
                <div className="mt-4 bg-slate-900/80 backdrop-blur-sm text-white text-sm font-semibold px-4 py-1.5 rounded-full border border-slate-700" onClick={(e) => e.stopPropagation()}>
                  {modalData.index + 1} / {modalData.images.length}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
