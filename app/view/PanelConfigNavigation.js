Ext.define('myvera.view.PanelConfigNavigation', {
	extend: 'Ext.navigation.View',
	xtype: 'PanelConfigNavigation',
	id:'PanelConfigNavigation',
	requires: ['myvera.view.PanelConfigItemsMenu', 'myvera.view.PanelConfigWebviews','myvera.view.PanelConfigWebview'],
	config: {
		iconCls : '',
		defaultBackButtonText: locale.getSt().button.back,
		navigationBar: {
			items: [
			{
				xtype: 'button',
				id: 'addWebViewButton',
				text: locale.getSt().button.add,
				align: 'right',
				hidden: true,
				handler: function(){
					Ext.getCmp('PanelConfigNavigation').push({
							xtype: 'PanelConfigWebview',
							title: locale.getSt().title.newwidget,
							data: { id:"", subcategory:'0', status:'-1', room:'0', icon:null, etage:"-1", etage1:"-1", etage2:"-1", width:"50", onboard:true, retina:myvera.app.isretina}
					});
				}
			},
			{
				xtype: 'button',
				id: 'addCloneButton',
				text: locale.getSt().button.add,
				align: 'right',
				hidden: true,
				handler: function(){
					Ext.getCmp('PanelConfigNavigation').push({
							xtype: 'PanelConfigItem',
							title: locale.getSt().title.newclone,
							//typelist:'clone',
							//state à -4 qand c'est un nouveau clone
							data: { id:"", category:'0', state:'-4', type:'clone', subcategory:'0', room:'0', icon:null, etage:"-1", etage1:"-1", etage2:"-1", width:"50", onboard:false, retina:myvera.app.isretina}
					});
				}
			}
			]
		},
		items: [
		{
			xtype: 'PanelConfigItemsMenu'
			
		}
		],
		listeners:{
			push:function(e,d){
				if(this.getActiveItem().getItemId()=="PanelConfigWebviews") {
					Ext.getCmp('addWebViewButton').show();
					Ext.getCmp('addCloneButton').hide();
				} else if(this.getActiveItem().getItemId()=="PanelConfigClones") {
					Ext.getCmp('addWebViewButton').hide();
					Ext.getCmp('addCloneButton').show();
				} else {
					Ext.getCmp('addWebViewButton').hide();
					Ext.getCmp('addCloneButton').hide();
				}
			},
			pop:function(e,d){
				Ext.getCmp('main').getTabBar().show();
				Ext.getCmp('PanelConfig').getTabBar().show();
				Ext.getCmp('PanelConfigNavigation').setNavigationBar({docked: 'top'});
				Ext.getCmp('PanelConfigNavigation').getNavigationBar().show();
				if(this.getActiveItem().getItemId()=="PanelConfigWebviews") {
					Ext.getCmp('addWebViewButton').show();
					Ext.getCmp('addCloneButton').hide();
				} else if(this.getActiveItem().getItemId()=="PanelConfigClones") {
					Ext.getCmp('addWebViewButton').hide();
					Ext.getCmp('addCloneButton').show();
				} else {
					Ext.getCmp('addWebViewButton').hide();
					Ext.getCmp('addCloneButton').hide();
				}
			}
		}
	}
});