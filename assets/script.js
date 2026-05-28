/* ============================================
   BlueRocket Systems — interactions & animations
   ============================================ */

(() => {
  'use strict';

  // ---- Year in footer ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Sticky header shadow on scroll ----
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Reveal-on-scroll: CSS baseline + Motion spring upgrade ----
  const reveals = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let motionTookOver = false;

  // Baseline: IntersectionObserver-driven CSS reveal. Runs immediately so the
  // page is never stuck at opacity:0 if Motion is slow or blocked.
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (motionTookOver) { io.unobserve(el); return; }
        const delay = parseInt(el.dataset.revealDelay || '0', 10);
        setTimeout(() => el.classList.add('is-in'), delay);
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  // Upgrade: replace tween easing with Motion springs once the library loads.
  if (reveals.length && !prefersReducedMotion) {
    import('https://cdn.jsdelivr.net/npm/motion@11/+esm')
      .then(({ animate, inView }) => {
        motionTookOver = true;
        document.documentElement.classList.add('motion-on');
        reveals.forEach((el) => {
          // Skip elements the baseline already revealed before Motion arrived
          if (el.classList.contains('is-in')) return;
          inView(el, () => {
            const delay = parseInt(el.dataset.revealDelay || '0', 10) / 1000;
            const dir = el.dataset.reveal || 'up';
            const target = (dir === 'left' || dir === 'right')
              ? { opacity: 1, x: 0 }
              : { opacity: 1, y: 0 };
            animate(el, target, {
              type: 'spring',
              stiffness: 85,
              damping: 18,
              mass: 1,
              delay,
            });
            el.classList.add('is-in');
          }, {
            amount: 0.15,
            margin: '0px 0px -60px 0px'
          });
        });
      })
      .catch((err) => {
        console.warn('Motion failed to load; CSS reveal baseline still active.', err);
      });
  }

  // ---- Counter animation (runs when counter scrolls in) ----
  const counters = document.querySelectorAll('.counter');
  if ('IntersectionObserver' in window && counters.length) {
    const runCounter = (el) => {
      const target = parseInt(el.dataset.target || '0', 10);
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toString();
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toString();
      };
      requestAnimationFrame(step);
    };

    const co = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        co.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => co.observe(el));
  }

  // ---- Smooth anchor scrolling with header offset ----
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---- Parallax tilt for hero dashboard (desktop only) ----
  const mq = window.matchMedia('(min-width: 1024px) and (hover: hover)');
  if (mq.matches) {
    const dash = document.querySelector('#hero .lg\\:sticky');
    const stage = document.querySelector('#hero');
    if (dash && stage) {
      let raf = null;
      let tx = 0, ty = 0, cx = 0, cy = 0;
      const onMove = (e) => {
        const r = stage.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tx = px * 6;
        ty = py * -6;
        if (!raf) raf = requestAnimationFrame(tick);
      };
      const tick = () => {
        cx += (tx - cx) * 0.08;
        cy += (ty - cy) * 0.08;
        dash.style.transform = `perspective(1200px) rotateY(${cx}deg) rotateX(${cy}deg)`;
        if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
          raf = requestAnimationFrame(tick);
        } else {
          raf = null;
        }
      };
      stage.addEventListener('mousemove', onMove);
      stage.addEventListener('mouseleave', () => {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(tick);
      });
    }
  }

  // ---- Marquee: pause when off-screen for battery ----
  const track = document.querySelector('.marquee-row');
  if (track && 'IntersectionObserver' in window) {
    const mo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
      });
    }, { threshold: 0 });
    mo.observe(track);
  }

  // ---- Form noop (placeholder, swap for real handler) ----
  const form = document.querySelector('#audit form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i><span>Got it — we\'ll be in touch</span>';
      btn.classList.add('!bg-emerald-600');
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.classList.remove('!bg-emerald-600');
        form.reset();
      }, 2400);
    });
  }
})();
