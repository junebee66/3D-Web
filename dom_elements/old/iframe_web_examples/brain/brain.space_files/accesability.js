var fontSetSize = 1;
var tabbableElements;
var active_timelines = [];




function stop_all_animations(){
	ScrollTrigger.getAll().forEach(ST => ST.disable());


	$(timelines).each(function(i,e){

		timelines[i].totalTime(timelines[i].duration());
		timelines[i].pause();

	});
if(document.querySelector('.eye-shape')){
	document.querySelector('.eye-shape').classList.add('no-an');
}
if(document.querySelector('.home-hero-an-stage')){
	document.querySelector('.home-hero-an-stage').classList.add('no-an');
}
for(let i=1;i<5;i++){
	if(document.querySelector('.dial-'+i)){
		document.querySelector('.dial-'+i).classList.add('no-an');
	}
}



	let footer_circ = document.querySelectorAll('.f-c');

	footer_circ.forEach(function (el,ind){

		el.classList.add('no-an');
	});



	sliders.forEach(function (el,ind){
		const autoplay = el.Components.Autoplay;
		autoplay.pause();
	})

	if(document.querySelector('section.bdass-ecosystem .product-slider-container ul.product-slider')){
		document.querySelector('section.bdass-ecosystem .product-slider-container ul.product-slider').style.display = 'block';

	}
	if(document.querySelector('.ecosystem')){
		document.querySelector('.ecosystem').style.overflow = 'scroll';

	}

}
function resume_all_animations(){

	ScrollTrigger.getAll().forEach(ST => ST.enable());





	$(timelines).each(function(i,e){


		timelines[i].play();

	})
	if(document.querySelector('.eye-shape')){
		document.querySelector('.eye-shape').classList.remove('no-an');
	}
	if(document.querySelector('.home-hero-an-stage')){
		document.querySelector('.home-hero-an-stage').classList.remove('no-an');
	}
	for(let i=1;i<5;i++){
		if(document.querySelector('.dial-'+i)){
			document.querySelector('.dial-'+i).classList.remove('no-an');
		}
	}



	let footer_circ = document.querySelectorAll('.f-c');

	footer_circ.forEach(function (el,ind){

		el.classList.remove('no-an');
	});



	sliders.forEach(function (el,ind){
		const autoplay = el.Components.Autoplay;
		autoplay.play();
	})
	if(document.querySelector('section.bdass-ecosystem .product-slider-container ul.product-slider')){
		document.querySelector('section.bdass-ecosystem .product-slider-container ul.product-slider').style.display = 'flex';

	}
	if(document.querySelector('.ecosystem')){
		document.querySelector('.ecosystem').style.overflow = 'hidden';

	}
}











if(!getCookie('highlightLinks')){
	setCookie('highlightLinks','false')
}

if(!getCookie('stopAnimationl')){
	setCookie('stopAnimationl','false')
}

if(!getCookie('highContrasta')){
	setCookie('highContrasta','false')
}

