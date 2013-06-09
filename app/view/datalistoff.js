Ext.define('myvera.view.datalistoff', {
	extend: 'Ext.DataView',
	//id:'datalistoff',
	xtype: 'datalistoff',
	stores: ['devicesStore'],
	requires:['myvera.util.Templates'],
	config: {
		//styleHtmlContent:true,
		//itemCls:'deviceview',		
		disableSelection: true,
		//itemTpl:  '<tpl if="(verif==\'off\'&&(((category==4||category==103||category==120)&&tripped==0)||(category!=4&&category!=103&&category!=120&&status==0)))||(verif!=\'no\'&&(category==4||category==103||category==120)&&armed==0)">'+
		// myvera.util.Templates.getTpllist() + '</tpl>',
		emptyText: locale.getSt().misc.nodevice,
		store: 'devicesStore'
	}
});