import { motion } from 'framer-motion';

const About = () => {
  const education = [
    {
      school: "Pamantasan ng Lungsod ng Valenzuela",
      year: "2023 - Present",
      degree: "BS Information Technology",
      details: ["Dr. Pio Valenzuela Scholarship Grantee", "Ranked among the Top 10 in Java Programming at PLV VITS ITLympics 2024."]
    },
    {
      school: "Electron College of Technical Education",
      year: "2021 - 2023",
      degree: "STEM Strand",
      details: []
    }
  ];

  return (
    <div className="py-8">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          <span className="gradient-text">About Me</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span className="text-indigo-500">✦</span> Core Technologies
          </h3>
          <div className="flex flex-col gap-6">
            {[
              {
                title: "Languages",
                skills: ["HTML", "CSS", "JavaScript", "Python", "PHP", "SQL", "C#", "Java"]
              },
              {
                title: "Frameworks",
                skills: ["React", "Tailwind CSS", "ASP.NET"]
              },
              {
                title: "Tools & Platforms",
                skills: ["Git", "GitHub", "Swagger", "VS Code", "Figma", "Android Studio", "Unity"]
              }
            ].map((category, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, sIdx) => (
                    <motion.span
                      key={sIdx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm font-medium text-slate-200 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span className="text-indigo-500">✦</span> Education Journey
          </h3>
          <div className="flex flex-col gap-6 relative">
            {/* Timeline line */}
            <div className="absolute left-[11px] top-[10px] bottom-[10px] w-[2px] bg-slate-400/30"></div>

            {education.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 + (index * 0.15) }}
                className="glass-panel p-6 ml-8 relative" 
              >
                {/* Timeline dot */}
                <div className="absolute -left-8 top-8 w-6 h-6 rounded-full bg-slate-900 border-4 border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h4 className="text-xl text-slate-50 font-bold leading-tight">{item.school}</h4>
                  <span className="text-sm text-indigo-500 font-semibold px-2.5 py-1 bg-indigo-500/10 rounded-full">
                    {item.year}
                  </span>
                </div>
                <p className="text-slate-400 font-medium mt-2">{item.degree}</p>
                {item.details.length > 0 && (
                  <ul className="mt-4 pl-5 text-slate-400 text-[0.95rem] list-disc marker:text-slate-500">
                    {item.details.map((detail, i) => (
                      <li key={i} className="mb-1.5">{detail}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
