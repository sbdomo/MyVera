Ext.define('Ext.ux.vslider',{
	xtype:'vslider',
	extend:'Ext.Component',
	config:{
		/**
         * @cfg {String} name two hidden form field will be created with this name as name-time and name-count so that we can use it under form as other input fields
         */
		name:'timer-1',



		maxValue:100,
		values: 0,
		maxValue:100,
		markerTime:0,
		increment: 1,
		dragStepModular:2,
		icon:0,
		colorNumber:'000000',
		/**
         * A voir
         */
		bottomHtml:'',
		topHtml:''
		//color:'#7EBFFF',
		
	},	
	getElementConfig:function(){
		return {
			reference:'element',
			//className:'x-container',
			//tag:'div',
			children:[{
					reference:'timerBox',
					cls:'circleslider',
					children:[
					{
						reference:'timerCircleBox',
						cls:'slider-circle'
					},
					{
						reference:'timerTimeTextBox',
						cls:'slider-text',
						children:[{
							tag:'span',
							reference:'minText',
							cls:'big',
							html:'0'
						}]
					},
					{
						reference:'marker',
						cls:'marker',
						children:[{
							reference:'markerImage',
							cls:'markerImage'
						}]
					},
					{
					reference: 'moduleState',
					tag: 'img',
					cls: 'vide',
					style: 'z-index:1000; top:30px; left:25px; width:18px;',
					src:"./resources/images/indic/vide.png"
					}
					]
			}]
			
		}
	},
	initialize:function(){
		this.timerBox.setStyle('background', "url(resources/images/cslider/fond"+this.config.icon+".png) center");
		this.timerBox.setStyle('background-size', "104px auto");
		this.callParent(arguments);
		//this.timerTimeTextBox.on('tap', me.onTimerTimeTextBoxTap, me);
		this.marker.on({
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
		var xy = this.getXY(), updateLastDeg=true;
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
		var value = ""
		if(this.config.increment=="0.1") {
			value=Math.round(deg*this.getMaxValue()/360*10)/10;
		} else {
			value=Math.round(deg*this.getMaxValue()/360);
		}
		this.setValues(value);
	},
	updateIcon:function(value){
		var oldvalue = this.config.icon;
		if(oldvalue!=value) {
			//console.log("icon:"+value + " " + oldvalue);
			this.config.icon=value;
			this.timerBox.setStyle('background', "url(resources/images/cslider/fond"+value+".png) center");
			this.timerBox.setStyle('background-size', "104px auto");
		}
		
	},
	updateColorNumber: function(value) {
		var oldvalue = this.config.icon;
		if(oldvalue!=value) {
			//console.log("color:" + value);
			this.config.colorNumber = value;
			this.minText.setStyle('color', '#' + value);
		}
	},
	updateValues:function(value, oldValue){
		this.minText.setHtml(value);
		//problème de clipping
		//this.updateTimeArcPostion(this.value2deg(value));
		this.setMarkerTime(value);
	},
	updateMarkerTime:function(value){
		this.updateMarkerPostion(this.value2deg(value));
	},
	/*
	updateTimeArcPostion:function(deg){
		if(!this.timerCircleBox){
			return;	
		}
		deg = this.adjustDeg(deg);
		if(deg>180){
			this.timerCircleBox.addCls('timer-pie180');
		}else{
			this.timerCircleBox.removeCls('timer-pie180');
		}
		this.timerPie1.setStyle('-webkit-transform', 'rotate('+deg+'deg)');
	},*/
	updateMarkerPostion:function(deg){
		deg = this.adjustDeg(deg);
		this.marker.setStyle('-webkit-transform', 'rotate('+deg+'deg)');
		this.marker.setStyle('transform', 'rotate('+deg+'deg)');
	},
	
	setIncrMax: function(value) {
		if(value!=null&&value!="") {
			var taille=value.split('|');
			this.config.increment=taille[0];
			this.config.maxValue=taille[1];
			this.setIncrement(taille[0]);
			this.setMaxValue(taille[1]);
		}
	},
	/*updateColor:function(value, oldValue) {
		this.timerPie1.setStyle({'background-color':value, 'border-color':value});
		this.timerPie2.setStyle({'background-color':value, 'border-color':value});
	},*/
	//setColorNumber: function(value) {
		/*console.log('color change' + value);
		var color = '#' + value;
		this.config.color = color;
		//this.setColor('#' + value);
		this.timerPie1.setStyle({'background-color':color, 'border-color':color});
		this.timerPie2.setStyle({'background-color':color, 'border-color':color});
		console.log('color' + this.config.color);*/
		/*
		this.config.helperColor='#' + value;
		this.helperInput.setStyle('color', '#' + value);
		*/
	//},
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
	
	
	
	getXY:function(){
		var timerOuterBox = this.timerCircleBox.getBox();
		return {x:timerOuterBox.x+(timerOuterBox.width/2), y:timerOuterBox.y+(timerOuterBox.height/2)};
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
		return (360*value/this.getMaxValue());
	},

	applyBottomHtml:function(html){
		if(html.length<1){
			return;	
		}		
		this.add({
			xtype:'component',
			docked:'bottom',
			cls:'bottomText',
			html:html
		});
	},
	applyTopHtml:function(html){
		if(html.length<1){
			return;	
		}
		this.add({
			xtype:'component',
			docked:'top',
			cls:'topText',
			html:html
		});
	}
});
