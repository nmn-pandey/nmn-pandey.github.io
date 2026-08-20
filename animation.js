(function () {
  'use strict';

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  var Lenis = window.Lenis;
  if (!gsap || !ScrollTrigger || !Lenis) return;

  gsap.registerPlugin(ScrollTrigger);

  var isDesktop = window.matchMedia('(min-width: 1200px)');

  /* =========================================================
   * 1. LENIS SMOOTH SCROLL + GSAP SYNC
   * ========================================================= */
  var lenis = new Lenis({
    duration: 1.2,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smoothWheel: true,
    touchMultiplier: 2,
  });
  window.portfolioLenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function (time) {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var CONTACT_EMAIL = 'namanp95@gmail.com';
  var GITHUB_PROFILE = 'https://github.com/nmn-pandey';

  var SECTION_LABELS = {
    about: 'Profile',
    skills: 'Skills',
    what_we_do: 'Education',
    showcase: 'Selected Projects',
    collaborations: 'Experience',
    awards: 'Elsewhere',
  };

  var SKILLS = [
    {
      title: 'Machine Learning',
      items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Keras', 'Neural Networks', 'Time Series Analysis'],
    },
    {
      title: 'Generative AI',
      items: ['GPT-4/3.5', 'BERT', 'RAG', 'LangChain', 'TensorRT-LLM', 'vLLM', 'Llama', 'Vector DBs', 'Streamlit'],
    },
    {
      title: 'NLP',
      items: ['Transformers', 'SpaCy', 'NLTK', 'Tokenisation', 'Embeddings', 'Sentiment Analysis'],
    },
    {
      title: 'Computer Vision',
      items: ['OpenCV', 'Medical Imaging', 'UNet', 'Swin Transformers', 'Encoder-Decoder Architectures'],
    },
    {
      title: 'MLOps & Cloud',
      items: ['Azure DevOps', 'GCP', 'Vertex AI', 'Docker', 'Kubernetes', 'CI/CD', 'Weights & Biases', 'Git'],
    },
    {
      title: 'Data & Development',
      items: ['Python', 'C++', 'SQL', 'R', 'NumPy', 'Pandas', 'FastAPI', 'Flask', 'REST APIs', 'Tableau', 'Power BI'],
    },
    {
      title: 'Databases',
      items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Vector DBs'],
    },
    {
      title: 'Leadership & Delivery',
      items: ['Cross-functional Team Leadership', 'Technical Roadmap & Decision-Making', 'Stakeholder Management', 'End-to-End Project Delivery', 'LLM & AI Evaluation Frameworks', 'Healthcare Data Governance', 'Agile Delivery & CI/CD', 'Mentoring & Coaching', 'Technical Communication & Reporting'],
    },
  ];

  var EDUCATION = [
    {
      degree: 'MSc Artificial Intelligence',
      school: 'Brunel University London',
      period: 'Sep 2022 — Sep 2023',
      location: 'London, United Kingdom',
      result: 'Distinction',
      detail: 'Advanced study in machine learning, computer vision, and applied AI. The dissertation developed PyTorch architectures for 3D brain-tumour segmentation using attention, deep supervision, and Swin Transformers.',
      topics: ['3D medical imaging', 'Deep learning', 'Swin Transformers', 'PyTorch'],
    },
    {
      degree: 'BTech Computer Science',
      school: 'Birla Institute of Applied Sciences',
      period: 'Jul 2012 — Jun 2016',
      location: 'Bhimtal, India',
      result: 'Bachelor of Technology',
      detail: 'A four-year computer-science programme establishing the foundations for software engineering, algorithms, databases, distributed systems, and later work in applied machine learning.',
      topics: ['Algorithms', 'Software engineering', 'Databases', 'Computer systems'],
    },
  ];

  var COMPANY_EXPERIENCE = [
    {
      label: 'Mercor',
      company: 'Mercor',
      role: 'Technical Project Manager · Machine Learning Engineer',
      period: 'Apr 2024 — Present',
      description: 'Led technical delivery across distributed AI teams and engineered scalable open-source LLM deployment and benchmarking workflows.',
      achievements: ['Technical programme delivery', 'TensorRT-LLM & vLLM', 'Cross-functional coordination'],
    },
    {
      label: 'Blatchford',
      company: 'Blatchford Mobility',
      role: 'Data Scientist — R&D',
      period: 'Apr 2024 — Present',
      description: 'Builds clinical machine-learning systems for smart prosthetic mobility, translating IMU and gait data into robust real-world product insights.',
      achievements: ['Clinical gait analytics', 'Embedded sensor ML', 'R&D product validation'],
    },
    {
      label: 'Brunel',
      company: 'Brunel University London',
      role: 'Research Assistant',
      period: 'Jul 2023 — Aug 2023',
      description: 'Supported applied AI research through reproducible experimentation, structured data analysis, and communication of technical findings.',
      achievements: ['Research prototyping', 'Experimental analysis', 'Technical reporting'],
    },
    {
      label: 'Pressco',
      company: 'Pressco Technology Inc.',
      role: 'Process Analysis Engineer',
      period: 'May 2017 — Aug 2022',
      description: 'Delivered industrial inspection and process-analysis systems, improving production visibility and supporting high-reliability manufacturing operations.',
      achievements: ['Industrial vision systems', 'Process optimisation', 'Customer engineering'],
    },
    {
      label: 'TCS',
      company: 'Tata Consultancy Services',
      role: 'Software Developer',
      period: 'Jul 2016 — May 2017',
      description: 'Developed and maintained enterprise software while collaborating across engineering, testing, and delivery teams.',
      achievements: ['Enterprise development', 'Software delivery', 'Cross-team collaboration'],
    },
  ];

  var PROFILES = [
    {
      name: 'LinkedIn',
      handle: 'nmn-pandey',
      url: 'https://www.linkedin.com/in/nmn-pandey/',
      image: 'images/portfolio/elsewhere-linkedin-art.jpg',
      description: 'Career history, professional updates, and opportunities to collaborate.',
    },
    {
      name: 'GitHub',
      handle: 'nmn-pandey',
      url: GITHUB_PROFILE,
      image: 'images/portfolio/elsewhere-github-art.jpg',
      description: 'Open-source projects, technical experiments, and production-minded code.',
    },
    {
      name: 'Unsplash',
      handle: '@nmnp',
      url: 'https://unsplash.com/@nmnp',
      image: 'images/portfolio/elsewhere-unsplash-art.jpg',
      description: 'Photography, visual studies, and an archive of places and details.',
    },
    {
      name: 'Instagram',
      handle: '@nmn.pandey',
      url: 'https://www.instagram.com/nmn.pandey',
      image: 'images/portfolio/elsewhere-instagram-art.jpg',
      description: 'Creative work, travels, and glimpses behind the projects.',
    },
  ];

  function applyPortfolioContent() {
    document.title = 'Naman Pandey — Data Scientist & AI Engineer';

    var description = $('meta[name="description"]');
    if (description) description.setAttribute('content', 'Naman Pandey is a data scientist and AI engineer working across healthcare ML, computer vision, NLP, and production AI systems.');

    var hero = $('.Hero_hero_content_title__TwYDo');
    if (hero) {
      hero.setAttribute('aria-label', 'Naman Pandey — data-driven AI engineer');
      var nameLine = $('[data-text="we-are-a"]', hero);
      var descriptorLine = $('[data-text="human-driven"]', hero);
      var titleLine = $('[data-text="creative"]', hero);
      if (nameLine) nameLine.textContent = 'Naman Pandey';
      if (descriptorLine) descriptorLine.textContent = 'data — driven';
      if (titleLine) titleLine.textContent = 'AI Engineer';
      var featuredWordsContainer = $('.Hero_hero_content_title_featuredWordsContainer__mOQxb', hero);
      if (featuredWordsContainer) {
        var forLabel = $('.portfolio-hero-for', featuredWordsContainer);
        if (!forLabel) {
          forLabel = document.createElement('small');
          forLabel.className = 'portfolio-hero-for';
          forLabel.textContent = 'for';
        }

        var originalMediaBox = $('.js-hero_content_title_mediaBox', hero);
        var motionBox = originalMediaBox;
        if (originalMediaBox && originalMediaBox.tagName === 'BUTTON') {
          motionBox = document.createElement('span');
          motionBox.className = originalMediaBox.className;
          originalMediaBox.replaceWith(motionBox);
        }
        if (motionBox) {
          motionBox.classList.add('portfolio-hero-motion');
          motionBox.setAttribute('aria-hidden', 'true');
          var motionVideo = $('video', motionBox);
          if (!motionVideo) {
            motionVideo = document.createElement('video');
            motionVideo.src = 'images/hero-ai-motion.mp4';
            motionVideo.autoplay = true;
            motionVideo.muted = true;
            motionVideo.defaultMuted = true;
            motionVideo.loop = true;
            motionVideo.playsInline = true;
            motionVideo.preload = 'metadata';
            motionVideo.disablePictureInPicture = true;
            motionVideo.setAttribute('muted', '');
            motionBox.appendChild(motionVideo);
          }
          featuredWordsContainer.insertBefore(motionBox, featuredWordsContainer.firstChild);
          featuredWordsContainer.insertBefore(forLabel, motionBox.nextSibling);
        } else {
          featuredWordsContainer.insertBefore(forLabel, featuredWordsContainer.firstChild);
        }
      }
      var heroWords = $$('.Hero_hero_content_title_featuredWords__0Rd4E > span', hero);
      ['SYSTEMS', 'RESEARCH', 'PRODUCTS', 'IMPACT'].forEach(function (word, i) {
        if (heroWords[i]) heroWords[i].textContent = word;
      });
    }

    var heroYear = $('.Hero_hero_content_year__AytFG');
    if (heroYear) heroYear.textContent = 'Since 2016';

    var profileDescription = $('.About_about_primaryDescription__2KYSC p');
    if (profileDescription) {
      profileDescription.textContent = 'Driven by mathematical curiosity and practical outcomes, I work where artificial intelligence, biomechanics, and scalable engineering meet — across volumetric 3D medical vision, smart prosthetic mobility, multimodal generative AI, and real-time edge computing.';
    }

    Object.keys(SECTION_LABELS).forEach(function (id) {
      $$('[data-title]', $('#' + id)).forEach(function (label) {
        label.setAttribute('data-title', SECTION_LABELS[id]);
        label.textContent = SECTION_LABELS[id];
      });
    });

    $$('a[href^="mailto:"]').forEach(function (link) {
      link.setAttribute('href', 'mailto:' + CONTACT_EMAIL);
      $$('span', link).forEach(function (span) {
        if (span.textContent.indexOf('@') !== -1) span.textContent = CONTACT_EMAIL;
      });
      if (!link.querySelector('span') && link.textContent.indexOf('@') !== -1) link.textContent = CONTACT_EMAIL;
    });

    var menu = $('.Menu_menu_nav__WX0Ml');
    if (menu) {
      var links = [
        ['Profile', '#about'],
        ['Skills', '#skills'],
        ['Selected Projects', '#showcase'],
        ['Experience', '#collaborations'],
        ['Education', '#what_we_do'],
        ['Elsewhere', '#awards'],
        ['Contact', '#footer'],
      ];
      menu.innerHTML = links.map(function (item) {
        return '<li class="Menu_menu_nav_item__PfuBn"><a href="' + item[1] + '">' + item[0] + '</a></li>';
      }).join('');
    }

    var headerActions = $('.Header_header_right__3SVyr');
    if (headerActions && !$('.portfolio-cv-download', headerActions)) {
      var chat = $('.Header_header_right_contact__2knWE', headerActions);
      var download = chat ? chat.cloneNode(true) : document.createElement('a');
      download.className = (chat ? chat.className : 'Header_header_right_contact__2knWE') + ' portfolio-cv-download';
      download.href = 'Naman-Pandey-CV.pdf';
      download.download = 'Naman-Pandey-CV.pdf';
      download.removeAttribute('target');
      download.setAttribute('aria-label', 'Download Naman Pandey CV');
      if (chat) {
        $$('.text, .text__clone', download).forEach(function (span) { span.textContent = 'Download CV'; });
      } else {
        download.textContent = 'Download CV';
      }
      headerActions.insertBefore(download, headerActions.firstChild);
    }

    $$('.Menu_menu_info_label__8bFqR').forEach(function (label) {
      label.textContent = 'Direct contact';
    });
    $$('.Footer_footer_container_top_left_contact_label__LjVGu, .Footer_footer_container_bottom_left_label__cbx50').forEach(function (label) {
      label.textContent = 'Contact me';
    });
    $$('.Footer_footer_container_bottom_left_socials_title__U0UgV').forEach(function (label) {
      label.textContent = 'Follow me';
    });
    $$('.Footer_footer_container_top_left_contact_brief__AsPNE, .Footer_footer_container_bottom_left_brief__dWn44').forEach(function (link) {
      link.setAttribute('href', 'https://github.com/nmn-pandey');
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      $$('span', link).forEach(function (span) { span.textContent = 'View projects'; });
    });
    $$('.Footer_footer_container_bottom_right_copyright__RyUDT').forEach(function (label) {
      label.textContent = '© ' + new Date().getFullYear() + ' Naman Pandey. All rights reserved.';
    });
  }

  function addAmbientGradient() {
    if ($('.portfolio-ambient-gradient')) return;
    var gradient = document.createElement('div');
    gradient.className = 'portfolio-ambient-gradient';
    gradient.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(gradient, document.body.firstChild);
  }

  function initContextualHeaderAction() {
    var headerActions = $('.Header_header_right__3SVyr');
    if (!headerActions) return;
    var relevantSections = ['skills', 'collaborations', 'what_we_do'].map(function (id) { return $('#' + id); }).filter(Boolean);

    function update() {
      var focusLine = window.innerHeight * 0.5;
      var showDownload = relevantSections.some(function (section) {
        var rect = section.getBoundingClientRect();
        return rect.top <= focusLine && rect.bottom >= focusLine;
      });
      headerActions.classList.toggle('portfolio-cv-context', showDownload);
    }

    ScrollTrigger.create({
      start: 0,
      end: function () { return document.documentElement.scrollHeight - window.innerHeight; },
      onUpdate: update,
    });
    update();
  }

  function restructureVisibleSections() {
    var about = $('#about');
    var education = $('#what_we_do');
    var showcase = $('#showcase');
    var experience = $('#collaborations');
    var awards = $('#awards');
    var team = $('#team');
    var presses = $('#presses');

    if (team) team.remove();
    if (presses) presses.remove();
    if (!about || !education || !showcase || !experience || !awards) return;

    var skills = buildSkillsSection();
    about.insertAdjacentElement('afterend', skills);
    skills.insertAdjacentElement('afterend', showcase);
    showcase.insertAdjacentElement('afterend', experience);
    experience.insertAdjacentElement('afterend', education);
    education.insertAdjacentElement('afterend', awards);
  }

  function buildSkillsSection() {
    var section = document.createElement('section');
    section.id = 'skills';
    section.className = 'SectionDetector_sectionDetector__q3TeF portfolio-skills-section';
    section.setAttribute('aria-label', 'Skills');
    section.innerHTML = '<div class="Container_container__A7FAx portfolio-skills-container">' +
      '<div class="portfolio-skills-heading">' +
        '<div class="SectionIndex_sectionIndex__qXUaC"><span data-number="true">2</span><span data-separator="true"></span><span data-title="Skills">Skills</span></div>' +
        '<p>Technical depth for production AI, paired with the leadership needed to deliver it.</p>' +
      '</div>' +
      '<div class="portfolio-skills-groups">' + SKILLS.map(function (group, index) {
        return '<article class="portfolio-skills-group" data-skill-group="' + index + '">' +
          '<div class="portfolio-skills-group-meta"><span>0' + (index + 1) + '</span><h3>' + group.title + '</h3></div>' +
          '<ul>' + group.items.map(function (skill) { return '<li>' + skill + '</li>'; }).join('') + '</ul>' +
        '</article>';
      }).join('') + '</div>' +
    '</div>';
    return section;
  }

  function initSkills() {
    $$('.portfolio-skills-group').forEach(function (group) {
      ScrollTrigger.create({
        trigger: group,
        start: 'top 70%',
        end: 'bottom 35%',
        toggleClass: { targets: group, className: 'is-active' },
      });
    });
  }

  function adaptEducationSection() {
    var section = $('#what_we_do');
    var content = $('.WhatWeDo_whatWeDo_content__Qu584', section);
    if (!section || !content) return;

    section.setAttribute('aria-label', 'Education');
    $$('[data-number]', section).forEach(function (number) { number.textContent = '5'; });
    $$('[data-title]', section).forEach(function (label) {
      label.setAttribute('data-title', 'Education');
      label.textContent = 'Education';
    });

    content.innerHTML = EDUCATION.map(function (item, index) {
      var category = index === 0 ? 'Graduate' : 'Undergraduate';
      var details = [item.degree, item.school, item.result + ' · ' + item.period.replace(/^.*—\s*/, ''), item.topics.slice(0, 2).join(' & ')];
      return '<div class="education-offering">' +
        '<article class="WhatWeDo_whatWeDo_content_item__ygj3S" data-education-offering="' + index + '">' +
          '<div class="WhatWeDo_whatWeDo_content_item_number__0aXhm css-13o7eu2"><p>0' + (index + 1) + '</p></div>' +
          '<div class="WhatWeDo_whatWeDo_content_item_category__VAmxq css-13o7eu2"><h4>' + category + '</h4></div>' +
          '<div class="WhatWeDo_whatWeDo_content_item_content__Ie7_I">' +
            '<div class="WhatWeDo_whatWeDo_content_item_content_category__AmIt1">' +
              '<div class="WhatWeDo_whatWeDo_content_item_content_category_number__30oXq css-13o7eu2"><p>5.' + (index + 1) + '</p></div>' +
              '<div class="WhatWeDo_whatWeDo_content_item_content_category_name__CtmHd css-13o7eu2"><h4>' + category + '</h4></div>' +
            '</div>' +
            '<ul class="WhatWeDo_whatWeDo_content_item_content_list__WgiY8">' + details.map(function (detail, i) {
              return '<li class="WhatWeDo_whatWeDo_content_item_content_list_item__m5em0" style="--i:' + i + '">' + detail + '</li>';
            }).join('') + '</ul>' +
            '<p class="education-offering-detail">' + item.detail + '</p>' +
          '</div>' +
        '</article>' +
      '</div>';
    }).join('');

    var offerings = $$('.WhatWeDo_whatWeDo_content_item__ygj3S', content);
    offerings.forEach(function (item, index) {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 72%',
        end: 'bottom 38%',
        onEnter: function () { activate(index); },
        onEnterBack: function () { activate(index); },
      });
    });

    function activate(index) {
      offerings.forEach(function (item, i) {
        item.classList.toggle('WhatWeDo_whatWeDo_content_item__active__lScZK', i === index);
        if (i <= index) item.classList.add('WhatWeDo_whatWeDo_content_item__reached__DRKz0');
      });
    }

    activate(0);
  }

  function adaptCollaborationsSection() {
    var section = $('#collaborations');
    if (!section) return;
    section.setAttribute('aria-label', 'Experience');
    section.innerHTML = '<div class="Collaborations_collaborations__ZmUpq">' +
      '<div class="Collaborations_collaborations_content__EaZA6" style="--progress:0">' +
        '<div class="Collaborations_collaborations_content_index__NobUo"><div><div class="SectionIndex_sectionIndex__qXUaC"><span data-number="true">4</span><span data-separator="true"></span><span data-title="Experience">Experience</span></div></div></div>' +
        '<article class="Collaborations_collaborations_content_description__VqCRT experience-arc-description" aria-live="polite"></article>' +
        '<div class="Collaborations_collaborations_content_grid__uxs_0 experience-company-grid" role="tablist" aria-label="Companies"></div>' +
        '<div class="Collaborations_collaborations_content_arc__MSXnV" style="--total-items:' + COMPANY_EXPERIENCE.length + '"></div>' +
      '</div>' +
    '</div>';

    var grid = $('.experience-company-grid', section);
    var arc = $('.Collaborations_collaborations_content_arc__MSXnV', section);
    COMPANY_EXPERIENCE.forEach(function (item, index) {
      var mobileItem = document.createElement('button');
      mobileItem.type = 'button';
      mobileItem.className = 'experience-company-button';
      mobileItem.setAttribute('role', 'tab');
      mobileItem.setAttribute('data-company-index', index);
      mobileItem.innerHTML = '<span>0' + (index + 1) + '</span><strong>' + item.company + '</strong><small>' + item.role + '</small>';
      grid.appendChild(mobileItem);

      var arcItem = document.createElement('div');
      arcItem.className = 'Collaborations_collaborations_content_arc_item__ihb0E' + (index === 0 ? ' Collaborations_active__Vdo0O' : '');
      arcItem.style.setProperty('--index', index);
      arcItem.setAttribute('data-company-index', index);
      arcItem.innerHTML = '<div class="line"><div class="word">' + item.label + '</div></div>';
      arc.appendChild(arcItem);
    });
  }

  function adaptProfilesSection() {
    var section = $('#awards');
    if (!section) return;
    section.setAttribute('aria-label', 'Elsewhere');
    section.classList.add('portfolio-profiles-panels');
    $$('[data-title]', section).forEach(function (label) {
      label.setAttribute('data-title', 'Elsewhere');
      label.textContent = 'Elsewhere';
    });

    var sticky = $('.Awards_awards_sticky__QGQF2', section);
    var content = $('.Awards_awards_content__MML99', section);
    var panelWrapper = $('.Awards_awards__6qOsC', section);
    var cards = $$('.Awards_awards_item__wrbdK', section);
    if (!sticky || !content || !cards.length) return;
    cards.slice(PROFILES.length).forEach(function (card) { card.remove(); });
    cards = cards.slice(0, PROFILES.length);
    if (panelWrapper) panelWrapper.setAttribute('data-in-view', 'true');

    var context = document.createElement('div');
    context.className = 'portfolio-awards-context';
    context.innerHTML = '<div class="portfolio-awards-context-left">' +
        '<p class="portfolio-awards-eyebrow">06 <span></span> Elsewhere</p>' +
        '<p class="portfolio-awards-kicker">Follow the work beyond this portfolio</p>' +
        '<h3 data-profile-context-name></h3>' +
      '</div>' +
      '<div class="portfolio-awards-context-right">' +
        '<p data-profile-context-description></p>' +
        '<a data-profile-context-link target="_blank" rel="noopener noreferrer"></a>' +
      '</div>';
    sticky.insertBefore(context, content);

    cards.forEach(function (card, index) {
      var profile = PROFILES[index % PROFILES.length];
      var image = $('img', card);
      card.setAttribute('role', 'link');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', 'Open ' + profile.name + ' profile');
      card.setAttribute('data-profile-panel', index % PROFILES.length);
      if (image) {
        image.alt = profile.name + ' profile';
        image.src = profile.image;
        image.removeAttribute('srcset');
        image.removeAttribute('sizes');
      }

      var caption = document.createElement('span');
      caption.className = 'portfolio-awards-card-caption';
      caption.innerHTML = '<strong>' + profile.name + '</strong><small>' + profile.handle + '</small><i aria-hidden="true">↗</i>';
      card.appendChild(caption);

      function openProfile() {
        window.open(profile.url, '_blank', 'noopener,noreferrer');
      }
      card.addEventListener('click', openProfile);
      card.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openProfile();
        }
      });
    });

    var contextName = $('[data-profile-context-name]', context);
    var contextDescription = $('[data-profile-context-description]', context);
    var contextLink = $('[data-profile-context-link]', context);
    var activeProfile = -1;
    section.portfolioSetActiveProfile = function (cardIndex) {
      var profileIndex = cardIndex % PROFILES.length;
      if (profileIndex === activeProfile) return;
      activeProfile = profileIndex;
      var profile = PROFILES[profileIndex];
      contextName.textContent = profile.name;
      contextDescription.textContent = profile.description;
      contextLink.href = profile.url;
      contextLink.textContent = 'Visit ' + profile.handle + ' ↗';
      cards.forEach(function (card, index) {
        card.classList.toggle('portfolio-profile-panel-active', index % PROFILES.length === profileIndex);
      });
    };
    section.portfolioSetActiveProfile(0);
  }

  /* =========================================================
   * 2. PAGE LOADER — curtain mask + percentage counter
   *    (drives --page-loader-mask-height clip-path reveal)
   * ========================================================= */
  function initLoader() {
    var loader = $('.PageLoader_pageLoader___1cgC');
    if (!loader) return;
    var pct = $('.PageLoader_pageLoader_percentage__d3Dk1 p', loader);
    var bar = $('.PageLoader_pageLoader_progress_bar__gQsNW', loader);
    var maskHeight = 0;
    var duration = 1.6;
    var counter = { v: 0 };

    var tl = gsap.timeline({
      onComplete: function () {
        setTimeout(function () {
          loader.classList.add('loaded');
          setTimeout(function () { loader.style.display = 'none'; }, 700);
        }, 250);
      },
    });

    tl.to(counter, {
      v: 100,
      duration: duration,
      ease: 'power2.inOut',
      onUpdate: function () {
        var v = Math.round(counter.v);
        if (pct) pct.textContent = v + '%';
        if (bar) bar.style.setProperty('--progress', v / 100);
      },
    }, 0);

    tl.to(loader, {
      '--page-loader-mask-height': '100%',
      duration: 0.9,
      ease: 'power3.inOut',
    }, duration * 0.85);
  }

  /* =========================================================
   * 3. HERO — featured words blur cross-fade + media box
   * ========================================================= */
  function initHeroWords() {
    var container = $('.Hero_hero_content_title_featuredWords__0Rd4E');
    if (!container) return;
    var words = $$(':scope > span', container);
    if (words.length < 2) return;
    var current = 0;
    gsap.set(words, { opacity: 0, filter: 'blur(10px)' });
    gsap.set(words[0], { opacity: 1, filter: 'blur(0px)' });

    var timer = setInterval(function () {
      var from = words[current];
      var to = words[(current + 1) % words.length];
      gsap.fromTo(from, { opacity: 1, filter: 'blur(0px)' }, { opacity: 0, filter: 'blur(10px)', duration: 1, ease: 'power3.inOut' });
      gsap.fromTo(to, { opacity: 0, filter: 'blur(10px)' }, { opacity: 1, filter: 'blur(0px)', duration: 1.6, ease: 'power3.inOut' });
      current = (current + 1) % words.length;
    }, 5000);

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { clearInterval(timer); } else {
        timer = setInterval(function () {
          var from = words[current];
          var to = words[(current + 1) % words.length];
          gsap.fromTo(from, { opacity: 1, filter: 'blur(0px)' }, { opacity: 0, filter: 'blur(10px)', duration: 1, ease: 'power3.inOut' });
          gsap.fromTo(to, { opacity: 0, filter: 'blur(10px)' }, { opacity: 1, filter: 'blur(0px)', duration: 1.6, ease: 'power3.inOut' });
          current = (current + 1) % words.length;
        }, 5000);
      }
    }, false);
  }

  /* =========================================================
   * 4. ROLLING TEXT / SMOOTH TEXT HOVER EFFECT
   *    (.text + .text__clone yPercent swap, like original)
   * ========================================================= */
  function initTextRollovers() {
    $$('.common-link-effect, .common-link-effect-2, .Header_header_left_menu__CDHoo, .Header_header_right_contact__2knWE').forEach(function (el) {
      var texts = $$('.will-change-transform .text, .will-change-transform .text__clone', el);
      if (texts.length < 2) return;
      var t = texts[0], c = texts[1];
      gsap.set(c, { yPercent: 100 });

      el.addEventListener('mouseenter', function () {
        gsap.to(t, { yPercent: -100, ease: 'power3.out', duration: 0.7, overwrite: 'auto' });
        gsap.to(c, { yPercent: 0, ease: 'power3.out', duration: 0.7, overwrite: 'auto' });
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(t, { yPercent: 0, ease: 'power3.out', duration: 0.7, overwrite: 'auto' });
        gsap.to(c, { yPercent: 100, ease: 'power3.out', duration: 0.7, overwrite: 'auto' });
      });
    });
  }

  /* =========================================================
   * 5. HEADER — hide on scroll down, show on scroll up
   * ========================================================= */
  function initHeaderHide() {
    var header = $('.Header_header__W3r_v');
    if (!header) return;
    var last = 0;
    var threshold = 120;
    lenis.on('scroll', function (e) {
      var y = e.animatedScroll || e.scroll || 0;
      var diff = y - last;
      if (Math.abs(diff) < 4) return;
      if (y < threshold) {
        header.classList.remove('Header_header__hidden__qvMgH');
      } else if (diff > 0) {
        header.classList.add('Header_header__hidden__qvMgH');
      } else {
        header.classList.remove('Header_header__hidden__qvMgH');
      }
      last = y;
    });
  }

  /* =========================================================
   * 6. MENU DRAWER — clip-path mask reveal + nav stagger
   *    (drives --menu-mask-height)
   * ========================================================= */
  function initMenu() {
    var btn = $('.Header_header_left_menu__CDHoo');
    var drawer = $('.Menu_menu__K8jw6');
    var navItems = $$('.Menu_menu_nav_item__PfuBn', drawer);
    if (!btn || !drawer) return;
    var open = false;

    function openMenu() {
      open = true;
      btn = $('.Header_header_left_menu__CDHoo') || btn;
      navItems = $$('.Menu_menu_nav_item__PfuBn', drawer);
      btn.setAttribute('aria-expanded', 'true');
      gsap.set(drawer, { visibility: 'visible', pointerEvents: 'auto' });
      gsap.to(drawer, {
        '--menu-mask-height': '0%',
        duration: 0.9,
        ease: 'power3.inOut',
      });
      gsap.fromTo(navItems,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power4.out', stagger: 0.09, delay: 0.35, overwrite: 'auto' });
      setMenuButton(true);
    }

    function closeMenu() {
      open = false;
      btn = $('.Header_header_left_menu__CDHoo') || btn;
      btn.setAttribute('aria-expanded', 'false');
      gsap.to(drawer, {
        '--menu-mask-height': '100%',
        duration: 0.7,
        ease: 'power3.inOut',
        onComplete: function () {
          gsap.set(drawer, { visibility: 'hidden', pointerEvents: 'none' });
        },
      });
      setMenuButton(false);
    }

    function setMenuButton(isOpen) {
      var lines = $$('.Header_header_left_menu_hamburger_line__BIUUo > span', btn);
      if (isOpen) {
        gsap.to(lines[0], { rotate: 45, y: 0.5, duration: 0.35, ease: 'power3.out' });
        gsap.to(lines[1], { rotate: -45, y: -0.5, duration: 0.35, ease: 'power3.out' });
      } else {
        gsap.to(lines[0], { rotate: 0, y: 0, duration: 0.35, ease: 'power3.out' });
        gsap.to(lines[1], { rotate: 0, y: 0, duration: 0.35, ease: 'power3.out' });
      }
    }

    btn.setAttribute('aria-expanded', 'false');
    window.addEventListener('click', function (event) {
      var clicked = event.target instanceof Element ? event.target : null;
      if (!clicked) return;
      var toggle = clicked.closest('.Header_header_left_menu__CDHoo');
      if (toggle) {
        event.preventDefault();
        event.stopImmediatePropagation();
        btn = toggle;
        open ? closeMenu() : openMenu();
        return;
      }

      var link = clicked.closest('.Menu_menu__K8jw6 a');
      if (link) {
        var href = link.getAttribute('href');
        if (href && href.indexOf('#') === 0) {
          event.preventDefault();
          event.stopImmediatePropagation();
          var target = $(href);
          if (target) {
            setTimeout(function () {
              var top = target.getBoundingClientRect().top + window.scrollY;
              window.history.replaceState(null, '', href);
              lenis.scrollTo(top, { immediate: true, force: true });
              window.scrollTo(0, top);
              ScrollTrigger.update();
            }, 760);
          }
        }
        closeMenu();
      }
    }, true);

    // Esc closes
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && open) closeMenu();
    });
  }

  /* =========================================================
   * 7. SHOWCASE — carousel (mobile layout present in HTML)
   * ========================================================= */
  var SHOWCASE = [
    {
      title: 'Enhancing Brain Tumour Segmentation using Transformers',
      services: ['3D Swin-UNet', 'Volumetric MRI', 'MONAI', 'PyTorch'],
      img: 'images/portfolio/project-brats-art.jpg',
      thumb: 'images/portfolio/project-brats-art.jpg',
      link: 'https://github.com/nmn-pandey/brain-tumour-segmentation',
    },
    {
      title: 'Missing Money Matters',
      services: ['SQL Investigation', 'SQLite', 'MongoDB', 'Python'],
      img: 'images/portfolio/project-missing-money-art.jpg',
      thumb: 'images/portfolio/project-missing-money-art.jpg',
      link: 'https://github.com/nmn-pandey/Missing-Money-Matters',
    },
    {
      title: 'Dialogue Insights AI',
      services: ['Whisper ASR', 'Speaker Diarization', 'LLM Topic Modeling', 'FastAPI'],
      img: 'images/portfolio/project-dialogue-art.jpg',
      thumb: 'images/portfolio/project-dialogue-art.jpg',
      link: 'https://github.com/nmn-pandey/dialogue-analyser',
    },
    {
      title: 'Vastra Fashion AI',
      services: ['CLIP Embeddings', 'Vector Search', 'Qdrant', 'Visual Recsys'],
      img: 'images/portfolio/project-vastra-art.jpg',
      thumb: 'images/portfolio/project-vastra-art.jpg',
      link: 'https://getvastra.web.app/',
    },
    {
      title: 'Fortune 1000 Diversity',
      services: ['Statistical ETL', 'D3.js', 'Choropleths', 'Tableau'],
      img: 'images/portfolio/project-fortune-1000-art.jpg',
      thumb: 'images/portfolio/project-fortune-1000-art.jpg',
      link: 'https://github.com/nmn-pandey/fortune-1000-companies-analysis',
    },
    {
      title: 'Student Dropout Prediction',
      services: ['Machine Learning', 'Python & R', '5-fold Validation', 'Neural Networks'],
      img: 'images/portfolio/project-student-dropout-art.jpg',
      thumb: 'images/portfolio/project-student-dropout-art.jpg',
      link: 'https://github.com/nmn-pandey/student-dropout-prediction',
    },
  ];

  function initShowcase() {
    var section = $('#showcase');
    if (!section) return;
    var blend = $('.styles_showcase_mobile_blend__oTTDN', section);
    var blendBottom = $('.styles_showcase_mobile_blend_bottom__HdAzD', section);
    // progress lines (unique to the blend top copy)
    var lines = $$('.styles_progress_line__T_uew', section);
    // titles / services / pagination: real copy lives in the blend bottom (ghost copy is opacity:0)
    var titles = $$('.styles_contents_title__RHTMI', blendBottom || section);
    var serviceStacks = $$('.styles_contents_services__jFOGT', blendBottom || section);
    var pagination = $$('.styles_pagination_btn__3W6do', blendBottom || section);
    var paginationNav = $('.styles_pagination__pyG7t', blendBottom || section);
    // image track + thumb buttons: content copy
    var track = $('.styles_images_track__dMjPr', section);
    var slides = track ? $$(':scope > *', track) : [];
    var itemBtns = $$('.styles_progress_item__zLLQX', section);

    var count = SHOWCASE.length;
    var current = 0;
    var isAnimating = false;

    if (blendBottom) blendBottom.removeAttribute('aria-hidden');
    if (paginationNav) paginationNav.removeAttribute('aria-hidden');
    $$('.styles_pagination_ghost__xzdGI', section).forEach(function (nav) {
      nav.setAttribute('aria-hidden', 'true');
      $$('a, button', nav).forEach(function (control) { control.tabIndex = -1; });
    });

    titles = titles.map(function (title, index) {
      var link = document.createElement('a');
      Array.prototype.slice.call(title.attributes).forEach(function (attribute) { link.setAttribute(attribute.name, attribute.value); });
      link.href = SHOWCASE[index].link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = SHOWCASE[index].title;
      title.replaceWith(link);
      return link;
    });
    serviceStacks.forEach(function (stack, index) {
      stack.innerHTML = SHOWCASE[index].services.map(function (service) {
        return '<span class="styles_contents_services_item__BYxZV">' + service + '</span>';
      }).join('');
    });
    $$('.styles_pagination_link__Ly4dt', section).forEach(function (link) {
      link.href = GITHUB_PROFILE;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
    itemBtns.forEach(function (button, index) {
      var image = $('img', button);
      if (image) {
        image.alt = SHOWCASE[index].title;
        image.src = SHOWCASE[index].thumb;
        image.removeAttribute('srcset');
        image.removeAttribute('sizes');
      }
    });
    slides.forEach(function (slide, index) {
      var image = $('img', slide);
      var link = $('a', slide);
      if (link) {
        link.href = SHOWCASE[index].link;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', 'Open ' + SHOWCASE[index].title);
      }
      if (image) {
        image.alt = SHOWCASE[index].title;
        image.src = SHOWCASE[index].img;
        image.removeAttribute('srcset');
        image.removeAttribute('sizes');
      }
    });

    function getGap() {
      var w = window.getComputedStyle(track).getPropertyValue('--slide-gap');
      return parseFloat(w) || 1.6;
    }
    function getSlideWidth() {
      if (!slides.length) return 0;
      return slides[0].offsetWidth;
    }

    function updatePaginationState() {
      if (pagination.length !== 2) return;
      pagination[0].disabled = current === 0;
      pagination[1].disabled = current === count - 1;
      pagination[0].setAttribute('aria-disabled', pagination[0].disabled ? 'true' : 'false');
      pagination[1].setAttribute('aria-disabled', pagination[1].disabled ? 'true' : 'false');
    }

    function goTo(i, animate) {
      if (isAnimating) return;
      i = (i + count) % count;
      if (i === current) return;
      current = i;

      // lines
      lines.forEach(function (line, idx) {
        if (idx === current) line.classList.add('styles_progress_line__active__NDkQr');
        else line.classList.remove('styles_progress_line__active__NDkQr');
      });
      // thumbs
      itemBtns.forEach(function (b, idx) {
        if (idx === current) b.setAttribute('aria-current', 'true');
        else b.removeAttribute('aria-current');
      });
      // titles
      titles.forEach(function (t, idx) {
        if (idx === current) t.classList.add('styles_contents_title__active__EswSD');
        else t.classList.remove('styles_contents_title__active__EswSD');
        t.setAttribute('aria-hidden', idx === current ? 'false' : 'true');
      });
      // services
      serviceStacks.forEach(function (s, idx) {
        if (idx === current) s.classList.add('styles_contents_services__active__hcCuS');
        else s.classList.remove('styles_contents_services__active__hcCuS');
        s.setAttribute('aria-hidden', idx === current ? 'false' : 'true');
      });
      // image track
      if (track && slides.length) {
        var offset = current * (getSlideWidth() + getGap());
        gsap.to(track, { x: -offset, duration: animate === false ? 0 : 1, ease: 'power4.out' });
      }
      updatePaginationState();
    }

    // prev/next pagination buttons
    if (pagination.length === 2) {
      pagination[0].addEventListener('click', function () { goTo(current - 1); });
      pagination[1].addEventListener('click', function () { goTo(current + 1); });
      updatePaginationState();
    }
    // thumb buttons
    itemBtns.forEach(function (b, idx) {
      b.addEventListener('click', function () { goTo(idx); });
    });

    window.addEventListener('resize', function () {
      // re-align track
      if (track && slides.length) {
        var offset = current * (getSlideWidth() + getGap());
        gsap.set(track, { x: -offset });
      }
    });

    // keyboard
    document.addEventListener('keydown', function (e) {
      var inShowcase = $('#showcase');
      if (!inShowcase) return;
      var r = inShowcase.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        if (e.key === 'ArrowRight') goTo(current + 1);
        if (e.key === 'ArrowLeft') goTo(current - 1);
      }
    });
  }

  /* =========================================================
   * 8. DESKTOP SHOWCASE — build the client-rendered carousel
   * ========================================================= */
  function buildDesktopShowcase() {
    var section = $('#showcase');
    if (!section) return;
    var mobileEl = $('.styles_showcase_mobile__kq7wh', section);
    if (mobileEl) mobileEl.style.display = 'none';

    var titleLines = [
      ['Enhancing Brain', 'Tumour Segmentation', 'using Transformers'],
      ['Missing Money', 'Matters'],
      ['Dialogue', 'Insights AI'],
      ['Vastra', 'Fashion AI'],
      ['Fortune 1000', 'Diversity'],
      ['Student Dropout', 'Prediction'],
    ];
    var wrap = document.createElement('div');
    wrap.className = 'Showcase_showcase__7o16T portfolio-showcase-source';
    wrap.style.setProperty('--total-items', SHOWCASE.length);

    var mediaLayer = document.createElement('div');
    mediaLayer.className = 'Showcase_showcase_content__aucYY';
    var mediaFrame = document.createElement('div');
    mediaFrame.className = 'portfolio-showcase-media';
    SHOWCASE.forEach(function (project, index) {
      var image = document.createElement('img');
      image.src = project.img;
      image.alt = project.title;
      image.loading = index === 0 ? 'eager' : 'lazy';
      image.setAttribute('data-showcase-media', index);
      if (index !== 0) image.setAttribute('aria-hidden', 'true');
      mediaFrame.appendChild(image);
    });
    var mediaLink = document.createElement('a');
    mediaLink.className = 'portfolio-showcase-media-link';
    mediaLink.target = '_blank';
    mediaLink.rel = 'noopener noreferrer';
    mediaFrame.appendChild(mediaLink);
    mediaLayer.appendChild(mediaFrame);

    var navigationLayer = document.createElement('div');
    navigationLayer.className = 'Showcase_showcase_content__aucYY';
    var navigationFade = document.createElement('div');
    navigationFade.className = 'Showcase_contentFade__zHY57';
    var slider = document.createElement('div');
    slider.className = 'Showcase_showcase_sliderIndicator__RVWFR';
    slider.innerHTML = '<div class="Showcase_showcase_sliderIndicator_indicator__eogv4" aria-hidden="true"></div>';
    var slides = document.createElement('div');
    slides.className = 'Showcase_showcase_sliderIndicator_slides__oxTgm';
    SHOWCASE.forEach(function (project, index) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'Showcase_showcase_sliderIndicator_slides_slide__WjOxM';
      button.setAttribute('aria-label', 'Go to project ' + (index + 1) + ' of ' + SHOWCASE.length);
      button.setAttribute('data-showcase-index', index);
      button.innerHTML = '<img alt="' + project.title + '" src="' + project.thumb + '"/>';
      slides.appendChild(button);
    });
    slider.appendChild(slides);
    navigationFade.appendChild(slider);
    navigationLayer.appendChild(navigationFade);

    var typographyLayer = document.createElement('div');
    typographyLayer.className = 'Showcase_showcase_content__aucYY';
    var typographyFade = document.createElement('div');
    typographyFade.className = 'Showcase_contentFade__zHY57';
    var names = document.createElement('div');
    names.className = 'Showcase_showcase_names__BYqrV';
    SHOWCASE.forEach(function (project, index) {
      var heading = document.createElement('h4');
      heading.className = 'Showcase_showcase_names_name__FCuyU';
      heading.setAttribute('data-showcase-copy', index);
      var projectLink = document.createElement('a');
      projectLink.href = project.link;
      projectLink.target = '_blank';
      projectLink.rel = 'noopener noreferrer';
      projectLink.setAttribute('aria-label', 'Open ' + project.title);
      projectLink.innerHTML = titleLines[index].map(function (line) {
        return '<span class="line">' + line.split(' ').map(function (word) { return '<span class="word">' + word + '</span>'; }).join(' ') + '</span>';
      }).join('');
      heading.appendChild(projectLink);
      names.appendChild(heading);
    });
    typographyFade.appendChild(names);

    var services = document.createElement('div');
    services.className = 'Showcase_showcase_servicesProvided__YwRyH';
    SHOWCASE.forEach(function (project, index) {
      var list = document.createElement('ul');
      list.className = 'Showcase_showcase_servicesProvided_services__JBldC';
      list.setAttribute('data-showcase-services', index);
      list.innerHTML = project.services.map(function (service) {
        return '<li><span class="line-mask"><span class="line">' + service + '</span></span></li>';
      }).join('');
      services.appendChild(list);
    });
    typographyFade.appendChild(services);

    var progress = document.createElement('div');
    progress.className = 'Showcase_showcase_sliderIndicator__RVWFR Showcase_none__b5aiJ';
    progress.innerHTML = '<div class="Showcase_showcase_sliderIndicator_indicator__eogv4" aria-hidden="true"></div>';
    typographyFade.appendChild(progress);
    var sectionIndex = document.createElement('div');
    sectionIndex.className = 'Showcase_showcase_index__Tmzrv';
    sectionIndex.innerHTML = '<div class="SectionIndex_sectionIndex__qXUaC"><span data-number="true">3</span><span data-separator="true"></span><span data-title="Selected Projects">Selected Projects</span></div>';
    typographyFade.appendChild(sectionIndex);
    typographyLayer.appendChild(typographyFade);

    var controlsFade = document.createElement('div');
    controlsFade.className = 'Showcase_contentFade__zHY57';
    controlsFade.innerHTML = '<div class="Showcase_showcase_viewAll__JG5kw"><a class="Showcase_showcase_viewAll_link__G_KDT common-link-effect" href="' + GITHUB_PROFILE + '" target="_blank" rel="noopener noreferrer">View all projects</a></div>' +
      '<nav class="Showcase_showcase_carouselNav__npBxy" aria-label="Showcase carousel"><button type="button" class="Showcase_showcase_carouselNav_btn__xwzm8" data-showcase-prev aria-label="Previous project">←</button><button type="button" class="Showcase_showcase_carouselNav_btn__xwzm8" data-showcase-next aria-label="Next project">→</button></nav>';
    typographyLayer.appendChild(controlsFade);

    wrap.appendChild(mediaLayer);
    wrap.appendChild(navigationLayer);
    wrap.appendChild(typographyLayer);
    section.appendChild(wrap);

    var media = $$('[data-showcase-media]', wrap);
    var copies = $$('[data-showcase-copy]', wrap);
    var serviceLists = $$('[data-showcase-services]', wrap);
    var slideButtons = $$('[data-showcase-index]', wrap);
    var current = -1;

    function setIndex(index, immediate) {
      index = Math.max(0, Math.min(SHOWCASE.length - 1, index));
      if (index === current) return;
      current = index;
      mediaLink.href = SHOWCASE[index].link;
      mediaLink.setAttribute('aria-label', 'Open ' + SHOWCASE[index].title);
      wrap.style.setProperty('--active-project-index', index);
      media.forEach(function (image, i) {
        image.setAttribute('aria-hidden', i === index ? 'false' : 'true');
        gsap.to(image, { opacity: i === index ? 1 : 0, filter: i === index ? 'blur(0px)' : 'blur(14px)', scale: i === index ? 1 : 1.035, duration: immediate ? 0 : 1.4, ease: 'power3.out' });
      });
      copies.forEach(function (copy, i) {
        copy.classList.toggle('is-active', i === index);
        gsap.to(copy, { opacity: i === index ? 1 : 0, filter: i === index ? 'blur(0px)' : 'blur(10px)', visibility: i === index ? 'visible' : 'hidden', duration: immediate ? 0 : 1.1, ease: 'power3.out' });
      });
      serviceLists.forEach(function (list, i) {
        gsap.to(list, { opacity: i === index ? 1 : 0, filter: i === index ? 'blur(0px)' : 'blur(8px)', visibility: i === index ? 'visible' : 'hidden', duration: immediate ? 0 : 1, ease: 'power3.out' });
      });
      slideButtons.forEach(function (button, i) {
        button.setAttribute('aria-current', i === index ? 'true' : 'false');
        gsap.to(button, { opacity: i === index ? 1 : 0.28, duration: 0.45, ease: 'power2.out' });
      });
    }

    function scrollToIndex(index) {
      var top = wrap.getBoundingClientRect().top + window.scrollY + index * window.innerHeight;
      lenis.scrollTo(top, { duration: 1.2, force: true });
    }

    slideButtons.forEach(function (button, index) { button.addEventListener('click', function () { scrollToIndex(index); }); });
    $('[data-showcase-prev]', wrap).addEventListener('click', function () { scrollToIndex(Math.max(0, current - 1)); });
    $('[data-showcase-next]', wrap).addEventListener('click', function () { scrollToIndex(Math.min(SHOWCASE.length - 1, current + 1)); });

    ScrollTrigger.create({
      trigger: wrap,
      start: 'top top-=25%',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: function (self) {
        setIndex(Math.round(self.progress * (SHOWCASE.length - 1)));
      },
    });
    setIndex(0, true);
  }

  /* =========================================================
   * 9. COLLABORATIONS — floating preview follower
   * ========================================================= */
  function initCollaborations() {
    var section = $('#collaborations');
    var wrapper = $('.Collaborations_collaborations__ZmUpq', section);
    var content = $('.Collaborations_collaborations_content__EaZA6', section);
    var description = $('.experience-arc-description', section);
    var arcItems = $$('.Collaborations_collaborations_content_arc_item__ihb0E', section);
    var mobileItems = $$('.experience-company-button', section);
    if (!section || !wrapper || !content || !description || !arcItems.length) return;
    var current = -1;

    function setCompany(index, immediate) {
      index = Math.max(0, Math.min(COMPANY_EXPERIENCE.length - 1, index));
      if (index === current) return;
      current = index;
      var item = COMPANY_EXPERIENCE[index];
      arcItems.forEach(function (arcItem, i) { arcItem.classList.toggle('Collaborations_active__Vdo0O', i <= index); });
      mobileItems.forEach(function (button, i) {
        button.classList.toggle('is-active', i === index);
        button.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
      var next = '<p class="experience-arc-period">' + item.period + '</p><h3>' + item.company + '</h3><p class="experience-arc-role">' + item.role + '</p><p class="experience-arc-summary">' + item.description + '</p><ul>' + item.achievements.map(function (achievement) { return '<li>' + achievement + '</li>'; }).join('') + '</ul>';
      if (immediate) description.innerHTML = next;
      else gsap.to(description, { opacity: 0, filter: 'blur(8px)', y: -8, duration: 0.28, ease: 'power2.in', onComplete: function () {
        description.innerHTML = next;
        gsap.fromTo(description, { opacity: 0, filter: 'blur(8px)', y: 8 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.7, ease: 'power3.out' });
      } });
    }

    mobileItems.forEach(function (button, index) {
      button.addEventListener('click', function () { setCompany(index); });
    });

    ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: function (self) {
        var progress = Math.max(0, Math.min(1, self.progress));
        content.style.setProperty('--progress', progress.toFixed(4));
        setCompany(Math.floor(progress * COMPANY_EXPERIENCE.length));
      },
    });
    setCompany(0, true);
  }

  /* =========================================================
   * 10. AWARDS — sticky cards rotate on scroll
   *     (drives --awards-progress, --card-index)
   * ========================================================= */
  function initAwards() {
    var section = $('#awards');
    var cards = $$('.Awards_awards_item__wrbdK', section);
    if (!section || !cards.length) return;
    cards.forEach(function (c, i) { c.style.setProperty('--card-index', i); });
    var last = cards.length - 1;
    section.style.setProperty('--awards-last-index', last);

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: function (self) {
        section.style.setProperty('--awards-progress', self.progress.toFixed(3));
        if (section.portfolioSetActiveProfile) {
          section.portfolioSetActiveProfile(Math.round(self.progress * last));
        }
      },
    });
    if (section.portfolioSetActiveProfile) section.portfolioSetActiveProfile(0);
  }

  /* =========================================================
   * 11. FOOTER — analog clocks + slogan word cycling
   * ========================================================= */
  function initFooter() {
    // Analog clocks: hour/minute hands rotate
    var clocks = $$('.Footer_footer_container_top_right_item_branch_clock__s2_LJ');
    if (clocks.length) {
      var zones = ['Europe/London', 'Asia/Kolkata', 'UTC'];
      function tick() {
        var now = new Date();
        clocks.forEach(function (clock, i) {
          var tz = zones[i] || 'UTC';
          var parts = new Intl.DateTimeFormat('en-GB', {
            timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
          }).formatToParts(now);
          var get = function (type) {
            var f = parts.find(function (p) { return p.type === type; });
            return f ? parseInt(f.value, 10) : 0;
          };
          var h = get('hour') % 12;
          var m = get('minute');
          var s = get('second');
          var hourHand = $('.Footer_footer_container_top_right_item_branch_clock_hand__hour__Xz83c', clock);
          var minHand = $('.Footer_footer_container_top_right_item_branch_clock_hand__minute__zHglh', clock);
          if (hourHand) hourHand.style.transform = 'rotate(' + (h * 30 + m * 0.5) + 'deg)';
          if (minHand) minHand.style.transform = 'rotate(' + (m * 6 + s * 0.1) + 'deg)';
        });
      }
      tick();
      setInterval(tick, 1000);
    }

    // Slogan word cycling
    var words = $$('.Footer_footer_container_top_left_slogan_words__ZH_wt > span');
    if (words.length) {
      var idx = 0;
      setInterval(function () {
        var from = words[idx];
        idx = (idx + 1) % words.length;
        var to = words[idx];
        gsap.fromTo(from, { yPercent: 0, opacity: 1 }, { yPercent: -100, opacity: 0, duration: 0.7, ease: 'power3.inOut' });
        gsap.fromTo(to, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.7, ease: 'power3.inOut' });
      }, 2600);
    }
  }

  /* =========================================================
   * 13. SCROLL PROGRESS + SCROLL INDICATOR
   * ========================================================= */
  function initScrollProgress() {
    var bar = $('.ScrollProgress_scrollProgress_bar__45J4L');
    var indicatorBar = $('.ScrollIndicator_indicator_bar__XYdQu');
    ScrollTrigger.create({
      start: 0,
      end: function () { return document.documentElement.scrollHeight - window.innerHeight; },
      onUpdate: function (self) {
        if (bar) bar.style.setProperty('--progress', self.progress.toFixed(4));
        if (indicatorBar) indicatorBar.style.setProperty('--progress', self.progress.toFixed(4));
      },
    });
  }

  /* =========================================================
   * 14. SECTION DETECTOR + SECTION INDICATOR (right side)
   * ========================================================= */
  function initSectionDetector() {
    var indicator = $('.SectionIndicator_sectionIndicator___FhP9');
    if (!indicator) return;
    var sectionIds = ['about', 'skills', 'showcase', 'collaborations', 'what_we_do', 'awards'];
    var sections = sectionIds.map(function (id) { return $('#' + id); }).filter(Boolean);
    var content = $('.SectionIndicator_sectionIndicator_content__iFSv_', indicator);
    var indexColumn = $('.SectionIndicator_sectionIndicator_content_indexes__SpTTG', indicator);
    var nameColumn = $('.SectionIndicator_sectionIndicator_content_names__j1bpl', indicator);
    if (!content || !indexColumn || !nameColumn) return;

    indexColumn.innerHTML = '';
    nameColumn.innerHTML = '';
    var indexButtons = [];
    var nameItems = [];

    sections.forEach(function (section, index) {
      var name = SECTION_LABELS[section.id] || section.id;
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'SectionIndicator_sectionIndicator_content_indexes_index__ufLZ_';
      button.textContent = index + 1;
      button.setAttribute('aria-label', 'Scroll to section ' + (index + 1) + ': ' + name);
      button.addEventListener('click', function () { lenis.scrollTo(section, { duration: 1.5, force: true }); });
      indexColumn.appendChild(button);
      indexButtons.push(button);

      var label = document.createElement('p');
      label.className = 'SectionIndicator_sectionIndicator_content_names_name__cn4Sf';
      label.textContent = name;
      nameColumn.appendChild(label);
      nameItems.push(label);
    });

    function opacityFor(distance) {
      var stops = [1, 0.32, 0.24, 0.16, 0.08];
      var lower = Math.floor(distance);
      var upper = Math.ceil(distance);
      var from = stops[lower] == null ? stops[stops.length - 1] : stops[lower];
      var to = stops[upper] == null ? stops[stops.length - 1] : stops[upper];
      return from + (to - from) * (distance - lower);
    }

    function updateLegend() {
      var active = 0;
      sections.forEach(function (section, index) {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) active = index;
      });
      var rect = sections[active].getBoundingClientRect();
      var scrollable = Math.max(1, rect.height - window.innerHeight);
      var progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      var nextRect = sections[active + 1] ? sections[active + 1].getBoundingClientRect() : null;
      var transition = nextRect ? Math.max(0, Math.min(1, (window.innerHeight * 0.6 - nextRect.top) / (window.innerHeight * 0.25))) : 0;
      var position = active + transition;
      var remappedProgress = transition;
      var namePosition = position;
      content.style.setProperty('--current', String(active + 1));
      content.style.setProperty('--progress', progress.toFixed(4));
      content.style.setProperty('--progress-remapped', remappedProgress.toFixed(4));

      var first = indexButtons[0];
      var gap = first ? parseFloat(getComputedStyle(indexColumn).gap) || 0 : 0;
      var step = first ? first.offsetHeight + gap : 0;
      var transform = 'translateY(' + (-step * position) + 'px) translateZ(0)';
      indexButtons.forEach(function (button, index) {
        button.style.transform = transform;
        button.style.opacity = opacityFor(Math.abs(index - position)).toFixed(3);
      });
      nameItems.forEach(function (label, index) {
        label.style.opacity = opacityFor(Math.abs(index - namePosition)).toFixed(3);
      });
    }

    ScrollTrigger.create({
      start: 0,
      end: function () { return document.documentElement.scrollHeight - window.innerHeight; },
      onUpdate: updateLegend,
    });
    updateLegend();
  }

  /* =========================================================
   * 15. SCROLL REVEALS (section headers etc.)
   * ========================================================= */
  function initReveals() {
    $$('.About_about_primaryTitle__XVHYr h2, .WhatWeDo_whatWeDo_content_item__ygj3S, .portfolio-skills-group, .Footer_footer_container_top_left_slogan__B_mgI').forEach(function (el, i) {
      gsap.fromTo(el,
        { yPercent: 40, opacity: 0 },
        {
          yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        });
    });
  }

  /* =========================================================
   * BOOT
   * ========================================================= */
  function boot() {
    addAmbientGradient();
    restructureVisibleSections();
    applyPortfolioContent();
    adaptEducationSection();
    adaptCollaborationsSection();
    adaptProfilesSection();
    initLoader();
    initHeroWords();
    initTextRollovers();
    initHeaderHide();
    initContextualHeaderAction();
    initMenu();
    initShowcase();
    if (isDesktop.matches) {
      buildDesktopShowcase();
    }
    initCollaborations();
    initAwards();
    initSkills();
    initFooter();
    initScrollProgress();
    initSectionDetector();
    initReveals();

    ScrollTrigger.refresh();

    // reload on breakpoint crossing
    isDesktop.addEventListener('change', function () {
      window.location.reload();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
