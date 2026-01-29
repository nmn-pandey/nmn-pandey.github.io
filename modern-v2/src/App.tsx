import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Terminal, Globe, Cpu, Database, ChevronRight, Award, BookOpen, Briefcase, Code2, Layers, Menu, X } from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -300 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skillGroups = [
    { name: 'AI & Machine Learning', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Neural Networks', 'Deep Learning'] },
    { name: 'NLP & LLMs', items: ['Hugging Face', 'Transformers', 'LangChain', 'RAG', 'Spacy', 'GPT-4'] },
    { name: 'Data & Analytics', items: ['Pandas', 'NumPy', 'SQL', 'NoSQL', 'Tableau', 'Excel'] },
    { name: 'Engineering', items: ['Python', 'R', 'Java', 'C++', 'Docker', 'GCP', 'Azure', 'CI/CD'] }
  ];

  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="nav-brand">
        <div className="nav-content">
          <a href="#hero" className="nav-logo">NMN PANDEY</a>

          {/* Desktop Links */}
          <div className="nav-links desktop-only">
            {['about', 'skills', 'experience', 'projects', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`nav-link ${activeSection === item ? 'active' : ''}`}
              >
                {item.toUpperCase()}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <a href="mailto:namanp95@gmail.com" className="btn-primary desktop-only" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}>
              GET IN TOUCH
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mobile-menu-links">
                {['about', 'skills', 'experience', 'projects', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className={`mobile-nav-link ${activeSection === item ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.toUpperCase()}
                  </a>
                ))}
                <a
                  href="mailto:namanp95@gmail.com"
                  className="btn-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  GET IN TOUCH
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="container">
        {/* Hero Section */}
        <section id="hero" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p style={{ color: 'var(--primary)', fontWeight: 600, letterSpacing: '0.2em', marginBottom: '1.5rem' }}>
              AI ENGINEER & DATA SCIENTIST
            </p>
            <h1>Engineering the <br />Intelligence of Tomorrow.</h1>
            <p style={{ maxWidth: '600px', fontSize: '1.25rem', marginTop: '2rem', lineHeight: '1.6' }}>
              MSc in AI (Distinction) with 9+ years of cross-industry expertise.
              Specializing in Open-Source LLMs, Healthcare AI, and high-performance ML pipelines.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3.5rem' }}>
              <a href="#projects" className="btn-primary">
                VIEW INNOVATIONS <ArrowRight size={18} />
              </a>
              <a href="#experience" className="btn-secondary">
                PROFESSIONAL JOURNEY
              </a>
            </div>
          </motion.div>
        </section>

        {/* Marquee Skills */}
        <div className="marquee-container">
          <div className="marquee-content">
            {skillGroups.flatMap(g => g.items).concat(skillGroups.flatMap(g => g.items)).map((skill, i) => (
              <span key={i} className="marquee-item">{skill}</span>
            ))}
          </div>
        </div>

        {/* About Section */}
        <section id="about">
          <div className="brand-grid">
            <div style={{ gridColumn: 'span 7' }}>
              <h2 style={{ marginBottom: '2rem' }}>The Visionary <br />Behind the Data.</h2>
              <p style={{ fontSize: '1.4rem', color: 'white', marginBottom: '2rem' }}>
                I bridge the gap between academic excellence and industrial-scale AI.
              </p>
              <p style={{ marginBottom: '2rem' }}>
                With a Master's in AI (Distinction) from Brunel University and 8 years of cross-industry experience,
                I specialize in building the technical foundations that allow AI to thrive. My work spans from
                optimizing LLaMA models to developing life-saving gait analysis tools in healthcare.
              </p>

              <div style={{ marginTop: '3rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'white' }}>CERTIFICATIONS</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {[
                    'Six Sigma Green Belt',
                    'Google Cloud Foundations',
                    'Data Analytics Essentials',
                    'Generative AI Career Essentials'
                  ].map(cert => (
                    <div key={cert} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                      <Award size={16} color="var(--primary)" /> {cert}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ gridColumn: 'span 5' }}>
              <div className="brand-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <BookOpen size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                  <h3>Education</h3>
                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ color: 'white', fontWeight: 600 }}>MSc in Artificial Intelligence</p>
                    <p style={{ fontSize: '0.9rem' }}>Brunel University London • Distinction</p>
                    <p style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>AI, Deep Learning, Project Management</p>
                  </div>
                  <div style={{ marginTop: '1.5rem' }}>
                    <p style={{ color: 'white', fontWeight: 600 }}>BTech in Computer Science</p>
                    <p style={{ fontSize: '0.9rem' }}>BIAS, Bhimtal • Merit</p>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
                  <Terminal size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                  <h3>Philosophy</h3>
                  <p style={{ fontSize: '0.95rem' }}>
                    "AI is not just about models; it's about the infrastructure, the ethics, and the human impact.
                    I build systems that are as robust as they are intelligent."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <h2>Technical <br />Arsenal.</h2>
            <p style={{ maxWidth: '400px', textAlign: 'right' }}>
              A multi-disciplinary stack designed for high-performance AI and data-driven innovation.
            </p>
          </div>
          <div className="brand-grid">
            {skillGroups.map((group, i) => (
              <div key={i} style={{ gridColumn: 'span 3' }}>
                <div className="brand-card" style={{ height: '100%', padding: '2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--primary-soft)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {i === 0 && <Cpu size={20} color="var(--primary)" />}
                      {i === 1 && <Layers size={20} color="var(--primary)" />}
                      {i === 2 && <Database size={20} color="var(--primary)" />}
                      {i === 3 && <Terminal size={20} color="var(--primary)" />}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', letterSpacing: '0.05em' }}>{group.name.toUpperCase()}</h3>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                    {group.items.map((skill, j) => (
                      <span key={j} style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>
                        {skill}{j < group.items.length - 1 ? ' •' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <h2>Professional <br />Trajectory.</h2>
            <p style={{ maxWidth: '400px', textAlign: 'right' }}>
              A history of technical leadership and innovation across the UK, USA, and India.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--border)' }}>
            {[
              {
                role: 'Data Scientist - R&D',
                company: 'Blatchford Mobility, UK',
                period: '2024 - PRESENT',
                description: 'Developing ML models for Gait Phase Identification and abnormal gait detection using sensor data. Leading research studies in personalized treatment recommendations.'
              },
              {
                role: 'ML Engineer',
                company: 'Mercor, USA (Remote)',
                period: '2024',
                description: 'Optimized performance for LLaMA models on GPUs. Developed benchmarking scripts and consumer-friendly documentation for reproducibility.'
              },
              {
                role: 'Research Assistant',
                company: 'Brunel University, UK',
                period: '2023',
                description: 'Developed a chatbot using GPT-3 APIs to assist with academic queries. Analyzed the impact of LLMs on student assessments.'
              },
              {
                role: 'Field Service Engineer',
                company: 'Pressco Technology Inc., USA',
                period: '2017 - 2022',
                description: 'Led installations of machine vision solutions across 50+ projects. Conducted audits and trained clients on high-speed vision systems.'
              },
              {
                role: 'Software Developer',
                company: 'Tata Consultancy Services, India',
                period: '2016 - 2017',
                description: 'Developed REST API endpoints for banking/insurance. Automated form comparisons using Python, improving efficiency by 90%.'
              }
            ].map((exp, i) => (
              <div key={i} className="brand-card" style={{ borderRadius: '0', border: 'none', background: 'var(--background)', padding: '4rem 3rem' }}>
                <div className="brand-grid" style={{ alignItems: 'center' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <p style={{ color: 'var(--primary)', fontWeight: 700 }}>{exp.period}</p>
                  </div>
                  <div style={{ gridColumn: 'span 5' }}>
                    <h3 style={{ fontSize: '1.6rem' }}>{exp.role}</h3>
                    <p style={{ color: 'white', marginTop: '0.5rem' }}>{exp.company}</p>
                  </div>
                  <div style={{ gridColumn: 'span 5' }}>
                    <p>{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <h2 style={{ marginBottom: '4rem' }}>Selected <br />Innovations.</h2>
          <div className="brand-grid">
            {[
              {
                title: 'Brain Tumour Segmentation',
                category: 'MEDICAL AI / DEEP LEARNING',
                desc: '3D MRI segmentation using Swin-Transformers. Achieved 0.795 Dice score in BraTS 2023 benchmarks.',
                icon: <Cpu size={32} />,
                link: 'https://github.com/nmn-pandey/brain-tumour-segmentation'
              },
              {
                title: 'Dialogue Insights Generator',
                category: 'NLP / GENERATIVE AI',
                desc: 'Web app leveraging GPT-3.5 and WhisperX for conversational analysis and psychological profiling.',
                icon: <Globe size={32} />,
                link: 'https://github.com/nmn-pandey/dialogue-analyser'
              },
              {
                title: 'Fortune 1000 Analytics',
                category: 'DATA STRATEGY / VIZ',
                desc: 'Interactive Tableau dashboard analyzing CEO diversity and business growth trends (2019-2021).',
                icon: <Database size={32} />,
                link: 'https://public.tableau.com/app/profile/naman.pandey/viz/Fortune1000Analysis_17064900121200/FinalDashboardClust-Interact2'
              },
              {
                title: 'Student Dropout Prediction',
                category: 'PREDICTIVE ANALYTICS',
                desc: 'ML models predicting academic success using demographic and academic data. Achieved 76% accuracy.',
                icon: <Code2 size={32} />,
                link: 'https://github.com/nmn-pandey/student-dropout-prediction'
              },
              {
                title: 'Missing Money Matters',
                category: 'SQL / NOSQL ANALYSIS',
                desc: 'Investigating financial discrepancies using SQLite and MongoDB for WSDA Music records.',
                icon: <Briefcase size={32} />,
                link: 'https://github.com/nmn-pandey/Missing-Money-Matters'
              }
            ].map((project, i) => (
              <div key={i} style={{ gridColumn: i < 3 ? 'span 4' : 'span 6' }}>
                <div className="brand-card" style={{ height: '100%', padding: '3rem 2rem' }}>
                  <div style={{ color: 'var(--primary)', marginBottom: '2rem' }}>{project.icon}</div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '1rem' }}>{project.category}</p>
                  <h3 style={{ marginBottom: '1.5rem' }}>{project.title}</h3>
                  <p style={{ marginBottom: '2rem' }}>{project.desc}</p>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                    VIEW PROJECT <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ borderTop: '1px solid var(--border)', paddingTop: '160px' }}>
          <div className="brand-grid">
            <div style={{ gridColumn: 'span 6' }}>
              <h2>Let's Define <br />the Future.</h2>
              <p style={{ fontSize: '1.25rem', marginTop: '2rem' }}>
                Available for strategic AI consulting, technical leadership, and research collaborations.
              </p>
              <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <a href="mailto:namanp95@gmail.com" style={{ color: 'white', fontSize: '2rem', textDecoration: 'none', fontWeight: 700 }}>
                  namanp95@gmail.com
                </a>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <a href="https://www.linkedin.com/in/nmn-pandey/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>LINKEDIN</a>
                  <a href="https://github.com/nmn-pandey" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>GITHUB</a>
                  <a href="https://medium.com/@nmn.pandey" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>MEDIUM</a>
                </div>
              </div>
            </div>
            <div style={{ gridColumn: 'span 6' }}>
              <div className="brand-card">
                <form
                  style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);

                    try {
                      const response = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        body: formData
                      });

                      const data = await response.json();

                      if (data.success) {
                        alert('Message sent successfully!');
                        (e.target as HTMLFormElement).reset();
                      } else {
                        alert('Something went wrong. Please try again.');
                      }
                    } catch (error) {
                      alert('Failed to send message. Please check your connection.');
                    }
                  }}
                >
                  <input type="hidden" name="access_key" value="5aebb5ee-5e4c-441a-9731-dbda0921ab2c" />
                  <input type="hidden" name="subject" value="New Contact Form Submission (v2)" />

                  <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>YOUR NAME</label>
                    <input type="text" name="name" style={{ width: '100%', background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', marginTop: '0.5rem', outline: 'none' }} placeholder="John Doe" required />
                  </div>
                  <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>YOUR EMAIL</label>
                    <input type="email" name="email" style={{ width: '100%', background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', marginTop: '0.5rem', outline: 'none' }} placeholder="john@example.com" required />
                  </div>
                  <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>MESSAGE</label>
                    <textarea name="message" style={{ width: '100%', background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', marginTop: '0.5rem', outline: 'none', resize: 'none' }} rows={4} placeholder="Tell me about your project" required />
                  </div>
                  <button type="submit" className="btn-primary" style={{ border: 'none', width: '100%', justifyContent: 'center' }}>
                    SEND INQUIRY
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', marginTop: '8rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
          <p>© 2026 NAMAN PANDEY. ALL RIGHTS RESERVED.</p>
          <p>BUILT FOR IMPACT.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;




