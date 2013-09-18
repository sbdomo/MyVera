Ext.define('myvera.view.phone.PanelConfigphone', {
    extend: 'Ext.tab.Panel',
    xtype: 'PanelConfigphone',  
    config: {
    	ui: 'light',
    	tabBar: {
    		layout:{
    			pack:'center'
    		},
    		scrollable: {
    			direction: 'horizontal',
    			directionLock: true
			}
	},
	activeTab: 1,
		
	items: [
	{
		xtype:'PanelConfigGenerale',
		title: locale.getSt().title.conf
	},
	{
		xtype: 'PanelConfigRoomsNavigation'
	},
	{
		xtype: 'PanelConfigFloorsNavigation',
		title: locale.getSt().title.views
	},
	{
		xtype: 'PanelConfigNavigation',
		title : locale.getSt().title.devices
	}
	]
    }
});