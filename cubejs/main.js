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
				    camera.position.z = 300;

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

				    var geometryBtn = new THREE.BoxGeometry( 8, 10, 30 );				
				    Btn = new THREE.Mesh( geometryBtn, cubeMaterialBtn );
				    Btn.name = "btn";
				    Btn.position.set (74,-20,2)

				    var geometryBtn2 = new THREE.BoxGeometry( 8, 10, 30 );
				    Btn2 = new THREE.Mesh( geometryBtn, cubeMaterialBtn );
				    Btn2.name = "btn2";
				    Btn2.position.set (-74,-20,2)

				    var geometryBtn3 = new THREE.BoxGeometry( 30, 5, 10 );
				    Btn3 = new THREE.Mesh( geometryBtn3, cubeMaterialBtn );
				    Btn3.name = "btn3";
				    Btn3.position.set (0,-75,-35)


				    var cubeMaterial = new THREE.MeshFaceMaterial([
				    	new THREE.MeshBasicMaterial({
					        // color: 0x5e980f
					        map: THREE.ImageUtils.loadTexture( 'image/about.png' )
					    }),
				    	new THREE.MeshBasicMaterial({
					        // color: 0x5e980f
					        map: THREE.ImageUtils.loadTexture( 'image/neth3d.png' )
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
					        map: THREE.ImageUtils.loadTexture( 'image/cameradevice.png' )
					    }),
				    	new THREE.MeshBasicMaterial({
				    		map: THREE.ImageUtils.loadTexture( 'image/neth3d.png' )
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

				    cube.add(Btn3);

				    scene.add(cube);

				    //sphere.position.set(cube.position.x,cube.position.y,100);

				    //we add the even listener function to the domElement
				    renderer.domElement.addEventListener( 'mousedown', onMouseDown );
				    renderer.setClearColor (0xeff3ea, 1);

				    // console.log(cube.rotation.x +"-"+cube.rotation.y+"-"+cube.rotation.z);
				    
				    //cube.rotation.y = Math.PI / 2;
				}

				function animate() {

					requestAnimationFrame(animate);
					renderer.render(scene, camera);

				}

				//event listener
				function onMouseDown( event_info ) {
				    //stop any other event listener from recieving this event
				    event_info.preventDefault();  

				    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
				    
				    console.log($('#viewPort').offset().top+ "-"+HEIGHT);
				    //this where begin to transform the mouse cordinates to three,js cordinates
				    mouse.x = ( event_info.clientX / WIDTH ) * 2 - 1;
				    mouse.y = - ( event_info.clientY / (HEIGHT + $('#viewPort').offset().top)) * 2 + 1 ;

                    mouse.x  = ((event_info.clientX - $('#viewPort').position().left) / $('#viewPort').width()) * 2 - 1;
                    mouse.y = -((event_info.clientY - $('#viewPort').position().top) / $('#viewPort').height()) * 2 + 1;

				    mouseX = event.clientX;
				    mouseY = event.clientY;
				    
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
                        console.log( " perfect sphere hit btn3" );
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
					rotateScene(deltaX, deltaY);
				}

				function onDocumentMouseUp( event_info ) {
					document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
					document.removeEventListener( 'mouseup', onDocumentMouseUp, false );

				}

				function rotateScene(deltaX, deltaY) {
					cube.rotation.y += deltaX / 100;
					cube.rotation.x += deltaY / 100;
				}

				function showVideo(){
					cube.rotation.x = - Math.PI / 2;
					cube.rotation.y =  0;
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