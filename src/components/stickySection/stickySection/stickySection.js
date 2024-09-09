class StickyNavigation {
  
    constructor() {
      this.currentId = null;
      this.currentTab = null;
      this.tabContainerHeight = 70;
      this.lastScroll = 0;
      let self = this;
      $('.et-hero-tab').click(function() { 
        self.onTabClick(event, $(this)); 
      });
      $(window).scroll(() => { this.onScroll(); });
      $(window).resize(() => { this.onResize(); });
    }
    
    onTabClick(event, element) {
      event.preventDefault();
      let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
      $('html, body').animate({ scrollTop: scrollTop }, 600);
    }
    
    onScroll() {
      this.checkHeaderPosition();
      this.findCurrentTabSelector();
      this.lastScroll = $(window).scrollTop();
    }
    
    onResize() {
      if(this.currentId) {
        this.setSliderCss();
      }
    }
    
    checkHeaderPosition() {
      const headerHeight = 75;
      if($(window).scrollTop() > headerHeight) {
        $('.et-header').addClass('et-header--scrolled');
      } else {
        $('.et-header').removeClass('et-header--scrolled');
      }
      let offset = ($('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight) - headerHeight;
      if($(window).scrollTop() > this.lastScroll && $(window).scrollTop() > offset) {
        $('.et-header').addClass('et-header--move-up');
        $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top-first');
        $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top-second');
      } 
      else if($(window).scrollTop() < this.lastScroll && $(window).scrollTop() > offset) {
        $('.et-header').removeClass('et-header--move-up');
        $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top-second');
        $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top-first');
      }
      else {
        $('.et-header').removeClass('et-header--move-up');
        $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top-first');
        $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top-second');
      }
    }
    
    findCurrentTabSelector(element) {
      let newCurrentId;
      let newCurrentTab;
      let self = this;
      $('.et-hero-tab').each(function() {
        let id = $(this).attr('href');
        let offsetTop = $(id).offset().top - self.tabContainerHeight;
        let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
        if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
          newCurrentId = id;
          newCurrentTab = $(this);
        }
      });
      if(this.currentId != newCurrentId || this.currentId === null) {
        this.currentId = newCurrentId;
        this.currentTab = newCurrentTab;
        this.setSliderCss();
      }
    }
    
    setSliderCss() {
      let width = 0;
      let left = 0;
      if(this.currentTab) {
        width = this.currentTab.css('width');
        left = this.currentTab.offset().left;
      }
      $('.et-hero-tab-slider').css('width', width);
      $('.et-hero-tab-slider').css('left', left);
    }
    
  }
  
  new StickyNavigation();