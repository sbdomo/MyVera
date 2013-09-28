Ext.define('myvera.view.PanelConfigItem', {
	extend: 'Ext.form.Panel',
	xtype: 'PanelConfigItem',
	id:'PanelConfigItem',
	requires: [
        'Ext.field.Text',
        'Ext.field.Select'
	],
	config: {
		name:'PanelConfigItem',
		scrollable: 'vertical',
		//tpl: ['<img src="resources/images/l<tpl if="icon!=null&#icon!=\'\'">{icon}<tpl else>{category}</tpl>_0.png" /> ID:{id}<br/>Nom: {name}'],
		defaults: {
			labelWidth: '155px'
		},
		items: [
		{
			html:"",
			itemId: 'titlePanelConfigItem',
			tpl: [ '<img style="float: left;" height="40px" src="resources/images/l<tpl if="icon!=null&&category!=111">{icon}'+
			'<tpl elseif="category==4&&(subcategory==4||subcategory==1)">4{subcategory}'+
			'<tpl elseif="category==108&&(subcategory==1||subcategory==2)">110<tpl elseif="category==108">108'+
			'<tpl elseif="category==111&&subcategory==2">111_2_<tpl if="icon!=null">{icon}<tpl else>0</tpl><tpl elseif="category==111"><tpl if="icon!=null">{icon}<tpl else>111</tpl>'+
			'<tpl elseif="category==120&&subcategory==1">121<tpl elseif="category==120&&subcategory==2">122'+
			'<tpl else>{category}</tpl>_0{retina}.png" /><p style="line-height: 30px">&nbsp;&nbsp;{name} - ID:{id}<tpl if="type!=\'clone\'&&ref!=null&&ref!=\'\'"> (+{ref})</tpl></p><p>&nbsp;</p>' ]
		},
		{
			itemId: 'originmodule',
			xtype: 'selectfield',
			hidden: 'true',
			label: locale.getSt().title.asso_devices,
			name: 'originmodule'
		},
		{
			xtype: 'textfield',
			itemId: 'clonename',
			label: locale.getSt().field.name,
			autoCapitalize: false,
			hidden: true,
			name: 'clonename'
		},
		{
			xtype: 'selectfield',
			label: locale.getSt().field.category,
			name: 'category',
			itemId: 'category',
			options: [
			{text: 'Unknown plugin', value:'0'},
			{text: 'Custom device',  value: '108'},
			{text: 'Custom control',  value: '111'},
			{text: 'Virtual ON/OFF Switches (plugin)',  value: '101'},
			{text: 'Variable Container (plugin)',  value: '102'},
			{text: 'Google Calendar Switch (plugin)',  value: '103'},
			{text: 'Virtual Clock (plugin)',  value: '120'},
			{text: 'Pilot wire controller (plugin)',  value: '104'},
			{text: 'Smart Virtual Thermostat (plugin)',  value: '105'},
			{text: 'Day Or Night (plugin)',  value: '106'},
			{text: 'Colored Variable Container (plugin)',  value: '107'},
			{text: 'Sonos (plugin)',  value: '109'},
			{text: 'Interface',  value: '1'},
			{text: 'Dimmable light',  value: '2'},
			{text: 'Switch',  value: '3'},
			{text: 'Security Sensor',  value: '4'},
			{text: 'HVAC',  value: '5'},
			{text: 'Camera',  value: '6'},
			{text: 'Door Lock',  value: '7'},
			{text: 'Window Covering',  value: '8'},
			{text: 'Remote Control',  value: '9'},
			{text: 'IR Transmitter',  value: '10'},
			{text: 'Generic I/O',  value: '11'},
			{text: 'Generic Sensor',  value: '12'},
			{text: 'Serial Port',  value: '13'},
			{text: 'Scene Controller',  value: '14'},
			{text: 'A/V',  value: '15'},
			{text: 'Humidity Sensor',  value: '16'},
			{text: 'Temperature Sensor',  value: '17'},
			{text: 'Light Sensor',  value: '18'},
			{text: 'Zwave Int',  value: '19'},
			{text: 'Insteon Int',  value: '20'},
			{text: 'Power Meter',  value: '21'},
			{text: 'Alarm Panel',  value: '22'},
			{text: 'Alarm Partition',  value: '23'}
			],
			listeners: 
			{
				change:function(selectbox,value,oldvalue){
					var subcat = this.getParent().down('#subcategory');
					if(value=="120"){
						var options = [
						{text: 'Alarm Clock',  value: '0'},
						{text: 'Electrical timer',  value: '1'},
						{text: 'Timer',  value: '2'}
						];
						subcat.setOptions(options);
						subcat.show();
					} else if(value=="4"){
						var options = [
						{text: 'Door Sensor',  value: '1'},
						{text: 'Leak Sensor',  value: '2'},
						{text: 'Motion Sensor',  value: '3'},
						{text: 'Smoke Sensor',  value: '4'}
						];
						subcat.setOptions(options);
						subcat.show();
					} else if(value=="108"){
						var options = [
						{text: 'Normal',  value: '0'},
						{text: 'Security Sensor',  value: '1'},
						{text: 'Security Sensor (+armed)',  value: '2'}
						];
						subcat.setOptions(options);
						subcat.show();
					} else if(value=="111"){
						var options = [
						{text: 'Horizontal slider',  value: '0'},
						{text: 'Vertical slider',  value: '1'},
						{text: 'Circle slider',  value: '2'}
						];
						subcat.setOptions(options);
						subcat.show();
					} else {
						var options = [
						{text: '0', value:'0'},
						{text: '1', value:'1'},
						{text: '2', value:'2'},
						{text: '3', value:'3'},
						{text: '4', value:'4'},
						{text: '5', value:'5'},
						{text: '6', value:'6'}
						];
						subcat.setOptions(options);
						subcat.hide();
					}
					
					this.getParent().down('#CamuserItem').hide();
					this.getParent().down('#CampasswordItem').hide();
					this.getParent().down('#GraphlinkItem').hide();
					this.getParent().down('#wwidth').hide();
					this.getParent().down('#height').hide();
					this.getParent().down('#var1').hide();
					this.getParent().down('#var2').hide();
					this.getParent().down('#var3').hide();
					this.getParent().down('#var4').hide();
					this.getParent().down('#var5').hide();
					this.getParent().down('#var6').hide();
					if(value=="6") {
						this.getParent().down('#CamuserItem').show();
						this.getParent().down('#CampasswordItem').show();
					} else  if(value=="16" || value=="17" || value=="21") {
						this.getParent().down('#GraphlinkItem').setLabel(locale.getSt().field.urlgraph);
						this.getParent().down('#GraphlinkItem').show();
					} else  if(value=="108") {
						this.getParent().down('#GraphlinkItem').setLabel(locale.getSt().field.urlwidget);
						this.getParent().down('#GraphlinkItem').show();
						this.getParent().down('#wwidth').show();
						this.getParent().down('#height').show();
						this.getParent().down('#var1').show();
						this.getParent().down('#var2').show();
						this.getParent().down('#var3').show();
						this.getParent().down('#var4').show();
						this.getParent().down('#var5').show();
						this.getParent().down('#var6').show();
					} else  if(value=="111") {
						this.getParent().down('#GraphlinkItem').setLabel('Incr.|Max');
						this.getParent().down('#GraphlinkItem').show();
						this.getParent().down('#wwidth').show();
						//this.getParent().down('#height').show();
						this.getParent().down('#var1').show();
						//this.getParent().down('#var2').show();
						//this.getParent().down('#var3').show();
						this.getParent().down('#var4').show();
						//this.getParent().down('#var5').show();
						//this.getParent().down('#var6').show();
					}
					
					
					this.getParent().config.data.category = value;
					var label = this.getParent().down('#titlePanelConfigItem');
					var html = label.getTpl().apply(this.getParent().config.data);
					label.setHtml(html);
				}
			}
		},
		{
			xtype: 'selectfield',
			label: locale.getSt().field.subcategory,
			name: 'subcategory',
			itemId: 'subcategory'
		},
		{
			xtype: 'togglefield',
			name: 'onboard',
			itemId: 'onboard',
			label: locale.getSt().title.board
		},
		{
			xtype: 'textfield',
			itemId: 'CamuserItem',
			label: locale.getSt().field.camerauser,
			autoCapitalize: false,
			hidden: true,
			name: 'camuser'
		},
		{
			xtype: 'passwordfield',
			itemId: 'CampasswordItem',
			label: locale.getSt().field.camerapassword,
			hidden: true,
			name: 'campassword'
		},
		{
			xtype: 'textfield',
			itemId: 'var1',
			label: locale.getSt().field.varstatus,
			autoCapitalize: false,
			hidden: true,
			name: 'var1'
		},
		{
			xtype: 'textfield',
			itemId: 'var2',
			label: locale.getSt().field.vartext + " 1",
			autoCapitalize: false,
			hidden: true,
			name: 'var2'
		},
		{
			xtype: 'textfield',
			itemId: 'var3',
			label: locale.getSt().field.suffix + " 1",
			autoCapitalize: false,
			hidden: true,
			name: 'var3'
		},
		{
			xtype: 'textfield',
			itemId: 'var5',
			label: locale.getSt().field.vartext + " 2",
			autoCapitalize: false,
			hidden: true,
			name: 'var5'
		},
		{
			xtype: 'textfield',
			itemId: 'var6',
			label: locale.getSt().field.suffix + " 2",
			autoCapitalize: false,
			hidden: true,
			name: 'var6'
		},
		{
			xtype: 'textfield',
			itemId: 'var4',
			label: locale.getSt().field.command,
			autoCapitalize: false,
			hidden: true,
			name: 'var4',
			placeHolder: 'service|action|targetvalue'
		},
		{
			xtype: 'textfield',
			itemId: 'GraphlinkItem',
			label: locale.getSt().field.urlwidget,
			autoCapitalize: false,
			hidden: true,
			name: 'graphlink'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.width,
			name: 'wwidth',
			hidden: true,
			itemId: 'wwidth'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.height,
			name: 'height',
			hidden: true,
			itemId: 'height'
		},
		{
			xtype: 'togglefield',
			name: 'forced',
			itemId: 'forced',
			label: locale.getSt().misc.chooseroom,
			listeners: {
				change: function(field, newValue) {
					if(field.getValue()==1) this.getParent().down('#room').show();
					else this.getParent().down('#room').hide();
				}
			}
		},
		{
			xtype: 'selectfield',
			label: locale.getSt().title.rooms,
			name: 'room',
			itemId: 'room',
			store: 'Rooms',
			displayField:'name',
			hidden: true,
			valueField: 'id'
		},
		{
			xtype: 'selectfield',
			label: locale.getSt().field.view +' 0',
			name: 'etage',
			itemId: 'etage',
			store: 'FloorsStore',
   			displayField:'name',
   			valueField: 'id',
			listeners: 
			{
				change:function(selectbox,value,oldvalue){
					if(value=="-1"){
						this.getParent().down('#PlaceItem').hide();
						this.getParent().down('#LeftItem').hide();
						this.getParent().down('#TopItem').hide();
					} else {
 						this.getParent().down('#PlaceItem').show();
						this.getParent().down('#LeftItem').show();
						this.getParent().down('#TopItem').show();
					}
				}
			}
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.positionleft,
			itemId: 'LeftItem',
			name: 'left'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.positiontop,
			itemId: 'TopItem',
			name: 'top'
		},
		{
			xtype: 'button',
			margin: 15,
			align: 'center',
			itemId: 'PlaceItem',
			iconCls: 'locate',
			iconMask: true,
			text: locale.getSt().misc.defineplace,
			handler: function(){
			this.getParent().openpanelimage('');
			}
		},
		{
			xtype: 'selectfield',
			label: locale.getSt().misc.inison,
			itemId: 'verif',
			name: 'verif',
			options: [
			{text: locale.getSt().misc.ifon,  value: 'yes'},
			{text: locale.getSt().misc.ifoff,  value: 'off'},
			{text: locale.getSt().misc.never, value: 'no'}
			]
		},
		{
			xtype: 'selectfield',
			label: locale.getSt().field.textcolor,
			defaultType: 'panel',
			name:'color',
			itemId:'color',
			options: [
			{text: 'Black', value:'000000'},
			{text: 'White',  value: 'FFFFFF'},
			{text: 'Yellow',  value: 'FFFF00'},
			{text: 'Fuchsia',  value: 'FF00FF'},
			{text: 'Red',  value: 'FF0000'},
			{text: 'Silver',  value: 'C0C0C0'},
			{text: 'Gray',  value: '808080'},
			{text: 'Olive',  value: '808000'},
			{text: 'Purple',  value: '800080'},
			{text: 'Maroon',  value: '800000'},
			{text: 'Aqua',  value: '00FFFF'},
			{text: 'Lime',  value: '00FF00'},
			{text: 'Teal',  value: '008080'},
			{text: 'Green',  value: '008000'},
			{text: 'Blue',  value: '0000FF'},
			{text: 'Navy',  value: '000080'}
			]
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.textsize,
			name: 'fontsize',
			itemId: 'fontsize',
			placeHolder: '10px'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.iconnum,
			name: 'icon',
			itemId: 'icon'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.iconwidth,
			name: 'width',
			itemId: 'width'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.index,
			name: 'ind',
			itemId: 'ind',
			value: 90
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.sceneon,
			name: 'sceneon'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.sceneoff,
			name: 'sceneoff'
		},
		{
			xtype: 'selectfield',
			label: locale.getSt().field.view+ ' 1',
			name: 'etage1',
			itemId: 'etage1',
			store: 'FloorsStore',
   			displayField:'name',
   			valueField: 'id',
			listeners: 
			{
				change:function(selectbox,value,oldvalue){
					if(value=="-1"){
						this.getParent().down('#PlaceItem1').hide();
						this.getParent().down('#LeftItem1').hide();
						this.getParent().down('#TopItem1').hide();
					} else {
 						this.getParent().down('#PlaceItem1').show();
						this.getParent().down('#LeftItem1').show();
						this.getParent().down('#TopItem1').show();
					}
				}
			}
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.positionleft,
			itemId: 'LeftItem1',
			name: 'left1'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.positiontop,
			itemId: 'TopItem1',
			name: 'top1'
		},
		{
			xtype: 'button',
			margin: 15,
			align: 'center',
			itemId: 'PlaceItem1',
			iconCls: 'locate',
			iconMask: true,
			text: locale.getSt().misc.defineplace,
			handler: function(){
			this.getParent().openpanelimage('1');
			}
		},
		{
			xtype: 'selectfield',
			label: locale.getSt().field.view +' 2',
			name: 'etage2',
			itemId: 'etage2',
			store: 'FloorsStore',
   			displayField:'name',
   			valueField: 'id',
			listeners: 
			{
				change:function(selectbox,value,oldvalue){
					if(value=="-1"){
						this.getParent().down('#PlaceItem2').hide();
						this.getParent().down('#LeftItem2').hide();
						this.getParent().down('#TopItem2').hide();
					} else {
 						this.getParent().down('#PlaceItem2').show();
						this.getParent().down('#LeftItem2').show();
						this.getParent().down('#TopItem2').show();
					}
				}
			}
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.positionleft,
			itemId: 'LeftItem2',
			name: 'left2'
		},
		{
			xtype: 'textfield',
			label: locale.getSt().field.positiontop,
			itemId: 'TopItem2',
			name: 'top2'
		},
		{
			xtype: 'button',
			margin: 15,
			align: 'center',
			itemId: 'PlaceItem2',
			iconCls: 'locate',
			iconMask: true,
			text: locale.getSt().misc.defineplace,
			handler: function(){
			this.getParent().openpanelimage('2');
			}
		},
		{
			xtype: 'button',
			margin: 5,
			itemId: 'SaveItem',
			ui: 'confirm',
			text: locale.getSt().button.adddevice,
			iconCls: 'add',
			iconMask: true,
			handler: function(){
				var form = this.getParent();
				var formdata = form.getValues();
				var data = form.config.data;
				var devices = Ext.getStore('devicesStore');
				
				var fontsize=formdata.fontsize;
				if(fontsize=="") fontsize="10px";
				
				var listdevice="";
				var newdevice=true;
				if(data.type=="clone") {
					if (data.state!="-4") newdevice=false;
				} else {
					//C'est l'inverse ! state = -4 qand ce n'est pas un nouveau device
					if (data.state=="-4") newdevice=false;
					listdevice = Ext.getStore('ConfigDevicesStore').getById(data.id);
				}
				
				//Le module est déjà dans la liste
				if (!newdevice) {
					var device = devices.getById(data.id);
					
					//Le module est un clone
					if(data.type=='clone') {
						device.set("name", formdata.clonename);
						
						//le module d'origine à changé
						if(formdata.originmodule!=data.ref) {
							var ref = formdata.originmodule;
							device.set("ref", ref);
							//affectation de la référence au device d'origine et supression de la référence sur l'ancien
							var deviceold = devices.getById(data.ref);
							if(deviceold) {
								var idclones="";
								if(deviceold.get('ref')!=null) idclones=deviceold.get('ref').split('|');
								var newref="";
								for (var idclone in idclones) {
									if(idclones[idclone]!=data.id) {
										if(newref!="") newref=newref+"|"+idclones[idclone];
										else newref=idclones[idclone];
									}
								}
								deviceold.set('ref', newref);
							}
							var devicenew = devices.getById(ref);
							if(devicenew) {
								newref = devicenew.get('ref');
								if(newref!=""&&newref!=null) newref=newref+"|"+data.id;
								else newref=data.id;
								devicenew.set('ref', newref);
							}
						}
					}
					
					//Pas de status pour le Custom control
					if(formdata.category==111) {
						device.set("status", 0);
						if(formdata.subcategory==2&&formdata.icon=="") formdata.icon=0;
					}
					
					device.set("category", formdata.category);
					device.set("subcategory", formdata.subcategory);
					device.set("etage", formdata.etage);
					device.set("left", formdata.left);
					device.set("top", formdata.top);
					device.set("etage1", formdata.etage1);
					device.set("left1", formdata.left1);
					device.set("top1", formdata.top1);
					device.set("etage2", formdata.etage2);
					device.set("left2", formdata.left2);
					device.set("top2", formdata.top2);
					device.set("color", formdata.color);
					device.set("fontsize", fontsize);
					device.set("icon", formdata.icon);
					device.set("width", formdata.width);
					device.set("verif", formdata.verif);
					device.set("sceneon", formdata.sceneon);
					device.set("sceneoff", formdata.sceneoff);
					device.set("camuser", formdata.camuser);
					device.set("campassword", formdata.campassword);
					device.set("graphlink", formdata.graphlink);
					device.set("forced", formdata.forced);
					device.set("room", formdata.room);
					device.set("state", "-3");
					device.set("ind", formdata.ind);
					device.set("height", formdata.height);
					device.set("wwidth", formdata.wwidth);
					device.set("onboard", formdata.onboard);
					if(formdata.category=="108"||formdata.category=="111") {
						device.set("var1", formdata.var1);
						device.set("var2", formdata.var2);
						device.set("var3", formdata.var3);
						device.set("var4", formdata.var4);
						device.set("var5", formdata.var5);
						device.set("var6", formdata.var6);
						device.set("camuser", "");
						device.set("campassword", "");
					}
				} else {
					var newid="";
					if(data.type!="clone") {
						newid=data.id;
					} else {
						//Recherche une nouvelle id
						newid="c";
						var count=0;
						while(newid=="c") {
							if(!devices.getById(newid+count)) newid=newid+count;
							count=count+1;
						}
						if(formdata.clonename=="") formdata.clonename=newid;
					}
					//Il faut ajouter le module
					devices.add({
					id: newid,
					name: data.name,
					state: "-3",
					status: "0",
					tripped: "0",
					room: formdata.room,
					category: formdata.category,
					subcategory: formdata.subcategory,
					etage: formdata.etage,
					left: formdata.left,
					top: formdata.top,
					etage1: formdata.etage1,
					left1: formdata.left1,
					top1: formdata.top1,
					etage2: formdata.etage2,
					left2: formdata.left2,
					top2: formdata.top2,
					color: formdata.color,
					fontsize: fontsize,
					icon: formdata.icon,
					width: formdata.width,
					verif: formdata.verif,
					sceneon: formdata.sceneon,
					sceneoff: formdata.sceneoff,
					camuser: formdata.camuser,
					campassword: formdata.campassword,
					graphlink: formdata.graphlink,
					forced: formdata.forced,
					ind: formdata.ind,
					height: formdata.height,
					wwidth: formdata.wwidth,
					onboard: formdata.onboard
					});
					var device = devices.getById(newid);
					
					if(formdata.category=="108"||formdata.category=="111") {
						device.set("var1", formdata.var1);
						device.set("var2", formdata.var2);
						device.set("var3", formdata.var3);
						device.set("var4", formdata.var4);
						device.set("var5", formdata.var5);
						device.set("var6", formdata.var6);
						device.set("camuser", "");
						device.set("campassword", "");
					}
					
					//Pour mettre à jour la vue ??
					//device.set("left", formdata.left);
					//device.set("top", formdata.top);
					
					if(data.type!="clone") {
						listdevice.set("state", "-4");
					} else {
						device.set("name", formdata.clonename);
						device.set("type", "clone");
						var ref = formdata.originmodule;
						device.set("ref", ref);
						//affectation de la référence au device d'origine
						var devicenew = devices.getById(ref);
						if(devicenew) {
							newref = devicenew.get('ref');
							if(newref!=""&&newref!=null) newref=newref+"|"+newid;
							else newref=newid;
							devicenew.set('ref', newref);
						}
					}
					
					device.setDirty();
				}
				
				//Si pas un clone
				if(data.type!="clone") {
					//Paramètres utilisés dans l'affichage de la liste de ConfigDevices, il faut donc les mettre à jour.
					listdevice.set("category", formdata.category);
					listdevice.set("subcategory", formdata.subcategory);
					listdevice.set("icon", formdata.icon);
					listdevice.set("ind", formdata.ind);
					listdevice.set("room", formdata.room);
					listdevice.set("name", data.name);
				}
				Ext.getCmp('PanelConfigNavigation').pop();
				myvera.app.getController('myvera.controller.contconfig').alertDirtydevices();
			}
		},
		{
			xtype: 'button',
			margin: 5,
			itemId: 'DeleteItem',
			iconCls: 'trash',
			iconMask: true,
			ui: 'decline',
			hidden: true,
			text: locale.getSt().button.supp,
			
			handler: function(){
				var form = this.getParent();
				var data = form.config.data;
				var formdata = form.getValues();
				var devices = Ext.getStore('devicesStore');
				var device = devices.getById(form.config.data.id);
				//var width =device.get('width');
				//var height =device.get('height');
				if(data.type=='clone') {
					//supression de la référence sur le module cloné
					var deviceold = devices.getById(data.ref);
					if(deviceold) {
						var idclones="";
						if(deviceold.get('ref')!=null) idclones=deviceold.get('ref').split('|');
						var newref="";
						for (var idclone in idclones) {
							if(idclones[idclone]!=data.id) {
								if(newref!="") newref=newref+"|"+idclones[idclone];
								else newref=idclones[idclone];
							}
						}
						deviceold.set('ref', newref);
					}
					devices.remove(device);
					Ext.getCmp('PanelConfigNavigation').pop();
					myvera.app.getController('myvera.controller.contconfig').alertDirtydevices();
				} else {
					if(data.ref!=""&&data.ref!=null) {
						Ext.Msg.confirm(locale.getSt().misc.suppr, locale.getSt().msg.isclone, function(confirmed) {
						if (confirmed == 'yes') {
							this.getParent().deletedevice(devices, device, formdata, form.config.data.id);
						} else {
							return;
						}
						}, this);
					} else {
						this.getParent().deletedevice(devices, device, formdata, form.config.data.id);
					}
				}
			}
		}
		],
		listeners:{
		    updatedata:function(e,d){
			    var colorpicker = this.down('#color');
			    colorpicker.setDefaultTabletPickerConfig({
				 items: [
				 {
					 xtype: 'list',
					 store: colorpicker.getStore(),
					 itemTpl: '<div style="background-color: #{value}; float: left; width: 150px; border: 1px solid #000;">&nbsp;</div>&nbsp;&nbsp;&nbsp;{text}',
					 
					 listeners: {
						 select: function(item, record) {
							 if (record) {
								 colorpicker.setValue(record);
							 }
						    },
						    itemtap: function(item, index, elem) {
							    //hide the select window
							    this.up('panel').hide({
									    type : 'fade',
									    out  : true,
									    scope: this
							    });
						    }
					    }
				    }
				    ]
			    });
			    var devices = Ext.getStore('devicesStore');
			    var newdevice=true;
			    if(e.config.data.type=="clone") {
			    	    var options = [];
			    	    var deb="";
			    	    devices.data.each(function(device) {
			    	    		    deb=(""+device.get('id')).substring(0,1);
			    	    		    if(deb!="s"&&deb!="w"&&deb!="c") {
			    	    		    	    options.push({ text: device.get('name'), value: device.get('id') });
			    	    		    }
			    	    });
			    	   this.down('#originmodule').setOptions(options);
			    	   this.down('#originmodule').setValue(e.config.data.ref);
			    	   this.down('#originmodule').setHidden(false);
			    	   this.down('#clonename').setValue(e.config.data.name);
			    	   this.down('#clonename').setHidden(false);
			    	   
			    	   this.down('#forced').setHidden(true);
			    	   this.down('#verif').setHidden(true);
				   this.down('#onboard').setHidden(true);
				   //state = -4 quand c'est un nouveau clone
				   if (e.config.data.state!="-4") newdevice=false;
			    } else {
				    //C'est l'inverse ! state = -4 qand ce n'est pas un nouveau device
				    if (e.config.data.state=="-4") newdevice=false;
			    }
			    if (!newdevice) {
				    this.down('#SaveItem').setText(locale.getSt().button.update);
				    this.down('#SaveItem').setIconCls('refresh');
				    var device = devices.getById(e.config.data.id);
				    
				    e.config.data.ref=device.get('ref');
				    
				    e.setValues(device.getData());
				    //if(device.get('verif')==null) e.setValues({verif:"yes"});
				    //if(device.get('color')==null) e.setValues({color:'000000'});
				    //Problème dans le selectfield : si etage est un entier et pas un string ??
				    //Ce serait un bug (fix dans V. 2.02)
				    //e.setValues({category: "" + device.get("category")});
				    //e.setValues({subcategory: "" + device.get("subcategory")});
				    //e.setValues({etage: "" + device.get("etage")});
				    
				    if(device.get('etage')=="-1") {
						    this.down('#PlaceItem').hide();
						    this.down('#LeftItem').hide();
						    this.down('#TopItem').hide();
				    }
				    if(device.get('etage1')=="-1") {
						    this.down('#PlaceItem1').hide();
						    this.down('#LeftItem1').hide();
						    this.down('#TopItem1').hide();
				    }
				    if(device.get('etage2')=="-1") {
						    this.down('#PlaceItem2').hide();
						    this.down('#LeftItem2').hide();
						    this.down('#TopItem2').hide();
				    }
//				    if(device.get('category')=="6") {
//					    this.down('#CamuserItem').show();
//					    this.down('#CampasswordItem').show();
//				    }
//				    if(device.get('category')=="16" || device.get('category')=="17" || device.get('category')=="21") {
//					    this.down('#GraphlinkItem').show();
//				    }
				    this.down('#DeleteItem').show();
			    } else {
					    //if(e.config.data.etage==null) e.config.data.etage="-1";
					    if(e.config.data.etage=="-1") {
						    this.down('#PlaceItem').hide();
						    this.down('#LeftItem').hide();
						    this.down('#TopItem').hide();
					    }
					    if(e.config.data.etage1=="-1") {
						    this.down('#PlaceItem1').hide();
						    this.down('#LeftItem1').hide();
						    this.down('#TopItem1').hide();
					    }
					    if(e.config.data.etage2=="-1") {
						    this.down('#PlaceItem2').hide();
						    this.down('#LeftItem2').hide();
						    this.down('#TopItem2').hide();
					    }
				    //if(e.config.data.verif==null) e.config.data.verif="yes";
				    //if(e.config.data.color==null) e.config.data.color="000000";
				    e.setValues(e.config.data);
				    //Bug avec entier ??
				    //e.setValues({category: "" + e.config.data.category});
				    //e.setValues({subcategory: "" + e.config.data.subcategory});
			    }
			    
			    //Mise à jour de l'entête
			    var label = this.down('#titlePanelConfigItem');
			    var html = label.getTpl().apply(e.config.data);
			    label.setHtml(html);
			    
			    //Pour changer l'icone du titre quand icon est modifié
			    this.down('#icon').addListener('change', function(me,newvalue,oldvalue, opt){
					if(newvalue!="") this.getParent().config.data.icon = newvalue;
					else this.getParent().config.data.icon = null;
					var label = this.getParent().down('#titlePanelConfigItem');
					var html = label.getTpl().apply(this.getParent().config.data);
					label.setHtml(html);
				});
				
				//Pour changer l'icone du titre quand subcategory est modifié
			    this.down('#subcategory').addListener('change', function(me,newvalue,oldvalue, opt){
					this.getParent().config.data.subcategory = newvalue;
					var label = this.getParent().down('#titlePanelConfigItem');
					var html = label.getTpl().apply(this.getParent().config.data);
					label.setHtml(html);
					
					//change l'indication dans placeHolder pour les Custom Device
					if(this.getParent().down('#category').getValue()==108) {
						var exemple = 'status';
						if(newvalue==1) exemple = 'tripped|armed';
						this.getParent().down('#var1').setPlaceHolder(exemple);
					}
				});
		    }
	}
	},
	
	deletedevice: function(devices, device, formdata, id) {
		var listdevices = Ext.getStore('ConfigDevicesStore');
		var listdevice = listdevices.getById(id);
		//Paramètres du modules transférés à configDevices pour pouvoir le réaffecter sans devoir tout paramétrer à nouveau
		listdevice.set("category", formdata.category);
		listdevice.set("subcategory", formdata.subcategory);
		listdevice.set("etage", formdata.etage);
		listdevice.set("left", formdata.left);
		listdevice.set("top", formdata.top);
		listdevice.set("etage1", formdata.etage1);
		listdevice.set("left1", formdata.left1);
		listdevice.set("top1", formdata.top1);
		listdevice.set("etage2", formdata.etage2);
		listdevice.set("left2", formdata.left2);
		listdevice.set("top2", formdata.top2);
		listdevice.set("color", formdata.color);
		listdevice.set("fontsize", formdata.fontsize);
		listdevice.set("icon", formdata.icon);
		listdevice.set("verif", formdata.verif);
		listdevice.set("sceneon", formdata.sceneon);
		listdevice.set("sceneoff", formdata.sceneoff);
		listdevice.set("camuser", formdata.camuser);
		listdevice.set("campassword", formdata.campassword);
		listdevice.set("graphlink", formdata.graphlink);
		listdevice.set("state", "0");
		listdevice.set("ind", formdata.ind);
		listdevice.set("width", formdata.width);
		devices.remove(device);
		Ext.getCmp('PanelConfigNavigation').pop();
		myvera.app.getController('myvera.controller.contconfig').alertDirtydevices();
	},
	
    openpanelimage: function(numetage) {
				Ext.getCmp('main').getTabBar().hide();
				Ext.getCmp('PanelConfig').getTabBar().hide();
				Ext.getCmp('PanelConfigNavigation').setNavigationBar({ docked : 'bottom'});
				Ext.getCmp('PanelConfigNavigation').push({
					xtype: 'PanelImage',
					//title: 'Positionner le module sur la vue',
					title: locale.getSt().misc.position,
					data: {id: this.getParent().down('#etage'+numetage).getValue(), typepanel: 'item', etage: numetage}
					});
	}
});