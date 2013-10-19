Ext.define('Ext.ux.field.sliderText', {
  extend: 'Ext.slider.Slider',
  xtype: 'sliderText',
  config: {
    width: 200,
    colorNumber:'000000',
    fontsize: '10px',
    suffix: '',
    value: 0,
    values:null
  },
  initialize: function() {
    this.callParent(arguments);
    this.on({
      scope: this,
      change: 'onSliderChange',
      drag: 'onSliderDrag'
    });
  },
  getElementConfig: function() {
    var self = this;
    var originalConfig = self.callParent();

    originalConfig.children = [{
      reference: 'helper',
      tag: 'div',
      children: [
      {
        reference: 'slidervalue',
        tag: 'div',
        html:'',
	cls:'slidertext'
       }
      ]
    }];

    return originalConfig;
  },
  onWidthchange: function(me, value, oldValue, eOpts) {
    this.slidervalue.setStyle('left', value+"px");
  },
  onSliderChange: function(me, thumb, newValue, oldValue) {
    this.setSliderValue(newValue);
    newValue=Math.round(newValue*10)/10;
    this.fireEvent('changeValues', me, thumb, newValue, oldValue);
  },
  onSliderDrag: function(me, thumb, newValue, oldValue) {
    this.setSliderValue(newValue);
  },
  setValues: function(value) {
	this.setValue(value);
	this.setSliderValue(value);
  },
  getValues: function() {
	  return this.config.values;
  },
  setSliderValue: function(value) {
    if(value!=null) {
	    //Modification pour mettre un arrondi à une décimale
	    value=Math.round(value*10)/10;
	    this.config.values = value;
	    this.slidervalue.setHtml(value + this.config.suffix);
    }
  },
  setFontsize: function(value) {
    //var oldvalue = this.config.fontsize;
    //if(oldvalue!=value) {
	this.config.fontsize = value;
	this.slidervalue.setStyle('font-size', value);
    //}
  },
  setSuffix: function(value) {
	this.config.suffix = value;
	if(this.getValues()!=null) {
		this.slidervalue.setHtml(this.getValues() + this.config.suffix);
		//this.setHelperValue(this.getValue());
	}
  }
/*
  reset: function() {
    var config = this.config,
      initialValue = (this.config.hasOwnProperty('values')) ? config.values : config.value;

    this.setValue(initialValue);
  },

  doSetDisabled: function(disabled) {
    this.callParent(arguments);

    this.getComponent().setDisabled(disabled);
  }
  */
});
