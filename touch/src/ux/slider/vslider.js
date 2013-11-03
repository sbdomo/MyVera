Ext.define('Ext.ux.slider.vslider',{
	xtype:'vslider',
	extend:'Ext.Component',
	config:{
		values: null,
		incrMax: null,
		maxValue:100,
		minValue:0,
		//thumbValue:null,
		increment: 1,
		icon:null,
		fontsize: null,
		suffix: null,
		colorNumber:null,
		width: 200, //c'est en fait le height du slider car il est vertical.
		thumbHeight:30,
		toptext:215,
		type: 1,
		iconWidth: null,
		state: null
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
					html:''
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
		this.callParent(arguments);
		if(this.config.type!=1) {
			this.fond.removeCls('fond');
			this.thumb.removeCls('thumb2');
			this.thumb.addCls('thumb');
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
		this.on({
			scope: this,
			widthchange: 'onWidthchange'
		});
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
	updateIcon:function(value, oldValue){
		//var oldvalue = this.config.icon;
		if(value!=oldValue&&value!="") {
			//console.log('icon' + value + "/" + oldValue);
			if(this.config.type!=1) {
				this.sliderBox.setStyle('background', "url(resources/images/imgslider/fond"+value+".png)");
				this.sliderBox.setStyle('background-size', "contain");
				
				this.clipper.setStyle('background', "url(resources/images/imgslider/clipper"+value+".png)");
				this.clipper.setStyle('background-size', "cover");
				
				this.thumb.setStyle('background', "url(resources/images/imgslider/thumb"+value+".png)");
				this.thumb.setStyle('background-size', "contain");
			}
		}
	},
	//Changement de la hauteur du slider
	onWidthchange: function(me, value, oldValue, eOpts) {
			this.sliderBox.setStyle("height", value+"px");
			//console.log('width' + this.getWidth());
			if(this.getValues()) this.ThumbValue(this.getValues(), "setWidth");
	},
	updateValues:function(value, oldValue){
		//console.log('updateValues' + value +" " + oldValue);
		//this.config.values = value;
		//if(this.getSuffix()) suffix= this.getSuffix();
		this.minText.setHtml(value +this.getSuffix());
		this.ThumbValue(value, "updateValues");
	},
	ThumbValue:function(value, origin){
		var height = this.getWidth();
		var thumbHeight=this.config.thumbHeight;
		var top = (this.getMaxValue() - value)*height/(this.getMaxValue()-this.getMinValue());
		var topthumb = Math.round(top-thumbHeight/2);
		this.thumb.setStyle('top', topthumb+"px");
		top = Math.round(top);
		this.clipper.setStyle("height", top+"px");
		
		var toptext = height + Math.round(thumbHeight/2);
		//console.log("toptext" + toptext + "/"+ value + "/" + origin);
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
		if(value!=null&&value!=""&&value!=this.config.incrMax) {
			this.config.incrMax=value;
			var taille=value.split('|');
			//this.config.increment=taille[0];
			//this.config.minValue=taille[1];
			//this.config.maxValue=taille[2];
			this.setIncrement(taille[0]);
			this.setMinValue(taille[1]);
			this.setMaxValue(taille[2]);
			if(taille[3]) {
				if(this.config.thumbHeight=taille[3]) {
					//console.log("thumbHeight" + taille[3]);
					this.config.thumbHeight=taille[3];
					this.thumb.setStyle("height", taille[3]+"px");
					if(this.getValues()) this.ThumbValue(this.getValues(), "setIncrMax");
				}
			}
		}
	},
	updateSuffix: function(value, oldValue) {
		//var oldvalue = this.config.suffix;
		if(value!=oldValue) {
			//console.log("suffix" + value + "/" + oldValue);
			//this.config.suffix = value;
			if(this.getValues()) this.minText.setHtml(this.getValues() + value);
		}
	},
	
	
	updateColorNumber: function(value, oldValue) {
		//var oldvalue = this.config.icon;
		if(value!=oldValue) {
			//console.log("updateColorNumber"+ value);
			//this.config.colorNumber = value;
			this.minText.setStyle('color', '#' + value);
		}
	},

	updateFontsize: function(value, oldValue) {
		//var oldvalue = this.config.fontsize;
		if(value!=oldValue) {
			//console.log('updateFontsize' + value);
			//this.config.fontsize = value;
			this.minText.setStyle('font-size', value);
		}
	},

	//Changement de la largeur
	updateIconWidth: function(value, oldValue) {
	//setIconWidth:function(value){
		if(value!=oldValue&&this.config.type!=1) {
			//console.log("iconwidth" + value);
		//if(value!=this.config.iconWidth&&this.config.type!=1) {
			this.sliderBox.setStyle("width", value+"px");
			//this.config.iconWidth = value;
		}
	},
	updateState: function(value, oldValue) {
	//setState: function(value) {
		if(value!=oldValue) {
		//console.log("setState"+value);
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
		return {x:sliderBox.x, y:sliderBox.y, width:sliderBox.width, height: sliderBox.height};
	}
});
