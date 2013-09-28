Ext.define('myvera.view.phone.listclockphone', {
    extend: 'Ext.DataView',
    xtype: 'listclockphone',
    stores: ['devicesStore'],
    requires:['myvera.util.Templates'],
    config: {
		itemTpl:  '<tpl if="onboard&&(category==120||category==103)">'+
		 	myvera.util.Templates.getTplphone() + '</tpl>',
		styleHtmlContent: false,
		
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