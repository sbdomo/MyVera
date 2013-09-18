Ext.ns('Ext.custom');
Ext.define('Ext.custom.MySlider',{
	extend:'Ext.slider.Slider',
	xtype: 'myslider',
	config:{
		left_trans_width:43,
		width: 200,
		helperColor: 'black',
		value: 0,
		type: 0,
		thumbConfig:{
			draggable:{
				direction:'both'
			}
		}
	},
	initialize:function(){
		if(this.config.type==1) {
			var left_trans_width=this.config.left_trans_width;
			var perytrans = ((this.config.width-left_trans_width)/2)-10;
			var tw = this.config.width-left_trans_width-30;
			var trans_width_mod = (this.config.width-left_trans_width)/2;
			var twidth="";
			if (this.config.slide_cnt>1){
				twidth = trans_width_mod*(this.config.slide_cnt-1);
				for(i = 0; i<this.config.slide_cnt;i++){
					twidth += (trans_width_mod);
				}
			} else {
				twidth=trans_width_mod;
			}
			this.setStyle("-webkit-transform:translate(-"+twidth+"px,0) translate(0,"+perytrans+"px) rotate(-90deg)");
			var widthstate=this.config.width-5;
			this.helperInput.setStyle('left', widthstate+"px");
			this.helperInput.setStyle('-webkit-transform', "rotate(90deg)");
			widthstate=this.config.width-20;
			this.moduleState.setStyle('left', widthstate+"px");
		}

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
				//cls: Ext.baseCSSPrefix + 'slider-helper',
				children: [
					{
					reference: 'helperInput',
					tag: 'div',
					html:'',
					step: self.initialConfig.increment,
					cls: Ext.baseCSSPrefix + 'slider-helper-input',
					style:"position:absolute; top:5px; left:200px;"
					},
					{
					reference: 'moduleState',
					tag: 'img',
					cls: 'vide',
					style: 'z-index:1000; top:-5px;',
					//style: 'z-index:1000;',
					//width: '18px',
					src:"./resources/images/indic/vide.png"
					}
				]
		}];
		
		return originalConfig;
	},
	onWidthchange: function(me, value, oldValue, eOpts) {
		
		if(this.config.type==1) {
			var left_trans_width=this.config.left_trans_width;
			var perytrans = ((value-left_trans_width)/2)-10;
			var tw = value-left_trans_width-30;
			var trans_width_mod = (value-left_trans_width)/2;
			var twidth="";
			if (this.config.slide_cnt>1){
				twidth = trans_width_mod*(this.config.slide_cnt-1);
				for(i = 0; i<this.config.slide_cnt;i++){
					twidth += (trans_width_mod);
				}
			} else {
				twidth=trans_width_mod;
			}
			this.setStyle("-webkit-transform:translate(-"+twidth+"px,0) translate(0,"+perytrans+"px) rotate(-90deg)");
			var widthstate=value-5;
			this.helperInput.setStyle('left', widthstate+"px");
			this.helperInput.setStyle('-webkit-transform', "rotate(90deg)");
			widthstate=value-20;
			this.moduleState.setStyle('left', widthstate+"px");
		} else {
			this.helperInput.setStyle('left', value+"px");
		}
		
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
		var value = value;
		//Modification pour mettre un arrondi à une décimale
		this.helperInput.setHtml(Math.round(value*10)/10);
	},
	setHelperColor: function(value) {
		this.config.helperColor=value;
		this.helperInput.setStyle('color', value);
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
	setHelperColorNumber: function(value) {
		this.config.helperColor='#' + value;
		this.helperInput.setStyle('color', '#' + value);
	},
	setType: function(value) {
		this.config.type= value;
		
		//return Ext.factory(this.getThumbConfig(),Ext.custom.Thumb);
	},
	getType: function() {
		return this.config.type;
	},
	factoryThumb:function(){
		//if(this.config.type==1) {
			return Ext.factory(this.getThumbConfig(),Ext.custom.Thumb);
		//} else {
		//	return Ext.factory(this.getThumbConfig(), Ext.slider.Thumb);
		//}
	},
	onThumbDragStart: function(thumb, e) {
		if(this.config.type==1) {
			if (e.absDeltaY <= e.absDeltaX) {
				return false;
			}
			else {
				e.stopPropagation();
			}
			
			if (this.getAllowThumbsOverlapping()) {
				this.setActiveThumb(thumb);
			}

			this.dragStartValue = this.getValue()[this.getThumbIndex(thumb)];
			this.fireEvent('dragstart', this, thumb, this.dragStartValue, e);
		} else {
		        if (e.absDeltaX <= e.absDeltaY) {
		        	return false;
		        }
		        else {
		        	e.stopPropagation();
		        }
		        
		        if (this.getAllowThumbsOverlapping()) {
		        	this.setActiveThumb(thumb);
		        }
		        
		        this.dragStartValue = this.getValue()[this.getThumbIndex(thumb)];
		        this.fireEvent('dragstart', this, thumb, this.dragStartValue, e);
		}
		
	}
});

