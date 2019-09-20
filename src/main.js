//initializes global variables
var width = window.innerWidth;
var height = window.innerHeight;
var interval = 100;
var minInterval = 10;
var intervalScalar = 2;
var catCount = 0;
var currFrame = 0;

document.getElementById('easy').addEventListener('click', function() {
  interval = 100;
  console.log(interval);
});
document.getElementById('medium').addEventListener('click', function() {
  interval = 70;
  console.log(interval);
});
document.getElementById('hard').addEventListener('click', function() {
	interval = 40;
	console.log(interval);
});

//creates the stage
var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height-22
});

//creates score text
var score = new Konva.Text({
  x: stage.getWidth() / 2,
  y: 20,
  text: '0',
  fontSize: 40,
  fontFamily: 'Turret Road',
  fill: 'purple',
  shadowEnabled: true,
  shadowOpacity: 0.75,
  shadowColor: 'purple',
  shadowBlur: 10
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
    offset: {
      x: 100,
      y: 100
    }
  });

  var angularSpeed = 600;
  var spinCat = new Konva.Animation(function(frame) {
        var angleDiff = frame.timeDiff * angularSpeed / 1000;
        catObject.rotate(angleDiff);

	var curScale = catObject.scale();
	catObject.scale({
		x: curScale.x-0.01,
		y: curScale.y-0.01
	});

	var curOpacity = catObject.opacity();
	if (curOpacity > 0) catObject.opacity(curOpacity-0.02)
	else catObject.opacity(0);
  });
	
  //click event
  catObject.on('click', function(evt) {
    catObject.removeEventListener('click');
    catCount += 1;

    spinCat.start();

    var that=this;
    setTimeout(function() {
    	that.destroy();
    }, 1000);
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
  var tempInterval = interval - catCount * (intervalScalar);
  if (currFrame >= ((tempInterval >= minInterval) ? tempInterval : minInterval)){
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
