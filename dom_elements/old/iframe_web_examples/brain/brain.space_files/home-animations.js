const all_icon_lottie_wrappers = document.querySelectorAll('.lottie-list-item');
const mm = gsap.matchMedia();
// const texts = [
//
//
//
//     'Creating a future of hyper-personalized solutions and services based on your unique brain',
//     'The products of the future will be hyper-personalized and based on your brain',
//     'We are brain.space<br>The brain data company',
//
// ];
(function (){





    SmoothScroll({
        // Scrolling Core
        animationTime    : 1500, // [ms]
        stepSize         : 100, // [px]

        // Acceleration
        accelerationDelta : 50,  // 50
        accelerationMax   : 3,   // 3

        // Keyboard Settings
        keyboardSupport   : true,  // option
        arrowScroll       : 50,    // [px]

        // Pulse (less tweakable)
        // ratio of "tail" to "acceleration"
        pulseAlgorithm   : true,
        pulseScale       : 7,
        pulseNormalize   : 1,

        // Other
        touchpadSupport   : false, // ignore touchpad by default
        fixedBackground   : true,
        excluded          : ''
    } )



    /**
     * Hero video blurs out
     */

    const hero_vid_to_blur_tl = gsap.timeline({
scrollTrigger:{
    trigger:'.hero',
   // markers:true,
    start:'bottom bottom',
    end:'bottom 30%',
    scrub:true
}
    });
    timelines.push(hero_vid_to_blur_tl);
    hero_vid_to_blur_tl.to('.hero_home ',{filter:'blur(30px)' , transform:'scale(.9)'});




    /**
     * Circles loop
     */


    const dist_to_move = function (){
        const el = document.querySelector('html');
        const style = window.getComputedStyle(el, null).getPropertyValue('font-size');
        const fontSize = parseFloat(style);

        //alert(38.1*fontSize);

        const units = (window.innerWidth<1024)?21.336: 38.1;


        const x = gsap.getProperty(".img-scroller", "x");
        return x +units*fontSize;
    }


    const circle_tl = gsap.timeline({
        repeat: -1,
        scrollTrigger:{
            trigger:'.circular-an-stage',
           // scrub:true,
            //markers:true
        }
    });
    timelines.push(circle_tl);

    const move_to = (document.querySelector('.img-scroller').scrollWidth - document.querySelector('.circular-an-stage').offsetWidth );


    for(let i=0;i<6;i++){
        circle_tl.to('.img-scroller',{duration:2,x:dist_to_move,ease:Power4.easeInOut},'+=1');
        // circle_tl.add(function (){
        //     const first_set_of_circles =   document.querySelector('.circular-an-stage img:first-child');
        //     document.querySelector('.circular-an-stage').append(first_set_of_circles);
        // })
    }

    window.addEventListener('resize',function (){


        circle_tl.seek(0);
        circle_tl.invalidate();
       // circle_tl.pause();
    })
   // circle_tl.to('.img-scroller',{duration:35,x:-move_to,ease:Linear.easeNone});
    // circle_tl.add(function (){
    //     const first_set_of_circles =   document.querySelector('.circular-an-stage img:first-child');
    //     document.querySelector('.circular-an-stage').append(first_set_of_circles);
    // })


    /**
     * Interoducing bg animation
     */


    VANTA.FOG({
        el: "#shapes-bg-1",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,

        highlightColor: 0xcfbee4,
        midtoneColor: 0xe3f8a9,
        lowlightColor: 0xf8e2d2,
        baseColor: 0xa7aeb9,
        blurFactor: 0.90,
        speed: 3.00,
        zoom: 2
    })



    /**
     * Helmet PNG SQUNCE
     *
     */


    // var animation = bodymovin.loadAnimation({
    //     container: document.querySelector('.introduction .sq-img'), // Required
    //     path: style_sheet_url+'/assets/helmet_lottie/data.json', // Required
    //     renderer: 'canvas', // Required
    //     loop: true, // Optional
    //     autoplay: true, // Optional
    //     name: "Hello World", // Name for future reference. Optional.
    // })


    //preload hekmet images before lottie init


    let loaded = 0;

        for(let i=0;i<151;i++){

            const image = document.createElement('img'); // or new Image()

            image.onload = function() {
                loaded++;
                if(loaded==75){
                    do_helmet_lottie();
                }
            };
            const imgUrl = `${style_sheet_url}/assets/helmet_lottie/webp/img_${i}.webp`;
            //console.log(imgUrl);
            image.src = imgUrl;
        }





function do_helmet_lottie(){
            document.querySelector('#helmet-lottie-holder').classList.add('no-helmet');
    LottieScrollTrigger({
        target: "#helmet-lottie",
        path: style_sheet_url+'/assets/helmet_lottie/data.json',
        speed: "medium",
        renderer : 'svg',
        scrub: 2 // seconds it takes for the playhead to "catch up"
// you can also add ANY ScrollTrigger values here too, like trigger, start, end, onEnter, onLeave, onUpdate, etc. See https://greensock.com/docs/v3/Plugins/ScrollTrigger
    });
}


    /**
     * Helmet Scrolled
     *
     */



    /**
     * Brain insights area
     */



    let grad_tl = gsap.timeline({repeat:-1,yoyo:true});
    timelines.push(grad_tl);

  //  grad_tl.to('.insights-bg',{duration:1,transform:'scale(2, 1.5)'})
    let cc = false;
    // let grad_type = function (){
    //     if(cc){
    //         return '#FFC3BE 0deg, #CED2FB 39.19deg, #C5E3FF 95.62deg, #BEEFF8 150.61deg, #B7F9F0 208.13deg, #F7FFC7 253.13deg, #FFE7D2 300deg, #FFD6CE 328.25deg, #FFC3BE 360deg), conic-gradient(from 176.66deg at 46.1% 33.87%, #E7E2F0 0deg, #95BFE8 39.19deg, #A3DEFF 104.7deg, #77A8F4 150.61deg, #6C89F0 210.89deg, #DAD4D4 272.3deg, #FFBBB4 314.64deg, #EFD4DB 328.25deg, #E7E2F0 360deg';
    //     }else {
    //         return '#C1A4FF -52.5deg, #ADA6FF 86.25deg, #A3B1FF 195deg, #C1A4FF 307.5deg, #ADA6FF 446.25deg';
    //     }
    // };
    const grads = [

        '#C1A4FF -52.5deg, #ADA6FF 86.25deg, #A3B1FF 195deg, #C1A4FF 307.5deg, #ADA6FF 446.25deg',
        '#A1AAFF -52.5deg, #6FA8FF 86.25deg, #7BBFFF 195deg, #A1AAFF 307.5deg, #6FA8FF 446.25deg',
        '#7BEBFF -5.63deg, #B6C6FF 24.38deg, #79BEFF 198.75deg, #7BEBFF 354.37deg, #B6C6FF 384.38deg',
        '#B7F9F0 -97.5deg, #BAE7F5 150.61deg, #B7F9F0 208.13deg, #B7F9F0 262.5deg, #BAE7F5 510.61deg',
        '#B7F9F0 -52.5deg, #BDFFC7 86.25deg, #B8FFA6 195deg, #B7F9F0 307.5deg, #BDFFC7 446.25deg',
        '#D0F9B7 -52.5deg, #D5FCDD 86.25deg, #F7FFC7 195deg, #D0F9B7 307.5deg, #D5FCDD 446.25deg',
        '#E5FFAF -52.5deg, #F4FFB1 86.25deg, #FFEDD2 195deg, #E5FFAF 307.5deg, #F4FFB1 446.25deg',
        '#FFD6CE -31.75deg, #F7FFC7 253.13deg, #FFE7D2 300deg, #FFD6CE 328.25deg, #F7FFC7 613.12deg',
        '#FFD6CE -31.75deg, #FFECC7 253.13deg, #FFE7D2 300deg, #FFD6CE 328.25deg, #FFECC7 613.12deg',
        '#FFE7D2 -31.75deg, #FFD6CE 253.13deg, #FFC3BE 300deg, #FFE7D2 328.25deg, #FFE7D2 613.12deg',


    ];

    const icons_jsons_names = [
        'l-1',
        'l-2',
        'l-3',
        'l-4',
        'l-5',
        'l-6',
        'l-7',
        'l-8',
        'l-9',
        'l-10'
    ]

    const icon_lottie_animations=[];
    const icons_jsons_folder = style_sheet_url+'/assets/icons_lottie/';

    for(let i=0;i<10;i++){

        const target = document.getElementById(`icon-${i}`);
        animation = lottie.loadAnimation({
            container: target,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: `${icons_jsons_folder}l-${i}.json`


        });
        animation.setSpeed(3)
        icon_lottie_animations.push(animation);
    }
    mm.add("(min-width: 1024px)", () => {

        /**
         * Icons lottie
         */




        all_icon_lottie_wrappers.forEach(function (el,ind){
            el.addEventListener('mouseenter',function (e){

                const lottie_id = this.id.split('lottie-list-item-')[1];
                //  icon_lottie_animations[ind].reset();
                if(icon_lottie_animations[ind].isPaused ){
                    icon_lottie_animations[ind].goToAndPlay(0);
                }



            })

            el.addEventListener('mouseleave',function (e){

                const lottie_id = this.id.split('lottie-list-item-')[1];
                for(let i=0;i<10;i++){
                    //icon_lottie_animations[i].pause();
                }


            })
        })
        let grad_type = '#FFC3BE 0deg, #CED2FB 39.19deg, #C5E3FF 95.62deg, #BEEFF8 150.61deg, #B7F9F0 208.13deg, #F7FFC7 253.13deg, #FFE7D2 300deg, #FFD6CE 328.25deg, #FFC3BE 360deg), conic-gradient(from 176.66deg at 46.1% 33.87%, #E7E2F0 0deg, #95BFE8 39.19deg, #A3DEFF 104.7deg, #77A8F4 150.61deg, #6C89F0 210.89deg, #DAD4D4 272.3deg, #FFBBB4 314.64deg, #EFD4DB 328.25deg, #E7E2F0 360deg';

        document.querySelector('.brain-insights').addEventListener('mousemove', function (event) {
            let bounds = document.querySelector('.insights').getBoundingClientRect();
            windowWidth = $(window).width();
            windowHeight = $(window).height();

            mouseXpercentage = Math.round(event.pageX / windowWidth * 100);
            mouseYpercentage = ((event.pageY - window.scrollY - bounds.top) / document.querySelector('.insights').offsetHeight * 100);


            //let y = e.clientY - bounds.top;

            // console.log(mouseYpercentage)


            // gsap.to('.insights ',2,{
            //     'background':`conic-gradient(from 3.1416rad at ${mouseXpercentage}% ${mouseYpercentage}%, #FAD3CF, #C4E3FF,#B8F7F2,#ADFFDE,#FFFFC4,#FFDED6,#FFBDB8,#FAD3CF)`
            //     ,ease:Power4.easeOut })

            const color = ['red', 'blue', 'pink'];


            const the_color_id = Math.floor(Math.random() * 2);
            const color_a = color[the_color_id];
            // console.log(color_a);


            // if(!cc){
            // }else {
            //     grad_type = '#C1A4FF -52.5deg, #ADA6FF 86.25deg, #A3B1FF 195deg, #C1A4FF 307.5deg, #ADA6FF 446.25deg';
            // }

            gsap.to('.insights-bg', 1, {

                'background': `conic-gradient(from 176.66deg at ${mouseXpercentage}% ${mouseYpercentage}%, ${grad_type})`

            });


            all_icon_lottie_wrappers.forEach(function (el, ind) {

                el.addEventListener('mouseenter', function () {

                    let this_id = this.id;
                    this_id = this_id.split('lottie-list-item-')[1];

                    console.log(grads[this_id]);
                    grad_type = grads[this_id];
                })

                el.addEventListener('mouseleave', function () {
                    // grad_type= '#FFC3BE 0deg, #CED2FB 39.19deg, #C5E3FF 95.62deg, #BEEFF8 150.61deg, #B7F9F0 208.13deg, #F7FFC7 253.13deg, #FFE7D2 300deg, #FFD6CE 328.25deg, #FFC3BE 360deg), conic-gradient(from 176.66deg at 46.1% 33.87%, #E7E2F0 0deg, #95BFE8 39.19deg, #A3DEFF 104.7deg, #77A8F4 150.61deg, #6C89F0 210.89deg, #DAD4D4 272.3deg, #FFBBB4 314.64deg, #EFD4DB 328.25deg, #E7E2F0 360deg';

                })

            })


        })

    });

    mm.add("(max-width: 1023px)", () => {

        const grdsctl = gsap.timeline({
            scrollTrigger:{
                trigger:'.insights  .icons_captions',
                scrub:true,
                //markers:true,
                start:'20% bottom'
            }
        })
        //conic-gradient(from 176.66deg at 46.1% 33.87%, #FFC3BE 0deg, #CED2FB 39.19deg, #C5E3FF 95.62deg, #BEEFF8 150.61deg, #B7F9F0 208.13deg, #F7FFC7 253.13deg, #FFE7D2 300deg, #FFD6CE 328.25deg, #FFC3BE 360deg), conic-gradient(from 176.66deg at 46.1% 33.87%, #E7E2F0 0deg, #95BFE8 39.19deg, #A3DEFF 104.7deg, #77A8F4 150.61deg, #6C89F0 210.89deg, #DAD4D4 272.3deg, #FFBBB4 314.64deg, #EFD4DB 328.25deg, #E7E2F0 360deg)

        grdsctl.to('.insights-bg',{

            'background': `conic-gradient(from 176.66deg at 46.1% 33.87%,#C1A4FF -52.5deg, ${grads[1]})`

        })
        grdsctl.to('.insights-bg',{

            'background': `conic-gradient(from 176.66deg at 46.1% 33.87%,#E5FFAF -52.5deg,  ${grads[2]})`

        })
        grdsctl.to('.insights-bg',{

            'background': `conic-gradient(from 176.66deg at 46.1% 33.87%,#E5FFAF -52.5deg,  ${grads[3]})`

        })
        grdsctl.to('.insights-bg',{

            'background': `conic-gradient(from 176.66deg at 46.1% 33.87%,#E5FFAF -52.5deg,  ${grads[4]})`

        })


        all_icon_lottie_wrappers.forEach(function (el,ind){

            const fr =  icon_lottie_animations[ind] ;
            console.log(fr )
                    icon_lottie_animations[ind].goToAndStop(90,true);

        })
    })


    /**
     * Ecosystem list animation and scroll
     */

    const cards = document.querySelectorAll('.ecosystem ul li');
    const cards_entrance_tl = gsap.timeline({
        scrollTrigger:{
            //markers:true,
            trigger:'.ecosystem .two-columns',
            start:'top 90%'
        }

    });
    timelines.push(cards_entrance_tl);
    cards_entrance_tl.to('.ecosystem ul li',{duration:1,opacity:1,transform:'translateX(0) scale(1)',ease: "power4.inOut", stagger:0.1});


    function get_move(){
        const screen_width = window.innerWidth;
        const element_width = document.querySelector('.ecosystem .two-columns').scrollWidth;
        const  elRect = document.querySelector('.ecosystem .two-columns').getBoundingClientRect();
        const element_offsetLeft =elRect.left;
        const how_much_to_move = element_width - screen_width +element_offsetLeft ;

        return -how_much_to_move;
    }



    const eco_slide = new Splide('.eco-slides',{
        breakpoints:{
            9999:{
                destroy:true
            },
            1023:{
                destroy: false,
                arrows:false,
                perPage:1,
                padding:{ left: '2rem', right: '2rem' }



            }
        }
    }).mount();

    const workflow_slide = new Splide('.workflow-splide',{
        breakpoints:{
            9999:{
                destroy:true
            },
            1023:{
                destroy: false,
                arrows:false,
                perPage:1,
                padding:{ left: '2rem', right: '2rem' },
                gap:'3rem'



            }
        }
    }).mount();



    function get_scroll_move(){
        const screen_width = window.innerWidth;
        const element_width = document.querySelector('.ecosystem .slider-vis-track').scrollWidth;
        const  elRect = document.querySelector('.ecosystem .slider-vis-track').getBoundingClientRect();
        const element_offsetLeft =elRect.left;
        const how_much_to_move = element_width - document.querySelector('.ecosystem .slider-vis-track .slider-knob').scrollWidth ;

        return how_much_to_move;
    }




    mm.add("(min-width: 1024px)", () => {

        const cards_scroll_tl = gsap.timeline({
            scrollTrigger: {


                trigger: '.ecosystem .basic-grid',
                scrub: true,
                pin: '.ecosystem',
                end: `+=200% top'`,
                invalidateOnRefresh: true
            }
        });

        cards_scroll_tl.to('.ecosystem .two-columns', {x: get_move, ease: Linear.easeNone,duration:1});
       // cards_scroll_tl.to('.ecosystem .two-columns', {x: get_move, ease: Linear.easeNone});
        cards_scroll_tl.to('.ecosystem .slider-knob', {x: get_scroll_move, ease: Linear.easeNone,duration:1},'-=1');

        const cards_scroll_knob_tl = gsap.timeline({
            scrollTrigger: {


                trigger: '.ecosystem .basic-grid',
                scrub: true,

                end: `+=200% top'`,
                invalidateOnRefresh: true
            }
        });

      // cards_scroll_knob_tl.to('.ecosystem .slider-knob', {x: get_scroll_move, ease: Linear.easeNone});


    });
    // mm.add("(max-width: 1023px)", () => {
    //     const cards_scroll_tl = gsap.timeline({
    //         scrollTrigger: {
    //
    //
    //             trigger: '.ecosystem .eco-slides',
    //             scrub: true,
    //             pin: '.ecosystem .eco-slides',
    //             end: `+=500% top'`,
    //             invalidateOnRefresh: true
    //         }
    //     });
    //
    //     cards_scroll_tl.to('.ecosystem .two-columns', {x: get_move, ease: Linear.easeNone});
    //
    // });


    /**
     *
     * workflow animation
     *
     */

    mm.add("(min-width: 1024px)", () => {

        const wftl = gsap.timeline({repeat:2,
            scrollTrigger:{
                trigger:'.home_bdaas_journey_copy .list-items',
               // markers:true,
                start:'top 80%',

            }
        })

        wftl.to('.home_bdaas_journey_copy .list-items li .title-container',{duaration:.3,scale:1.05,stagger: .3});
        wftl.to('.home_bdaas_journey_copy .list-items li .title-container',{duaration:.3,scale:1,stagger: .3},'-=.6');


        timelines.push(wftl);
    })




})();


