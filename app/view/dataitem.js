Ext.define('myvera.view.dataitem', {
	xtype: 'dataitem',
	extend: 'Ext.dataview.component.DataItem',
	requires: ['Ext.form.Slider','myvera.util.Templates'],
	config: {
		items: [
		{
		itemId: 'module',
		//tpl: '{name}',
		tpl: '',
		hidden: true,
		data: ''
		},
		{
		//xtype: 'vertslider',
		xtype: 'customslider',
		//styleHtmlContent: true,
		//xtype: 'sliderfield',
		itemId: 'slider',
		width: 150,
		style: 'background-color:transparent;',
		//label: 'Name',
		value: 0,
		minValue: 0,
		maxValue: 100,
		increment: 0.1,
		hidden: true,
		listeners: {
			change: function(Slider, thumb, newValue, oldValue, eOpts) {
				//console.log("slider change");
				Slider.getParent().onSliderAction(this.getParent().getRecord(), newValue);
			}
		}
		
		
		
		
		//plugins: [new Ext.ux.CustomSlider({
		//	valueUnit: '$',
		//	tooltipStyle: 'background-color: #AAA; text-align: center',
		//	showSliderBothEndValue: true,
		//	sliderEndValuePos: 'above'
		//})]
		}
		]
	},
	updateRecord: function(record) {
		if(!record) return;
		var me = this;
		var myid="";
		var hidden=true;
		var top=0;
		var left=0;
		if(me.getParent()) myid=me.getParent().getParent().getId();
		//Cherche si le module fait partie de la vue
		if(myid=="vue"+record.get('etage')) {
			hidden=false;
			top=record.get('top');
			left=record.get('left');
		} else if(myid=="vue"+record.get('etage1')) {
			hidden=false;
			top=record.get('top1');
			left=record.get('left1');
		} else if(myid=="vue"+record.get('etage2')) {
			hidden=false;
			top=record.get('top2');
			left=record.get('left2');
		}
		if(hidden==false) {
			//Custom Slider
			if(record.get('category')==111) {
				var cslid=me.down('#slider');
				cslid.setValues(record.get('level'));
				
				cslid.setWidth(record.get('wwidth')+"px");
				//GraphlinkItem pour l'increment et max du slider
				if(record.get('graphlink')!=null&&record.get('graphlink')!="") {
					var taille=record.get('graphlink').split('|');
					cslid.setIncrement(taille[0]);
					cslid.setMaxValue(taille[1]);
				}
				cslid.setHelperColor('#'+record.get('color'));
				//cslid.setRecordId(record.get('id'));
				//cslid.setService(record.get('var4'));
				cslid.setState(record.get('state'));
				//me.down('#slider').setLabel(record.get('name'));
				cslid.setTop(top);
				cslid.setLeft(left);
				cslid.setHidden(hidden);
				
			} else {
				//me.down('#textCmp').setHtml(record.get('name'));
				me.down('#module').setData(record.data);
				me.down('#module').setTpl(
					'<div style="top:'+top+'px; left:'+left+'px;'+
					myvera.util.Templates.getTplplan() + myvera.util.Templates.getTplpanwebview() + myvera.util.Templates.getTplpanfin()
					);
				me.down('#module').setHidden(hidden);
			}
		}
		me.callParent(arguments);
	},
	onSliderAction: function(record, newValue) {
		record.set("state", -2);
		//urn:upnp-org:serviceId:RenderingControl|SetVolume|DesiredVolume
		//console.log(recordId + " " + service);
		var commande =record.get('var4').split('|');
		
		myvera.app.getController('myvera.controller.contdevices').ondeviceaction(record.get('id'), commande[0], commande[1], commande[2], newValue);
	}
});