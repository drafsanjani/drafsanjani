var i =0;
var lastcont = null;
var lastcsrl=null;

function checkSize(){
  return $(window).width();
}

// run test on initial page load
var vw = checkSize();
// run test on resize of the window
$(window).resize(function(){
  vw = checkSize();
  bldheight = $('.black-date').height();
});

function animloop(){
    if ($('.sound-2').height()==$('.sound-3').height() || $('.sound-2').height()==$('.sound-1').height() && i>0 && $('.sound-2').height()==24) {
      $('.sound-1').animate({ height: "10px" }, 600);
      $('.sound-2').delay(500).animate({ height: "10px" }, 600);
      $('.sound-3').animate({ height: "10px" }, 600, function() {
        $( ".sound div" ).animate({ height: "+=14px" }, 600, animloop());
      });
    }else {
      $( ".sound div" ).animate({ height: "10px" }, 650, function() {
        $( ".sound div" ).animate({ height: "+=14px" }, 650, animloop());
      });
    }
      i++;
}


function firstmove(){
    animloop();
    $('.sound-1').animate({ height: "+=14px" }, 500);
    $('.sound-2').delay(600).animate({ height: "+=14px" }, 500);
    $('.sound-3').delay(100).animate({ height: "+=10px" }, 500);
}


function navAnimation3D(thiscont){

      $( ".nav-normal .active" ).animate({ opacity: "0.7" }, 300);
      $( ".nav3d .active" ).animate({ opacity: "0" }, 300, function(){
        $('.active').removeAttr('style');
        $('.active').removeClass('active');

        if (thiscont == "home") {
          window.history.pushState(null, thiscont, thiscont);
        }else {
          window.history.pushState(thiscont, thiscont, thiscont);
        }

        $( ".nav-normal ."+thiscont ).animate({ opacity: "0" }, 100);
        $( ".nav3d ."+thiscont ).animate({ opacity: ".7" }, 100, function(){
          $('.'+thiscont).removeAttr('style');
          $('.'+thiscont).addClass('active');
        });
      });

}


function contactPage(state, action){
  if (!action) {
    if (state=='contact') {
      $('.contact-page').removeAttr('style');
      $('.contact-page').addClass('cont');
      $('.contact-page').removeClass('down');
      $('.scroll').css({'cursor': 'pointer', 'opacity': '0.1'});
    }else {
      $('.scroll').css({'cursor': 'default', 'opacity': "0"});
      $('.contact-page').removeAttr('style');
      $('.contact-page').removeClass('cont');
    }
  }else if (action == 'on') {
    $('.contact-page').animate({opacity: '1', marginTop: '0%'}, 1800, function(){
      $('.contact-page').removeAttr('style');
      $('.contact-page').removeClass('down');
      $('.contact-page').addClass('cont');
      if ($('.contact-first').attr('style') === "top: 0") {
        $('.scroll').animate({opacity: '0.1'}, 1000, function(){
          $('.scroll').css('cursor', 'pointer');
        });
      }
    });
  }else if (action == 'off') {
    $('.scroll').animate({opacity: '0'}, 500, function(){
      $('.scroll').css('cursor', 'default');
    });

    $('.contact-page').animate({opacity: '0', marginTop: '100%'}, 1500, function(){
      $('.contact-page').addClass('down');
      $('.contact-page').removeClass('cont');
      $('.contact-page').removeAttr('style');
    });
    $('.sound-container div').css('z-index', '1');
  }
}




function projectsPage(state, action){
  if (!action) {
    if (state=='projects') {
      $('.projects-page').removeAttr('style');
      $('.projects-page').addClass('proj');
      $('.projects-page').removeClass('down');
      $('.scroll').css({'cursor': 'default', 'opacity': "0"});
    }else {
      $('.projects-page').removeAttr('style');
      $('.projects-page').removeClass('proj');
    }
  }else if (action == 'on') {
    $('.projects-page').animate({opacity: '1', marginTop: '0%'}, 1800, function(){
      $('.projects-page').removeAttr('style');
      $('.projects-page').removeClass('down');
      $('.projects-page').addClass('proj');
    });
    $('.scroll').animate({opacity: '0'}, 500, function(){
      $('.scroll').css('cursor', 'default');
    });
  }else if (action == 'off') {
    $('.projects-page').animate({opacity: '0', marginTop: '100%'}, 1500, function(){
      $('.projects-page').addClass('down');
      $('.projects-page').removeClass('proj');
      $('.projects-page').removeAttr('style');
    });
  }
}


