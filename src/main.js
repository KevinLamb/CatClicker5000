var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height
});

var layer = new Konva.Layer();

// add the layer to the stage
stage.add(layer);

var cat = new Image();

window.addEventListener('resize', function() {
  stage.width(window.innerWidth);
  stage.height(window.innerHeight);
});

cat.onload = function() {
  window.setInterval(function() {createCat();stage.add(layer)}, 100);

  for (var i = 0; i < 10; i++) {
    createCat();
  }
  // add the layer to the stage
  stage.add(layer);
};

function createCat() {
  var cat1 = new Konva.Image({
    x: Math.random() * stage.getWidth(),
    y: Math.random() * stage.getHeight(),
    image: cat,
    width: 200,
    height: 200,
    rotation: Math.random() * 180,
  });

  cat1.on('click', function(evt) {
    this.destroy();
    layer.draw();
    console.log("Check");
  });
  layer.add(cat1);
}

cat.src = './assets/cat1.png';
