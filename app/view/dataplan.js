Ext.define('myvera.view.dataplan', {
	extend: 'Ext.DataView',
	xtype: 'dataplan',
	//requires:['myvera.view.dataitem'],
	stores: ['devicesStore'],
	config: {
		emptyText: locale.getSt().misc.nodevice,
		store: 'devicesStore',
		//useComponents: true,
		//defaultType: 'dataitem',
		styleHtmlContent: true,
		scrollable: null,
		itemConfig: {
			draggable: false
		},
		listeners:{
			itemtaphold: function(view, index, target, record, event){
				//2: Dimmable light, 8: Window Covering, 109: sonos
			   //if (Ext.Array.contains([2, 8, 109], record.data.category)) {
			   if (Ext.Array.contains([2, 8], record.data.category)) {
				myvera.view.dataplan.lastTapHold = new Date();
				//console.log('taphold:', record);
				myvera.app.getController('myvera.controller.contdevices').onDeviceHoldTap(view, index, target, record, event);
			   }
			},
			itemsingletap: function(view, index, target, record, event){
			   if (record.data.category!=111&&(!myvera.view.dataplan.lastTapHold || (myvera.view.dataplan.lastTapHold - new Date() > 1000))) {
				console.log('tap');
				myvera.app.getController('myvera.controller.contdevices').onDeviceTap(view, index, target, record, event);
			   }
			},
			//painted: function(list, opts){
			painted: {
				single: true,
				fn: function() {
				myvera.app.getController('myvera.controller.contdevices').stopsynchro();
				console.log("dataplan painted: " + this.id);
				}
			}
		}
	}
});