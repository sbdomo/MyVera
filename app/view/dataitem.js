Ext.define('myvera.view.dataitem', {
	xtype: 'dataitem',
	extend: 'Ext.dataview.component.DataItem',
	requires: ['myvera.util.Templates'],
	config: {
		/*items: [
		{
		itemId: 'module'//,
		//tpl: '',
		//hidden: true,
		//data: ''
		}
		],*/
		mySlider: {
			//style: 'background-color:transparent;',
			hidden: true,
			minValue: 0,
			top: 0,
			left: 0,
			type: 1,
			witdh: 0
		},
		dataMap: {
			getMySlider: {
				setValues: 'level',
				setWidth: 'wwidth',
				setState: 'state',
				setIncrMax: 'graphlink',
				setHelperColorNumber: 'color',
				//setCategory: 'category',
				setType: 'subcategory'
			}
		}
	},
	applyMySlider: function(config) {
		//console.log('Apply');
		if(this.getRecord().get('category')==111) {
			config.type = this.getRecord().get('subcategory');
			//switch (this.getRecord().get('subcategory')) {
			//case 1:
				return Ext.factory(config, Ext.custom.MySlider, this.getMySlider());
			//break;
			//case 0:
			//default:
			//	return Ext.factory(config, Ext.form.customslider, this.getMySlider());
			//break;
			//}
		} else {
			return null;
		}
	},
	updateMySlider: function(newOne, oldOne) {
		//console.log('Update');
		if (oldOne) {
			this.remove(oldOne);
		}
		if (newOne) {
			newOne.on('change', this.onSliderChange, this);
			this.add(newOne);
		}
	},
	updateRecord: function(record) {
		var me = this;
		//if(!record) return;
		if(record.get('category')==111) {
			
			var hidden=true;
			var top=0;
			var left=0;
			var myid="";
			if(me.getParent()) myid=me.getParent().getParent().getId();
			myid= myid.slice(3);
			//myid= me.idetage;
			//Cherche si le module fait partie de la vue
			if(myid== record.get('etage')) {
				hidden=false;
				top=record.get('top');
				left=record.get('left');
			} else if(myid== record.get('etage1')) {
				hidden=false;
				top=record.get('top1');
				left=record.get('left1');
			} else if(myid== record.get('etage2')) {
				hidden=false;
				top=record.get('top2');
				left=record.get('left2');
			}
			if(hidden==false) {
				if(this.getMySlider()) {
					this.getMySlider().setTop(top);
					this.getMySlider().setLeft(left);
					this.getMySlider().setHidden(false);
				}
			}
		}
		me.callParent(arguments);
	},
	onSliderChange: function(Slider, thumb, newValue, oldValue, eOpts) {
		var record = this.getRecord();
		record.set("level", newValue);
		record.set("state", -2);
		//urn:upnp-org:serviceId:RenderingControl|SetVolume|DesiredVolume
		//console.log(recordId + " " + service);
		var commande =record.get('var4').split('|');
		console.log('change ' + record.get('name'));
		//myvera.app.getController('myvera.controller.contdevices').ondeviceaction(record.get('id'), commande[0], commande[1], commande[2], newValue);
	}
});