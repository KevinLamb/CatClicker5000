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

cat.onload = function() {
  var cat1 = new Konva.Image({
    x: 50,
    y: 50,
    image: cat,
    width: 200,
    height: 200
  });

  // add the shape to the layer
  layer.add(cat1);

  // add the layer to the stage
  stage.add(layer);
};

cat.src = '/assets/cat1.jpg';