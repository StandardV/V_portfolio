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
    const scrollTop = window.scrollY;
    const navHeight = document.querySelector('nav').offsetHeight + 5;
    const windowBottom = window.scrollY + window.innerHeight;
    const documentHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    let index = sections.length;
    while(--index && scrollTop + navHeight + 1 < sections[index].offsetTop) {}
    navLinks.forEach(link => link.classList.remove('active'));
    if(documentHeight - windowBottom < 40) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[navLinks.length-1].classList.add('active');
    } else if(navLinks[index]) {
      navLinks[index].classList.add('active');
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

const PROJECTS = [
  {
    title: "E-Commerce Demo App",
    mediaType: "video",
    media: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg",
    previewTime: 3,
    tech: ["React", "Node.js", "Stripe"],
    links: [
      {label:"Live Demo", url:"#"},
      {label:"GitHub", url:"#"}
    ],
    desc: `A robust commerce web-app with features like user authentication, live payments, admin dashboard, responsive product catalog and reviews. <br>
    Scalable up to large traffic, full Node-based backend, and Stripe for payments. 
    <ul>
    <li>Full responsive layout, lightning fast</li>
    <li>Admin analytics with sales, users, inventory charts</li>
    <li>Automated email receipts and 2FA login</li>
    </ul>
    `,
    highlights: [
      "Deployed with Docker on AWS EC2 (auto-scale)", 
      "98/100 Lighthouse performance",
      "Extended sales reports (CSV export), customer review system"
    ]
  },
  {
    title: "Analytics Dashboard",
    mediaType: "image",
    media: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=400&q=80",
    tech: ["Vue", "Flask", "D3.js"],
    links: [
      {label:"Live Demo", url:"#"},
      {label:"GitHub", url:"#"}
    ],
    desc: `Business dashboard with real-time data streaming, interactive graphs, and reporting. Machine learning modules provide anomaly alerts and personalized insights.<ul>
      <li>Live query builder and PDF export</li>
      <li>Customizable chart widgets</li>
      <li>Fast Flask API with JWT auth</li>
    </ul>
    `,
    highlights: [
      "Handles millions of daily database reads",
      "Pluggable widgets system for extensibility",
      "Full test suite (Pytest/Cypress)"
    ]
  },
  {
    title: "Team Collab Tool",
    mediaType: "image",
    media: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=400&q=80",
    tech: ["React", "WebRTC", "MongoDB"],
    links: [
      {label:"Live Demo", url:"#"},
      {label:"GitHub", url:"#"}
    ],
    desc: `Integrated team hub: chat, file sharing, Kanban task lists, live video rooms. Designed for remote-first orgs, with role-based access and SSO support.<ul>
    <li>Encrypted real-time chat via WebRTC/Socket.io</li>
    <li>Task assignment and search</li>
    <li>Slack/GDrive integrations</li></ul>
    `,
    highlights: [
      "Used by 14+ remote teams in production",
      "Live presence + @ channel mentions",
      "Custom dark/light themes (user toggle)"
    ]
  }
];

const modal = document.getElementById('project-modal');
const modalOverlay = modal && modal.querySelector('.modal-overlay');
const modalContent = modal && modal.querySelector('.modal-content');
const modalBody = modal && modal.querySelector('.modal-body');
const modalClose = modal && modal.querySelector('.modal-close');

// Open modal on project card click (but not on video click!)
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', function(e){
    // If clicking on video or project-links, do not open modal
    if(e.target.closest('.project-preview-video') || e.target.closest('.project-links') || e.target.closest('a') || e.target.tagName === "A" || e.target.tagName === "BUTTON") return;
    const pid = Number(card.getAttribute('data-project-id'));
    showProjectModal(pid);
  });
  card.addEventListener('keydown', e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // Only open modal if last clicked not in video
      const pid = Number(card.getAttribute('data-project-id'));
      showProjectModal(pid);
    }
  });
});

// Renders and opens the modal for project at index pid
function showProjectModal(pid){
  if(!modal || !modalBody) return;
  const data = PROJECTS[pid];
  if(!data) return;
  // Build media
  let mediaHTML = '';
  if(data.mediaType === "video") {
    mediaHTML = `<video src="${data.media}" poster="${data.poster || ''}" controls autoplay muted playsinline loop preload="auto" style="max-width:100%;border-radius:11px"></video>`;
  } else if(data.mediaType === "image") {
    mediaHTML = `<img src="${data.media}" alt="${data.title} Screenshot" />`;
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
  modal.setAttribute("aria-hidden","false");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  // Accessibility: focus close
  setTimeout(()=>{ modalClose && modalClose.focus(); }, 10);
}

// Close modal handler
function closeModal(){
  if(!modal) return;
  modal.setAttribute("aria-hidden","true");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}
if(modalOverlay) modalOverlay.addEventListener('click', closeModal);
if(modalClose) modalClose.addEventListener('click', closeModal);
window.addEventListener('keydown', function(e){
  if(e.key === "Escape" && modal.classList.contains('active')) closeModal();
});

// --------  PROJECT VIDEO PREVIEW: SEEK + PLAY/PAUSE ON CLICK  --------
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.project-preview-video').forEach(function(video) {
    const preview = Number(video.getAttribute('data-preview-time') || 0);

    // Seek to previewTime when loaded
    video.addEventListener('loadedmetadata', function() {
      if (!isNaN(preview) && preview >= 0 && preview < video.duration) {
        let seekedOnce = false;
        video.currentTime = preview;
        video.addEventListener('seeked', function () {
          if (!seekedOnce) {
            video.pause();
            seekedOnce = true;
          }
        });
      }
    });

    // Prevent context menu for right click on video
    video.addEventListener('contextmenu', function(e){
      e.preventDefault();
    });

    // Remove controls bar
    video.removeAttribute('controls');

    // Toggle play/pause on click/tap
    video.addEventListener('click', function(e){
    if (video.paused) {
        // Reset to beginning before play
        video.currentTime = 0;
        video.play();
    } else {
        video.pause();
    }
    e.stopPropagation(); // prevent card click opening modal
    });

    // Keyboard: space/enter on video = play/pause (accessibility)
    video.addEventListener('keydown', function(e){
      if(e.key===" " || e.key==="Enter"){
        if(video.paused){ video.play(); }
        else { video.pause(); }
        e.preventDefault();
        e.stopPropagation();
      }
    });

    // Always visually paused at preview unless played:
    video.pause();
  });
});
