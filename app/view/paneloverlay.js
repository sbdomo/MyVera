Ext.define('myvera.view.paneloverlay', {
	extend: 'Ext.form.Panel',
	xtype: 'paneloverlay',
	id: 'paneloverlay',
	requires: ['Ext.ux.field.DateTimePicker', 'Ext.field.Hidden', 'Ext.form.FieldSet'],
	config: {
		modal: true,
		hideOnMaskTap: true,
		centered: true,
		hidden: true,
		width: '400px',
		height: '290px',
		maxWidth: '95%',
		maxHeight: '95%',
		items:[
			{
				xtype: 'fieldset',
				name:'fieldset1',
				itemId: 'fieldset1',
				id:'titleform',
				//instructions: locale.getSt().misc.clockprogram,
				defaults: {
					labelWidth: '100px'
				},
				items: [
				{
					xtype: 'hiddenfield',
					itemId: 'deviceid',
					name: 'deviceid'
				},
				{
					xtype: 'datetimepickerfield',
					name: 'heuredeb',
					itemId: 'heuredeb',
					label: locale.getSt().misc.beginning,
					dateTimeFormat : 'H:i:s',
					picker: {
						cancelButton: locale.getSt().button.cancel,
						doneButton: locale.getSt().button.done,
						yearFrom: 1998,
						minuteInterval : 1,
						secondeInterval : 1,
						slotOrder: ['hour','minute','seconde']
					}
				},
				{
					xtype: 'datetimepickerfield',
					name: 'heurefin',
					itemId: 'heurefin',
					label: locale.getSt().misc.stop,
					dateTimeFormat : 'H:i:s',
					picker: {
						cancelButton: locale.getSt().button.cancel,
						doneButton: locale.getSt().button.done,
						yearFrom: 1998,
						minuteInterval : 1,
						secondeInterval : 1,
						slotOrder: ['hour','minute','seconde']
					}
				},
				{
					xtype: 'textfield',
					name: 'message',
					itemId: 'message',
					label: locale.getSt().misc.msg
				},
				{
					xtype: 'hiddenfield',
					name: 'weekdays',
					itemId: 'weekdays',
					label: 'weekdays'
				},
				{
					xtype: 'multiselect',
					itemId:'multidays',
					label: locale.getSt().field.bypass,
					delimiter: ' ',
					//mode: 'SINGLE', // default is MULTI,
					// value: ['first','second'] , init value with an array
					// value: 'first,second', init value with a string
					options: [
						{text: locale.getSt().days['1'],  value: '1'},
						{text: locale.getSt().days['2'], value: '2'},
						{text: locale.getSt().days['3'],  value: '3'},
						{text: locale.getSt().days['4'],  value: '4'},
						{text: locale.getSt().days['5'],  value: '5'},
						{text: locale.getSt().days['6'],  value: '6'},
						{text: locale.getSt().days['0'],  value: '0'}
						]
				}
				]
			},
			{
				xtype: 'button',
				name: 'saveclock',
				ui: 'confirm',
				text: locale.getSt().button.save
			}
		]
	}
});