Ext.define('myvera.view.phone.datalistonphone', {
    extend: 'Ext.DataView',
    xtype: 'datalistonphone',
    stores: ['devicesStore'],
    requires:['myvera.util.Templates'],
    config: {
		styleHtmlContent: false,
		itemTpl:  myvera.util.Templates.getTplliston() + myvera.util.Templates.getTplphone() + '</tpl>',
		
		disableSelection: true,
		emptyText: locale.getSt().misc.nodevice,
		store: 'devicesStore'
    }
});