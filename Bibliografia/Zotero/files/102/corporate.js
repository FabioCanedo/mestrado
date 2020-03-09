$(document).ready(function() {

$(".homeTeasers").hover(
     function() {}, 
     function() {        
       $('.homeTeasers>li').fadeTo(150, 1.0); 
     }
);

$(".homeTeasers>li").hoverIntent(
    function(){
       $(this).addClass("Current"); // Add class .current
       $(this).siblings().fadeTo(150, 0.5); // Fade other items to 30%
       $(this).fadeTo(150, 1.0); // Fade current to 100%

    },
    function(){            
      $(this).removeClass("current"); // Remove class .current
      $(this).fadeTo(50, 1.0); // This should set the other's opacity back to 100% on mouseout   
    });


  //set the focus after click the location button
  $(".navLocation a").on('click', function(){
    setTimeout(function(){
      $('#dk_container_select-region').focus();
    },500)
  });

});