function LottieScrollTrigger(vars) {
    let playhead = {frame: 0},
        target = gsap.utils.toArray(vars.target)[0],
        speeds = {slow: "+=2000", medium: "+=1000", fast: "+=500"},
        st = {trigger: '#helmet-lottie-holder',start: "top bottom", end:'bottom bottom',scrub: true},
        ctx = gsap.context && gsap.context(),
        animation = lottie.loadAnimation({
            container: target,
            renderer: vars.renderer || "svg",
            loop: false,
            autoplay: false,

            path: vars.path,
            rendererSettings: vars.rendererSettings || { preserveAspectRatio: 'xMidYMid slice' }
        });
    for (let p in vars) { // let users override the ScrollTrigger defaults
        st[p] = vars[p];
    }
    animation.addEventListener("DOMLoaded", function() {
        let createTween = function() {
            animation.frameTween = gsap.to(playhead, {
                frame: animation.totalFrames - 1,
                ease: "none",

                onUpdate: () => animation.goToAndStop(playhead.frame, true),
                scrollTrigger: st
            });
            return () => animation.destroy && animation.destroy();
        };
        ctx && ctx.add ? ctx.add(createTween) : createTween();
        // in case there are any other ScrollTriggers on the page and the loading of this Lottie asset caused layout changes
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
    });
    return animation;
}