if (getCookie('fontSize')) {
    
   fontSetSize =  parseInt(getCookie('fontSize'));
   
}else{
     fontSetSize = 1
    
}
function setFontSize(level){
	
	
	var nLevel;
	switch (level){
		case 1:
		nLevel=1;
		break;
		
		case 2:
		nLevel=1.1;
		break;
		
		case 3:
		nLevel=1.2;
		
		break;
		
		
	}
	
	$('span,div,a,p,li,h1,h2,h3,h4,h5,h6,button,input').each(function(index, element) {
        
		var fontSize = $(this).attr('data-original-font-size');
        
		var newFontSize = fontSize*nLevel;
		
		var fontsizerem = newFontSize+'rem';
       
		$(this)[0].style.setProperty("font-size", newFontSize+'rem', "important")
		
    });
	
}
jQuery(function(){


	if(getCookie('stopAnimation')=='true'){

		stop_all_animations();
		jQuery('#stopAnimation').addClass('active');

	}






     tabbableElements = 'a[href], area[href], input:not([disabled]),' +
        'select:not([disabled]), textarea:not([disabled]),' +
        'button:not([disabled]), iframe, object, embed, *[tabindex],' +
        '*[contenteditable]';
     //fonts
    
    $('span,div,a,p,li,h1,h2,h3,h4,h5,h6,button,input').each(function(index, element) {
        
		var fontSize = parseInt($(this).css('font-size'));
		var docFontSize =  parseInt($('html').css('font-size'));
		
		$(this).attr('data-original-font-size',fontSize/docFontSize);
		//$(this).addClass('fs'+index);
    });
	

    $('.fontPlus').click(function(){
		
		
		switch (fontSetSize){
			case 1:
			fontSetSize++;
			setFontSize(2);
			//document.cookie = "fontSetSize=2"+ ";domain=www.ness-college.co.il;path=/";
           setCookie('fontSize',2)
			break;
			
				case 2:
			fontSetSize++;
			setFontSize(3);
			//document.cookie = "fontSetSize=3"+ ";domain=www.ness-college.co.il;path=/";
                  setCookie('fontSize',3)
			break;
			
		}
		});
		
		$('.fontMinus').click(function(){
		
		
		switch (fontSetSize){
			case 3:
			fontSetSize--;
			setFontSize(2);
			//document.cookie = "fontSetSize=2"+ ";domain=www.ness-college.co.il;path=/";
                  setCookie('fontSize',2)
			break;
			
				case 2:
			fontSetSize--;
			setFontSize(1);
			//document.cookie = "fontSetSize=1"+ ";domain=www.ness-college.co.il;path=/";
                  setCookie('fontSize',1)
			break;
			
		}
		});
    
    
    
    
    $(document).keyup(function(e){
		//alert(e.altKey);
		if(e.altKey&&e.keyCode == 77){
			$('.navCon li:first-child a').focus();
			
		}
		
	})
	
	
	//accesabilty
	
	jQuery('#openAccess').focus();
	
	
	jQuery('#hatzara').click(function(e){
		
		jQuery('.hatzaraCon').addClass('show');
		
	setTimeout(function(){focusOnPopup('.hatzaraCon')},1000);
	
	
	
	
	});
	
	jQuery('#closeHazara').click(function(e){
		
		jQuery('.hatzaraCon').removeClass('show');
		
	})
	
	
	
	
	
	//check cookie
	if(getCookie('highlightLinks')=='true'){
		jQuery('#highlightLinks').addClass('active');
		jQuery('a').addClass('highlighted');
			
			
	}

 if (getCookie('fontSize') != 'false') {

     var fontSize = parseInt(getCookie('fontSize'));
        setFontSize(fontSize);


    }
	
	jQuery('#highlightLinks').click(function(e){
		
		if(!jQuery(this).hasClass('active')){
			jQuery(this).addClass('active')
			jQuery('a').addClass('highlighted');
			
			setCookie('highlightLinks', 'true', 1);
		}else{
			jQuery(this).removeClass('active')
			jQuery('a').removeClass('highlighted');
			setCookie('highlightLinks', 'false')
		}
		
		
	})
	
	

	
	jQuery('#stopAnimation').click(function(e){





		if(!jQuery(this).hasClass('active')) {


		stop_all_animations();

			jQuery('#stopAnimation').addClass('active');
			setCookie('stopAnimation', 'true', 1);
		}else{
			resume_all_animations();
			setCookie('stopAnimation', 'false', 1);
			jQuery('#stopAnimation').removeClass('active');
		}
		
		
	})
	
	
	
		
		if(getCookie('highContrasta')=='true'){
	
	jQuery('#highContrast').addClass('active')
			jQuery('*').addClass('highContrast');
			
			
	}
	
	
	
	
	
		jQuery('#highContrast').click(function(e){
		
		if(!jQuery(this).hasClass('active')){
			jQuery(this).addClass('active')
			jQuery('*').addClass('highContrast');
			setCookie('highContrasta', 'true', 1)
		}else{
			jQuery(this).removeClass('active')
			jQuery('*').removeClass('highContrast');
			setCookie('highContrasta', 'false', 1)
		}
		
		
	})
	
	jQuery('#reset').click(function(e){
		
		jQuery('#highContrast,#stopAnimation,#highlightLinks').removeClass('active');
		jQuery('a').removeClass('highlighted');
		jQuery('*').removeClass('highContrast');
		if(jQuery('.slick-slider').length!=0){
		   	jQuery('.slick-slider').slick('slickPlay');
		   }
		 setFontSize(1);
			
                  setCookie('fontSize',1)   
	setCookie('highlightLinks','false')


	setCookie('stopAnimationl','false')


	setCookie('highContrasta','false')

		
	})
	
	
	jQuery('#openAccess').click(function(e){
		
		if(!jQuery('.accesabiltyArea').hasClass('opened')){
			jQuery('.accesabiltyArea,#openAccess').addClass('opened');
			
			setTimeout(function(){
                jQuery('.accesabiltyArea .tafrit').focus();
                       var modal = $('.accessMenu')[0];
			 keepFocus(modal);
$('#closeAccess').focus();
            
            
            
            },500)
            
 
            
		}else{
			jQuery('.accesabiltyArea,#openAccess').removeClass('opened');
		}
	});
	
	
	jQuery('#closeAccess').click(function(e){
		
		if(!jQuery('.accesabiltyArea').hasClass('opened')){
			jQuery('.accesabiltyArea,#openAccess').addClass('opened');
		}else{
			jQuery('.accesabiltyArea,#openAccess').removeClass('opened');
		}
	});
})



