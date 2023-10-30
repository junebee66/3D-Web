(function (){

    /**
     * Text Entrance Animation
     */

    const an_elemnts = document.querySelectorAll('.d_parag_new_25  ,.logos ,.icons_captions li,.list-items li,.d_title_35 ,.image ,.d_parag_45,.d_title_70,.d_title_22,.right-column img,.d_title_55 ,.d_parag_25,.button-holder,.d_title_60:not(.ecosystem ul h3),.d_parag_30 ,  .sq-img:not(.ecosystem ul .image)');
    an_elemnts.forEach(function (el,ind){

        const med_ttl_tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scrub: true,
             //   markers:true,
                end:'bottom 80%'
            }
        });
        timelines.push(med_ttl_tl);

        med_ttl_tl.to(el,{opacity:1,transform:'translateY(0) scale(1)'})


    })

    //this has moved here from solutions.js file
    if(document.querySelector('.s-op')) {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
            const wftl = gsap.timeline({
                repeat: 2,
                scrollTrigger: {
                    trigger: '.s-op',
                  //  markers: true,
                    start: 'top 80%',

                }
            })

            wftl.to('.s-op li .title-container', {duaration: .3, scale: 1.05, stagger: .3});
            wftl.to('.s-op li .title-container', {duaration: .3, scale: 1, stagger: .3}, '-=.6');


            timelines.push(wftl);

        });
    }
})();