Ext.define('myvera.view.tablet.listclock', {
    extend: 'Ext.DataView',
    xtype: 'listclock',
    stores: ['devicesStore'],
    requires:['myvera.util.Templates'],
    config: {
    	cls: 'carbon',
	itemTpl:  '<tpl if="category==120||category==103">'+
		 myvera.util.Templates.getTpllist() + '</tpl>',
	styleHtmlContent:true,
	itemCls:'deviceview',
    	disableSelection: true,
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