if (window.location.href.search('projects')>0) {
  $('.header, .head-text, .moooon, .transp-big-1, .transp-big-2, .moon-small, .constellation').addClass('away');
  $('.nav-container').find('.projects').addClass('active');
  contactPage();
  projectsPage('projects');
}else if (window.location.href.search('contact')>0) {
  $('.header, .head-text, .moooon, .transp-big-1, .transp-big-2, .moon-small, .constellation').addClass('away');
  $('.nav-container').find('.contact').addClass('active');
  contactPage('contact');
  projectsPage();
}else{
  contactPage();
  projectsPage();
  $('.nav-container').find('.home').addClass('active');
}



window.onpopstate = function(event) {
  $('.active').removeClass('active');
  var state = JSON.stringify(event.state).replace(/['"]+/g, '');

  if (state==="null") {
    $('.nav-container').find('.home').addClass('active');
    $('.away').removeClass('away');
  }else {
    $('.header, .head-text, .moooon, .transp-big-1, .transp-big-2, .moon-small, .constellation').removeAttr('style');
    $('.header, .head-text, .moooon, .transp-big-1, .transp-big-2, .moon-small, .constellation').addClass('away');
    $('.nav-container').find('.'+state).addClass('active');
  }

  contactPage(state);
  projectsPage(state);
};



function emailSubmit(){
    var namev= $('.name').val();
    var emailv= $('.email-inp').val();
    var messagev= $('.message').val();
    var formOK = [];

    if (namev.length===0) {
      formOK[formOK.length] = "name";
    }
    if(emailv.length===0){
      formOK[formOK.length] = "email-inp";
    }
    if (messagev.length===0) {
      formOK[formOK.length] = "message";
    }

if (formOK.length===0) {

    $.ajax({
      url: 'index.php',
      type: 'POST',
      data: {
        name: namev,
        email: emailv,
        message: messagev,
      },
      success: function(data){
        console.log(data);
      }
    });
  }else {
    for (var c in formOK) {
      $('.'+formOK[c]).addClass('error');
    }
  }

}

function scrDown(){
  if ($('.contact-page').hasClass('cont')&& !$('.contact-page').hasClass('down') && lastcsrl!=='down') {
    $('.contact-second, .contact-first, .scroll').stop();
    lastcsrl= 'down';
    $('.scroll').animate({opacity: '0'}, 1000, function(){
      $('.scroll').css('cursor', 'default');
    });
    $('.contact-first').animate({top: "-100%", opacity: "0"}, 1000);
    $('.contact-second').animate({top: "0"}, 1000);
    $('.sound-container div').css('z-index', '-2');
  }
}


$(function(){
  firstmove();

  $('.scroll').click(function() {
    scrDown();
  });

  $('body').bind('mousewheel', function(e){
      if(e.originalEvent.wheelDelta /120 > 0) {
          if($('.contact-first').css('top')!==0 && $('.contact-second').css('top')!==-100 && lastcsrl!=='up' && !$('.contact-page').hasClass('down')){
            $('.contact-second, .contact-first, .scroll').stop();
            lastcsrl='up';
            $('.scroll').animate({opacity: '0.1'}, 3000, function(){
              $('.scroll').css('cursor', 'pointer');
            });
            $('.contact-first').animate({top: "0", opacity: "1"}, 1000);
            $('.contact-second').animate({top: "100%"}, 1000);
            $('.sound-container div').css('z-index', '1');
          }
      }
      else{
        scrDown();
      }
  });


  $('.sound').click(function(){
      if($('.sound div').height() == 10){
          firstmove();
      } else {
          $('.sound div').stop( true ).animate({ height: "10px"}, 200);
      }
  });


  function respVW(a,b, c, d, he, elem){
    if ( (!he || !elem)) {
      if (!c && !d) {
        if (vw/100*a<b) {
          return a+"vw";
        }else {
          return b+"px";
        }
      }else {
        if (vw<=c) {
          return d+"px";
        }else if (vw/100*a<b) {
          return a+"vw";
        }else {
          return b+"px";
        }
      }
    }else if ($(window).height() <= he && $(window).width() >= 1100) {
      switch (elem) {
        case 'moooon':
            return "74vh";
          break;
        case 'transp-big':
            return "75vh";
          break;
        case 'moon-small':
            return "71vh";
          break;
        case 'head-text':
            return "55px";
          break;
        default:
          if (!c && !d) {
            if (vw/100*a<b) {
              return a+"vw";
            }else {
              return b+"px";
            }
          }else {
            if (vw<=c) {
              return d+"px";
            }else if (vw/100*a<b) {
              return a+"vw";
            }else {
              return b+"px";
            }
          }
        break;
      }
    }else {
      if (!c && !d) {
        if (vw/100*a<b) {
          return a+"vw";
        }else {
          return b+"px";
        }
      }else {
        if (vw<=c) {
          return d+"px";
        }else if (vw/100*a<b) {
          return a+"vw";
        }else {
          return b+"px";
        }
      }
    }
  }



  $('.nav-element').click(function() {
    var thiscont = $(this).attr('content');

    if (!$(this).hasClass('active')) {
      navAnimation3D(thiscont);

      if (thiscont=="projects" && window.innerWidth>=8000) {
        $('.nav-container .hidden').removeClass('hidden');
        $('.nav-container').animate({ left: "-20px", opacity: "0"}, 800, function(){
          $('.nav-container').addClass('hidden');
          $('.nav-container').removeAttr('style');
        });
      }

      if (thiscont!="home") {
        $('.contact-page, .projects-page').stop( true );
        if (!$('.header, .head-text, .moooon, .transp-big-1, .transp-big-2, .moon-small, .constellation').hasClass('away')) {
            $('.header, .head-text, .moooon, .transp-big-1, .transp-big-2, .moon-small, .constellation').stop( true );
          // $('.header, .head-text, .moooon, .transp-big-1, .transp-big-2, .moon-small, .constellation').finish();

            $('.header').animate({height: "50%", opacity: "0.5"}, 2000);
            $('.head-text').animate({opacity: "0", fontSize: "30px"}, 500);
            $('.moooon').animate({ width: "110px"}, 1000);
            $('.transp-big-1, .transp-big-2, .moon-small').animate({ width: "100px"}, 1000);
            $('.constellation').animate({width: "100px"}, 2000, function(){
                $('.header, .head-text, .moooon, .transp-big-1, .transp-big-2, .moon-small, .constellation').removeAttr('style');
            });
            $('.header, .head-text, .moooon, .transp-big-1, .transp-big-2, .moon-small, .constellation').addClass('away');
        }
        if (thiscont=="contact") {
          contactPage(null, 'on');
          projectsPage(null, 'off');
        }else {
          projectsPage(null, 'on');
          contactPage(null, 'off');
        }
      }else {
          $('.header, .head-text, .moooon, .transp-big-1, .transp-big-2, .moon-small, .constellation, .contact-page, .projects-page').stop( true );
          // $('.header, .head-text, .moooon, .transp-big-1, .transp-big-2, .moon-small, .constellation').finish();

          $('.header').animate({height: "100%", opacity: "1"}, 1000);
          $('.head-text').animate({opacity: "0.91", fontSize: respVW(6, 67, 1000, 60, 475, 'head-text')}, 1000);
          $('.moooon').animate({ width: respVW(41, 450, 750, 307, 600, 'moooon')}, 1500);
          $('.transp-big-1, .transp-big-2').animate({ width: respVW(42, 460, 750, 315, 600, 'transp-big')}, 1500);
          $('.moon-small').animate({ width: respVW(40, 429, 750, 300, 600, 'moon-small')}, 1500);
          $('.constellation').animate({width: (window.innerWidth/100)*70+"px"}, 2000, function(){
            $('.header, .head-text, .moooon, .transp-big-1, .transp-big-2, .moon-small, .constellation').removeAttr('style');
          });
          $('.header, .head-text, .moooon, .transp-big-1, .transp-big-2, .moon-small, .constellation').removeClass('away');

          if (lastcont=="contact") {
            contactPage(null, 'off');
          }else if(lastcont=="projects"){
            projectsPage(null, 'off');
          }else {
            contactPage(null, 'off');
            projectsPage(null, 'off');
          }

      }
    }
    var lastcont = thiscont;
  });

  $('input, textarea').focus(function() {
    $(this).removeClass('error');
  });

  bldheight = null;
  $('.white-front').hover(function() {
    $(this).siblings().find('.black-date').stop();
    $('.strange-line').stop();
    if (bldheight === null) {
      bldheight = $('.black-date').height();
    }

    $('.strange-line').animate({width: "10%"}, 1000);
    $(this).siblings().find('.black-date').animate({height: ($('.black-back').height()-$('.black-down').height()-10)+"px", opacity: "0.5"}, 500);
  }, function() {
    $(this).siblings().find('.black-date').stop();
    $('.strange-line').stop();
    $(this).siblings().find('.black-date').animate({height: bldheight+"px", opacity: "0.7"}, 500);
    $('.strange-line').animate({width: "20%"}, 800);
  });
  
  $('.circle-icon').click(function(){
      $('.modal-nav').find('.'+$('.active').attr('content')).addClass('active');
      $('.modal-nav').css('display', 'flex');
      $('.modal-nav').animate({opacity: "1"}, 800);
  });

  $('.modal-nav').click(function() {
    $('.modal-nav').animate({opacity: "0"}, 500, function(){
      $('.modal-nav').css('display', 'none');
    });
  });

});