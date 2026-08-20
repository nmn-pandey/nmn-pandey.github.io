(function () {
  'use strict';

  window.addEventListener('click', function (event) {
    var clicked = event.target instanceof Element ? event.target : null;
    var link = clicked ? clicked.closest('.Menu_menu__K8jw6 a[href^="#"]') : null;
    if (!link) return;

    var href = link.getAttribute('href');
    var target = href ? document.querySelector(href) : null;
    if (!target) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    var drawer = document.querySelector('.Menu_menu__K8jw6');
    var button = document.querySelector('.Header_header_left_menu__CDHoo');
    if (drawer) {
      drawer.style.setProperty('--menu-mask-height', '100%');
      drawer.style.visibility = 'hidden';
      drawer.style.pointerEvents = 'none';
    }
    if (button) button.setAttribute('aria-expanded', 'false');

    var top = target.getBoundingClientRect().top + window.scrollY;
    window.history.replaceState(null, '', href);
    if (window.portfolioLenis) {
      window.portfolioLenis.scrollTo(top, { immediate: true, force: true });
    }
    window.scrollTo(0, top);

    setTimeout(function () {
      var refreshedTop = target.getBoundingClientRect().top + window.scrollY;
      if (window.portfolioLenis) {
        window.portfolioLenis.scrollTo(refreshedTop, { immediate: true, force: true });
      }
      window.scrollTo(0, refreshedTop);
    }, 50);
  }, true);
})();
