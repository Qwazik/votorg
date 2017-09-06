//myPlugins
  ;(function($){
    $.fn.qTabs = function(){
        var global = this;
        global.find('.tabs-content__item').hide();
        global.find('.tabs-content__item.active').show();
        $(this).find('.tabs-nav li').click(function(){
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            var data = $(this).find('a').attr('href');
            $(global).find('.tabs-content__item').hide().removeClass('active');
            $(global).find('.tabs-content__item' + data + '').fadeIn(300).addClass('active');
            return false;
        })
    }
    $.fn.qToggle = function(){
        var global = this;
        $(this).click(function(e){
            e.preventDefault();
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        })
    }
    $.fn.equalHeight = function(){
        var global = this,
            maxHeigh = 0,
            tmpHeigh = 0;
        $(this).each(function(){
            tmpHeight = $(this).outerHeight();
            if(tmpHeight > maxHeigh){
                maxHeigh = tmpHeight;
            }
        })

        $(this).each(function(){
            $(this).css('min-height', maxHeigh);
        })
    }
  }(jQuery));


$(document).ready(function(){
    /* header city choise */
    var cityTimeout;
    $('.city').hover(function(){
        $(this).find('.city__list').fadeIn(300);
        clearInterval(cityTimeout);
    },function(){
        var thisEl = $(this);
        var i = 0;
        cityTimeout = setTimeout(function(){
            $(thisEl).find('.city__list').fadeOut(300);
        }, 200);  
    })
    $('.city a').click(function(){
        var currentVal = $(this).text();
        $('.city__current span').text(currentVal);

        //hide
        $('.city__list').fadeOut(300);
        clearTimeout(cityTimeout);
    })

    

    


    /* Star Rating */

    $('.star-rating').each(function(){
        var starSave = false;
        var li = $(this).find('li');

        $(li).click(function(){
            starSave = true;
        })
        $(li).hover(function(){
            var currentStar = $(this).index();
            if(!starSave){
                $(li).each(function(){
                    $(this).removeClass('active');
                })

                switch(currentStar){
                    case 4: $(li).eq(4).addClass('active')
                    case 3: $(li).eq(3).addClass('active')
                    case 2: $(li).eq(2).addClass('active')
                    case 1: $(li).eq(1).addClass('active')
                    case 0: $(li).eq(0).addClass('active')
                }
            }
        },function(){
            if(!starSave){
                $(li).each(function(){
                    $(this).removeClass('active');
                })    
            }
        })
    })

    /* header-catalog */
    //open
    var catalogTimeout;
    var catalogOpenCounter = 0;
    $('.header-catalog__button').on('mouseenter', function(){
        var thisEl = $(this);
        catalogTimeout = setInterval(function(){
            catalogOpenCounter++;
            console.log(catalogOpenCounter);
            if(catalogOpenCounter >= 3){
                $(thisEl).siblings('.header-catalog__menu').stop(true, true).fadeIn(300);   
                $('.header-catalog__menu .container > .col').equalHeight();
                clearInterval(catalogTimeout); 
            }
        }, 100)
    })

    $('.header-catalog__category a').click(function(){
        var curEl = $(this).attr('href');
        $('.header-catalog__type ul, .header-catalog__brand ul').each(function(){
            if(!($(this).attr('class') == curEl)){
                $(this).removeClass('active');
            }
        })
        $('.header-catalog__type ul.'+curEl+', .header-catalog__brand ul.'+curEl).addClass('active animated fadeIn');

        console.log(curEl);

        return false;
    })

     $('.header-catalog__button').on('click', function(){
        $(this).siblings('.header-catalog__menu').stop(true, true).fadeToggle(300);
     })

    //close
    $('.header-catalog').on('mouseleave', function(){
        $(this).find('.header-catalog__menu').stop(true, true).fadeOut(300);
        clearInterval(catalogTimeout); 
        catalogOpenCounter = 0;
    })
    /* responsive top-line menu*/
    $('.top-line__responsive-menu').click(function(){
        $(this).siblings('.top-line__menu').slideToggle(300);
    })
    $('.responsive-search').click(function(){
        $('.search').slideToggle(300);
    })

    /* cart-table */
    var cartTable = {
        main: $('#cartTable'),
        init: function(){
            $('#cartTable .num').on('keyup change', this.calcSum);
            cartTable.calcSum();
            cartTable.calcFinalSum();
        },
        calcFinalSum: function(){
            var sum = 0;
            $(this.main).find('tbody .sum').each(function(){
                sum += parseFloat($(this).text());
            })
            $(this.main).find('tfoot .sum').text(sum + ' руб');
        },
        calcSum: function(){
            $(cartTable.main).find('.num').each(function(){
                var numberValue = $(this).val(),
                price = parseFloat($(this).closest('tr').find('.price').text()),
                sum = numberValue * price;
                $(this).closest('tr').find('output').text(sum + ' руб');
                cartTable.calcFinalSum();   
                console.log('sdf'); 
            })
            
        }
    }
    cartTable.init();



    

        
    /*#############
    ### PLUGINS ###
    #############*/

    /* main-slider */
    var sliderTimeout = 5000; //main-slider timeout
    var sliderProgress = {
    el: $('#sliderProgress'),
    indicator: $('#sliderProgress .indicator'),
    sliderTimeout: sliderTimeout,
        show: function(){
            $(this.el).show();
        },
        start: function(){
            $(this.indicator).animate({
                width: '100%'
            }, sliderTimeout);
        },
        reset: function(){
            $(this.indicator).stop(true, true);
            $(this.indicator).width(0);
        }
    }

    $('#mainSlider').owlCarousel({
        autoplay: true,
        autoplayTimeout: sliderTimeout,
        loop: true,
        items: 1,
        onInitialized: function(){
            sliderProgress.show();
            sliderProgress.start();
            $('#mainSlider .owl-item.active').siblings().find('.animated').hide();
        },
        onChange: function(){
            sliderProgress.reset();
            sliderProgress.start();
        },
        onTranslated: function(){
             $('#mainSlider .owl-item.active').siblings().find('.animated').hide();
            $('#mainSlider .owl-item.active').find('.animated').show();
        },
        onDragged: function(){
            sliderProgress.reset();
            sliderProgress.start();
        }
    });

    // slider dots centered
    $('#mainSlider .owl-dots').css({
        'margin-left': -($('#mainSlider .owl-dots').width() / 2) + 'px'
    })

    /* Popular */
    $('#popularCarousel, #newsCarousel').owlCarousel({
        responsive: {
           
            1260:{
                items: 4
            },
            992:{
                items: 3
            },
            640:{
                items: 2
            },
            0:{
                items: 1
            }
        }
    })

    /* Partners */
    var partnersCarousel = $('#partnersCarousel').owlCarousel({
        dots: false,
        loop: true,
        
        responsive: {
            1260: {
                items: 6,
                slideBy: 6
            },
            1100:{
                items: 5,
                slideBy:5,
            },
            992:{
                items: 4,
                slideBy: 4
            },
            650:{
                items: 3,
                slideBy: 3
            },
            450:{
                items: 2,
                slideBy: 2
            },
            0:{
                items: 1,
                slideBy: 1
            }
        }
    })

    $('.partners__controls a').click(function(){
        if(this.className == 'next'){
            partnersCarousel.trigger('next.owl.carousel');
        }else{
            partnersCarousel.trigger('prev.owl.carousel');
        }
        return false;
    })

    $('.sidebar-filter__name.toggle').click(function(){
        $(this).siblings('.sidebar-filter__body').slideToggle();
        $(this).toggleClass('opened');
    })

    $('select, input[type="checkbox"], input[type="number"]').styler();
    //price slider
    var priceSlider = $('#priceSlider'),
        priceSliderMinValue = 0, // min slider value
        priceSliderMaxValue = 2000;  //max slider value
        priceSliderMin = $(priceSlider).siblings('.clearfix').find('.min'),
        priceSliderMax = $(priceSlider).siblings('.clearfix').find('.max'),                
        $(priceSliderMin).text(priceSliderMinValue);
        $(priceSliderMax).text(priceSliderMaxValue);
    $(priceSlider).slider({
        range: true,
        min: priceSliderMinValue,
        max: priceSliderMaxValue,
        values: [priceSliderMinValue, priceSliderMaxValue],
        slide: function(event, ui){ // событие при прокрутке
            $(priceSliderMin).text(ui.values[0]);
            $(priceSliderMax).text(ui.values[1]);
        },
        change: function(event, ui){ // финальное событие при изменении
            $(priceSliderMin).text(ui.values[0]);
            $(priceSliderMax).text(ui.values[1]);
        },
    });

    /* single -> review -> nav */
    var singlePreviewCarousel = $('#singlePreview ul').bxSlider({
        infiniteLoop:false,
        controls: false,
        mode:'vertical',
        minSlides: 3,
        slideHeight: 95,
        slideWidth: 95,
        pager: false
    });

    $('#singlePreview button').on('click', function(){
        if(this.className == 'prev'){
            singlePreviewCarousel.goToPrevSlide()
        }else{
            singlePreviewCarousel.goToNextSlide()        
        }
    })

    $('#singlePreview .single-preview__nav a').on('click', function(){
        var src = $(this).attr('href');
        console.log(src);
        $('#singlePreview .single-preview__main img').attr('src', src);
        return false;
    })

    //single magnifier
    var bigImages = [];
    $('.single-preview__nav ul img').each(function(){
        bigImages.push($(this).attr('data-biggest-image'));
    })
        console.log(bigImages);
    $('.single-preview__magnifier').click(function(){
        $.fancybox(bigImages);  
        return false;
    })

    $('#singleCharsTabs').qTabs();

})


