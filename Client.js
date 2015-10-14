
/*
 *paper.install(window);
	window.onload = function() {
		paper.setup('paper');

		var myBall = [new Path.Circle(new Point(70, 70), 20),
				new Path.Circle(new Point(100, 70), 20),
				new Path.Circle(new Point(130, 70), 20),
				new Path.Circle(new Point(160, 70), 20),
				new Path.Circle(new Point(190, 70), 20),
				new Path.Circle(new Point(220, 70), 20),
				new Path.Circle(new Point(250, 70), 20),
				new Path.Circle(new Point(280, 70), 20),
				new Path.Circle(new Point(310, 70), 20),
				new Path.Circle(new Point(340, 70), 20),
				new Path.Circle(new Point(370, 70), 20)];
		for (var i = 0; i < myBall.length; i++) {
			myBall[i].fillColor = new Color(1, i, 0);
		}

		var vectorDir = new Point(24, 60);
		vectorDir.length = 5;

		view.onMouseDown = function(event) {
			vectorDir = event.point - myBall[0].position;
			vectorDir.length = 5;
		}

		view.onFrame = function(event) {
			myBall[0].translate(vectorDir);
			for (var i = myBall.length - 1; i > 0; i--) {

				var vectorDirsuiv = myBall[i - 1].position - myBall[i].position;
				vectorDirsuiv.length.myBall[i].translate(vectorDirsuiv);
			}

		}

	}
*/
	var WebSocket = require('ws');

	ws = new WebSocket('ws://localhost:8667');
	
	ws.on('open', function() {
		console.log('Connecte au server');
		
		
	});
	ws.on('message', function(message) {
		var point = JSON.parse(message);
	      console.log('received: %s,%s', point.X[0],point.Y[0] );
		var serpent = {
			    X : [ 70, 100, 130, 150],
			    Y:[ 70, 70, 70, 70]
			    
			};
			ws.send(JSON.stringify(serpent));
	});

	//jeu 
	/*
	var myBalls= [
	new Path.Circle(new Point(70, 70), 50),
	new Path.Circle(new Point(100, 70), 50),
	new Path.Circle(new Point(130, 70), 50),
	new Path.Circle(new Point(150, 70), 50),
	new Path.Circle(new Point(180, 70), 50)];


	myBalls[0].fillColor = 'blue';
	myBalls[1].fillColor = 'violet';
	myBalls[2].fillColor = 'red';
	myBalls[3].fillColor = 'orange';
	myBalls[4].fillColor = 'yellow';




	var from = new Point(0, 0);
	var to = new Point(1199, 799);
	var to = new Point(1200, 800);
	var rect = new Path.Rectangle(from, to);
	rect.strokeColor = 'black';

	var vectorDir =to* Point.random();
	vectorDir.length = 5;


	function onMouseDown(event) {
	vectorDir = event.point - myBall.position;
	vectorDir.length = 5;
	}

	function onFrame(event) {
	myBall.translate(vectorDir);
	if( var intersections = myBall.getIntersections(rect)
	{
		alert("gros bouffon, t'as perdu")
		myBall.translate(vectorDir);

		var intersections = myBall.getIntersections(rect);

		if(intersections.length !=0  ) {

		myBall.position = to*  Point.random() ;
		vectorDir= to*  Point.random() ;
		if (Point.random.length <=0.5)
		{
			vectorDir.length =-5}
		else {
			vectorDir.length = 5
		}
		vectorDir.length = 5;
	}

	}
	 */