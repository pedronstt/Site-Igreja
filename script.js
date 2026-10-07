// AD Missão Restaurando Vidas — interações do site
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.querySelector('.header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu');
  var navLinks = nav.querySelectorAll('a');

  // ---------- Menu mobile ----------
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }

  toggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('is-open'));
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // ---------- Sombra do header ao rolar ----------
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ==========================================================
  // IGREJAS — lista gerada a partir de igrejas.js
  // ==========================================================
  var churchList = document.getElementById('lista-igrejas');
  var filterBar = document.getElementById('filtros');
  var churches = window.IGREJAS || [];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function externalLink(className, text, href) {
    var a = el('a', className, text);
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    return a;
  }

  function churchCard(church) {
    var isSede = church.tipo === 'Sede';
    var card = el('article', 'church reveal is-visible' + (isSede ? ' church--sede' : ''));

    var meta = el('div', 'church__meta');
    meta.appendChild(el('span', 'church__type', isSede ? 'Sede ' + church.pais : church.tipo));
    meta.appendChild(el('span', '', church.pais));
    card.appendChild(meta);

    card.appendChild(el('h3', '', church.nome));
    card.appendChild(el('p', 'church__city', church.cidade));
    card.appendChild(church.endereco
      ? el('address', 'church__address', church.endereco)
      : el('p', 'church__address church__address--pending', 'Endereço em breve'));

    var actions = el('div', 'church__actions');
    if (church.instagram) {
      actions.appendChild(externalLink('btn btn--dark btn--sm', 'Instagram',
        'https://www.instagram.com/' + church.instagram + '/'));
    }
    if (church.endereco) {
      actions.appendChild(externalLink('btn btn--outline btn--sm', 'Como chegar',
        'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(church.endereco)));
    }
    card.appendChild(actions);

    return card;
  }

  function renderChurches(country) {
    churchList.textContent = '';
    churches.forEach(function (church) {
      if (!country || church.pais === country) churchList.appendChild(churchCard(church));
    });
  }

  function renderFilters() {
    var countries = [];
    churches.forEach(function (c) {
      if (countries.indexOf(c.pais) === -1) countries.push(c.pais);
    });
    if (countries.length < 2) return;

    [''].concat(countries).forEach(function (country) {
      var total = churches.filter(function (c) { return !country || c.pais === country; }).length;
      var btn = el('button', 'filter', country || 'Todas');
      btn.type = 'button';
      btn.setAttribute('aria-pressed', String(country === ''));
      btn.appendChild(el('small', '', String(total)));
      btn.addEventListener('click', function () {
        filterBar.querySelectorAll('.filter').forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === btn));
        });
        renderChurches(country);
      });
      filterBar.appendChild(btn);
    });
  }

  if (churchList) {
    renderFilters();
    renderChurches('');
  }

  // ==========================================================
  // HERO — animações de abertura
  // ==========================================================
  var hero = document.querySelector('.hero');

  // 1) Sequência de entrada: o CSS anima tudo quando a classe é aplicada
  function startHero() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { hero.classList.add('is-loaded'); });
    });
  }

  // 2) Palavra rotativa: "restaurando vidas / famílias / gerações / histórias"
  function startRotator() {
    var rotator = hero.querySelector('.rotator');
    if (!rotator || reduceMotion) return;
    var words = rotator.getAttribute('data-words').split('|');
    var index = 0;

    setTimeout(function () {
      setInterval(function () {
        rotator.classList.add('is-out');
        setTimeout(function () {
          index = (index + 1) % words.length;
          rotator.textContent = words[index];
          rotator.classList.remove('is-out');
        }, 350);
      }, 2800);
    }, 1800);
  }

  // 3) Parallax: o fundo desce mais devagar que a página
  function startParallax() {
    var bg = hero.querySelector('.hero__bg');
    if (!bg || reduceMotion) return;
    var ticking = false;

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < hero.offsetHeight) bg.style.transform = 'translate3d(0,' + (y * 0.25) + 'px,0)';
        ticking = false;
      });
    }, { passive: true });
  }

  // 4) Partículas douradas que sobem devagar e reagem ao mouse
  function startParticles() {
    var canvas = hero.querySelector('.hero__particles');
    if (!canvas || reduceMotion || !canvas.getContext) return;

    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var width = 0;
    var height = 0;
    var particles = [];
    var pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    var running = false;
    var visible = true;

    function makeParticle(anywhere) {
      var depth = Math.random();
      return {
        x: Math.random() * width,
        y: anywhere ? Math.random() * height : height + 10,
        r: 0.6 + depth * 1.8,
        depth: depth,
        speed: 0.12 + depth * 0.35,
        sway: Math.random() * Math.PI * 2,
        alpha: 0.15 + depth * 0.55
      };
    }

    function resize() {
      width = hero.offsetWidth;
      height = hero.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = Math.max(24, Math.min(80, Math.round(width / 16)));
      particles = [];
      for (var i = 0; i < count; i++) particles.push(makeParticle(true));
    }

    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.y -= p.speed;
        p.sway += 0.01;
        p.x += Math.sin(p.sway) * 0.15;
        if (p.y < -10) particles[i] = p = makeParticle(false);

        var twinkle = 0.75 + Math.sin(p.sway * 3) * 0.25;
        ctx.globalAlpha = p.alpha * twinkle;
        ctx.fillStyle = '#d9c39a';
        ctx.beginPath();
        ctx.arc(p.x + pointer.x * p.depth * 30, p.y + pointer.y * p.depth * 30, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }

    function setRunning() {
      var shouldRun = visible && !document.hidden;
      if (shouldRun && !running) {
        running = true;
        requestAnimationFrame(frame);
      } else if (!shouldRun) {
        running = false;
      }
    }

    hero.addEventListener('pointermove', function (e) {
      pointer.tx = e.clientX / width - 0.5;
      pointer.ty = e.clientY / height - 0.5;
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });
    document.addEventListener('visibilitychange', setRunning);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        setRunning();
      }).observe(hero);
    }

    resize();
    setRunning();
  }

  if (hero) {
    startHero();
    startRotator();
    startParallax();
    startParticles();
  }

  // ==========================================================
  // Contadores animados (Quem Somos)
  // ==========================================================
  function animateCount(node) {
    var target = Number(node.getAttribute('data-count'));
    var prefix = node.getAttribute('data-prefix') || '';
    var suffix = node.getAttribute('data-suffix') || '';
    var duration = 1600;
    var start = null;

    function step(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      node.textContent = prefix + Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ==========================================================
  // Animação ao rolar + link ativo no menu
  // ==========================================================
  var reveals = document.querySelectorAll('.reveal:not(.is-visible)');
  var counters = document.querySelectorAll('[data-count]');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (node) { revealObserver.observe(node); });

    if (!reduceMotion) {
      var countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (node) { countObserver.observe(node); });
    }

    var sections = document.querySelectorAll('main section[id]');
    var hashLinks = nav.querySelectorAll('a[href^="#"]');
    if (sections.length && hashLinks.length) {
      var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          hashLinks.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
          });
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function (s) { sectionObserver.observe(s); });
    }
  } else {
    reveals.forEach(function (node) { node.classList.add('is-visible'); });
  }

  // ---------- Ano do rodapé ----------
  document.getElementById('ano').textContent = new Date().getFullYear();
})();