Ext.define('Ext.custom.Draggable',{
	extend:'Ext.util.Draggable',
	onDrag: function(e) {
        if (!this.isDragging) {
            return;
        }

        var startOffset = this.dragStartOffset;
        if(Ext.getCmp(this.getElement().getParent().getId()).getType()==0) {
        	this.fireAction('drag', [this, e, startOffset.x + e.deltaX, startOffset.y + e.deltaY], this.doDrag);
        } else {
        	this.fireAction('drag', [this, e, startOffset.x - e.deltaY, startOffset.y + e.deltaX], this.doDrag);
        }
    },
    initDragStart: function(me, e, offsetX, offsetY) {
        this.dragStartOffset = {
            x: offsetX,
            y: offsetY
        };

        this.isDragging = true;

        this.getElement().addCls(this.getDraggingCls());
    }	
})
Ext.define('Ext.custom.behavior.Draggable',{
	extend:'Ext.behavior.Draggable',
    setConfig: function(config) {
        var draggable = this.draggable,
            component = this.component;

        if (config) {
            if (!draggable) {
                component.setTranslatable(true);
                this.draggable = draggable = new Ext.custom.Draggable(config);
                draggable.setTranslatable(component.getTranslatable());
                draggable.setElement(component.renderElement);
                draggable.on('destroy', 'onDraggableDestroy', this);

                if (component.isPainted()) {
                    this.onComponentPainted(component);
                }

                component.on(this.listeners);
            }
            else if (Ext.isObject(config)) {
                draggable.setConfig(config);
            }
        }
        else if (draggable) {
            draggable.destroy();
        }

        return this;
    }
})

Ext.define('Ext.custom.Component',{
	extend:'Ext.Component',
	getDraggableBehavior:function(){
        var behavior = this.draggableBehavior;

        if (!behavior) {
            behavior = this.draggableBehavior = new Ext.custom.behavior.Draggable(this);
        }

        return behavior;
	}
});

Ext.define('Ext.custom.Thumb', {
    extend: 'Ext.custom.Component',
    xtype : 'cust_thumb',

    config: {
        /**
         * @cfg
         * @inheritdoc
         */
        baseCls: Ext.baseCSSPrefix + 'thumb',

        /**
         * @cfg
         * @inheritdoc
         */
        draggable: {
            direction: 'both'
        }
    },

    elementWidth: 0,

    initialize: function() {
        this.callParent();

        this.getDraggable().onBefore({
            dragstart: 'onDragStart',
            drag: 'onDrag',
            dragend: 'onDragEnd',
            scope: this
        });

        this.on('painted', 'onPainted');
    },
  
    onDragStart: function() {
    	if (this.isDisabled()) {
            return false;
        }
    	this.parent.onThumbDragStart(this,arguments[1]);
        this.relayEvent(arguments);
    },

    onDrag: function() {
        if (this.isDisabled()) {
            return false;
        }
        this.parent.onThumbDrag(this,arguments[1],arguments[2]);
        this.relayEvent(arguments);
    },

    onDragEnd: function() {
        if (this.isDisabled()) {
            return false;
        }
        this.parent.onThumbDragEnd(this,arguments[1]);
        this.relayEvent(arguments);
    },

    onPainted: function() {
        this.elementWidth = this.element.dom.offsetWidth;
    },

    getElementWidth: function() {
        return this.elementWidth;
    }
});