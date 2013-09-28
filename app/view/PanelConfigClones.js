Ext.define('myvera.view.PanelConfigClones', {
	extend: 'Ext.DataView',
	xtype: 'PanelConfigClones',
	id:'PanelConfigClones',
	stores: ['devicesStore'],
	//requires: ['myvera.store.ConfigDevicesStore'],
	config: {
		emptyText: locale.getSt().misc.nodevice,
		store: 'devicesStore',
		//cls: 'slidelist',
		selectedCls: 'listroomselect',
		itemTpl: '<tpl if="type==\'clone\'"><div class="listwebview">'+
		'<div class="listwebviewimg"><img style="height:18px; margin-bottom:10px;" src="resources/images/indic/<tpl if="state==-3">drouge<tpl else>dvert</tpl>{retina}.png" />'+
		'<img style="height:40px;" src="resources/images/l<tpl if="icon!=null&&category!=111">{icon}'+
			'<tpl elseif="category==4&&(subcategory==4||subcategory==1)">4{subcategory}'+
			'<tpl elseif="category==108&&(subcategory==1||subcategory==2)">110<tpl elseif="category==108">108'+
			'<tpl elseif="category==111&&subcategory==2">111_2_<tpl if="icon!=null">{icon}<tpl else>0</tpl><tpl elseif="category==111"><tpl if="icon!=null">{icon}<tpl else>111</tpl>'+
			'<tpl elseif="category==120&&subcategory==1">121<tpl elseif="category==120&&subcategory==2">122'+
			'<tpl else>{category}</tpl>_0{retina}.png" /></div>'+
		'<div class="listroomtext"><span class="listroomtext"><tpl if="ind!=null">{ind} - </tpl>{name}</span>'+
		'<div class="x-list" style="float:right;"/><div class="x-list-disclosure"></div></div></div>'+
		'</div></tpl>',
		listeners: {
			itemtap: function(view, index, target, record, event){
				console.log('tap');
				if (event.getTarget('.x-list-disclosure')) {
					Ext.getCmp('PanelConfigNavigation').push({
							xtype: 'PanelConfigItem',
							title: locale.getSt().title.edit,
							//typelist:'clone',
							data: record.getData()
					});
				}
			},
			painted:function(e,d){
				myvera.app.getController('myvera.controller.contdevices').stopsynchro();
				console.log(this.id + " painted");
				
			}
		}
	}
});