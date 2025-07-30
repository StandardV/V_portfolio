// SMOOTH SCROLL ON NAVBAR
document.querySelectorAll('nav a.nav-link').forEach(function(link){
  link.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(href && href.startsWith('#')){
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        // Offset for fixed navbar
        const navHeight = document.querySelector('nav').offsetHeight + 5;
        // Compute document height to not scroll past bottom
        const documentHeight = Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight
        );
        const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight;
        const maxY = documentHeight - window.innerHeight;
        window.scrollTo({
          top: Math.min(targetY, maxY),
          behavior: 'smooth'
        });
      }
    }
  });
});

// ACTIVATE NAV ITEM BY SCROLL POSITION (bottom fix)
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  function activateNav() {
    let maxPercent = 0, activeIndex = 0;
    const viewportTop = window.scrollY;
    const viewportBottom = viewportTop + window.innerHeight;

    sections.forEach((section, i) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = viewportTop + rect.top;
      const sectionBottom = viewportTop + rect.bottom;
      const visibleTop = Math.max(sectionTop, viewportTop);
      const visibleBottom = Math.min(sectionBottom, viewportBottom);
      const visible = Math.max(0, visibleBottom - visibleTop);
      const percentVisible = visible / rect.height;

      if (percentVisible > maxPercent) {
        maxPercent = percentVisible;
        activeIndex = i;
      }
    });

    navLinks.forEach(link => link.classList.remove('active'));
    if (navLinks[activeIndex]) {
      navLinks[activeIndex].classList.add('active');
    }
  }
  activateNav();
  window.addEventListener('scroll', activateNav);

  // section-content fade in on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, {threshold:.25});
  document.querySelectorAll('.section-content').forEach(el => observer.observe(el));
});

// FORM SUBMIT HANDLER
function handleSubmit(e) {
  e.preventDefault();
  alert('Thank you! Your message has been received.');
  e.target.reset();
}

// TYPING EFFECT FOR INTRO
function typeWriter(element, text, speed = 90) {
  let i = 0; element.innerHTML = '';
  function type() {
    if(i < text.length){
      element.innerHTML += text.charAt(i);
      i++; setTimeout(type, speed);
    }
  }
  type();
}
window.addEventListener('load', function() {
  const el = document.querySelector('#typedName');
  if(el) typeWriter(el, el.textContent, 110);
});

