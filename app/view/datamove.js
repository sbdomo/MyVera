Ext.define('myvera.view.datamove', {
	extend: 'Ext.DataView',
	xtype: 'datamove',
	requires:['Ext.util.Draggable', 'myvera.util.Templates'],
	stores: ['devicesStore'],
	config: {
		emptyText: locale.getSt().misc.nodevice,
		store: 'devicesStore',
		scrollable: null,
		currendid: null,
		recordmove: new Array(),
		draggablerecord: new Array(),
		autoDestroy: true,
		items: [
		{
			xtype: 'toolbar',
			docked: 'bottom',
			//ui: 'light',
			items: [
			{
			xtype: 'button',
			name: 'backbutton',
			text: locale.getSt().button.back,
			ui: 'back',
			handler: function() {
				var records = this.getParent().getParent().config.recordmove;
				var idfloor = this.getParent().getParent().config.idfloor;
				var offsetx=0;
				var offsety=0;
				var left = "";
				var top = "";
				for (var idrecord in records) {
					offsetx=records[idrecord]['offsetx'];
					offsety=records[idrecord]['offsety'];
					
					//records[idrecord]['offsetx']=0;
					//records[idrecord]['offsety']=0;
					
					if(records[idrecord]['record'].get('etage')==idfloor) {
						left='left';
						top='top';
					} else if(records[idrecord]['record'].get('etage1')==idfloor) {
						left='left1';
						top='top1';
					} else if(records[idrecord]['record'].get('etage2')==idfloor) {
						left='left2';
						top='top2';
					} else {
						alert(locale.getSt().misc.noview +" !");
						left="";
					}
					if(left!="") {
						records[idrecord]['record'].set(left, records[idrecord]['record'].get(left)+offsetx);
						records[idrecord]['record'].set(top, records[idrecord]['record'].get(top)+offsety);
					}
					//console.log(records[idrecord]);
				}
				//this.getParent().getParent().config.recordmove.length = 0;
				//this.getParent().getParent().config.recordmove=[];
				//records=[];
				//console.log(this.getParent().getParent().config.draggablerecord);
				Ext.getCmp('PanelConfigNavigation').pop();
			}
			}
			]
		}],
		listeners:{
			painted:function(e,d){
				this.config.draggablerecord= [];
				myvera.app.getController('myvera.controller.contdevices').stopsynchro();
				console.log(this.id + " painted");
			},
			itemtouchstart: function(me, index, target, record, e, eOpts) {
				this.setCurrendid(record.get('id'));	
				if(!Ext.Array.contains(this.config.draggablerecord, record.get('id'))) {
					//console.log("create draggable", target);
					this.config.draggablerecord.push(record.get('id'));
					this.config.recordmove[record.get('id')] = {
						'record':record,
						'offsetx':0,
						'offsety':0
					};
					
					var currentdrag = new Ext.util.Draggable({
						element: target,
						constraint: ({
							min: { x: -Infinity, y: -Infinity },
							max: { x: Infinity, y: Infinity }
						}),
						listeners: {
							//drag: this.onDrag,
							dragend: this.onDragend,
							//dragstart: this.onDragStart,
							scope: this
						}
					});
				}
			}
		}
	},
	onDragend: function(el, e, offsetX, offsetY, eOpts) {
		//e.stopEvent();
		var currendid=this.getCurrendid();
		this.config.recordmove[currendid]['offsetx']=el.offset.x;
		this.config.recordmove[currendid]['offsety']=el.offset.y;
		myvera.app.getController('myvera.controller.contconfig').alertDirtydevices();
	}
});