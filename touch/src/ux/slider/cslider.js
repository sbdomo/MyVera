Ext.define('Ext.ux.slider.cslider',{
	xtype:'cslider',
	extend:'Ext.Component',
	config:{
		values: null,
		incrMax: null,
		maxValue:100,
		minValue:0,
		//thumbValue:0,
		increment: 1,
		icon: null,
		fontsize: null,
		suffix: null,
		colorNumber: null,
		width: 92,
		thumbHeight:24,
		toptext:39,
		state: null,
		
		dragStepModular:2
	},	
	getElementConfig:function(){
		return {
			reference:'element',
			children:[{
				reference:'sliderBox',
				cls:'circleslider',
				children:[
				{
					cls:'basetext',
					tag:'span',
					reference:'minText',
					html:'0'
				},
				{
					reference:'marker',
					cls:'marker',
					children:[{
						reference:'thumb',
						cls: 'thumb'
					}]
				},
				{
				reference: 'moduleState',
				tag: 'img',
				cls: 'vide',
				style: 'z-index:1000; top:0px; left:0px; width:18px;',
				src:"./resources/images/indic/vide.png"
				}
				]
			}]
			
		}
	},
	initialize:function(){
		this.callParent(arguments);
		this.on({
			scope: this,
			widthchange: 'onWidthchange'
		});
		this.thumb.on({
			scope: this,
			drag: 'onDrag',
			dragend: 'onDragEnd'
		});
	},
	onDragEnd:function(e){
		e.stopEvent( )
		this.fireEvent('change', this, "", this.getValues(), "", "");
	},
	onDrag:function(e){
		e.stopEvent( );
		
		var xy = this.getBox(), updateLastDeg=true;
		var deg = this.rad2deg(Math.atan2(e.getPageY() - xy.y, e.getPageX() - xy.x))+90;
		deg = deg>0?deg:360+deg;
		if(this.lastDeg){
			if(this.lastDeg>270 && this.lastDeg<=360 && deg>=0 && deg<=180){
				deg = 360;
				updateLastDeg = false;
			}else if(deg>=180 && deg<=360 && this.lastDeg>=0 && this.lastDeg<=90){
				deg = 0;
				updateLastDeg = false;
			}
		}
		if(updateLastDeg){
			this.lastDeg = deg;
		}
		var dragStepModular = this.getDragStepModular();
		if(dragStepModular>0){
			deg = Math.round(deg);
			if(deg%dragStepModular==0){
				this.setValueForDeg(deg);
			}
		}else{
			this.setValueForDeg(deg);
		}
		
	},
	setValueForDeg:function(deg){
		var value = "";
		var min=this.getMinValue();
		var amplitude=this.getMaxValue()-min;
		value=Math.round(deg*amplitude/360/this.config.increment)*this.config.increment+min;
		this.setValues(value);
	},
	updateIcon:function(value, oldValue){
		//var oldValue = this.config.icon;
		if(value!=oldValue&&value!="") {
			//console.log('icon' + value + "/" + oldValue);
			//this.config.icon=value;
			this.sliderBox.setStyle('background', "url(resources/images/cslider/fond"+value+".png)");
			this.sliderBox.setStyle('background-size', "contain");
			
			this.thumb.setStyle('background', "url(resources/images/cslider/thumb"+value+".png)");
			this.thumb.setStyle('background-size', "contain");
			
		}
	},
	updateColorNumber: function(value, oldValue) {
		//var oldValue = this.config.icon;
		if(value!=oldValue) {
			//console.log("color:" + value);
			//this.config.colorNumber = value;
			this.minText.setStyle('color', '#' + value);
		}
	},
	updateSuffix: function(value, oldValue) {
		//var oldValue = this.config.suffix;
		if(value!=oldValue) {
			//this.config.suffix = value;
			this.minText.setHtml(this.getValues() + value);
		}
	},
	updateFontsize: function(value, oldValue) {
		//var oldValue = this.config.fontsize;
		if(value!=oldValue) {
			//this.config.fontsize = value;
			this.minText.setStyle('font-size', value);
			if(this.getWidth()!=null) {
				var toptext = Math.round(this.getWidth()/2-Number(value.substring(0, value.length-2))*3/4);
				this.minText.setStyle("top", toptext+"px");
				//console.log('updateFontsize' + value+ "/" + this.getWidth());
			}
		}
	},
	//Changement de la taille du slider
	onWidthchange: function(me, value, oldValue, eOpts) {
	//setWidth:function(value){
		//if(value!=this.config.width) {
			this.sliderBox.setStyle("height", value+"px");
			this.sliderBox.setStyle("width", value+"px");			
			//this.config.width = value;
			if(fontsizepx!=null) {
				var fontsizepx = this.getFontsize();
				//var fontsize=0;
				//if(fontsizepx!=null&&fontsizepx.length>2) fontsize=Number(fontsizepx.substring(0, fontsizepx.length-2));
				var fontsize=Number(fontsizepx.substring(0, fontsizepx.length-2));
				//console.log('setwidth'+fontsizepx+ "/" + fontsize + "/" + value);
			
				//décale de la hauteur moitié de la hauter et de la hauteur du fontsize
				var toptext = Math.round(value/2-fontsize*3/4);
				this.minText.setStyle("top", toptext+"px");
			}
			
			var leftmarker=Math.round(value/2);
			this.marker.setStyle('left', leftmarker+"px");
			this.marker.setStyle('height', value+"px");
		//}
	},
	updateValues:function(value, oldValue){
		this.minText.setHtml(value +this.getSuffix());
		this.ThumbValue(value);
	},
	ThumbValue:function(value){
		deg=this.value2deg(value);
		deg=this.adjustDeg(deg);
		this.marker.setStyle('-webkit-transform', 'rotate('+deg+'deg)');
		this.marker.setStyle('transform', 'rotate('+deg+'deg)');
	},
	setIncrMax: function(value) {
		if(value!=null&&value!=""&&value!=this.config.incrMax) {
			this.config.incrMax=value;
			//console.log('setIncrMax');
			var taille=value.split('|');
			this.setIncrement(Number(taille[0]));
			this.setMinValue(Number(taille[1]));
			this.setMaxValue(Number(taille[2]));
			if(this.config.thumbHeight!=taille[3]) {
				//console.log("thumbHeight" + taille[3]);
				this.config.thumbHeight=taille[3];
				this.thumb.setStyle("height", taille[3]+"px");
				this.thumb.setStyle("width", taille[3]+"px");
				var topthumb = Math.round(taille[3]/2);
				this.thumb.setStyle('top', -topthumb+"px");
				this.thumb.setStyle('left', -topthumb+"px");
			}
		}
	},
	updateState: function(value, oldValue) {
	//setState: function(value) {
		if(value!=oldValue) {
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
		}
	},
	getBox:function(){
		var sliderBox = this.sliderBox.getBox();
		return {x:sliderBox.x+(sliderBox.width/2), y:sliderBox.y+(sliderBox.height/2)};
	},
	rad2deg:function(radian){
		return radian * 180 / Math.PI % 360;
	},
	adjustDeg:function(deg){
		if(deg>360){
			deg	= deg-360;
		}
		return deg;
	},
	value2deg:function(value){
		var min=this.getMinValue();
		var amplitude=this.getMaxValue()-min;
		return (360*(value-min)/amplitude);
	}
});