//////////////////////////////////////////////////
// PROJECT MODAL LOGIC
//TODO: future integration -- maybe change these into json for sever fetch for additional projects?
//TODO: multi media support (video, image, etc) for each project (ideally scrollable or dynamic)
const PROJECTS = [
  {
    title: "Automated Job Application Assistant",
    mediaType: "video",
    media: "service_files/ite_apply.mp4",
    poster: "service_files/holacoco.png",
    previewTime: 6,
    tech: [
      "CustomTkinter", "Python", "SVM", "KNN", "Machine Learning", "Web Parsing", "Automation"
    ],
    links: [
      { label: "GitHub", url: "https://github.com/StandardV/ITEApplication" },
      { label: "Docs", url: "https://github.com/StandardV/ITEApplication/blob/main/README.md" }
    ],
    desc: `A desktop app that drastically streamlines job applications:<ul>
      <li>Type a company name to save or select it—no repetitive Googling or career site navigation</li>
      <li>One click: automatically navigates you to the correct company career page using ML & web parsing (SVM/KNN models)</li>
      <li>Simulates reapply cool-downs by toggling active targets off after a set time</li>
      <li>Integrates with extensions that auto-fill job forms for rapid batch applications</li>
    </ul>`,
    highlights: [
      "Saves significant time by automating the discovery of company career pages",
      "Leverages machine learning (SVM/KNN) to identify correct results through web parsing and Google link analysis",
      "Built with CustomTkinter for a modern desktop interface",
      "Intelligent cooldown system prevents accidental re-applications",
      "Designed for seamless integration with auto-fill browser extensions"
    ]
  },
  {
    title: "OverEngineered Smart Light Switch",
    mediaType: "video",
    media: "service_files/automatic_lightswitch.mp4",
    poster: "service_files/holacoco.png",
    previewTime: 3,
    tech: ["C", "Python", "Arduino", "Raspberry Pi", "IoT"],
    links: [
      { label: "GitHub", url: "https://github.com/StandardV/ITEApplication" }
    ],
    desc: `Created a smart light switch using a blend of embedded and IoT tech:<ul>
      <li>Raspberry Pi, Arduino, and actuator for remote smart switching</li>
      <li>Custom PCB; hand-built for deep hardware experience</li>
      <li>Seamless integration with leading home assistants</li>
    </ul>`,
    highlights: [
      "Combined multiple microcontroller systems",
      "Enhanced voice and manual control for reliability",
      "DIY approach for hardware/software learning"
    ]
  },
  {
    title: "Wireline Simulator System",
    mediaType: "image",
    media: "service_files/wireline_simulator.jpg", // mock image
    tech: ["C", "Firmware", "Embedded", "Microcontrollers"],
    links: [
      { label: "Demo", url: "#" },
      { label: "Documentation", url: "#" }
    ],
    desc: `Engineered a wireline simulator system for downhole tool testing:<ul>
      <li>Low-level firmware and control logic simulating wireline characteristics</li>
      <li>Power regulator interface firmware (1kV) for system efficiency/protection</li>
      <li>Resolved a critical, time-sensitive bug to maintain production schedule</li>
    </ul>`,
    highlights: [
      "Delivered reliable test tool for production environment",
      "Designed robust diagnostic and recovery mechanisms",
      "Improved accuracy of hardware-in-the-loop simulation"
    ]
    },
    {
    title: "IoT-Controlled Christmas Lighting System",
    mediaType: "video",
    media: "service_files/christmas_light.mp4",
    poster: "service_files/holacoco.png",
    previewTime: 3,
    tech: ["Python", "Bash", "Flask", "HTML", "CSS", "Raspberry Pi", "WiFi Networking"],
    links: [
      { label: "GitHub", url: "https://github.com/StandardV/ITEApplication" },
      { label: "Demo", url: "#" }
    ],
    desc: `Engineered an interactive Christmas lighting solution powered by a Raspberry Pi:<ul>
      <li>Remotely controls 24 outlets (3 × 8-relay banks) for dynamic holiday displays</li>
      <li>Designed and deployed a Flask web app—accessible via a dedicated WiFi access point hosted by the Pi—enabling users to select and customize lighting patterns and blink frequencies in real-time</li>
      <li>Flexible system architecture with full browser-based control, requiring no software installs for end users</li>
      <li>Built with reliability and ease-of-use in mind, using Python and Bash scripts for backend automation and GPIO relay management</li>
    </ul>`,
    highlights: [
      "Web-based user interface for instant lighting customization via local network",
      "Supports unlimited blink patterns and frequency control, adaptable to any event or season",
      "Turnkey WiFi AP setup on Raspberry Pi ensures simple, barrier-free access for users without network configuration",
      "Robust, maintainable codebase leveraging Python for hardware control and Flask for web delivery",
      "Showcases practical IoT integration, full-stack development, and real-world hardware automation experience"
    ]
  },
  {
    title: "WiFi/Bluetooth Radio Firmware",
    mediaType: "image",
    media: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80", // mock image
    tech: ["C", "Firmware", "WiFi", "Bluetooth", "Diagnostics"],
    links: [
      { label: "Product", url: "#" },
      { label: "Docs", url: "#" }
    ],
    desc: `Developed and integrated advanced wireless drivers for commercial device:<ul>
      <li>WiFi, Bluetooth and radio stack implementation</li>
      <li>Comprehensive device bring-up and testing procedures</li>
      <li>Production troubleshooting with manufacturers for robust deployment</li>
    </ul>`,
    highlights: [
      "Reduced production downtime through effective diagnostics",
      "Ensured reliable device communication and connectivity",
      "Created detailed SOPs for hardware/software handoff"
    ]
  },
  {
    title: "Smart Home Assistant",
    mediaType: "video",
    media: "service_files/smart_assistant.mp4",
    poster: "service_files/holacoco.png",
    previewTime: 3,
    tech: ["C#", "Python", "JavaScript", "OpenAL", "Porcupine", "Raspberry Pi", "Django"],
    links: [
      { label: "GitHub", url: "https://github.com/StandardV?tab=repositories" }
    ],
    desc: `Designed a full stack smart home assistant, enabling:<ul>
      <li>Voice and web-based interface for device control (ASP.NET WinForms, Django)</li>
      <li>Keyword recognition and natural language processing for responsiveness</li>
      <li>Multi-system connectivity via custom hardware/software integration</li>
    </ul>`,
    highlights: [
      "Integrated advanced voice keyword detection (Porcupine-style)",
      "Extended with robust fallback web interface for accessibility",
      "End-to-end home automation workflow"
    ]
  },
  {
    title: "Methane Gas Sensor Web App",
    mediaType: "image",
    media: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // mock image
    tech: ["Django", "JavaScript", "PostgreSQL", "Python", "C", "Bash"],
    links: [
      { label: "Github", url: "https://github.com/StandardV/ITEApplication" },
      { label: "Demo", url: "#" }
    ],
    desc: `Developed a real-time monitoring solution for methane gas sensors, featuring:<ul>
      <li>Custom device driver for accurate gas concentration measurement</li>
      <li>Automated PCB diagnosis prototype for rapid testing/fault detection</li>
      <li>Full-stack web interface for data visualization and device management</li>
    </ul>`,
    highlights: [
      "Seamless hardware-software integration using automation scripts",
      "Improved field testing speed and accuracy",
      "Robust cross-language hardware abstraction (C, Python, Bash)"
    ]
  },
];


