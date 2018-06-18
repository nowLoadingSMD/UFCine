$(document).ready(function () {
  
    $("#imgSelect").hide()

  for (i = 0; i < 3; i++) {
      $(".list li").clone().appendTo(".list");
  }
  $('.button').click(async function () {
      let video;

      await $.get("/api/video/randomVideo", (data) => {
        video = data
      })
    
      $('.window').css({
          right: "0"
      })
      $('.list li').css({
          border: '4px solid transparent'
      })
      function selfRandom(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      var x = selfRandom(50, 100);
      $('.list li:eq('+x+')').css({
          border:'none'
      })

      $('.window').animate({
          right: ((x*200)+(x*8-12)-400)
      }, 3000, function() {

            $("#videoSelectedName").html(`${video.name}`)
            
            $("#imgSelect").css('background-size', `cover`)
            $("#imgSelect").css('background-image', `url(${video.videoImg})`)

            $("#imgSelect").fadeIn("slow", function(){
                document.getElementById("randomAnchor").setAttribute("href", `/pages/player.html?id=${video.videoID}`)
            })
      });
  });
});