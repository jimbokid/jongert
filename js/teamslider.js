/*
Plugin Name: jQuery Team Slider
Author: Burak Aydin
*/

(function($) {

    $.fn.teamslider = function() {


        'use strict';

        var defaults = {

            times: 300,

        };


        var customopt = $.extend(defaults, customopt);

        var slideLeft = 240;

        var allImage = this.find('.img-inner-wrap').length;

        var currentImage = 0;

        var teamimgslider = this.find('.team-img-inner');

        var teamtextslider = this.find('.team-text-inner');

        var teamtextinner = teamtextslider.children('.text-inner-wrap');

        var imginnerwrap = this.find('.img-inner-wrap');
        $(document).ready(function() {
            $('.team-img-inner').freetile();
        });
        // }, 150)




        // this.find('.img-inner-wrap .image-wrapper').css({
        //
        // 	width:210,
        // 	height:180
        //
        // });
        //
        // if($(window).width()<992){
        //
        // 	this.find('.img-inner-wrap .image-wrapper').css({
        //
        // 		width:120,
        // 		height:120
        //
        // 	});
        //
        // }


        $('.team-wrap').find('.arrow-left').click(function() {


            currentImage--;

            if (currentImage < -1) {
                currentImage = -1;
            }

            setPosition(currentImage);

        });


        $('.team-wrap').find('.arrow-right').click(function() {

            currentImage++;

            if (currentImage >= allImage - 1) {

                currentImage = allImage - 2;

            }

            setPosition(currentImage);

        });

        $('.img-inner-wrap').on('click', function(e) {
            if ($(this).hasClass('team-shadow')) {
                return false;
            }
            var targetIndex = ($(this).index()) - 1;
            // console.log(targetIndex);
            if (targetIndex >= allImage - 1) {

                targetIndex = allImage - 2;

            }
            currentImage = targetIndex;
            setPosition(targetIndex);
        });

        if ($(window).width() < 1440) {

            slideLeft = 195;

        }

        if ($(window).width() < 767) {

            slideLeft = 290;

        }



        function setPosition(pos) {
            if ($(window).outerWidth() < 1200){
                var px = slideLeft * (pos++);
                var indexImg = pos;
            } else{
                var px = slideLeft * pos;
                var indexImg = pos + 1;
            }

            var px = slideLeft * pos;



            imginnerwrap.removeClass('team-shadow');

            imginnerwrap.eq(indexImg).addClass('team-shadow');


            teamimgslider.stop().animate({

                left: -px

            }, {
                duration: customopt.times,
                step: function() {

                    teamimgslider.freetile();
                }
            });




            // teamimgslider.children('.img-inner-wrap').find('.image-wrapper').stop().animate({
            //
            // 	width:210,
            // 	height:180
            //
            //
            // },{duration:250});
            //
            //
            //
            //
            // teamimgslider.children('.img-inner-wrap').eq(indexImg).find('.image-wrapper').stop().animate({
            //
            // 	width:450,
            // 	height:385
            //
            // },{duration:250,step:function(){
            //
            // 	teamimgslider.freetile();
            //
            // }});
            //
            //
            //
            // if($(window).width()<1200){
            //
            //
            // 	teamimgslider.children('.img-inner-wrap').eq(indexImg).find('.image-wrapper').stop().animate({
            //
            // 	width:320,
            // 	height:397
            //
            // },{duration:250,step:function(){
            //
            // 	teamimgslider.freetile();
            //
            // }});
            //
            // }
            //
            //
            // if($(window).width()<992){
            //
            //
            // 	teamimgslider.children('.img-inner-wrap').find('.image-wrapper').stop().animate({
            //
            // 	width:120,
            // 	height:120
            //
            //
            // },{duration:250});
            //
            //
            // 	teamimgslider.children('.img-inner-wrap').eq(indexImg).find('.image-wrapper').stop().animate({
            //
            // 	width:300,
            // 	height:370
            //
            // },{duration:250,step:function(){
            //
            // 	teamimgslider.freetile();
            //
            // }});
            //
            // }




            if (currentImage < 0) {

                teamtextinner.eq(0).fadeIn(300).animate({

                    marginLeft: 0

                }, {
                    duration: 300,
                    queue: false
                });



                teamtextinner.eq(1).stop().fadeOut(300).css('display', 'none');


            } else if (currentImage == allImage - 2) {

                teamtextinner.eq(allImage - 1).fadeIn(500).animate({

                    marginLeft: 0

                }, {
                    duration: 300,
                    queue: false
                });

                teamtextinner.eq(allImage - 2).fadeOut(300).css('display', 'none');

            } else {

                teamtextinner.stop().css({
                    marginLeft: 60,
                    display: 'none'
                });


                teamtextinner.eq(indexImg).stop().fadeIn(500).animate({

                    marginLeft: 0

                }, {
                    duration: 300,
                    queue: false
                });

            }


        }


        // $('.img-inner-wrap').eq(1).find('.image-wrapper').css({
        //
        // 	width:450,
        // 	height:385
        //
        // });
        //
        //
        //
        // if($(window).width()<1200){
        //
        // 	$('.img-inner-wrap').eq(1).find('.image-wrapper').css({
        //
        // 		width:320,
        // 		height:397
        //
        // 	});
        //
        // }
        //
        //
        // if($(window).width()<992){
        //
        // 	$('.img-inner-wrap').eq(1).find('.image-wrapper').css({
        //
        // 		width:300,
        // 		height:372
        //
        // 	});
        //
        // }




        if ($(window).outerWidth() < 1200) {
            teamtextinner.eq(0).css('display', 'block');
            imginnerwrap.eq(0).addClass('team-shadow');
            currentImage--;
        } else {
            teamtextinner.eq(1).css('display', 'block');
            imginnerwrap.eq(1).addClass('team-shadow');

        }



    }

})(jQuery);