function focusOnPopup (context,type=null){
	var tabbableElements
	if(!type){
	 tabbableElements = 'a[href], area[href], input:not([disabled]),' +
	'select:not([disabled]), textarea:not([disabled]),' +
	'button:not([disabled]), iframe, object, embed, *[tabindex],' +
	'*[contenteditable]';
	}else{
	 tabbableElements = 'button:not([disabled])';	
	}
	
	
	

var keepFocus = function (context) {
	var allTabbableElements = context.querySelectorAll(tabbableElements);
	var firstTabbableElement = allTabbableElements[0];
	var lastTabbableElement = allTabbableElements[allTabbableElements.length - 1];

	var keyListener = function (event) {
		var keyCode = event.which || event.keyCode; // Get the current keycode

		// Polyfill to prevent the default behavior of events
		event.preventDefault = event.preventDefault || function () {
			event.returnValue = false;
		};

		// If it is TAB
		if (keyCode === 9) {
			 //
						/* if(!document.activeElement == document.getElementsByTagName("iframe")[0]) {
    console.log('iframe has focus');
  } else {
	 //alert('f');
   $('#closeGallery').focus();
  }*/

			// Move focus to first element that can be tabbed if Shift isn't used
			if (event.target === lastTabbableElement && !event.shiftKey) {
				event.preventDefault();
				firstTabbableElement.focus();

			// Move focus to last element that can be tabbed if Shift is used
			} else if (event.target === firstTabbableElement && event.shiftKey) {
				event.preventDefault();
				lastTabbableElement.focus();
			}
			
			

		}
	};

	context.addEventListener('keydown', keyListener, false);
};

// Call the function when the part of the page gets focus
var modal = document.querySelector(context);
keepFocus(modal);

modal.focus();
}



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

var keepFocus = function (context) {

    var allTabbableElements = context.querySelectorAll(tabbableElements);
    var firstTabbableElement = allTabbableElements[0];
    var lastTabbableElement = allTabbableElements[allTabbableElements.length - 1];

    var keyListener = function (event) {
        var keyCode = event.which || event.keyCode; // Get the current keycode

        // Polyfill to prevent the default behavior of events
        event.preventDefault = event.preventDefault || function () {
            event.returnValue = false;
        };

        // If it is TAB
        if (keyCode === 9) {
            //
            /* if(!document.activeElement == document.getElementsByTagName("iframe")[0]) {
    console.log('iframe has focus');
  } else {
	 //alert('f');
   $('#closeGallery').focus();
  }*/

            // Move focus to first element that can be tabbed if Shift isn't used
            if (event.target === lastTabbableElement && !event.shiftKey) {
                event.preventDefault();
                firstTabbableElement.focus();

                // Move focus to last element that can be tabbed if Shift is used
            } else if (event.target === firstTabbableElement && event.shiftKey) {
                event.preventDefault();
                lastTabbableElement.focus();
            }



        }
    };

    context.addEventListener('keydown', keyListener, false);
};
