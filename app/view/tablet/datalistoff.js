Ext.define('myvera.view.tablet.datalistoff', {
    extend: 'Ext.DataView',
    xtype: 'datalistoff',
    stores: ['devicesStore'],
    requires:['myvera.util.Templates'],
    config: {
	itemTpl:  myvera.util.Templates.getTpllistoff() + myvera.util.Templates.getTpllist() + '</tpl>',
	styleHtmlContent:true,
	itemCls:'deviceview',
	
	disableSelection: true,
	emptyText: locale.getSt().misc.nodevice,
	store: 'devicesStore'
    }
});