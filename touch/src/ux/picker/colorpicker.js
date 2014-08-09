Ext.define('Ext.ux.picker.colorpicker',{
	xtype:'colorpicker',
	extend:'Ext.Component',
	config:{
		hexColor: "#ffffff",
		h: 0,
		s: 100,
		l: 100,
		
		//Nécessaire pour l'initialisation du curseur de SLpicker en fonction de la couleur
		slSize: 130,
		
		//Pour ne pas déclencher d'évenement si ne change pas
		xvalue: 0,
		yvalue: 0,
		
		thumbXY:20,
		
		
		
		increment: 1,
		minValue:0,
		maxValue:360,
		
		
		//width: 276,
		
		//values: null,
		
		state: null
		

		
	},
	getElementConfig:function(){
		return {
			reference:'element',
			cls: 'mycolorpicker',
			children:[
			{
				reference:'hueSlider',
				cls:'hueslider',
				children:[
				{
					reference:'hueMarker',
					cls:'marker',
					children:[{
						reference:'hueThumb',
						cls: 'thumb'
					}]
				}
				]
			},
			{
				reference: 'colorResult',
				cls:'colorresult'
			},
			{
				reference: 'moduleState',
				tag: 'img',
				cls: 'vide',
				style: 'z-index:1000; top:0px; left:0px; width:18px;',
				src:"./resources/images/indic/vide.png"
			},
			{
				reference:'SLpicker',
				cls:'slpicker',
				children:[
				{
					reference:'XYmask',
					cls: 'xymask'
				},
				{
					reference:'thumbXY',
					cls: 'thumb'
				}
				]
			}
			]
			
		}
	},
	initialize:function(){
		this.callParent(arguments);
		this.hueThumb.on({
			scope: this,
			drag: 'onDragH',
			dragend: 'onDragHEnd'
		});
		
		this.SLpicker.on({
			scope: this,
			drag: 'onDragXY',
			dragend: 'onDragXYEnd',
			tap: 'onTapXY'
		});
	},
	updateHexColor:function(value, oldValue){
		//console.log("updateHexColor");
		var hsl=this.hexToHsl(value);
		this.setH(hsl.h);
		this.changevalueXY(Math.round((100-hsl.s)/100*this.getSlSize()), Math.round((100-hsl.l)/100*this.getSlSize()));
		this.setS(hsl.s);
		this.setL(hsl.l);
		this.colorResult.setStyle('background-color', "hsl("+hsl.h+", "+hsl.s+"%, "+hsl.l+"%)");
	},
	changevalueXY:function(x, y){
		//console.log(x, y);
		var thumbsize=this.config.thumbXY;
		var topthumb = Math.round(y-thumbsize/2);
		this.thumbXY.setStyle('top', topthumb+"px");
		
		var leftthumb = Math.round(x-thumbsize/2);
		this.thumbXY.setStyle('left', leftthumb+"px");
		this.setXvalue(x);
		this.setYvalue(y);
	},
	updateSL:function(x, y){
		this.changevalueXY(x, y);
		var Box = this.getBoxSL();
		//x: valeur de s et y valeur de l
		var s=Math.round(100-x*100/Box.width);
		var l=Math.round(100-y*100/Box.height);
		this.setS(s);
		this.setL(l);
		this.colorResult.setStyle('background-color', "hsl("+this.getH()+", "+s+"%, "+l+"%)");
	},
	ChangeHex: function(){
		this.fireEvent('change', this, "", this.hslToHex(this.getH(), this.getS(), this.getL()), "", "");
	},
	onTapXY:function(e){
		var Box = this.getBoxSL();
		var x = e.getPageX()-Box.x;
		var y= e.getPageY()-Box.y;
		if(x!=this.getXvalue()||y!=this.getYvalue()) {
			this.updateSL(x, y);
			this.ChangeHex();
		}
	},
	onDragXYEnd:function(e){
		e.stopEvent( );
		this.ChangeHex();
	},
	onDragXY:function(e){
		e.stopEvent( );
		//console.log(e.getPageY() + " " +  e.getPageX());
		var Box = this.getBoxSL();
		var x = e.getPageX();
		var y= e.getPageY();
		
		if(x>=Box.x+Box.width) {
			x=Box.width;
		} else if(x<=Box.x) {
			x=0;
		} else {
			x=x-Box.x;
		}
		
		if(y>=Box.y+Box.height) {
			y=Box.height;
		} else if(y<=Box.y) {
			y=0;
		} else {
			y=y-Box.y;
		}
		if(x!=this.getXvalue()||y!=this.getYvalue()) this.updateSL(x, y);
	},
	onDragHEnd:function(e){
		e.stopEvent( )
		this.ChangeHex();
		//this.fireEvent('change', this, "", this.getValues(), "", "");
	},
	onDragH:function(e){
		e.stopEvent( );
		var xy = this.getBox(this.hueSlider.getBox());
		//, updateLastDeg=true;
		var deg = this.rad2deg(Math.atan2(e.getPageY() - xy.y, e.getPageX() - xy.x))+90;
		deg = deg>0?deg:360+deg;
		
		var value = "";
		var min=this.getMinValue();
		var amplitude=this.getMaxValue()-min;
		value=Math.round(deg*amplitude/360/this.config.increment)*this.config.increment+min;
		this.setH(value);
	},
	updateH:function(value, oldValue){
		this.SLpicker.setStyle('background-color', "hsl("+value+", 100%, 50%)");
		this.hueThumbValue(value);
		this.colorResult.setStyle('background-color', "hsl("+value+", "+this.getS()+"%, "+this.getL()+"%)");
	},
	hueThumbValue:function(value){
		deg=this.value2deg(value);
		deg=this.adjustDeg(deg);
		this.hueMarker.setStyle('-webkit-transform', 'rotate('+deg+'deg)');
		this.hueMarker.setStyle('transform', 'rotate('+deg+'deg)');
	},
	updateState: function(value, oldValue) {
	//setState: function(value) {
	console.log("state"+value);
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
	getBox:function(sliderBox){
		//var sliderBox = this.sliderBox.getBox();
		return {x:sliderBox.x+(sliderBox.width/2), y:sliderBox.y+(sliderBox.height/2)};
	},
	getBoxSL:function(){
		var sliderBox = this.SLpicker.getBox();
		return {x:sliderBox.x, y:sliderBox.y, width:sliderBox.width, height: sliderBox.height};
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
	},
//Conversions des couleurs
	hslToHex: function(h, s, l){
		var rgb,r,g,b,m1, m2, hue;
		
		s /=100;
		l /= 100;
		
		if (s == 0) r = g = b = (l * 255);
		else {
			m2 = l <= 0.5 ? l * (s + 1):
			l + s - l * s;
			m1 = l * 2 - m2;
			hue = h / 360;
			r = this.HueToRgb(m1, m2, hue + 1/3);
			g = this.HueToRgb(m1, m2, hue);
			b = this.HueToRgb(m1, m2, hue - 1/3);
		}
		
		rgb = b | (g << 8) | (r << 16);
		
		return rgb.toString(16);
	},
	//utilisé par hslToHex
	HueToRgb: function(m1, m2, hue) {
		hue < 0 ? hue += 1 :
		hue > 1 ? hue -= 1:
		false;
		
		var v = 6 * hue < 1 ? m1 + (m2 - m1) * hue * 6 :
		2 * hue < 1 ? m2 :
		3 * hue < 2 ? m1 + (m2 - m1) * (2/3 - hue) * 6 :
		m1;
		
		return 255 * v;
	},
	hexToHsl: function(hex){
		var rgb= this.hexToRgb(hex);
		var hsl= this.rgbToHsl(rgb.r, rgb.g, rgb.b);
		return hsl;
	},
	rgbToHsl: function(r, g, b){
		r /= 255, g /= 255, b /= 255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;
		
		if(max == min){
			h = s = 0; // achromatic
		}else{
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch(max){
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}
		
		return {h:Math.floor(h * 360), s:Math.floor(s * 100), l:Math.floor(l * 100)};
	},
	hexToRgb: function(hex) {
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
				return r + r + g + g + b + b;
		});
		
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}/*, //Non utilisé
	rgbToHex: function(red, green, blue) {
		var out = '#';
		for (var i = 0; i < 3; ++i) {
			var n = typeof arguments[i] == 'number' ? arguments[i] : parseInt(arguments[i]);
			
			if (isNaN(n) || n < 0 || n > 255) {
				return false;
			}
			
			out += (n < 16 ? '0' : '') + n.toString(16);
		}
		return out
	}*/
});
