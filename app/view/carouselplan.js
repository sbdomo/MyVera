Ext.define('myvera.view.carouselplan', {
	extend: 'Ext.ux.util.Carousel',
	xtype: 'carouselplan',
	alias: 'widget.carouselplan',
	//id: 'carouselplan'
	config: {
		listeners: {
			painted:function(e,d){
				myvera.app.getController('myvera.controller.contdevices').stopsynchro();
				console.log(this.id + " painted");
			}
		}
	}
});