Ext.define('Ext.ux.slider.vslider',{
	xtype:'vslider',
	extend:'Ext.Component',
	config:{
		values: 0,
		maxValue:100,
		minValue:0,
		thumbValue:0,
		increment: 1,
		icon:-1,
		fontsize: '10px',
		suffix: '',
		colorNumber:'000000',
		width: 200, //c'est en fait le height du slider car il est vertical.
		thumbHeight:30,
		toptext:215,
		type: 1,
		iconWidth: 30
	},
	getElementConfig:function(){
		return {
			reference:'element',
			children:[{
				reference:'sliderBox',
				cls:'vslider',
				children:[
				{
					reference:'fond',
					cls:'fond'
				},
				{
					reference:'clipper',
					cls:'slider-clipper'
				},
				{
					tag:'span',
					reference:'minText',
					cls:'basetext',
					html:'0'
				},
				{
					reference: 'moduleState',
					tag: 'img',
					cls: 'vide',
					style: 'z-index:1000; top:-9px; left:-9px; width:18px;',
					src:"./resources/images/indic/vide.png"
				},
				{
					reference:'thumb',
					//tag: 'img',
					//draggable:false,
					cls: 'thumb2'
					//,
					//src:"./resources/images/indic/vide.png"
					//src:"./resources/images/imgslider/thumb0.png"
				}
				]
			}]
		}
	},
	initialize:function(){
		//***this.sliderBox.setStyle('background', "url(resources/images/cslider/fond"+this.config.icon+".png) center");
		//***this.sliderBox.setStyle('background-size', "104px auto");
		this.callParent(arguments);
		if(this.config.type!=1) {
			this.fond.removeCls('fond');
			this.thumb.removeCls('thumb2');
			this.thumb.addCls('thumb');
			//console.log("height"+this.config.thumbHeight);
			//this.thumb.dom.src="./resources/images/imgslider/thumb"+value+".png";
			//this.updateIcon(this.config.icon);
		}
		
		//this.timerTimeTextBox.on('tap', me.onTimerTimeTextBoxTap, me);
		/*this.thumb.on({
			scope: this,
			drag: 'onDrag',
			dragend: 'onDragEnd'
		});
		this.clipper.on({
			scope: this,
			drag: 'onDrag',
			dragend: 'onDragEnd'
		});*/
		this.sliderBox.on({
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
		//console.log(e.getPageY() + " " +  e.getPageX());
		var Box = this.getBox();
		var x = e.getPageX();
		var y= e.getPageY();//+this.config.thumbHeight/2;
		//console.log(this.thumb.getHeight());
		if(x>=Box.x-10&&x<=Box.x+Box.width+10) {
			var slidevalue=0;
			if(y>=Box.y+Box.height) {
				slidevalue = this.getMinValue();
			} else if(y<=Box.y) {
				slidevalue=this.getMaxValue();
			} else {
				slidevalue = this.getMaxValue() - (y-Box.y)/Box.height*(this.getMaxValue()-this.getMinValue());
				slidevalue= Math.round(slidevalue/this.config.increment)*this.config.increment;
			}
			this.setValues(slidevalue);
		}
	},
	updateIcon:function(value){
		var oldvalue = this.config.icon;
		//console.log("updateIcon"+value+ " " + oldvalue);
		if(oldvalue!=value) {
			//console.log("icon:"+value + " " + oldvalue);
			this.config.icon=value;
			if(this.config.type!=1) {
				this.sliderBox.setStyle('background', "url(resources/images/imgslider/fond"+value+".png)");
				this.sliderBox.setStyle('background-size', "contain");
				
				this.clipper.setStyle('background', "url(resources/images/imgslider/clipper"+value+".png)");
				this.clipper.setStyle('background-size', "cover");
				
				this.thumb.setStyle('background', "url(resources/images/imgslider/thumb"+value+".png)");
				this.thumb.setStyle('background-size', "contain");
				//this.thumb.dom.src="./resources/images/imgslider/thumb"+value+".png";
			}
			//***this.sliderBox.setStyle('background-size', "104px auto");
		}
		
	},
	updateColorNumber: function(value) {
		var oldvalue = this.config.icon;
		if(oldvalue!=value) {
			this.config.colorNumber = value;
			this.minText.setStyle('color', '#' + value);
		}
	},
	updateSuffix: function(value) {
		var oldvalue = this.config.suffix;
		if(oldvalue!=value) {
			this.config.suffix = value;
			this.minText.setHtml(this.getValues() + value);
		}
	},
	updateFontsize: function(value) {
		var oldvalue = this.config.fontsize;
		if(oldvalue!=value) {
			this.config.fontsize = value;
			this.minText.setStyle('font-size', value);
		}
	},
	//Changement de la hauteur du slider
	setWidth:function(value){
		if(value!=this.config.width) {
			this.sliderBox.setStyle("height", value+"px");
			
			//décale de la hauteur et de la moitié du thumb
			//var toptext = value + Math.round(this.thumb.getHeight()/2);
			//this.minText.setStyle("top", toptext+"px");
			
			this.config.width = value;
			if(this.config.value) this.updateThumbValue(this.config.value);
		}
	},
	//Changement de la largeur
	setIconWidth:function(value){
		if(value!=this.config.iconWidth&&this.config.type!=1) {
			this.sliderBox.setStyle("width", value+"px");
			//this.clipper.setStyle("width", value+"px");
			//this.thumb.setWidth(value);
			//console.log(value+"IconWidth"+this.thumb.getHeight());
			//var toptext = this.config.width + Math.round(this.thumb.getHeight()/2);
			//this.minText.setStyle("top", toptext+"px");
			
			//this.thumb.setStyle("width", value+"px");
			//this.minText.setStyle("width", value+"px");
			this.config.iconWidth = value;
				//this.updateThumbValue(this.config.value);
		}
	},
	updateValues:function(value, oldValue){
		this.minText.setHtml(value + this.config.suffix);
		this.setThumbValue(value);
	},
	updateThumbValue:function(value){
		var getBox = this.getBox();
		var height = getBox.height;
		//var thumbHeight=this.thumb.getHeight();
		var thumbHeight=this.config.thumbHeight;
		//console.log("thumbHeight"+thumbHeight);
		//var width = getBox.width;
		//console.log(value + "new width" + width);
		var top = (this.getMaxValue() - value)*height/(this.getMaxValue()-this.getMinValue());
		var topthumb = Math.round(top-thumbHeight/2);
		this.thumb.setStyle('top', topthumb+"px");
		top = Math.round(top);
		this.clipper.setStyle("height", top+"px");
		
		var toptext = this.config.width + Math.round(thumbHeight/2);
		if(toptext!=this.config.toptext) {
		//Positionne le texte si thumbHeight à changé (ne marche pas avant. Pourquoi?
		//if(this.config.thumbHeight!=thumbHeight&&this.thumbHeight!=0) {
			//this.thumbHeight=thumbHeight;
			//décale de la hauteur et de la moitié du thumb
			//var toptext = this.config.width + Math.round(thumbHeight/2);
			this.config.toptext=toptext;
			this.minText.setStyle("top", toptext+"px");
		}
		
		//this.clipper.setStyle("clip", "rect(0px,"+width+"px,"+top+ "px,0px)");
	},
	
	setIncrMax: function(value) {
		if(value!=null&&value!="") {
			var taille=value.split('|');
			//this.config.increment=taille[0];
			//this.config.minValue=taille[1];
			//this.config.maxValue=taille[2];
			this.setIncrement(taille[0]);
			this.setMinValue(taille[1]);
			this.setMaxValue(taille[2]);
			if(taille[3]) {
				this.config.thumbHeight=taille[3];
				this.thumb.setStyle("height", taille[3]+"px");
			}
		}
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
	getBox:function(){
		var sliderBox = this.sliderBox.getBox();
		return {x:sliderBox.x, y:sliderBox.y, width:sliderBox.width, height: sliderBox.height};
	}
});
