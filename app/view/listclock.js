Ext.define('myvera.view.listclock', {
	extend: 'Ext.DataView',
	//id:'listclock',
	xtype: 'listclock',
	stores: ['devicesStore'],
	//controllers: ['contclock'],
	requires:['myvera.util.Templates'],
	config: {
		//styleHtmlContent:true,
		//itemCls:'deviceview',
		disableSelection: true,
		//itemTpl:  '<tpl if="category==120||category==103">'+
		// myvera.util.Templates.getTpllist() + '</tpl>',
		emptyText: locale.getSt().misc.noclock,
		store: 'devicesStore',
		listeners: {
			painted:function(e,d){
				myvera.app.getController('myvera.controller.contdevices').stopsynchro();
				console.log(this.id + " painted");
				
			}
		}
	}
});