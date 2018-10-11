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
    for(var i = 0; i < 10; i++)
    {
        var cat1 = new Konva.Image({
            x: Math.random() * stage.getWidth(),
            y: Math.random() * stage.getHeight(),
            image: cat,
            width: 200,
            height: 200,
            rotation: Math.random() * 180,
          });
        
         cat1.on('click', function (evt) {
            this.destroy();
            layer.draw();
            console.log("Check"); 
         });
        
         // add the shape to the layer
            layer.add(cat1);
    }

  // add the layer to the stage
  stage.add(layer);
};

cat.src = '/CatClicker500/assets/cat1.png';