//initializes global variables
var width = window.innerWidth;
var height = window.innerHeight;
var interval = 100;
var minInterval = 20;
var intervalScalar = 2;
var catCount = 0;
var currFrame = 0;

//creates the stage
var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height
});

//creates score text
var score = new Konva.Text({
  x: stage.getWidth() / 2,
  y: 20,
  text: '0',
  fontSize: 40,
  fontFamily: 'Calibri',
  fill: 'black'
});

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
  });

  //adds cat to layer
  layer.add(catObject);
}

//creates layer
var layer = new Konva.Layer();
//adds score to layer
layer.add(score)
// add the layer to the stage
stage.add(layer);

//loads cat image
var catImage = new Image();
catImage.src = './assets/cat1.png';
//initializing function
catImage.onload = function() {
  //begins game
  setInterval(loop,60)
};

//update function, updates game entities
var update = () => {
  if (currFrame >= ((interval >= minInterval) ? interval - (catCount * intervalScalar) : minInterval)){
    createCat();
    currFrame = 0;
  }
  console.log(currFrame++);
  score.setAttr('text', catCount);
}
//draws entities
var draw = () => {
  layer.draw();
}
//game loop
function loop() {
  update()
  draw()
}
