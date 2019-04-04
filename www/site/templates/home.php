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
        width: 1400,
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
  }
</script>
<main class="main" role="content">
  Main Content
  <section class="mod--content-overview grid" data-module="ContentOverview">
  </section>
</main>

<? snippet('static/_aside') ?>
<?php snippet('static/_footer') ?>
