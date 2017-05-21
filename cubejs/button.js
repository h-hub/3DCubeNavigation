function Button (x,y,z) {
    
    this.geometry = new THREE.BoxGeometry( x,y,z );

    this.material = new THREE.MeshFaceMaterial([
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
    this.ube = new THREE.Mesh( geometry, material );
	this.cube.name = "btn2";
}
 
Button.prototype.getButton = function() {
    return this.cube;
};