//initializes global variables
var width = window.innerWidth;
var height = window.innerHeight;
var interval = 7500;
var catCount = 0;

//creates the stage
var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height
});

//creates layer
var layer = new Konva.Layer();
// add the layer to the stage
stage.add(layer);

//loads cat image
var catImage = new Image();
catImage.src = './assets/cat1.png';
//initializing function
catImage.onload = function() {
  //begins game
  window.setInterval(function() {update(); stage.add(layer)}, interval);
  // add the layer to the stage
  stage.add(layer);
};

//update function, updates game entities
var update = () =>{
  createCat();
}

//creates a cat object
function createCat() {
  //initializes cat values
  var catObject = new Konva.Image({
    x: Math.random() * stage.getWidth(),
    y: Math.random() * stage.getHeight(),
    image: catImage,
    width: 200,
    height: 200,
    rotation: Math.random() * 180,
  });

  //click event
  catObject.on('click', function(evt) {
    this.destroy();
    catCount += 1;
    layer.draw();

    console.log(catCount);
  });

  //adds cat to layer
  layer.add(catObject);
}
