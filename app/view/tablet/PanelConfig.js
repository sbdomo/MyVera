Ext.define('myvera.view.tablet.PanelConfig', {
    extend: 'Ext.tab.Panel',
    xtype: 'PanelConfig',
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
		title: locale.getSt().title.conf_gen
	},
	{
		xtype: 'PanelConfigRoomsNavigation'
	},
	{
		xtype: 'PanelConfigFloorsNavigation',
		title: locale.getSt().title.conf_views
	},
	{
		xtype: 'PanelConfigNavigation',
		title : locale.getSt().title.conf_devices
	}
	]
    }
});