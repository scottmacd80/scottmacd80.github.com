var active;

active = true;


// check blend mode
if(!('backgroundBlendMode' in document.body.style)) {
    // No support for background-blend-mode
  var html = document.getElementsByTagName("html")[0];
  html.className = html.className + " no-background-blend-mode";
}


// make sure the nav always appears on desktop

function displayNav(){
    if ($(document).width()>=961 && !$('body').hasClass('url_index')) {
        $('.main-nav').show();
        $('.sub-nav').show();
        active = true;
        return;
    } else if ($(document).width()<=960) {
        $('.main-nav').hide();
        $('.sub-nav').hide();
        $('.hamburger').removeClass('active').addClass('inactive');
    }
}


// make the hero box fill the viewport



function adjustHeight() {
    var headerOffset = $('.site-header').outerHeight() + 'px';
    var a = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    var viewportHeight = a;

    $('.hero').css({
        'height': viewportHeight+'px',
        'margin-top': '-' + headerOffset
    });

    if($(document).width()>=960){
        $('.hero').css({
        'margin-top': '-' + headerOffset
    });
    } else{
        $('.hero').css({
        'margin-top': '0'
    });
    }
}


function offsetContent(){
    var navHeight = $('.site-header').outerHeight();

    if($(document).width()>=960){
        $('.wrapper').css({
            'padding-top':navHeight
        });
    } else{
        $('.wrapper').css({
            'padding-top':'0'
        });
    }
}

function scrollClass(ev){
    if(window.pageYOffset>1){
        $('.site-header').addClass('scrolled');
    } else {
        $('.site-header').removeClass('scrolled');
    }
}




function offsetSubnav(){
    var mainNavHeight = $('.main-nav').outerHeight();

    if($(document).width()<=960){
        $('.sub-nav').css({
            'top' : mainNavHeight + 'px'
        });
    } else{
        $('.sub-nav').css({
            'top' : 'auto'
        });
    }
}

function responsiveCallouts(){
    var cWidth = $('.col-3-call-outs li').outerWidth() + 'px';


    $('.col-3-call-outs li h2 .inner').css({
        'height':cWidth
    });


}


function responsiveCircleList(){
    var circleWidth = $('.circle-list a').outerWidth() + 'px';
    var circleContainer = $('.circle-list').width();
    var circleMargin = (6.6666667 * circleContainer) / 100 + 'px';

    $('.circle-list a').css({
        'height':circleWidth,
        'line-height':circleWidth
    });

    $('.circle-list li').css({
        'margin-bottom':circleMargin
    });
}


function stickySidebar(){


    if($(document).width()>=961){
        var headerHeight = $('.site-header').outerHeight() + 48;


        $(".aside").stick_in_parent({
            offset_top: headerHeight
        });
    } else{
        $(".aside").trigger("sticky_kit:detach");
    }

}


function removeHomeSubnav(){
    if( $('body').hasClass('url_index') || $('body').hasClass('url_pages_contact_index') ){
        $('.sub-nav').remove();
    }
}


//--------------------------------------------------------------------------------------------------------------
// DOCUMENT READY

$(function(){


    window.onscroll=scrollClass;

    // remove wrapped image p's
    $('.md-content img').each(function(){
        $(this).insertBefore( $(this).parent() );
        $(this).next().remove();
    });

    // replace wrapped code p's
    $('.md-content code').each(function(){
        $(this).insertBefore( $(this).parent() );

        $(this).next().remove();
        $(this).wrap('<pre></pre>');
    });

    //responsive videos

    $(".video-container").fitVids();

    // SVG fallback
    svgeezy.init(false, 'png');


    //floating form labels

    $(".contourField input").focus(function() {
        $(this).parent().addClass("floating-placeholder-float");

    });

    $(".contourField input").blur(function() {
        var textValue = $(this).val();

        if( textValue === '' ){
            $(this).parent().removeClass("floating-placeholder-float");
        }
    });



    // scroll arrow
    $('.icon-scroll').click(function() {
        var target = $('main.content');

        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
    });




    // mobile toggle

    $('.hamburger').click(function() {
        //$('.main-nav.top-level').toggleClass('on');



        if( $(this).hasClass('disabled') ){
            return;
        } else if (active === true) {


            $('.hamburger').removeClass('inactive').addClass('active');
            active = false;

            $('.main-nav').fadeIn(300);
            $('.sub-nav').fadeIn(300);
            $('body').addClass('nav-open');


            return;
        } else {
            $('.hamburger').removeClass('active').addClass('inactive');
            active = true;

            $('.main-nav').fadeOut(300);
            $('.sub-nav').fadeOut(300);
            $('body').removeClass('nav-open');




            return;
        }
    });

    $( ".main-nav a, .secondary-nav a" ).hover(

      function() {
        $( this ).parent().siblings().addClass( "hover" );

      }, function() {
        $( this ).parent().siblings().removeClass( "hover" );
      }
    );














}); // END DOCUMENT READY




//--------------------------------------------------------------------------------------------------------------
// WINDOW LOAD

$(window).load(function() {

    removeHomeSubnav();

    // make sure nav is closed
    $('body').removeClass('nav-open');


    offsetSubnav();


    // initialise hero box
    adjustHeight();

    responsiveCallouts();

    //set the circle list width and line hight
    responsiveCircleList();

    offsetContent();

    stickySidebar();




}); // END WINDOW LOAD



//--------------------------------------------------------------------------------------------------------------
// WINDOW RESIZE

var resizeTimer;
$(window).resize(function() {
  clearTimeout(resizeTimer);



  resizeTimer = setTimeout(function() {

    //make sure the nav always displays on desktop
    displayNav();


    offsetSubnav();

    // initialise hero box
    adjustHeight();

    responsiveCallouts();

    //set the circle list width and line hight
    responsiveCircleList();

    offsetContent();

    stickySidebar();





  }, 600);
});  // END WINDOW RESIZE