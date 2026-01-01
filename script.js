// ================================
// Work Data
// ================================
const workData = [
  {
    id: 1,
    category: 'motion-reels',
    title: 'Starbucks Advertisement',
    description: '',
    year: '',
    categoryLabel: 'Motion Design',
    videoUrl: 'https://youtube.com/shorts/X5pe4ABTYfU?si=1zeZGlV3nnRuZ_cO',
    hasVideo: true
  },

  {
    id: 2,
    category: 'reels',
    title: 'Podcast Editing Style',
    description: 'Capturing iconic structures that redefine cityscapes.',
    year: '2024',
    videoUrl: 'https://youtube.com/shorts/qaeQcgNTKvg?feature=share',
    hasVideo: true,
    categoryLabel: 'Architecture',
    image: 'reels-1.jpg'
  },
  {
    id: 3,
    category: 'advertisement',
    title: 'Pinterest Advertisement',
    description: 'Capturing iconic structures that redefine cityscapes.',
    year: '2024',
    videoUrl: 'https://youtu.be/XRotg_hK65I',
    hasVideo: true,
    categoryLabel: 'Architecture',
    // image: 'advertisement-1.jpg'
  },
  {
    id: 4,
    category: 'advertisement',
    title: 'Tamper Proof Advertisement',
    description: 'Capturing iconic structures that redefine cityscapes.',
    year: '2024',
    videoUrl: 'https://youtu.be/sXOW4y8YFZs',
    hasVideo: true,
    categoryLabel: 'Architecture',
    // image: 'advertisement-2.jpg'
  },
  {
    id: 5,
    category: 'short-films',
    title: 'Cinestudy Short Film',
    description: 'Professional podcast editing with clean audio and smooth transitions.',
    year: '2024',
    videoUrl: 'https://youtu.be/iG-1kTMN5Nk?si=H088Mzbo_lv2WIYp',
    hasVideo: true,
    categoryLabel: 'Short Films',
    image: 'short-films-1.jpg'
  },
  {
    id: 6,
    category: 'advertisement',
    title: 'Perfume Advertisement',
    description: 'Bringing your brand to life through dynamic motion graphics.',
    year: '2024',
    videoUrl: 'https://youtu.be/7FA6gXz_fgg',
    hasVideo: true,
    categoryLabel: 'Graphics',
    image: 'motion-1.jpg'
  },
  {
    id: 7,
    category: 'reels',
    title: 'Real Estate Reel',
    description: 'Viral-ready content optimized for maximum engagement.',
    year: '2024',
    videoUrl: 'https://youtube.com/shorts/rrPjVLoA2qQ?si=qsReu9Vx-brDO1LE',
    hasVideo: true,
    categoryLabel: 'Social Media',
    image: 'reels-2.jpg'
  },
  {
    id: 8,
    category: 'motion-reels',
    title: 'Instagram Reel',
    description: 'Eye-catching animations that tell your brand story.',
    year: '2024',
    videoUrl: 'https://www.youtube.com/shorts/kw8EqRbEEYQ',
    hasVideo: true,
    categoryLabel: 'Branding',
    image: 'motion-2.jpg'
  },
  {
    id: 9,
    category: 'motion-reels',
    title: 'IOS Styled Motion Reel',
    description: '',
    year: '',
    categoryLabel: 'Motion Design',
    videoUrl: 'https://youtu.be/6UjrNchWwmQ?si=cdmY1C6cPqAVz8Sk',
    hasVideo: true
  },
];

// ================================
// Initialize
// ================================
document.addEventListener('DOMContentLoaded', () => {
  initializeWorkGrid();
  initializeFilters();
  initializeScrollAnimations();
  initializeNavigation();
  initializeTestimonials();
  initializeContactForm();
  initializeVideoModal();
  initializeWorkFocusMode();
  initializeCtaDropdown();
  generatePlaceholderImages();
});

// ================================
// Work Grid
// ================================
function initializeWorkGrid() {
  const workGrid = document.getElementById('workGrid');

  workData.forEach((work, index) => {
    const card = createWorkCard(work, index);
    workGrid.appendChild(card);
  });
}

