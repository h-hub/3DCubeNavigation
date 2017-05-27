	var WIDTH = $('#viewPort').innerWidth(),
	HEIGHT = $('#viewPort').innerHeight(),
	ASPECT = WIDTH / HEIGHT,
	VIEW_ANGLE = 45, NEAR = 0.1, FAR = 10000;

	var contianer, renderer, camera, scene, sphere, cube;

	THREE.ImageUtils.crossOrigin = '';

				//mouse event variables
				var projector = new THREE.Projector(), 
				mouse_vector = new THREE.Vector3(),
				mouse = { x: 0, y: 0, z: 1 },
				ray = new THREE.Raycaster( new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0) ),
				intersects = [],
				intersectsBtn = [],
				objects = [];

				var tweenHead = null;
				var intervalFunction = null;
				var rotating = false;
				var loopbreak = false;
				var mouseClicked = false;

				var mouseX = 0;
				var mouseY = 0;

				function init() {
					var directionalLight;

				    //div element that will hold renderer
				    container = document.createElement('div');
				    document.body.appendChild(container);

				    //renderer
				    renderer = new THREE.WebGLRenderer();
				    renderer.setSize(WIDTH, HEIGHT);
				    $('#viewPort').append(renderer.domElement);

				    //camera
				    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
				    camera.position.z = 350;

				    //lights
				    directionalLight = new THREE.DirectionalLight(0xeff3ea, 1.2);
				    directionalLight.position.set(0, -1, 0);


				    //set up sphere object, just for testing
				    var sphereMaterial = new THREE.MeshLambertMaterial({
				    	color: 0x004242
				    });
				    sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 16, 16),
				    	sphereMaterial);
				    sphere.name = "sphere";
				    sphere.position.set (35,-50,2)

				    var cubeMaterialBtn = new THREE.MeshFaceMaterial([
				    	new THREE.MeshBasicMaterial({
					        // color: 0x3044423
					        map: THREE.ImageUtils.loadTexture( 'image/readmore.png' )
					    }),
				    	new THREE.MeshBasicMaterial({
					        //color: 0x5e980f
					        map: THREE.ImageUtils.loadTexture( 'image/readmore.png' )
					    }),
				    	new THREE.MeshBasicMaterial({
					        //color: 0x5e980f
					        map: THREE.ImageUtils.loadTexture( 'image/readmore.png' )
					    }),
				    	new THREE.MeshBasicMaterial({
					        //color: 0x5e980f
					        map: THREE.ImageUtils.loadTexture( 'image/readmore.png' )
					    }),
				    	new THREE.MeshBasicMaterial({
					        //color: 0x5e980f
					        map: THREE.ImageUtils.loadTexture( 'image/readmore.png' )
					    }),
				    	new THREE.MeshBasicMaterial({
							//color: 0x5e980f,
							map: THREE.ImageUtils.loadTexture( 'image/readmore.png' )
						})
				    	]);

				    var cubeMaterialBtn3 = new THREE.MeshFaceMaterial([
				    	new THREE.MeshBasicMaterial({
					        color: 0xFF0000
					    }),
				    	new THREE.MeshBasicMaterial({
					        color: 0xFF0000
					    }),
				    	new THREE.MeshBasicMaterial({
					        color: 0xFF0000
					    }),
				    	new THREE.MeshBasicMaterial({
					        map: THREE.ImageUtils.loadTexture( 'image/youtube.jpg' )
					    }),
				    	new THREE.MeshBasicMaterial({
					        color: 0xFF0000
					    }),
				    	new THREE.MeshBasicMaterial({
							color: 0xFF0000
						})
				    	]);

				    var geometryBtn = new THREE.BoxGeometry( 4, 10, 30 );				
				    Btn = new THREE.Mesh( geometryBtn, cubeMaterialBtn );
				    Btn.name = "btn";
				    Btn.position.set (74,-10,2)

				    var geometryBtn2 = new THREE.BoxGeometry( 4, 10, 30 );
				    Btn2 = new THREE.Mesh( geometryBtn, cubeMaterialBtn );
				    Btn2.name = "btn2";
				    Btn2.position.set (-74,-20,2)

				    var geometryBtn3 = new THREE.BoxGeometry( 30, 4, 20 );
				    Btn3 = new THREE.Mesh( geometryBtn3, cubeMaterialBtn3 );
				    Btn3.name = "btn3";
				    Btn3.position.set (0,-75,-35)

				    var geometryBtn4 = new THREE.BoxGeometry( 30, 4, 10 );
				    Btn4 = new THREE.Mesh( geometryBtn4, cubeMaterialBtn );
				    Btn4.name = "btn4";
				    Btn4.position.set (0,75,5)

				    var geometryBtn5 = new THREE.BoxGeometry( 30, 10, 4 );				
				    Btn5 = new THREE.Mesh( geometryBtn5, cubeMaterialBtn );
				    Btn5.name = "btn5";
				    Btn5.position.set (0,-20,75)

				    var geometryBtn6 = new THREE.BoxGeometry( 30, 10, 4 );				
				    Btn6 = new THREE.Mesh( geometryBtn6, cubeMaterialBtn );
				    Btn6.name = "btn6";
				    Btn6.position.set (0,-40,-75)


				    var cubeMaterial = new THREE.MeshFaceMaterial([
				    	new THREE.MeshBasicMaterial({
					        // color: 0x5e980f
					        map: THREE.ImageUtils.loadTexture( 'image/about.png' )
					    }),
				    	new THREE.MeshBasicMaterial({
					        // color: 0x5e980f
					        map: THREE.ImageUtils.loadTexture( 'image/cameradevice.png' )
					    }),
				    	new THREE.MeshBasicMaterial({
					        // color: 0x5e980f
					        map: THREE.ImageUtils.loadTexture( 'image/neth3d3.png' )
					    }),
				    	new THREE.MeshBasicMaterial({
					        // color: 0x5e980fmap: THREE.ImageUtils.loadTexture( 'image/mesh1.png' )
					        map: THREE.ImageUtils.loadTexture( 'image/neth3dvideo.png' )
					    }),
				    	new THREE.MeshBasicMaterial({
					        // color: 0x5e980f
					        map: THREE.ImageUtils.loadTexture( 'image/neth3d.png' )
					    }),
				    	new THREE.MeshBasicMaterial({
				    		map: THREE.ImageUtils.loadTexture( 'image/neth3d2.png' )
				    	})
				    	]);
				    var geometry = new THREE.BoxGeometry( 150,150,150 );
				    cube = new THREE.Mesh( geometry, cubeMaterial );
				    cube.name = "cube";

				    //create the scene and add the objects that we created
				    scene = new THREE.Scene();
				    scene.add(camera);
				    scene.add(directionalLight);

				    cube.add(Btn);

				    cube.add(Btn2);

				    //youtube button
				    cube.add(Btn3);

				    cube.add(Btn4);

				    cube.add(Btn5);

				    cube.add(Btn6);

				    scene.add(cube);

				    //we add the even listener function to the domElement
				    renderer.domElement.addEventListener( 'mousedown', onMouseDown );
				    renderer.setClearColor (0xeff3ea, 1);window.addEventListener( 'resize', onWindowResize, false );

				    window.addEventListener( 'resize', onWindowResize, false );
				    $('#viewPort').on( 'touchstart', onDocumentTouchStart );
				    $('#viewPort').on( 'touchend', onDocumentTouchStop );
					$('#viewPort').on( 'touchmove', onDocumentTouchMove );

					console.log("init");

					cubeAnimation();
				}

				function animate() {

					requestAnimationFrame(animate);
					TWEEN.update();
					renderer.render(scene, camera);

				}

				function onWindowResize() {
					WIDTH = $('#viewPort').innerWidth()
					HEIGHT = $('#viewPort').innerHeight();
					ASPECT = WIDTH / HEIGHT;
					camera.aspect = ASPECT;
					camera.updateProjectionMatrix();
					renderer.setSize(WIDTH, HEIGHT);
				}

				//event listener
				function onMouseDown( event_info ) {
				    //stop any other event listener from recieving this event
				    event_info.preventDefault();  

				    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
				   
                    mouse.x  = ( event_info.clientX / WIDTH ) * 2 - 1;
                    mouse.y = -((event_info.clientY - $('#viewPort').position().top) / $('#viewPort').height()) * 2 + 1;

				    mouseX = event_info.clientX;
				    mouseY = event_info.clientY;
				    
				    //this vector caries the mouse click cordinates
				    mouse_vector.set( mouse.x, mouse.y, mouse.z );
				    
				    //the final step of the transformation process, basically this method call
				    //creates a point in 3d space where the mouse click occurd
				    projector.unprojectVector( mouse_vector, camera );
				    
				    var direction = mouse_vector.sub( camera.position ).normalize();
				    
				    //ray = new THREE.Raycaster( camera.position, direction );
				    ray.set( camera.position, direction );
				    
				    //asking the raycaster if the mouse click touched the sphere object
				    intersects = ray.intersectObject(cube);
				    intersectsBtn = ray.intersectObject(Btn);

				    //-----------------
				    cube.updateMatrixWorld();
				    var vector = new THREE.Vector3();
				    vector.setFromMatrixPosition( Btn.matrixWorld );

                    //the ray will return an array with length of 1 or greater if the mouse click
                    //does touch the sphere object
                    if( (vector.z > 0) && (intersectsBtn.length ) ) {
                        window.open("http://neth3d.com/");
                    }

                    intersectsBtn = ray.intersectObject(Btn2);
                    vector.setFromMatrixPosition( Btn2.matrixWorld );
                    if( (vector.z > 0) && (intersectsBtn.length ) ) {
                        console.log( " perfect sphere hit btn2" );
                    }

                    intersectsBtn = ray.intersectObject(Btn3);
                    vector.setFromMatrixPosition( Btn3.matrixWorld );
                    if( (vector.z > 0) && (intersectsBtn.length ) ) {
                        $('#exampleModal').modal('show');
                    }

                    console.log("mouse clicked function");
                    

                    mouseClicked = true;
                    console.log("mouse clicked function-->"+mouseClicked);
                    if(tweenHead){
                    	
                    	clearInterval(intervalFunction);
                    	tweenHead.stop();
                    }
                    


				}

				function getDistance(mesh1, mesh2) {  
					var dx = mesh1.position.x - mesh2.position.x; 
					var dy = mesh1.position.y - mesh2.position.y; 
					var dz = mesh1.position.z - mesh2.position.z; 
					return Math.sqrt(dx*dx+dy*dy+dz*dz); 
				}

				function onDocumentMouseMove( event ) {

					var deltaX = event.clientX - mouseX,
					deltaY = event.clientY - mouseY;
					mouseX = event.clientX;
					mouseY = event.clientY;

					rotateAroundWorldAxis(cube, new THREE.Vector3(0, 1, 0), deltaX/ 100);
					rotateAroundWorldAxis(cube, new THREE.Vector3(1, 0, 0), deltaY/ 100);
				}

				function onDocumentMouseUp( event_info ) {
					document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
					document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
					clearInterval(intervalFunction);
					mouseClicked = false;
					//if(tweenHead){
						cubeAnimation();
						rotating = false;
					//}
					console.log("mouse clicked--> "+mouseClicked);
				}

				function onDocumentTouchStart( event ) {
					if ( event.touches.length === 1 ) {
						event.preventDefault();
						// mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
						// targetRotationOnMouseDown = targetRotation;

						mouse.x  = ( event.touches[ 0 ].pageX / WIDTH ) * 2 - 1;
	                    mouse.y = -((event.touches[ 0 ].pageY - $('#viewPort').position().top) / $('#viewPort').height()) * 2 + 1;

					    mouseX = event.touches[ 0 ].pageX;
					    mouseY = event.touches[ 0 ].pageY;
					    
					    //this vector caries the mouse click cordinates
					    mouse_vector.set( mouse.x, mouse.y, mouse.z );
					    
					    //the final step of the transformation process, basically this method call
					    //creates a point in 3d space where the mouse click occurd
					    projector.unprojectVector( mouse_vector, camera );
					    
					    var direction = mouse_vector.sub( camera.position ).normalize();
					    
					    //ray = new THREE.Raycaster( camera.position, direction );
					    ray.set( camera.position, direction );
					    
					    //asking the raycaster if the mouse click touched the sphere object
					    intersects = ray.intersectObject(cube);
					    intersectsBtn = ray.intersectObject(Btn);

					    //-----------------
					    cube.updateMatrixWorld();
					    var vector = new THREE.Vector3();
					    vector.setFromMatrixPosition( Btn.matrixWorld );

	                    //the ray will return an array with length of 1 or greater if the mouse click
	                    //does touch the sphere object
	                    if( (vector.z > 0) && (intersectsBtn.length ) ) {
	                            console.log( " perfect sphere hit btn1" );
	                    }

	                    intersectsBtn = ray.intersectObject(Btn2);
	                    vector.setFromMatrixPosition( Btn2.matrixWorld );
	                    if( (vector.z > 0) && (intersectsBtn.length ) ) {
	                        console.log( " perfect sphere hit btn2" );
	                    }

	                    intersectsBtn = ray.intersectObject(Btn3);
	                    vector.setFromMatrixPosition( Btn3.matrixWorld );
	                    if( (vector.z > 0) && (intersectsBtn.length ) ) {

	                        $('#exampleModal').modal('show');

	                        if(tweenHead){						
		                    	tweenHead.stop();
		                    	rotating = false;						
							}
							clearInterval(intervalFunction);
							cubeAnimation();
                    	}

                    	mouseClicked = true;
	                    console.log("mouse clicked function-->"+mouseClicked);
	                    if(tweenHead){
	                    	clearInterval(intervalFunction);
	                    	tweenHead.stop();
	                    }
					}
				}

				function onDocumentTouchStop(event){
					event.preventDefault();

					clearInterval(intervalFunction);
					mouseClicked = false;
					//if(tweenHead){
						cubeAnimation();
						rotating = false;
					//}
				}

				function onDocumentTouchMove( event ) {
					if ( event.touches.length === 1 ) {
						event.preventDefault();

						var deltaX = event.touches[ 0 ].pageX - mouseX,
						deltaY = event.touches[ 0 ].pageY - mouseY;
						mouseX = event.touches[ 0 ].pageX;
						mouseY = event.touches[ 0 ].pageY;

						rotateAroundWorldAxis(cube, new THREE.Vector3(0, 1, 0), deltaX/ 100);
						rotateAroundWorldAxis(cube, new THREE.Vector3(1, 0, 0), deltaY/ 100);

					}
				}

				function rotateAroundWorldAxis( object, axis, radians ) {

		              var rotationMatrix = new THREE.Matrix4();

		              rotationMatrix.makeRotationAxis( axis.normalize(), radians );
		              rotationMatrix.multiply( object.matrix );                       // pre-multiply
		              object.matrix = rotationMatrix;
		              object.rotation.setFromRotationMatrix( object.matrix );
		          }

				function showSide(x,y){

					if(tweenHead){						
                    	tweenHead.stop();
                    	rotating = false;						
					}
					clearInterval(intervalFunction);
					cubeAnimation();
					


					new TWEEN.Tween(cube.rotation)
				        .delay(0)
				        .to( {
				                x: x,            
				                y: y,
				                z: 0            
				            }, 1000 )
				        .onComplete(function() {
				                //setTimeout( tRotate, pause, obj, angles, delay, pause );
				            })
				        .start();
				}

				function cubeAnimation(){

					console.log("cubeAnimation");

						console.log("mouse clicked--> "+mouseClicked);
						console.log("intervalFunction apply interval->"+ rotating);
						intervalFunction = setInterval(function(){
							if(!mouseClicked){
								if(!tweenHead){
									tRotate();
									rotating = true;
								}else{
									if(rotating){
										console.log("tweenHead.stop();")
										tweenHead.stop();
										rotating = false;
									}else{
										console.log("tweenHead.start();")
										tweenHead.start();
										rotating = true;
									}
								}
							}
							
							
							console.log("set interval - rotating - >"+rotating);
							 
						}, 5000);					
				}

				function sleep(ms) {
				  return new Promise(resolve => setTimeout(resolve, ms));
				}

				function tRotate() {

					console.log("tRotate");

					
					
					var update	= function(){
						cube.rotation.y = cube.rotation.y + 0.01;
					}
					var current	= { x: cube.rotation.x , Y: cube.rotation.y };

					// build the tween to go ahead
					tweenHead	= new TWEEN.Tween(current)
						// .to({x: +800}, 2500)
						.delay(0)
						// .easing('Elastic.EaseInOut')
						.onUpdate(update);
					// build the tween to go backward
					var tweenBack	= new TWEEN.Tween(current)
						// .to({x: -800}, 2500)
						.delay(0)
						// .easing('Elastic.EaseInOut')
						.onUpdate(update);

					// after tweenHead do tweenBack
					tweenHead.chain(tweenBack);
					// after tweenBack do tweenHead, so it is cycling
					tweenBack.chain(tweenHead);

					// start the first
					tweenHead.start();


					//setTimeout("tweenHead.stop();", 5000);
				}

				init();
				animate();

				$(document).ready(function(){
				    /* Get iframe src attribute value i.e. YouTube video url
				    and store it in a variable */
				    var url = $("#video").attr('src')+"?autoplay=1";
				    
				    /* Assign empty url value to the iframe src attribute when
				    modal hide, which stop the video playing */
				    $("#exampleModal").on('hide.bs.modal', function(){
				    	$("#video").attr('src', '');
				    });
				    
				    /* Assign the initially stored url back to the iframe src
				    attribute when modal is displayed again */
				    $("#exampleModal").on('show.bs.modal', function(){
				    	$("#video").attr('src', url);
				    });
				});