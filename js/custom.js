$(function() {
    // load file
    // $('header').load('header.html'); 
    $('footer').load('footer.html'); 

    $fix_nav = $('header .nav_area').offset().top;
    $(window).on('scroll',function(){
        if($fix_nav < $(window).scrollTop()){
            $('.nav_area').addClass('fixed');
        }else{
            $('.nav_area').removeClass('fixed');
        }

        if($(window).scrollTop() > 1){
            $('.q_nav_area').addClass('active');
        }else{
            $('.q_nav_area').removeClass('active');
        }
    });


    $('.top_ban_area .btn_x').on('click',function(){
        $(this).parents('.top_ban_area').hide();
    });

    $('.q_nav_area .btn_top').on('click',function(){
        $('html, body').animate({scrollTop:0},300);
    });
    // slide area
    $('.movie_chart .tit_area a').on('click',function(e){
        e.preventDefault();
        $('.movie_chart .tit_area a').removeClass('active');
        $(this).addClass('active');
        var $target_s = $(this).attr('data-target');
        $('.movie_chart .slide_area').removeClass('active');
        $($target_s).addClass('active');
    });

    var swiper = new Swiper(".movie .swiper", {
        slidesPerView: 2,
        spaceBetween: 30,
        navigation: {
            nextEl: ".movie .swiper-button-next",
            prevEl: ".movie .swiper-button-prev",
        },
        breakpoints: {
            // 640: {
            //   slidesPerView: 2,
            //   spaceBetween: 20,
            // },
            768: {
            slidesPerView: 5,
            spaceBetween: 32,
            slidesPerGroup: 5,
            }
        },
    });
    var swiper = new Swiper(".pre_movie .swiper", {
        slidesPerView: 5,
        spaceBetween: 32,
        slidesPerGroup: 5,
        navigation: {
            nextEl: ".pre_movie .swiper-button-next",
            prevEl: ".pre_movie .swiper-button-prev",
        },
    });

    $('.special .img_list div').on('mouseenter, click',function(e){
        e.preventDefault();
        var $btn_idx = $(this).index();
        $('.special .info_area ul li').removeClass('active');
        $('.special .info_area ul li').eq($btn_idx).addClass('active');
        $('.special .img_list div').removeClass('active');
        $(this).addClass('active');
    });

    //login
    $('.header_area .info_menu .login a').on('click',function(e){
        e.preventDefault();
        $('.login_pop_area').addClass('on');
    });
    $('.login_pop_area .bg').on('click',function(){
        $(this).parents('.login_pop_area').removeClass('on');
    });
    function navCheck(){
        // detail nav
        if($(window).width() < 768){
            // mobile left nav
            $('.info_menu .menu').on('click',function(e){
                e.preventDefault();
                $('header .nav_detail_mo').stop().animate({left:0},300);
                $('body').addClass('noscroll');
            });
            $('.nav_detail_mo .btn_x').on('click',function(){
                $('header .nav_detail_mo').stop().animate({left:'-65%'},300);
                $('body').removeClass('noscroll');
            });
        }else if($(window).width() > 768){
            // web
            $('header .nav_area .nav').on('mouseenter',function(){
                $target_nav = $('header .nav_area').hasClass('active');
                if(!$target_nav){
                    $('header .nav_detail').stop().slideDown();
                    $('header .nav_area').addClass('active');
                }else{
                    $('header .nav_detail').slideUp();
                    $('header .nav_area').removeClass('active');
                }
            });
            $('header .nav_area').on('mouseleave',function(){  
                if($(this).hasClass('active')){
                    $('header .nav_detail').stop().slideUp();
                    $('header .nav_area').removeClass('active');
                }
            });
        }
    }
    navCheck();
    $(window).resize(function(){
        navCheck();
    });
    
    
    
});