function createWorkCard(work, index) {
  const card = document.createElement('div');
  card.className = 'work-card';
  if (work.hasVideo) {
    card.classList.add('has-video');
  }
  card.dataset.category = work.category;
  card.style.animationDelay = `${index * 0.1}s`;

  // Get thumbnail URL - use YouTube thumbnail if video URL exists
  let thumbnailUrl;

  if (work.hasVideo && work.videoUrl) {
    console.log(work)
    if (work.videoUrl.includes('vimeo.com')) {
      // Vimeo thumbnails require API access, so use placeholder or specified image
      if (work.image) {
        thumbnailUrl = `./images/${work.image}`;
      } else {
        thumbnailUrl = createPlaceholderImage(work.category, work.title);
      }
    } else {
      // YouTube video - use thumbnail (hqdefault is always available)
      const videoId = extractYouTubeVideoId(work.videoUrl);
      console.log('Video ID extracted:', videoId, 'from URL:', work.videoUrl);
      thumbnailUrl = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
      console.log('Thumbnail URL:', thumbnailUrl);
    }
  } else if (work.image) {
    thumbnailUrl = `./images/${work.image}`;
  } else {
    // No image specified, use placeholder
    thumbnailUrl = createPlaceholderImage(work.category, work.title);
  }

  card.innerHTML = `
    <div class="work-card-image">
      <img src="${thumbnailUrl}" alt="${work.title}" loading="lazy" id="work-${work.id}">
      <div class="work-card-overlay"></div>
    </div>
    <div class="work-card-content">
      <div class="work-card-meta">
        <!-- <span class="work-card-year">${work.year}</span>
         <span class="work-card-category">${work.categoryLabel}</span>-->
      </div>
      <h3 class="work-card-title">${work.title}</h3>
      <!-- <p class="work-card-description">${work.description}</p> -->
    </div>
  `;

  // Add error handler for YouTube thumbnails
  const img = card.querySelector('img');
  if (work.hasVideo && work.videoUrl) {
    img.addEventListener('error', function () {
      console.log('YouTube thumbnail failed to load, using placeholder');
      this.src = createPlaceholderImage(work.category, work.title);
    }, { once: true });
  }

  // Add click handler for video cards
  if (work.hasVideo && work.videoUrl) {
    card.addEventListener('click', () => {
      openVideoModal(work.videoUrl);
    });
  }

  return card;
}

// ================================
// Work Filters
// ================================
function initializeFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.dataset.filter;

      // Filter cards
      workCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.animation = 'fadeIn 0.6s ease forwards';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ================================
// Scroll Animations
// ================================
function initializeScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.section-title').forEach(title => {
    observer.observe(title);
  });
}

// ================================
// Navigation
// ================================
function initializeNavigation() {
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');

  // Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Update active nav link
    updateActiveNavLink();
  });

  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// ================================
// CTA Dropdown
// ================================
function initializeCtaDropdown() {
  const btn = document.getElementById('bookCallBtn');
  const icons = document.getElementById('contactIcons');

  if (!btn || !icons) return;

  // Toggle icons on button click
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    icons.classList.toggle('active');
  });

  // Close icons when clicking outside
  document.addEventListener('click', (e) => {
    if (!icons.contains(e.target) && !btn.contains(e.target)) {
      icons.classList.remove('active');
    }
  });
}

// ================================
// Work Section Focus Mode
// ================================
function initializeWorkFocusMode() {
  const workSection = document.getElementById('work');
  const hero = document.querySelector('.hero');
  const otherSections = document.querySelectorAll('.section:not(#work)');

  // Create intersection observer for work section
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Work section is in view - blur other sections
          hero.classList.add('blurred');
          otherSections.forEach(section => section.classList.add('blurred'));
        } else {
          // Work section is not in view - remove blur
          hero.classList.remove('blurred');
          otherSections.forEach(section => section.classList.remove('blurred'));
        }
      });
    },
    {
      threshold: 0.3, // Trigger when 30% of work section is visible
      rootMargin: '-100px 0px' // Offset for better timing
    }
  );

  // Observe the work section
  if (workSection) {
    observer.observe(workSection);
  }
}

// ================================
// Testimonials
// ================================
function initializeTestimonials() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentIndex = 0;
  let autoplayInterval;

  function showTestimonial(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
  }

  function nextTestimonial() {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(nextIndex);
  }

  // Dot navigation
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index);
      showTestimonial(index);

      // Reset autoplay
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(nextTestimonial, 5000);
    });
  });

  // Autoplay
  autoplayInterval = setInterval(nextTestimonial, 5000);
}

// ================================
// Contact Form
// ================================
function initializeContactForm() {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Simple validation
    if (!data.name || !data.email || !data.message) {
      alert('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Success message (in real implementation, this would send to a server)
    alert('Thank you for your message! We\'ll get back to you soon.');
    form.reset();
  });
}

// ================================
// Video Modal
// ================================
function extractYouTubeVideoId(url) {
  // Extract video ID from YouTube URL
  // Supports formats:
  // - https://www.youtube.com/embed/VIDEO_ID
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtube.com/watch/VIDEO_ID (mobile share format)
  // - https://youtu.be/VIDEO_ID
  // - https://youtube.com/shorts/VIDEO_ID (YouTube Shorts)
  const patterns = [
    /(?:youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtube\.com\/watch\/|youtube\.com\/shorts\/|youtu\.be\/)([^&?\s]+)/,
    /^([a-zA-Z0-9_-]{11})$/  // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];

    }
  }

  return null;
}

