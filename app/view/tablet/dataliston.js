Ext.define('myvera.view.tablet.dataliston', {
    extend: 'Ext.DataView',
    xtype: 'dataliston',
    stores: ['devicesStore'],
    requires:['myvera.util.Templates'],
    config: {
	itemTpl:  myvera.util.Templates.getTplliston() + myvera.util.Templates.getTpllist() + '</tpl>',
	styleHtmlContent:true,
	itemCls:'deviceview',
	
	disableSelection: true,
	emptyText: locale.getSt().misc.nodevice,
	store: 'devicesStore'
    }
});