Ext.define('Ext.ux.hslider',{
	extend:'Ext.slider.Slider',
	xtype: 'hslider',
	config:{
		width: 200,
		colorNumber:'000000',
		fontsize: '10px',
		suffix: '',
		//helperColor: 'black',
		value: 0,
		values:null,
	},
	initialize:function(){
		this.callParent(arguments);
		this.on({
			scope: this,
			change: 'onSliderChange',
			//dragstart: 'onSliderDragStart',
			drag: 'onSliderDrag',
			widthchange: 'onWidthchange'
			//dragend: 'onSliderDragEnd'
		});
	},
	getElementConfig: function() {
		var self = this;
		var originalConfig = self.callParent();
		originalConfig.children = [{
				reference: 'helper',
				tag: 'div',
				//cls: 'hslider',
				//cls: Ext.baseCSSPrefix + 'slider-helper',
				children: [
					{
					reference: 'helperInput',
					tag: 'div',
					html:'',
					cls:'hslidertext'
					//step: self.initialConfig.increment,
					//cls: Ext.baseCSSPrefix + 'slider-helper-input',
					//style:"position:absolute; top:5px; left:200px; font-size:10px;"
					},
					{
					reference: 'moduleState',
					tag: 'img',
					cls: 'vide',
					style: 'z-index:1000; top:-5px; width:18px;',
					//style: 'z-index:1000;',
					//width: '18px',
					src:"./resources/images/indic/vide.png"
					}
				]
		}];
		
		return originalConfig;
	},
	onWidthchange: function(me, value, oldValue, eOpts) {
			this.helperInput.setStyle('left', value+"px");
	},
	onSliderChange: function(me, thumb, newValue, oldValue) {
		this.setHelperValue(newValue);
		//this.fireEvent('change', this, thumb, newValue, oldValue);
	},
	onSliderDrag: function(me, thumb, newValue, oldValue) {
		this.setHelperValue(newValue);
		//this.fireEvent('drag', this, thumb, newValue, oldValue);
	},	
	setValues: function(value) {
			this.setValue(value);
			this.setHelperValue(value);
	},
	setState: function(value) {
		switch (value) {
		case -2:
			this.moduleState.addCls("djaune");
			break;
		case -3:
			this.moduleState.addCls("djaune");
			break;
		case 2:
			this.moduleState.removeCls('djaune');
			this.moduleState.addCls("dalert");
			break;
		default:
			this.moduleState.removeCls('djaune');
			this.moduleState.removeCls('dalert');
			break;
		}
	},
	setHelperValue: function(value) {
		if(value!=null) {
			//Modification pour mettre un arrondi à une décimale
			value=Math.round(value*10)/10;
			if(value!=this.config.values) {
				this.config.values = value;
				this.helperInput.setHtml(value + this.config.suffix);
			}
		}
	},
	setSuffix: function(value) {
		var oldvalue = this.config.suffix;
		if(oldvalue!=value) {
			this.config.suffix = value;
			if(this.getValue()!=null) {
				this.helperInput.setHtml(this.getValue() + this.config.suffix);
				//this.setHelperValue(this.getValue());
			}
		}
	},
	setFontsize: function(value) {
		var oldvalue = this.config.fontsize;
		if(oldvalue!=value) {
			this.config.fontsize = value;
			this.helperInput.setStyle('font-size', value);
		}
	},
	
	
	//setHelperColor: function(value) {
	//	this.config.helperColor=value;
		//this.helperInput.setStyle('color', value);
	//},
	setIncrMax: function(value) {
		if(value!=null&&value!="") {
			var taille=value.split('|');
			this.config.increment=taille[0];
			this.config.maxValue=taille[1];
			this.setIncrement(taille[0]);
			this.setMaxValue(taille[1]);
		}
	},
	setColorNumber: function(value) {
		this.config.colorNumber=value;
		this.helperInput.setStyle('color', '#' + value);
	}
});