const modal = document.getElementById('project-modal');
const modalOverlay = modal && modal.querySelector('.modal-overlay');
const modalContent = modal && modal.querySelector('.modal-content');
const modalBody = modal && modal.querySelector('.modal-body');
const modalClose = modal && modal.querySelector('.modal-close');

// Modal open/close handling will be re-added automatically per render (see pagination code below)

function showProjectModal(pid){
  if(!modal || !modalBody) return;
  const data = PROJECTS[pid];
  if(!data) return;
  // Build media
  let mediaHTML = '';
  if(data.mediaType === "video") {
    mediaHTML = `<video src="${data.media}" poster="${data.poster || ''}" controls autoplay muted playsinline loop preload="auto" style="max-width:100%;border-radius:11px"></video>`;
  } else if(data.mediaType === "image") {
    mediaHTML = `<img 
      src="${data.media}" 
      alt="${data.title} Screenshot" 
      class="modal-fullscreen-img"
      style="cursor:zoom-in"
    />`;
  }
  // Build tech
  let techTags = data.tech.map(t => `<span class="modal-tag">${t}</span>`).join('');
  // Build links
  let links = (data.links||[]).map(link => `<a href="${link.url}" target="_blank" class="modal-link-btn">${link.label}</a>`).join('');
  // Highlights
  let highlights = "";
  if(data.highlights && data.highlights.length){
    highlights = `<div class="modal-section-title">Highlights</div>
      <ul style="margin-left:1em;line-height:1.5;font-size:0.99em">
        ${data.highlights.map(line=>`<li>${line}</li>`).join('')}
      </ul>`;
  }
  // HTML
  modalBody.innerHTML = `
    ${mediaHTML}
    <div class="modal-title">${data.title}</div>
    <div class="modal-section-title">Tech</div>
    <div class="modal-tags">${techTags}</div>
    <div class="modal-section-title">Description</div>
    <div class="modal-desc">${data.desc}</div>
    ${highlights}
    <div class="modal-links">${links}</div>
  `;
  const modalImg = modalBody.querySelector('.modal-fullscreen-img');
  if (modalImg) {
    modalImg.addEventListener('click', function() {
      // Fullscreen API request
      if (modalImg.requestFullscreen) {
        modalImg.requestFullscreen();
      } else if (modalImg.webkitRequestFullscreen) {
        modalImg.webkitRequestFullscreen();
      } else if (modalImg.mozRequestFullScreen) {
        modalImg.mozRequestFullScreen();
      } else if (modalImg.msRequestFullscreen) {
        modalImg.msRequestFullscreen();
      }
    });
  }
  modal.setAttribute("aria-hidden","false");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  // Accessibility: focus close
  setTimeout(()=>{ modalClose && modalClose.focus(); }, 10);
}
function closeModal(){
  if(!modal) return;
  // Pause any video playing in modal
  const video = modal.querySelector('video');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
  modal.setAttribute("aria-hidden","true");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}
if(modalOverlay) modalOverlay.addEventListener('click', closeModal);
if(modalClose) modalClose.addEventListener('click', closeModal);
window.addEventListener('keydown', function(e){
  if(e.key === "Escape" && modal.classList.contains('active')) closeModal();
});

