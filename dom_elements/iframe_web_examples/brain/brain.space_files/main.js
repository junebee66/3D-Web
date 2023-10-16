const timelines = [];
const sliders =[];
(function (){

    /**
     * Header news menu
     */

    const header_news_splide = new Splide('.news-splide',{
        arrows:false,
        pagination:false,
        autoplay:true,
        type:'loop',
        direction:'ttb',
        height:'1.7rem',
        autoHeight:true,
        autoWidth:true
    }).mount();

    /**
     * Hero text animation
     */

        // document.querySelector('h1').textContent='';

if (typeof texts !== 'undefined') {
    let text_tl =  gsap.timeline({repeat:-1});
    timelines.push(text_tl);
    text_tl.add(function () {
        document.querySelector('.hero h1').classList.add('hide-cursor');
    }, '+=.3');
	
if(texts.length>1) {
    texts.forEach(function (el, ind) {

        text_tl.to('.hero h1', {duration: .5, transform: 'translateY(-5rem)', opacity: 0, ease: Power4.easeOut}, '+=4');
        text_tl.set('.hero h1', {text: '', transform: 'translateY(0)', opacity: 1});
        text_tl.add(function () {
            document.querySelector('.hero h1').classList.remove('hide-cursor');
        });
        text_tl.to('.hero h1', {duration: 5, text: el, ease: Linear.easeNone}, '+=.3');


    })
}
}
    function set_vh(){


        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);

    }

    set_vh();

    // addEventListener("resize", (event) => {
    //     set_vh();
    //     //set_video();
    // });



    function set_video(){
        const videos = document.querySelectorAll('.vid-con');
        videos.forEach(function (el,ind){
            if(el.classList.contains('vid-added')) {
                const t_video = el.querySelector('video');

                const srcs = t_video.querySelectorAll('source');
                srcs.forEach(function (el1,ind1){
                   // el1.setAttribute('src','');
                    t_video.setAttribute('src','data-mobile-mp4');

                    el1.parentNode.removeChild(el1);
                })


                if(window.screen.width>700){
                    const source = document.createElement('source');
                    source.setAttribute('src', t_video.getAttribute('data-src'));
                    source.setAttribute('type', 'video/webm');
                   // t_video.appendChild(source);

                }else{

                    if(t_video.getAttribute('data-mobile-mp4')!=''){
                        const mp4_source = document.createElement('source');
                        mp4_source.setAttribute('src', t_video.getAttribute('data-mobile-mp4'));
                        mp4_source.setAttribute('type', 'video/mp4');
                      //  t_video.appendChild(mp4_source);


                    }
                    if(t_video.getAttribute('data-mobile-webm')!='') {
                        const webm_source = document.createElement('source');
                        webm_source.setAttribute('src', t_video.getAttribute('data-mobile-webm'));
                        webm_source.setAttribute('type', 'video/webm');
                        t_video.appendChild(webm_source);
                    }
                }
                t_video.load();
                t_video.play();

            }
        });
    }


    /**
     * Lazy load vids
     */

    const videos = document.querySelectorAll('.vid-con');
    videos.forEach(function (el,ind){

        const par = el.closest('.content-image');


            ScrollTrigger.create({
                trigger:par,
                // markers:true,
                start:'-100% bottom',
                onEnter:()=>{
                    if(!el.classList.contains('vid-added')) {
                        el.classList.add('vid-added');
                       const t_video = el.querySelector('video');



                       if(window.innerWidth>700||(t_video.getAttribute('data-mobile-mp4')==''&&t_video.getAttribute('data-mobile-webm')=='')){
                           const source = document.createElement('source');
                           source.setAttribute('src', t_video.getAttribute('data-src'));
                           source.setAttribute('type', 'video/webm');
                           t_video.appendChild(source);
                       }else{


                               if (t_video.getAttribute('data-mobile-mp4') != '') {
                                   const mp4_source = document.createElement('source');
                                   mp4_source.setAttribute('src', t_video.getAttribute('data-mobile-mp4'));
                                   mp4_source.setAttribute('type', 'video/mp4');
                                   t_video.appendChild(mp4_source);

                               }
                               if (t_video.getAttribute('data-mobile-webm') != '') {
                                   const webm_source = document.createElement('source');
                                   webm_source.setAttribute('src', t_video.getAttribute('data-mobile-webm'));
                                   webm_source.setAttribute('type', 'video/webm');
                                   t_video.appendChild(webm_source);

                                }
                       }

                    }
                }

            })








    })

    const videos_with_loops = document.querySelectorAll('.vid-with-loop-con');
    videos_with_loops.forEach(function (el,ind){




        el.querySelector('.play').addEventListener('click',play_vid);

        const par = el.closest('.content-image');



        function play_vid(e){

            let el = e.target.closest('.vid-with-loop-con');
            el.querySelector('.loop-long-switch').classList.add('playing');
            const t_l_video = el.querySelector('video');
            t_l_video.muted =false;
            t_l_video.loop =false;
            const t_l_mp4_source = el.querySelector('source[type="video/mp4"]');
            t_l_mp4_source.setAttribute('src', t_l_video.getAttribute('data-mp4'));


            const t_l_webm_source = el.querySelector('source[type="video/webm"]');
            t_l_webm_source.setAttribute('src', t_l_video.getAttribute('data-webm'));

            t_l_video.load();
            t_l_video.controls = true;
            //t_l_mp4_source.setAttribute('type', 'video/mp4');
            // t_l_video.appendChild(t_l_mp4_source);

            e.target.classList.add('stop');
            e.target.removeEventListener('click',play_vid);
            e.target.addEventListener('click',onLoopEnded);

            t_l_video.addEventListener('ended',onLoopEnded);
            t_l_video.addEventListener('play',removeLoading);

            el.querySelector('.loop-long-switch').classList.add('loading');


        }

        function removeLoading(e){
            let el = e.target.closest('.vid-with-loop-con');
            el.querySelector('.loop-long-switch').classList.remove('loading');

        }
        function onLoopEnded(e){


            let el = e.target.closest('.vid-with-loop-con');
            el.querySelector('.loop-long-switch').classList.remove('playing');
            const t_l_video = el.querySelector('video');
            const mp4_source = el.querySelector('source[type="video/mp4"]');
            mp4_source.setAttribute('src', t_l_video.getAttribute('data-loop-mp4'));

            const webm_source = el.querySelector('source[type="video/webm"]');
            webm_source.setAttribute('src', t_l_video.getAttribute('data-loop-webm'));
            t_l_video.loop =true;
            t_l_video.muted =true;
            t_l_video.load();

            el.querySelector('.loop-long-switch button').classList.remove('stop');
            el.querySelector('.loop-long-switch button').removeEventListener('click',onLoopEnded);
            el.querySelector('.loop-long-switch button').addEventListener('click',play_vid);

            t_l_video.removeEventListener('ended',onLoopEnded);
            t_l_video.addEventListener('play',removeLoading);

            t_l_video.controls = false;

            el.querySelector('.loop-long-switch').classList.add('loading');
        }

        ScrollTrigger.create({
            trigger:par,
            // markers:true,
            start:'-100% bottom',
            onEnter:()=>{
                if(!el.classList.contains('vid-added')) {
                    el.classList.add('vid-added');
                    const t_video = el.querySelector('video');






                       // if (t_video.getAttribute('data-loop-mp4') != '') {
                            const mp4_source = document.createElement('source');
                            mp4_source.setAttribute('src', t_video.getAttribute('data-loop-mp4'));
                            mp4_source.setAttribute('type', 'video/mp4');
                            t_video.appendChild(mp4_source);

                     //   }
                     //   if (t_video.getAttribute('data-loop-webm') != '') {
                            const webm_source = document.createElement('source');
                            webm_source.setAttribute('src', t_video.getAttribute('data-loop-webm'));
                            webm_source.setAttribute('type', 'video/webm');
                            t_video.appendChild(webm_source);

                      //  }


                }
            }

        })








    })


    //Header
    const mm = gsap.matchMedia();
    const header = document.querySelector('header');

    mm.add("(min-width: 1024px)", () => {

        let prevScrollPos = window.pageYOffset;
        console.log(prevScrollPos)

        window.addEventListener('scroll', (e) => {

            const currentScrollPos = (window.pageYOffset);
            const currentScrollPos2 = -(window.pageYOffset);
            //document.querySelector('.row-menu').style.transform = `translateY(${currentScrollPos2}px)`;

            if (window.scrollY > 300) {
                document.getElementById('mobile-menu-btn').classList.add('show');

            }else{
                document.getElementById('mobile-menu-btn').classList.remove('show');
            }
            //
            // header.classList.remove('menu-entered');
            //
            //
            // const currentScrollPos = window.pageYOffset;
            //
            // if (window.scrollY > 100) {
            //     if (header.classList.contains('show')) {
            //         header.classList.remove('show')
            //     }
            //     header.classList.add('hide')
            // }else{
            //     header.classList.add('show');
            //     header.classList.remove('hide')
            //     //     header.classList.remove('hide');
            // }
            //
            // // if (prevScrollPos > currentScrollPos) {
            // //     //console.log('show')
            // //
            // //     header.classList.add('show');
            // //     header.classList.remove('hide');
            // // } else {
            // //   //  console.log('hide')
            // //
            // //     header.classList.remove('show');
            // //     header.classList.add('hide');
            // // }
            // prevScrollPos = currentScrollPos;

        })


    })

    // mm.add("(max-width: 1024px)", () => {
    //
    // })

    document.getElementById('mobile-menu-btn').addEventListener('click', ()=>{
        if(header.classList.contains('menu-opened')){
            header.classList.remove('show');

            document.querySelector('body').classList.remove('bfixed');
            const sp = document.querySelector('body').getAttribute('data-scroll-pos');
            window.scrollTo(0, sp); // values are x,y-offset
           // window.removeEventListener('scroll', disableScroll);

        } else {
            header.classList.add('show');
            let prevScrollPos = window.pageYOffset;
            document.querySelector('body').style.top = -prevScrollPos+'px';
            document.querySelector('body').setAttribute('data-scroll-pos',prevScrollPos);
            document.querySelector('body').classList.add('bfixed');
           // alert();
           // window.addEventListener('scroll', disableScroll);
           // window.addEventListener('scroll', disableScroll);
        }
    })






    /**
     * Cursor
     */
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove',function (e){

        // cursor.style.left = (e.pageX-10)+'px';
        //
        // cursor.style.top = (e.pageY-10)+'px';

        let cx = e.pageX-10;
        let cy =e.pageY-window.scrollY-10
      //  console.log(cx)
       // console.log(cy)
        //cursor.style.transform = `translate(${cx}px,${cy}px)`
        gsap.set(cursor,{x:e.pageX-10,y:e.pageY-window.scrollY-10})

    })

    const hover_elemets = document.querySelectorAll('a,button,section.insights .brain-insights ul.icons_captions.vertical li');

    hover_elemets.forEach(function (el,ind){
        el.addEventListener('mouseover',function (){
            gsap.to(cursor,{duration:.2,scale:2.5})
        })
    })
    hover_elemets.forEach(function (el,ind){
        el.addEventListener('mouseleave',function (){
            gsap.to(cursor,{duration:.2,scale:1})
        })
    })

    /**
     * cookie policy
     */

    const ccs = getCookie('ccs');


    if(!ccs){
        document.querySelector('.cookie-policy-modal').classList.add('show');
    }

        document.getElementById('close-cb').addEventListener('click', function (e) {
           // setCookie('ccs', true, 30);
            document.querySelector('.cookie-policy-modal').classList.remove('show');
        })


        document.getElementById('accept-cookies').addEventListener('click',function (e){
            setCookie('ccs', true, 30);
            document.querySelector('.cookie-policy-modal').classList.remove('show');
        })

}());

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// window.addEventListener('load',gh);
//
// function gh(){
//     alert();
// }

function disableScroll(e){
    e.preventDefault();

}