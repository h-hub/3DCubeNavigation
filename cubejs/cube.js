	
	var dynamicTexture	= new THREEx.DynamicTexture(512,512)
	dynamicTexture.context.font	= "bolder 2px Verdana";
	dynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy()
	var text = "What is Lorem Ipsum Lorem Ipsum is simply dummy text <a> link <a/>of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic "
	var btnText = "Click";
	dynamicTexture.clear('cyan');
	dynamicTexture.drawTextCooked({
		text		: text,
		font	    : "bolder 12px Verdana"
	});

	var geometry = new THREE.BoxGeometry( 3, 3, 3 );

	var material = new THREE.MeshFaceMaterial([
	    new THREE.MeshBasicMaterial({
	        color: 0x005445
	    }),
	    new THREE.MeshBasicMaterial({
	        color: 0x953734
	    }),
	    new THREE.MeshBasicMaterial({
	        color: 0x366092,
	    }),
	    new THREE.MeshBasicMaterial({
	        color: 0xf79646
	    }),
	    new THREE.MeshBasicMaterial({
	        color: 0x318598
	    }),
	    new THREE.MeshBasicMaterial({
			map	: dynamicTexture.texture
		})
	]);

	var cube = new THREE.Mesh( geometry, material );
	cube.name = "cube";