//////////////////////////////////////////////////
// PROJECT VIDEO PREVIEW: SEEK + PLAY/PAUSE
function attachProjectVideoPreviews() {
  document.querySelectorAll('.project-preview-video').forEach(function(video) {
    const preview = Number(video.getAttribute('data-preview-time') || 0);

    // Seek to previewTime when loaded
    video.addEventListener('loadedmetadata', handleVideoPreview);
    if (video.readyState >= 1) {
      handleVideoPreview.call(video);
    }

    function handleVideoPreview() {
      const preview = Number(this.getAttribute('data-preview-time') || 0);
      if (!isNaN(preview) && preview >= 0 && preview < this.duration) {
        let seekedOnce = false;
        this.currentTime = preview;
        this.addEventListener('seeked', function seekHandler() {
          if (!seekedOnce) {
            this.pause();
            seekedOnce = true;
            this.removeEventListener('seeked', seekHandler);
          }
        });
      }
    }
    let do_once = 1;
    video.addEventListener('contextmenu', function(e){
      e.preventDefault();
    });
    video.removeAttribute('controls');
    const wrapper = video.closest('.project-thumbnail-wrap');
    video.addEventListener('click', function(e){
      if (video.paused) {
        if (do_once !== 0)
        {
          video.currentTime = 0;
          do_once -= 1;
        }
        video.play();
        wrapper.classList.add('playing');
      } else {
        video.pause();
        wrapper.classList.remove('playing');
      }
      e.stopPropagation();
    });
    // Update button state when video ends
    video.addEventListener('ended', function() {
      wrapper.classList.remove('playing');
    });
    video.pause();
  });
}

//////////////////////////////////////////////////
// --- BEGIN Featured Projects Pagination ---

const maxProjectsPerPage = 4;
let currentProjectsPage = 0;

const projectsGrid = document.querySelector('.projects-grid');
const prevBtn = document.getElementById('projects-prev-btn');
const nextBtn = document.getElementById('projects-next-btn');

function renderProjectsPage(page = 0) {
  if (!projectsGrid) return;

  // Clear grid
  projectsGrid.innerHTML = '';

  // Calculate which projects to show
  const start = page * maxProjectsPerPage;
  const end = Math.min(start + maxProjectsPerPage, PROJECTS.length);

  // Create cards
  for (let i = start; i < end; i++) {
    const data = PROJECTS[i];
    // Build card element
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-project-id', i);
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'More about ' + data.title);

    // Thumbnail
    let thumb = '';
    if (data.mediaType === 'video') {
      thumb = `<video
        class="project-preview-video"
        src="${data.media}"
        data-preview-time="${data.previewTime||0}"
        controls
        muted
        playsinline
        preload="auto"
        poster="${data.poster || ''}"
        ></video>`;
    }
     else if (data.mediaType === 'image') {
      thumb = `<img src="${data.media}" alt="${data.title}" />`;
    }

    // Skills/tech tags
    const tech = (data.tech || []).map(t => `<span class="skill-tag">${t}</span>`).join('');

    // Links
    const links = (data.links || []).map(
      l => `<a href="${l.url}" class="project-btn" target="_blank">${l.label}</a>`
    ).join('');

    // Card content
    card.innerHTML = `
      <div class="project-thumbnail-wrap">${thumb}</div>
      <div class="project-content">
        <h3>${data.title}</h3>
        <p>${(data.desc || '').replace(/<[^>]+>/g, '').split('\n')[0]}</p>
        <div class="skills">${tech}</div>
        <div class="project-links">${links}</div>
      </div>
    `;
    projectsGrid.appendChild(card);
  }

  // Modal listeners for new cards
  projectsGrid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e){
      if(e.target.closest('.project-preview-video') || e.target.closest('.project-links') || e.target.tagName === "A" || e.target.tagName === "BUTTON") return;
      const pid = Number(card.getAttribute('data-project-id'));
      showProjectModal(pid);
    });
    card.addEventListener('keydown', e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const pid = Number(card.getAttribute('data-project-id'));
        showProjectModal(pid);
      }
    });
  });

  attachProjectVideoPreviews();
  // Pagination arrows - never hide, just disable when needed
  const totalPages = Math.ceil(PROJECTS.length / maxProjectsPerPage);
  prevBtn.disabled = (page <= 0);
  nextBtn.disabled = (page >= totalPages-1);
}

if (prevBtn && nextBtn) {
  prevBtn.onclick = function() {
    if (currentProjectsPage > 0) {
      currentProjectsPage--;
      renderProjectsPage(currentProjectsPage);
    }
  };
  nextBtn.onclick = function() {
    const totalPages = Math.ceil(PROJECTS.length / maxProjectsPerPage);
    if (currentProjectsPage < totalPages-1) {
      currentProjectsPage++;
      renderProjectsPage(currentProjectsPage);
    }
  };
}

// Initial render
renderProjectsPage(0);

//////////////////////////////////////////////////
// END Featured Projects Pagination