function initializeVideoModal() {
  const modal = document.getElementById('videoModal');
  const closeBtn = document.getElementById('closeVideoModal');
  const backdrop = document.getElementById('videoBackdrop');

  // Close modal when clicking close button
  closeBtn.addEventListener('click', closeVideoModal);

  // Close modal when clicking backdrop
  backdrop.addEventListener('click', closeVideoModal);

  // Close modal with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeVideoModal();
    }
  });
}

function extractVimeoVideoId(url) {
  // Extract video ID from Vimeo URL
  // Supports formats:
  // - https://vimeo.com/VIDEO_ID
  // - https://player.vimeo.com/video/VIDEO_ID
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

function openVideoModal(videoUrl) {
  const modal = document.getElementById('videoModal');
  const wrapper = document.getElementById('videoPlayerWrapper');

  let embedUrl;

  // Check if it's a Vimeo URL
  if (videoUrl.includes('vimeo.com')) {
    const videoId = extractVimeoVideoId(videoUrl);
    embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  } else {
    // Assume YouTube
    const videoId = extractYouTubeVideoId(videoUrl);
    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  }

  // Create iframe element
  const iframe = document.createElement('iframe');
  iframe.src = embedUrl;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.title = 'Video Player';

  // Clear previous content and add iframe
  wrapper.innerHTML = '';
  wrapper.appendChild(iframe);

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const wrapper = document.getElementById('videoPlayerWrapper');

  // Hide modal
  modal.classList.remove('active');
  document.body.style.overflow = '';

  // Remove iframe after animation completes
  setTimeout(() => {
    wrapper.innerHTML = '';
  }, 300);
}

// ================================
// Generate Placeholder Images
// ================================
function generatePlaceholderImages() {
  // This function will generate placeholder images using a canvas
  // For work items - only generate placeholders for items WITHOUT video URLs
  // (video items already have YouTube/Vimeo thumbnails set)
  workData.forEach(work => {
    // Skip items that have video URLs - they already have proper thumbnails
    if (work.hasVideo && work.videoUrl) {
      return;
    }
    const img = document.getElementById(`work-${work.id}`);
    if (img && !img.complete) {
      img.src = createPlaceholderImage(work.category, work.title);
    }
  });

  // For service images
  const serviceImages = [
    { id: 'podcast-service-img', type: 'podcast', label: '🎙️' },
    { id: 'motion-service-img', type: 'motion', label: '✨' },
    { id: 'advertisement-service-img', type: 'advertisement', label: '📺' },
    { id: 'reels-service-img', type: 'reels', label: '📱' }
  ];

  serviceImages.forEach(service => {
    const img = document.getElementById(service.id);
    if (img && !img.complete) {
      img.src = createServiceIcon(service.type, service.label);
    }
  });

  // For client logos
  const clientLogos = document.querySelectorAll('.client-logo img');
  const clientNames = ['Client A', 'Client B', 'Client C', 'Client D', 'Client E', 'Client F'];

  clientLogos.forEach((img, index) => {
    if (!img.complete && index < clientNames.length) {
      img.src = createClientLogo(clientNames[index]);
    }
  });
}

function createPlaceholderImage(category, title) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 450;

  // Gradient backgrounds based on category
  const gradients = {
    'motion-design': ['#00D9FF', '#764ba2'],
    'advertisement': ['#FF6B00', '#FFD600'],
    'reels': ['#00D9FF', '#FF1B90'],
    'motion-reels': ['#FF6B00', '#FF1B90'],
    'podcast': ['#667eea', '#764ba2'],
    'motion': ['#00D9FF', '#764ba2'],
    'default': ['#667eea', '#f093fb']
  };

  const colors = gradients[category] || gradients['default'];

  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Removed title text - it will appear in the card content instead

  // Add subtle pattern
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 100 + 50;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas.toDataURL();
}

function createServiceIcon(category, emoji) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 400;

  // Gradient backgrounds based on category
  const gradients = {
    'podcast': ['#667eea', '#764ba2'],
    'motion': ['#00D9FF', '#764ba2'],
    'advertisement': ['#FF6B00', '#FFD600'],
    'reels': ['#00D9FF', '#FF1B90'],
    'default': ['#667eea', '#f093fb']
  };

  const colors = gradients[category] || gradients['default'];

  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(1, colors[1]);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add emoji icon
  ctx.font = 'bold 120px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL();
}

function createClientLogo(name) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 200;
  canvas.height = 200;

  // Random gradient colors
  const colors = [
    ['#00D9FF', '#764ba2'],
    ['#FF6B00', '#FFD600'],
    ['#667eea', '#764ba2'],
    ['#00D9FF', '#FF1B90'],
    ['#764ba2', '#f093fb']
  ];

  const colorPair = colors[Math.floor(Math.random() * colors.length)];

  // Create circular gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, colorPair[0]);
  gradient.addColorStop(1, colorPair[1]);

  // Draw circle
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  // Add initials
  const initials = name.split(' ').map(word => word[0]).join('');
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.font = 'bold 60px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initials, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL();
}
