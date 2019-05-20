<?php snippet('static/_header') ?>

<script>
  const breakpointKeys = {
    xlarge: 'XLARGE',
    large: 'LARGE',
    medium: 'MEDIUM',
    small: 'SMALL',
  };

  window.config = {};
  window.config = {
    breakpoints: [
      {
        name: breakpointKeys.small,
        width: 700,
      },
      {
        name: breakpointKeys.medium,
        width: 1000,
      },
      {
        name: breakpointKeys.large,
        width: 1440,
      },
      {
        name: breakpointKeys.xlarge,
        width: 3000,
      },
    ],
    breakpointKeys: breakpointKeys,
  };

  window.config.events = {
    resize: 'event-resize',
    viewportChange: 'event-viewport-changed',
    viewportChangeStage: 'event-viewport-changed-stage',
    viewportScroll: 'event-scroll',
  }

  window.config.generals = {
    scrollConfig: {
      offset: 0,
      ease: 'out-cube',
      duration: 1000,
    },
    site: {
      title: document.querySelector('body').dataset.title,
    }
  }
</script>
<main class="main" role="main">
  <section class="mod--content-overview grid" data-module="ContentOverview">
  </section>
</main>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-138300476-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-138300476-1');
</script>


<? snippet('static/_aside') ?>
<? snippet('static/_footer') ?>
