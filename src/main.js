//initializes global variables
var width = window.innerWidth;
var height = window.innerHeight;
var interval = 100;
var minInterval = 10;
var intervalScalar = 2;
var catCount = 0;
var currFrame = 0;
var horizonHeight = height / 2;

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

//Creates horizon for grid landscape
var horizon = new Konva.Line({
  points: [1, horizonHeight, width, horizonHeight],
  fill: 'purple',
  stroke: 'purple',
  strokeWidth: 2,
  closed: true,
  shadowEnabled: true,
  shadowOpacity: 0.75,
  shadowColor: 'purple',
  shadowBlur: 10
});

var sun = new Konva.Circle({
  x: stage.getWidth() / 2,
  y: horizonHeight - 150,
  radius: 100,
  fillLinearGradientStartPoint: { x: 50, y: 0 },
  fillLinearGradientEndPoint: { x: 50, y: 50 },
  fillLinearGradientColorStops: [0, 'yellow', 1, 'orange'],
  shadowEnabled: true,
  shadowOpacity: 0.75,
  shadowColor: 'yellow',
  shadowBlur: 15
});

//Creates vertical lines for grid
function createVerticalLines() {
  var verticalLines = [];

  var ratioXTop = 10;
  var ratioXBottom = 100;

  for(var i = 0; i < 30; i++)
  {
    var leftLine = new Konva.Line({
          points: [width / 2 - ratioXTop, horizonHeight, width / 2 - ratioXBottom, height, width / 2 - ratioXBottom + 10, height],
          fill: 'purple',
          stroke: 'purple',
          strokeWidth: 1,
          closed: true,
          shadowEnabled: true,
          shadowOpacity: 0.75,
          shadowColor: 'purple',
          shadowBlur: 10
        });
    
    var rightLine = new Konva.Line({
        points: [width / 2 + ratioXTop, horizonHeight, width / 2 + ratioXBottom, height, width / 2 +ratioXBottom + 10, height],
        fill: 'purple',
        stroke: 'purple',
        strokeWidth: 1,
        closed: true,
        shadowEnabled: true,
        shadowOpacity: 0.75,
        shadowColor: 'purple',
        shadowBlur: 10
      });

    verticalLines.push(leftLine);

    verticalLines.push(rightLine);
  
    ratioXTop += 50 * 0.95;
  
    ratioXBottom += 100 * 1.5;
  }

  return verticalLines;
}

//Creates horizontal lines for grid
function createHorizontalLines() {
  var horizontalLines = [];
  var thickness = 10;
  var ratioY = 0;
  var reducePecentage = 1.0;

  for(var i = 0; i < 8; i++)
  {
    var horizontalLine = new Konva.Line({
      points: [1, stage.getHeight() - ratioY, width, stage.getHeight() - ratioY, width, stage.getHeight() - ratioY - thickness, 1, stage.getHeight() - ratioY - thickness],
      fill: 'purple',
      stroke: 'purple',
      strokeWidth: 2,
      closed: true,
      shadowEnabled: true,
      shadowOpacity: 0.75,
      shadowColor: 'purple',
      shadowBlur: 10
    });

    ratioY += stage.getHeight() / 10 * reducePecentage;

    reducePecentage -= 0.1;
    thickness -= 1.25;

    horizontalLines.push(horizontalLine);
  }

  return horizontalLines;
}

//Creates tweens to move horizontal lines in grid
function createTweens(horizontalLines) {
  var tweens = [];
  var thickness = 10;
  var ratioY = 0;
  var reducePecentage = 1.0;

  for(var i = 0; i < 7; i++) {
    ratioY += stage.getHeight() / 10 * reducePecentage;

    reducePecentage -= 0.1;
    thickness -= 1.25;

    var tween = new Konva.Tween({
      node: horizontalLines[i],
      duration: 1,
      points: [1, stage.getHeight() - ratioY, width, stage.getHeight() - ratioY, width, stage.getHeight() - ratioY - thickness, 1, stage.getHeight() - ratioY - thickness],
      scaleX: 1.0,
      onFinish: function() {
        for(var i = 0; i < 7; i++) {
          tweens[i].reset();
          tweens[i].play();
        }
      }
    });

    tweens.push(tween);
  } 

  return tweens;
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

// add horizon to landscape
layer.add(horizon);

// Add the sun
layer.add(sun);

//Adds vertical lines for grid
var verticalLines = createVerticalLines();

for(var i = 0; i < verticalLines.length; i++) {
  layer.add(verticalLines[i]);
}

//Adds horizontal lines for grid
var horizontalLines = createHorizontalLines();


for(var i = 0; i < horizontalLines.length; i++) {
  layer.add(horizontalLines[i]);
}

//Create tweens for moving lines (lines need to be in layer first)
var tweens = createTweens(horizontalLines);

for(var i = 0; i < tweens.length; i++) {
  tweens[i].play();
}

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
