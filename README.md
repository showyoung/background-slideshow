# background-slideshow
video image or any other things background slideshow with jquery
1. add id or class name to the div or other DOM.
expmple:
<div id="whatever">
</div>

2.add content to div.
expmple:
<div id="whatever">
  <div class="img">
    <img src="img/pictures/background_01.jpg" />
  </div>
  <div class="video">
    <video> 
      <source src="img/videos/background_01.mp4" />
    </video>
  </div>
</div>


3.add jquery and this plugin to script.
<script src="js/jquery/jquery-3.3.1.min.js"></script>
<script src="js/background.js"></script>
<script>
  $(function(){
    $("#whatever").background();
    $("#whatever").background("run");
  });
</script>

More:
1.we can add parameters for slider show.
<div id="whatever" data-bgtime="5" data-bgplayend="true">
data-bgtime="5" means every 5s play next slideshow.
data-bgplayend="true" means when video play to the end, then play next slideshow.

OR we can add parameters on script.
$("#whatever").background({
  time: 5,
  playend: true
});

2.we can set parameters for each element,if some elements has no parameter, there will use the parameters in parent.
<div id="whatever" data-bgtime="5" data-bgplayend="true">
  <div class="img" data-bgtime="2">
    <img src="img/pictures/background_01.jpg" />
  </div>
    <div class="img" data-bgtime="4">
    <img src="img/pictures/background_02.jpg" />
  </div>
  <div class="video" data-bgtime="6" data-bgplayend="true">
    <video> 
      <source src="img/videos/background_01.mp4" />
    </video>
  </div>
  <div class="video" data-bgtime="8" data-bgplayend="false">
    <video> 
      <source src="img/videos/background_02.mp4" />
    </video>
  </div>
</div>

3.parent has default parameters data-bgtime="5" data-bgplayend="false", if we don't set it.

4.we can dynamically set the background contents, use script or ajax.
 $("#whatever").background({
            elements: [{
                url : "img/pictures/background_01.jpg",
                type : "img",
                time : 10,
                playend : false
            }, {
                url : "img/pictures/background_02.jpg",
                type : "img",
                time : 8,
                playend : false
            }, {
                url : "img/videos/background_01.mp4",
                type : "video",
                time : 6,
                playend : true
            }, {
                url : "img/videos/background_02.mp4",
                type : "video",
                time : 4,
                playend : false
            }]
        });
        $("#background").background("run");
