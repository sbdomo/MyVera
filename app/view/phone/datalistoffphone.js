Ext.define('myvera.view.phone.datalistoffphone', {
    extend: 'Ext.DataView',
    xtype: 'datalistoffphone',
    stores: ['devicesStore'],
    requires:['myvera.util.Templates'],
    config: {
		styleHtmlContent: false,
		itemTpl:  myvera.util.Templates.getTpllistoff() + myvera.util.Templates.getTplphone() + '</tpl>',
    
    		disableSelection: true,
		emptyText: locale.getSt().misc.nodevice,
		store: 'devicesStore'
    }
});