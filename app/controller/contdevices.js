Ext.define('myvera.controller.contdevices', {
	extend: 'Ext.app.Controller',
	
	config: {
		stores: ['storeRooms', 'TabViewsStore'],
		//'devicesStore',
		//models: ['Veradevices'],
		views: ['dataplan'],
		//views: ['dataplan', 'listclock', 'PanelConfigGenerale'],
		//'datalist',
		//profile: Ext.os.deviceType.toLowerCase(),
		
		//jsonpath: './protect/config/',
		loggedUserId: null,
		logged: null,
		ipvera: null,
		//ajaxsynchro: null,
		//dostopsynchro: false,
		profilchoice: null,
		tabshow: true,//Pour indiquer si isTab était déjà sur 0 (et ne pas mettre le message indiquant de penser à mettre un bouton dans les vues)
		
		refs: {
			plan: 'dataplan',
			liste1: 'datalist [id=listInRoom]',
			liste2: 'datalistphone [id=listInRoom]',
			
			listeon: 'dataliston',
			listeonphone: 'datalistonphone',
			listeoff: 'datalistoff',
			listeoffphone: 'datalistoffphone',
			listclock: 'listclock',
			listclockphone: 'listclockphone',
			
			panelConfig: 'PanelConfigGenerale',
			usernameCt: 'PanelConfigGenerale [name=login]',
			passwordCt: 'PanelConfigGenerale [name=pass]',
			connexionCt: 'PanelConfigGenerale [name=connexion]',
			ipveraCt: 'PanelConfigGenerale [name=ipvera]',
			isVueL: 'PanelConfigGenerale [name=isVueL]',
			isVueP: 'PanelConfigGenerale [name=isVueP]',
			isReveil: 'PanelConfigGenerale [name=isReveil]',
			isRetina: 'PanelConfigGenerale [name=isRetina]',
			isTab: 'PanelConfigGenerale [name=isTab]',
			autoVue: 'PanelConfigGenerale [name=autoVue]',
			autoBord: 'PanelConfigGenerale [name=autoBord]',
			viewprofil: 'PanelConfigGenerale [name=viewprofil]',
			isConfig: 'PanelConfigGenerale [name=isConfig]',
			loginBt: 'PanelConfigGenerale [name=loginbutton]',
			retinaBt: 'PanelConfigGenerale [name=retinabutton]',
			versionBt: 'PanelConfigGenerale [name=versionbutton]',
			urlversiontxt: 'PanelConfigGenerale [name=urlversion]',
			
			paneloverlay: 'paneloverlay',
			//clockfieldsetCt: 'paneloverlay [name=fieldset1]',
			//clockdeiveidCt: 'paneloverlay [name=deviceid]',
			//clockheuredebCt: 'paneloverlay [name=heuredeb]',
			//clockheurefinCt: 'paneloverlay [name=heurefin]',
			//clockmessageCt: 'paneloverlay [name=message]',
			clocksaveclockBt: 'paneloverlay [name=saveclock]'
		},
		control: {
			liste1: {
				itemtap: 'onDeviceTap'
			},
			liste2: {
				itemtap: 'onDeviceTap'
			},
			
			listeon: {
				itemtap: 'onDeviceTap'
			},
			listeonphone: {
				itemtap: 'onDeviceTap'
			},
			listeoff: {
				itemtap: 'onDeviceTap'
			},
			listeoffphone: {
				itemtap: 'onDeviceTap'
			},
			listclock: {
				itemtap: 'onDeviceTap'
			},
			listclockphone: {
				itemtap: 'onDeviceTap'
			},
			
			isVueL: {
				change: 'onIsVueChangeL'
			},
			isVueP: {
				change: 'onIsVueChangeP'
			},
			
			isReveil: {
				change: 'onIsReveilChange'
			},
			
			isTab: {
				change: 'onIsTabChange'
			},
			
			autoVue: {
				change: 'onAutoVueChange'
			},
			
			autoBord: {
				change: 'onAutoBordChange'
			},
			
			loginBt: {
				tap: 'onLoginTap'
			},
			
			versionBt: {
				tap: 'onVersionTap'
			},
			
			retinaBt: {
				tap: 'onRetinaTap'
			},
			
			clocksaveclockBt: {
				tap: 'onClockSaveTap'
			}
			
		}
	},

	launch: function() {
		//console.log("contdevices");
		//*******************Debug mode
		//this.nbrsync = 0;
		//this.nbrtimer=0;
		//this.nbrforce = 0;
		//this.syncdate = 0;
		this.datesync=0;
		//*******************
		this.synccount=0;
		this.autosync = true;
		this.tabshow=true;
		//*******************Debug mode
		//var tabbarlabel = {
		//    id: 'tabbarlabel',
                //    docked: 'right',
                //    html: this.nbrsync + "/" + this.nbrtimer + "/" + this.nbrforce
                //};
		//Ext.getCmp('main').getTabBar().add(tabbarlabel);
		//*******************
		
		//Utilisé pour charger devicesStore après FloorsStore s'il n'est pas encore chargé.
		this.storeloaded=false;
		this.jsonpath='./protect/config/';
		Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
			scope: this,
			success: function(cachedLoggedInUser) {
				delete cachedLoggedInUser.phantom;
				this.getUsernameCt().setValue(cachedLoggedInUser.get('name'));
				this.getPasswordCt().setValue(cachedLoggedInUser.get('pass'));
				this.getConnexionCt().setValue(cachedLoggedInUser.get('connexion'));
				this.ipvera = cachedLoggedInUser.get('ipvera');
				this.getIpveraCt().setValue(this.ipvera);
				this.loggedUserId = this.base64_encode(cachedLoggedInUser.get('name') + ":" + cachedLoggedInUser.get('pass'));
				
				this.getIsVueL().setValue(cachedLoggedInUser.get('isVueL'));
				this.getIsVueP().setValue(cachedLoggedInUser.get('isVueP'));
				this.getIsReveil().setValue(cachedLoggedInUser.get('isReveil'));
				this.getIsTab().setValue(cachedLoggedInUser.get('isTab'));
				if(cachedLoggedInUser.get('isTab')=="0") this.tabshow=false;
				
				this.getAutoVue().setValue(cachedLoggedInUser.get('autoVue'));
				this.getAutoBord().setValue(cachedLoggedInUser.get('autoBord'));
				
				if(cachedLoggedInUser.get('isRetina')=='@2x') {
					myvera.app.setIsretina('@2x');
				} else {
					myvera.app.setIsretina("");
				}
				this.profilchoice=cachedLoggedInUser.get('profil');
				if(this.profilchoice==null) this.profilchoice=0;
				this.getViewprofil().setValue(this.profilchoice);
				
				if(!cachedLoggedInUser.get('config')) {
					Ext.getCmp('PanelConfig').getTabBar().getComponent(1).hide();
					Ext.getCmp('PanelConfig').getTabBar().getComponent(2).hide();
					Ext.getCmp('PanelConfig').getTabBar().getComponent(3).hide();
				}
				
				console.info('Auto-Login succeeded.');
				
				if(this.getIsReveil().getValue()==0) Ext.getCmp('listclock').tab.hide();
				
				if(myvera.app.isretina=="@2x") this.getRetinaBt().setText(locale.getSt().button.noretinamode);
				else  this.getRetinaBt().setText(locale.getSt().button.retinamode);
				
				
				// Disables visual
				//Ext.getBody().dom.addEventListener("MSHoldVisual", function(e) { e.preventDefault(); }, false);
				// Disables menu
				//Ext.getBody().dom.addEventListener("contextmenu", function(e) { e.preventDefault(); }, false);
				
				//Ext.getBody().dom.addEventListener("contextmenu", function(e) { return true; }, false);
				
				
				this.LogIn();
				//this.startstore();
			},
			failure : function() {
				console.warn('Auto-Login failed (user was not logged in).');
				//Lecture des paramètre par défaut
				var url = './conf.json';
				Ext.Ajax.request({
					url: url,
					method: 'GET',
					timeout: 10000,
					scope: this,
					success: function(result) {
						var response = Ext.decode(result.responseText, true);
						//console.log(response.config[0].ipvera);
						if (response) {
							if(response.config[0].ipvera) this.getIpveraCt().setValue(response.config[0].ipvera);
							if(response.config[0].isRetina) {
								if(response.config[0].isRetina=='@2x') {
									this.getIsRetina().setValue(1);
									//myvera.app.setIsretina('@2x');
								} else {
									this.getIsRetina().setValue(0);
									//myvera.app.setIsretina("");
								}
							}
						}
					},
					failure: function(result) {
						console.log("Pas de config par défaut");
						//Ext.Msg.alert('Erreur',"Erreur lors de la sauvegarde de l'adresse IP");
					}
				});
				
				this.getUsernameCt().show();
				this.getPasswordCt().show();
				this.getIpveraCt().show();
				this.getViewprofil().enable();
				this.getIsConfig().show();
				this.getIsRetina().show();
				this.getRetinaBt().hide();
				
				
				Ext.getCmp('PanelConfig').getTabBar().getComponent(1).hide();
				Ext.getCmp('PanelConfig').getTabBar().getComponent(2).hide();
				Ext.getCmp('PanelConfig').getTabBar().getComponent(3).hide();
				Ext.getCmp('main').setActiveItem(Ext.getCmp('PanelConfig'));
				Ext.getCmp('datalist').tab.hide();
				Ext.getCmp('panelinfo').tab.hide();
				Ext.getCmp('listclock').tab.hide();
				
				Ext.Msg.alert(locale.getSt().misc.error,locale.getSt().msg.mustlogin);
			}
		});
	},
	
	LogIn: function() {
		this.logged = true;
		this.startstore();
		this.getLoginBt().setText(locale.getSt().button.notlogin);
	},
	
	startstore: function() {
		var TabViewsStore = Ext.getStore('TabViewsStore');
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		TabViewsStore.getProxy().setHeaders(syncheader);
		
		if(this.profilchoice>0) {
			var jsonfile=this.jsonpath+"tabs" + this.profilchoice +".json";
			TabViewsStore.getProxy().setUrl(jsonfile);
		}
		
		//Pour ne pas perdre "this"
		var contdevices=this;
		//console.log(contdevices.storeloaded);
		TabViewsStore.load(function(tabs) {
			console.log("loading tabs");
			//Vérifie qu'il y a au moins un onglet (en principe 0)
			//Initialise tabs.json sinon.
			if(TabViewsStore.getCount()>0) {
				//contdevices.onTabViewsLoad();
				var storeRooms = Ext.getStore('Rooms');
				
				//var syncheader = "";
				//syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
				storeRooms.getProxy().setHeaders(syncheader);
				
				storeRooms.on({
						load: 'onStoreRoomsLoad',
						scope: contdevices
				});
				storeRooms.load();
			} else {
				contdevices.initTabsViews();
			}
		});
	},
	
	onStoreRoomsLoad: function() {
		console.log("loading Rooms");
		var storeRooms = Ext.getStore('Rooms');
		if (storeRooms.getCount()>0) {
			if(locale.getSt().lang!="fr") {
				var noroom = storeRooms.getById(0);
				if(noroom) noroom.set("name",locale.getSt().misc.noroom);
			}
			var DevicesStore = Ext.getStore('devicesStore');
			
			var syncheader = "";
			syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
			DevicesStore.getProxy().setHeaders(syncheader);
			
			DevicesStore.on({
					load: 'onDevicesStoreLoad',
					scope: this
			});
			
			Ext.getStore('devicesStore').getProxy().setExtraParam( 'ipvera',  this.getIpveraCt().getValue());
			if(this.profilchoice>0) {
				var jsonfile=this.jsonpath+"devices" + this.profilchoice +".json";
				Ext.getStore('devicesStore').getProxy().setUrl(jsonfile);
			}
			
			//Bug avec Sencha Touch 2.1, load après le load de FloorsStore dans pushplans
			//DevicesStore.load();
			this.inserttabs();
			
			//Pas pour le profil iphone
			if(this.getApplication().getCurrentProfile().getName()!="Phone") {
			var listroom = Ext.getCmp('datalist').down('#list');
			if(listroom.getStore().getAt(0).get('id')!=0||storeRooms.getCount()==1) {
				listroom.select(0);
			} else {
				listroom.select(1);
			}
			}
			
		} else {
			Ext.Msg.confirm(locale.getSt().misc.error, locale.getSt().msg.norooms, function(confirmed) {
				if (confirmed == 'yes') {
					Ext.Viewport.setMasked({
						xtype: 'loadmask',
						message: locale.getSt().msg.saving
					});

					console.log("Create Rooms");
					var vera_url = './protect/createrooms.php';
					var syncheader = "";
					syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
					var ipvera = this.ipvera;
					Ext.Ajax.request({
							url: vera_url,
							headers: syncheader,
							method: 'GET',
							timeout: 35000,
							scope: this,
							params: {
								ipvera: ipvera,
								timeout: '30'
							},
							success: function(result) {
								//console.log("return Rooms");
								Ext.Viewport.setMasked(false);
								if (result.responseText=="OK") {
									storeRooms.load();
								} else {
									Ext.Msg.alert(locale.getSt().misc.error, locale.getSt().msg.errorcreaterooms);
								}
							},
							failure: function(response) {
								Ext.Viewport.setMasked(false);
								Ext.Msg.alert(locale.getSt().misc.error, locale.getSt().msg.errorcreaterooms + " 2");
							}
					});
				}
			}, this);
		}
	},
	
	inserttabs: function() {
		var TabViewsStore = Ext.getStore('TabViewsStore');
		var tabs = Ext.getCmp('main');
		var count= 0;
		
		TabViewsStore.data.each(function(tabview) {
			tabs.insert(count, {
				xtype: 'carouselplan',
				id: ('tabvue' +tabview.get('id')),
				title: tabview.get('name'),
				iconCls: String.fromCharCode(tabview.get('cls'))
			});
			count = count + 1;
		});
		this.pushviews();
	},
	
	pushviews: function() {
		var FloorsStore = Ext.getStore('FloorsStore');
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		FloorsStore.getProxy().setHeaders(syncheader);
		
		if(this.profilchoice>0) {
			var jsonfile=this.jsonpath+"floors" + this.profilchoice +".json";
			FloorsStore.getProxy().setUrl(jsonfile);
		}
		
		//Pour ne pas perdre "this"
		var contdevices=this;
		FloorsStore.load(function(floors) {
			console.log("loading floors");
			//Vérifie qu'il y a au moins une vue (en principe -1 - Aucune vue)
			//Initialise floors.json sinon.
			if(FloorsStore.getCount()>0) {
				if(locale.getSt().lang!="fr") {
					var noview = FloorsStore.getById("-1")
					if(noview) noview.set("name",locale.getSt().misc.noview);
				}
				
				var TabViewsStore = Ext.getStore('TabViewsStore');
				var items = [];
				TabViewsStore.data.each(function(tabview) {
					items[tabview.get('id')] = [];
				});
				
				//Utilisation de FloorsStore.data.each, les vues ne sont pas triées sinon.
				//Ext.each(floors, function(floor) {
				var background="";
				var tpl="";
				FloorsStore.data.each(function(floor) {
					if(floor.get('id')!=-1) {
						//Pas de push si l'onglet n'existe pas (s'il a été supprimé par exemple)
						if(items[floor.get('tab')]) {
							if(myvera.app.isretina=="@2x"&&floor.get('pathretina')!=""&&floor.get('pathretina')!=null) {
								background='background-size: '+floor.get('widthretina')+'px; background-image: url(./resources/config/img/'+floor.get('pathretina')+'); background-repeat: no-repeat; background-position: 0px 0px;';
							} else {
								background='background:url(./resources/config/img/'+floor.get('path')+') no-repeat left top;';
							}
							tpl = '<tpl if="id"><tpl if="category!=111&&(etage=='+floor.get('id')+'||etage1=='+floor.get('id')+'||etage2=='+floor.get('id')+')">'+
								'<div style="top:<tpl if="etage=='+floor.get('id')+'">{top}px; left:{left}px;'+
								'<tpl elseif="etage1=='+floor.get('id')+'">{top1}px; left:{left1}px;'+
								'<tpl elseif="etage2=='+floor.get('id')+'">{top2}px; left:{left2}px;</tpl>'+
								myvera.util.Templates.getTplplan() + myvera.util.Templates.getTplpanwebview() + myvera.util.Templates.getTplpanfin() + '</tpl></tpl>';
							
							if(floor.get('noslider')) {
								items[floor.get('tab')].push({
									xtype: 'dataplan',
									id: ('vue' +floor.get('id')),
									style: background,
									itemTpl:  tpl
								});
							} else {
								items[floor.get('tab')].push({
									xtype: 'dataplan',
									id: ('vue' +floor.get('id')),
									style: background,
									useComponents: true,
									defaultType: 'dataitem',
									itemConfig: {
										//idetage: floor.get('id'),
										//test si id pour pas de lancement du template s'il n'y a pas de record.
										tpl: tpl
									}
								});
							}
						}
					}
				});
				
				TabViewsStore.data.each(function(tabview) {
					//Désactive l'effet carousel s'il n'y a qu'une vue
					//A faire avant d'ajouter des vues sinon "indicator" n'apparait pas
					if(items[tabview.get('id')].length<2) {
						Ext.getCmp('tabvue' +tabview.get('id')).toggleSwipe(false);
						Ext.getCmp('tabvue' +tabview.get('id')).setIndicator(false);
					} else {
						Ext.getCmp('tabvue' +tabview.get('id')).toggleSwipe(true);
						Ext.getCmp('tabvue' +tabview.get('id')).setIndicator(true);
					}
					Ext.getCmp('tabvue' +tabview.get('id')).setItems(items[tabview.get('id')]);
					Ext.getCmp('tabvue' +tabview.get('id')).setActiveItem(0);
				});
				//Ext.getCmp('main').setActiveItem(0);
				
				//carouselplan.setItems(items);
				//carouselplan.setActiveItem(0);
				
				//Charge devicesStore seulement la première fois et initialise application.autoVue et application.autoBord
				if(contdevices.storeloaded==false) {
					
					//Affiche l'onglet vue ou list
					contdevices.switchvuelist();
					
					
					
					//this=contdevices
					var application = contdevices.getApplication().getController('Application');
					application.setAutoVue(contdevices.getAutoVue().getValue());
					application.setAutoBord(contdevices.getAutoBord().getValue());
					var DevicesStore = Ext.getStore('devicesStore');
					DevicesStore.load();
					contdevices.storeloaded=true;
				} else {
					//Refresh des vues lorsqu'elles sont crées pour la deuxième fois (pour les custom control
					FloorsStore.data.each(function(floor) {
						if(floor.get('id')!=-1) Ext.getCmp('vue' +floor.get('id')).refresh();
					});
				}
				//console.log(contdevices.storeloaded);
			} else {
				contdevices.initfloors();
			}
		});
	},
	
	onDevicesStoreLoad: function() {
		this.devicesync(0,0);
		var devices = Ext.getStore('devicesStore');
		if (!devices.getCount()>0) {
			Ext.getCmp('main').setActiveItem(Ext.getCmp('PanelConfig'));
			Ext.Msg.alert(locale.getSt().misc.nodevice, locale.getSt().msg.createdevices);
		} else {
			
			//Pour initialiser les custom control même sans retour
			var cat="";
			devices.data.each(function(device) {
				cat=device.get('category');
				if(cat==111) {
					//console.log(device.get("name"));
					device.set('top', device.get('top'));
					device.set('left', device.get('left'));
				}
			});
			
		}
		
		//*******************Debug mode
		//this.verifsync(0);
		//*******************
	},
	
	switchvuelist: function() {
		
		if(this.getIsTab().getValue()==0) Ext.getCmp('main').getTabBar().hide();
		
		var application = this.getApplication().getController('Application');
		var orientation= application.getOrientationFix();
				
		var typevue = this.getIsVueL().getValue();
//*******		application.setPanel3dL(typevue);
		if(typevue==true&&orientation=='landscape') {
			Ext.getCmp('main').setActiveItem(0);
//*******					Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('carouselplan'));
					//Ext.getCmp('carouselplan').hide();
		}
		
		typevue = this.getIsVueP().getValue();
//*******		application.setPanel3dP(typevue);
		if(typevue==true&&orientation=='portrait') {
			Ext.getCmp('main').setActiveItem(0);
//*******					Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('carouselplan'));
					//Ext.getCmp('carouselplan').hide();
		}
	},
	
	//*******************Debug mode
//	verifsync: function(timer) {
//		if(timer!=0) timer=15000;
//		taskverifsync = Ext.create('Ext.util.DelayedTask', function() {
			//console.log("New Timer");
//			this.nbrtimer = this.nbrtimer +1;
//			if((Date.now()-this.syncdate>90000) && this.autosync==true) {
//				this.nbrforce = this.nbrforce + 1;
				//this.devicesync(0, 0);
//			}
			//Ext.getCmp('tabbarlabel').setHtml(this.nbrsync + "/" + this.nbrtimer + "/" + this.nbrforce);
//			this.verifsync();
//		}, this);
//		taskverifsync.delay(timer);
//	},
	//*******************
	
	devicesync: function(newloadtime, newdataversion, nonewsync) {
		console.log("New Vera Sync");
		if (nonewsync != true) nonewsync=false;
		//*******************Debug mode
//		if(nonewsync==false) {
//			this.nbrsync= this.nbrsync + 1;
//***********			Ext.getCmp('tabbarlabel').setHtml(this.nbrsync + "/" + this.nbrtimer + "/" + this.nbrforce);
//			this.syncdate = Date.now();
			if((Date.now()-this.datesync>90000) && this.autosync==true) {
				Ext.Viewport.setMasked({
						xtype: 'loadmask',
						message: 'Synchro...'
				});
				console.log('resync');
			}
			this.datesync= Date.now();
//			syncstamp = this.syncdate;
//		}
		//*******************
		var vera_url = './protect/syncvera.php';
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		var ipvera = this.ipvera;
		this.ajaxsynchro= Ext.Ajax.request({
			url: vera_url,
			headers: syncheader,
			method: 'GET',
			timeout: 90000,
			scope: this,
			//withCredentials: true,
			//useDefaultXhrHeader: false,
			params: {
				id: 'sdata',
				loadtime: newloadtime,
				dataversion: newdataversion,
				ipvera: ipvera,
				timeout: '60',
				minimumdelay: '1000'
			},
			success: function(result) {
				this.ajaxsynchro=null;
				var date = new Date();
				console.log("Vera Sync : OK " + Ext.Date.format(date, 'h:i:s'));
				var response = Ext.decode(result.responseText, true);
				
				//****Synchro quand réouvre
				//if(Ext.Viewport.getMasked().getMessage()=="Synchro...")
				Ext.Viewport.setMasked(false);
				
				
				
				if (response) {
					var devices = Ext.getStore('devicesStore');
					if (devices) {
						//var tmp="";
						for (var idrecord in response.devices) {
							var device = devices.getById(response.devices[idrecord].id);
							if (device) {
								this.updatedevice(device, response.devices[idrecord]);
								if(device.get('type')!="clone"&&device.get('ref')!=""&&device.get('ref')!=null) {
									var idclones=device.get('ref').split('|');
									for (var idclone in idclones) {
										//console.log(idclones[idclone]);
										var clone = devices.getById(idclones[idclone]);
										if(clone) this.updatedevice(clone, response.devices[idrecord]);
									}
								}
							}
						}
						
						//Pas de mise à jour des status car non utilisé (ne remonte pas toujours.
						//for (var idrecord in response.scenes) {
						//	device = devices.getById("s" + response.scenes[idrecord].id);
						//	if (device) {
								//Pas de synchro des champs active et comment car le sdata le remonte après le lancement d'une scène
								//mais il ne le réinitialise jamais (alors qu'il le fait pour les devices).
								//device.set('status', response.scenes[idrecord].active);
								//device.set('comment', response.scenes[idrecord].comment);
						//		if (response.scenes[idrecord].state == null) {
						//			device.set('state', 0);
						//		} else {
						//			device.set('state', response.scenes[idrecord].state);
						//		}
						//	}
						//}
						
						
						// Maj indicateur nb allumés/éteints
						var count1 = 0; // nb allumés
						var count2 = 0; // nb éteints
						devices.findBy(function(rec) {
							var status = rec.get('status');
							var category = rec.get('category');
							var isTripped = (rec.get('tripped') == 1);
							if (
									(rec.get('onboard')==true&&rec.get('type') != 'clone' && rec.get('verif') != 'off' && rec.get('verif') != 'no')
									&&
									(
										((category == 4 || category == 103 || category == 120) && isTripped)
										||
										(category !=4 && category !=106 && category !=112 && category !=7 && category !=1001 && status == 1)
										||
										(category ==7 && status == 0)
										||
										((category ==104||category ==105||category ==5) && (status == 2 || status==3))
									)
							) {
								count1++;
							}
							if ( rec.get('onboard')==true&&rec.get('type') != 'clone' && (
									(
										rec.get('verif') == 'off'
										&&
										(
											((category == 4 || category == 103 || category == 120) && !isTripped)
											||
											(category !=4 && category != 103 && category !=112 && category != 120 && category != 7 && category != 1001 && status == 0)
											||
											(category == 7 && status == 1)
										)
									)
									||
									(rec.get('verif')!='no' && (category == 4 || category == 103 || category == 120) && rec.get('armed')==0)
									)
								)
							{
								count2++;
							}
						});
						if (count1 == 0 && count2 == 0) {
							Ext.getCmp('panelinfo').tab.setBadgeText("");
						} else {
							Ext.getCmp('panelinfo').tab.setBadgeText(count1 + '-' + count2);
						}
					}
					//*******************Debug mode
					//Sert à compter le nombre d'essai quand la synchro ne se fait pas. Un message apparait au bout de 10 essais
					this.synccount=0;
					if(nonewsync!=true) {
						//new sync
						if (response.loadtime && response.dataversion) {
							//this.devicesync(response.loadtime,response.dataversion);
							this.newsync(response.loadtime,response.dataversion);//, syncstamp
						} else {
							Ext.Msg.alert(locale.getSt().misc.error, 'no loadtime');
							this.newsync(0, 0);//, syncstamp
							//this.devicesync(0, 0, nonewsync);
						}
					}
				} else {
					//*******************Debug mode
					this.synccount=this.synccount+1;
					//if(Ext.Viewport.getMasked().getMessage()=="Synchro...") {
					//	Ext.Viewport.setMasked(false);
					//	this.synccount=10;
					//}
					
					if(this.autosync==true&&nonewsync==false) {//&&syncstamp==this.syncdate
						if(this.synccount<10) {								
							this.newsync(0, 0);//, syncstamp
						} else {
							//if(Ext.Viewport.getMasked().getMessage()=="Synchro...") Ext.Viewport.setMasked(false);
							Ext.Msg.confirm(locale.getSt().misc.error, locale.getSt().msg.nosynchro+" "+locale.getSt().msg.newtry, function(confirmed) {
								if (confirmed == 'yes') {
									//this.devicesync(0,0, nonewsync);
									//this.devicesync(0,0);
									this.newsync(0, 0);//, syncstamp
								} else {
									this.autosync=false;
								}
							}, this);
						}
					} else {
						Ext.Msg.alert(locale.getSt().misc.error, locale.getSt().msg.nosynchro);
					}
				}
			},
			failure: function(response) {
				this.ajaxsynchro=null;
				
				//****Synchro quand réouvre
				//if(Ext.Viewport.getMasked().getMessage()=="Synchro...")
				Ext.Viewport.setMasked(false);
				
				
				if(this.dostopsynchro) {
					console.log("Vera Sync stop: " + newloadtime + ", " + newdataversion);
					
					//if(Ext.Viewport.getMasked().getMessage()=="Synchro...") {
					//	Ext.Viewport.setMasked(false);
					//}
					
					this.dostopsynchro=false;
					this.newsync(newloadtime, newdataversion, 1000);
					//alert("stop");
				} else {
					console.log("Vera Sync : Error");
					//console.log(this.stopsynchro);
					this.synccount=this.synccount+1;
					//if(Ext.Viewport.getMasked().getMessage()=="Synchro...") {
					//	Ext.Viewport.setMasked(false);
					//	this.synccount=10;
					//}
					
					if(this.autosync==true&&nonewsync==false) {//&&syncstamp==this.syncdate
						if(this.synccount<10) {
							this.newsync(0, 0);//, syncstamp
						} else {
							//Ext.Msg.alert('Erreur','Synchronisation avec la Vera impossible ou interrompue');
							Ext.Msg.confirm(locale.getSt().misc.error, locale.getSt().msg.nosynchro+" "+locale.getSt().msg.newtry, function(confirmed) {
									if (confirmed == 'yes') {
										//this.devicesync(0,0, nonewsync);
										this.newsync(0, 0);//, syncstamp
									}
							}, this);
						}
					} else {
						Ext.Msg.alert(locale.getSt().misc.error, locale.getSt().msg.nosynchro);
					}
				}
				//setTimeout(this.devicesync(0,0),2000);
			}//,
			//callback: function(response) {
			//	console.log("It's OK");
			//}
		});
		//Ext.Ajax.abort(this.ajaxsynchro);
	},
	//onActivate: function() {
	//    console.log('Main container is active');
	//   },

	//Sert à mettre un timer sur la synchro pour qu'elle s'arrête pendant la veille et reprenne ensuite
	newsync: function(loadtime, dataversion, delay) {//, timestamp
		if(!delay) delay=200;
		var newsynctask = Ext.create('Ext.util.DelayedTask', function() {
				//var date = new Date();
				//console.log("New Sync Timer" + Ext.Date.format(date, 'h:i:s'));
				//if(timestamp==this.syncdate) {
					//console.log(loadtime + "/" + dataversion);
					this.devicesync(loadtime, dataversion);
				//}
		}, this);
		newsynctask.delay(delay);
	},
	
	
	onDeviceTap: function(view, index, target, record, event) {
		//Valeurs par défaut
		//console.log("tap " + view.id);
		var dservice = 'urn:upnp-org:serviceId:SwitchPower1';
		var daction = 'SetTarget';
		var dtargetvalue = 'newTargetValue';
		
		//Valeurs utilisée pour un dimmer
		var sdim = 'urn:upnp-org:serviceId:Dimming1';
		var actdim = 'SetLoadLevelTarget';
		var tardim = 'newLoadlevelTarget';
		
		
		var newstatus = "0";
		
		var icontap = false;
		var cat=record.get('category');
		if (!Ext.Array.contains([2, 3, 4, 5, 6, 7, 8, 16, 17, 21, 101, 102, 103, 104, 105, 106, 107, 108, 109, 111, 112, 113, 120, 1000, 1001], cat) && (record.get('sceneon') == null || record.get('sceneoff') == null)) {
			return;
		}
		//Si c'est un hvac non heater, sort de la commande
		if(cat==5&&record.get('subcategory')!=2) return;
		
		//Si c'est une webview, sort de la commande
		if(cat==1001&&record.get('subcategory')==0) return;
		
		//Si c'est un custom slider en dehors de listInRoom, sort de la commande
		if(cat==111&&view.id!="listInRoom") return;
		
		if (Ext.Array.contains(["listInRoom", "dataliston", "datalistoff", "listclock"], view.id)) {
			var tap = Ext.get(event.target);
			if (tap.hasCls('deviceImage')) {
				icontap = true;
			} else if (tap.hasCls('d25')) {
				dservice=sdim;
				daction=actdim;
				dtargetvalue=tardim;
				newstatus = 25;
			} else if (tap.hasCls('d50')) {
				dservice=sdim;
				daction=actdim;
				dtargetvalue=tardim;
				newstatus = 50;
			} else if (tap.hasCls('d75')) {
				dservice=sdim;
				daction=actdim;
				dtargetvalue=tardim;
				newstatus = 75;
			} else if (tap.hasCls('d100')) {
				//Open 100%
				newstatus = "1";
			} else if (tap.hasCls('armed') || tap.hasCls('armed2')) {
				if(record.get('category')==108) {
					if(record.get('var4')!=""&&record.get('var4')!=null) {
						//Exemple : urn:micasaverde-com:serviceId:SecuritySensor1|SetArmed|newArmedValue
						var commande =record.get('var4').split('|');
						dservice = commande[0];
						daction = commande[1];
						dtargetvalue = commande[2];
					} else return;
				} else {
					dservice = 'urn:micasaverde-com:serviceId:SecuritySensor1';
					daction = 'SetArmed';
					dtargetvalue = 'newArmedValue';
				}
				if (record.get('armed') == 1) {
					newstatus = "0";
				} else {
					newstatus = "1";
				}
			} else if (tap.hasCls('clocknext')) {
				dservice = 'urn:upnp-org:serviceId:VClock1';
				daction = 'SetNext';
				dtargetvalue = 'newNextValue';
				if (record.get('var3') == "on") {
					newstatus = "off";
				} else {
					newstatus = "on";
				}
			} else if (tap.hasCls('i0')) {
				newstatus = '0';
			} else if (tap.hasCls('i1')) {
				newstatus = '1';
			} else if (tap.hasCls('i2')) {
				newstatus = '2';
			} else if (tap.hasCls('i3')) {
				newstatus = '3';
			} else if (tap.hasCls('i4')||tap.hasCls('i5')) {
				newstatus = '';
			} else {
				//si un tap sur autre chose, stop la commande
				return;
			}
		} else {
			icontap = true;
		}
		if (icontap == true) {
			
			//Cas général
			//newstatus=0 par défaut. Affecte la valeur 1 de tripped ou de status
			if (cat == 4) {
				if (record.get('tripped') == 0) {
					newstatus = "1";
				}
			} else if (record.get('status') == 0) {
				newstatus = "1";
			}
			
			//DoorLock
			if(cat==7) {
				//data_request?id=action&DeviceNum=XX&serviceId=urn:micasaverde-com:serviceId:DoorLock1&action=SetTarget&newTargetValue=0
				dservice = "urn:micasaverde-com:serviceId:DoorLock1";
				//daction = 'SetTarget';
				//dtargetvalue = 'newTargetValue';
			}
			
			//camera
			if(cat==6&&record.get('sceneon')==null) {
				var me=this;
				if(record.get('var2')==null){
					record.data.var2="/snapshot.cgi";
				}
				var RefreshCam = function() {
					var task = Ext.create('Ext.util.DelayedTask', function() {
						var rand = Math.random();
						var obj =document.getElementById('cam'+record.get('id'));
						obj.src = 'http://'+record.get('var1')+record.get('var2')+'?user='+record.get('camuser')+'&pwd='+record.get('campassword')+'&t='+rand;
						RefreshCam.call(this);
					}, this);
					task.delay(700);
				}
				
				var vheight = Ext.Viewport.getWindowHeight();
				var vwidth = Ext.Viewport.getWindowWidth();
				var defwidth = 640;
				var defheight = 480;
				var width = defwidth;
				var height = defheight;
				var space=50;
				if((defwidth>vwidth-space)||(defheight>vheight-space)) {
					width = vwidth - space;
					height = Math.floor(defheight*width/defwidth);
					if(height>vheight-space) {
						var diff=height-(vheight-space);
						diff=Math.ceil(diff*defwidth/width);
						width = width - diff;
						height = Math.floor(defheight*width/defwidth);
					}
				}
				
				if(Ext.getCmp('popup_cam')){
					Ext.getCmp('popup_cam').setWidth(width+10);
					Ext.getCmp('popup_cam').setHeight(height+10);
					Ext.getCmp('popup_cam').setHtml('<img src="http://'+record.get('var1')+record.get('var2')+'?user='+record.get('camuser')+'&pwd='+record.get('campassword')+'" width='+width+' height='+height+' border=0 id="cam'+record.get('id')+'" />');
					RefreshCam();
					Ext.getCmp('popup_cam').show();
				}else{
					var popup=new Ext.Panel({
						modal:true,
						id: 'popup_cam',
						hideOnMaskTap: true,
						width:width+10,
						height:height+10,
						centered: true,
						//styleHtmlContent: true,
						html:'<img src="http://'+record.get('var1')+record.get('var2')+'?user='+record.get('camuser')+'&pwd='+record.get('campassword')+'" width='+width+' height='+height+' border=0 id="cam'+record.get('id')+'" />',
						listeners: {
							hide: function(panel) {
								task.cancel();
							},
							initialize: function(panel){
								RefreshCam();
							}
						}
					});
					Ext.Viewport.add(popup);
					popup.show();
				}
				return;
			}
			
			
			//Humidity, Temperature sensor ou Power Meter
			if(Ext.Array.contains([16, 17, 21], cat)&&record.get('sceneon') == null) {
				if(record.get('graphlink')!=null && record.get('graphlink')!=""){
					var vheight = Ext.Viewport.getWindowHeight();
					var vwidth = Ext.Viewport.getWindowWidth();
					var defwidth = 640;
					var defheight = 480;
					var width = defwidth;
					var height = defheight;
					var space=50;
					if((defwidth>vwidth-space)||(defheight>vheight-space)) {
						width = vwidth - space;
						height = Math.floor(defheight*width/defwidth);
						if(height>vheight-space) {
							var diff=height-(vheight-space);
							diff=Math.ceil(diff*defwidth/width);
							width = width - diff;
							height = Math.floor(defheight*width/defwidth);
						}
					}
					
					if(Ext.getCmp('popup_cam')){
						Ext.getCmp('popup_cam').setWidth(width+10);
						Ext.getCmp('popup_cam').setHeight(height+10);
						Ext.getCmp('popup_cam').setHtml('<img src="'+record.get('graphlink')+'" width='+width+' height='+height+' border=0 />');
						Ext.getCmp('popup_cam').show();
					}else{
						var popup=new Ext.Panel({
							modal:true,
							id: 'popup_cam',
							hideOnMaskTap: true,
							width:width+10,
							height:height+10,
							centered: true,
							//styleHtmlContent: true,
							html:'<img src="'+record.get('graphlink')+'" width='+width+' height='+height+' border=0 />',
							listeners: {
								hide: function(panel) {
									//delete myvera.view.dataplan.lastTapHold;
									Ext.getCmp('popup_cam').setHtml('');
								}
							}
						});
						Ext.Viewport.add(popup);
						popup.show();
					}
				}
				return;
			}
			
			//Vclock
			if (cat == 120&&record.get('sceneon') == null) {
				var dateheure="";
				this.getPaneloverlay().down('#fieldset1').setTitle(record.get('name'));
				this.getPaneloverlay().down('#deviceid').setValue(record.get('id'));
				dateheure=new Date("February 5, 2001 "+record.get('var1'));
				this.getPaneloverlay().down('#heuredeb').setValue(dateheure);
				dateheure=new Date("February 5, 2001 "+record.get('var2'));
				this.getPaneloverlay().down('#heurefin').setValue(dateheure);
				if(record.get('subcategory')!=1) this.getPaneloverlay().down('#heurefin').hide();
				else this.getPaneloverlay().down('#heurefin').show();
				this.getPaneloverlay().down('#message').setValue(record.get('var4'));
				if(record.get('subcategory')!=2) {
					this.getPaneloverlay().down('#message').hide();
					var multidays="";
					if(record.get('var6')!="") {
						var days = record.get('var6').split(' ');
						for (var day in days) {
							if(days[day]=='1') {
								if(multidays=="") multidays=day;
								else multidays=multidays+" "+day;
							}
						}
					}
					this.getPaneloverlay().down('#multidays').setValue(multidays);
					this.getPaneloverlay().down('#multidays').show();
				} else {
					this.getPaneloverlay().down('#message').show();
					this.getPaneloverlay().down('#multidays').hide();
				}
				//this.getPaneloverlay().down('#weekdays').setValue(record.get('var6'));
				
				if(record.get('subcategory')!=1&&record.get('subcategory')!=2) this.getPaneloverlay().setHeight('250px');
				else this.getPaneloverlay().setHeight('290px');
				this.getPaneloverlay().show();
				return;
			}
			
			//VSwitch
			if (cat == 101) {
				dservice = "urn:upnp-org:serviceId:VSwitch1";
				//daction = 'SetTarget';
				//dtargetvalue = 'newTargetValue';
			}
			
			//Pilote Wire Controller
			if(cat == 104&&record.get('sceneon') == null) {
				var retina= myvera.app.isretina;
				var html0 = '<img class="i0" src="./resources/images/plugin/pw0_';
				if(record.get('status')==0) {
					html0=html0+'1';
					var press0= true;
				} else {
					html0=html0+'0';
					var press0=false;
				}
				html0= html0+ retina + '.png" />';
				var html1 = '<img class="i1" src="./resources/images/plugin/pw1_';
				if(record.get('status')==1) {
					html1=html1+'1';
					var press1= true;
				} else {
					html1=html1+'0';
					var press1=false;
				}
				html1= html1+ retina + '.png" />';
				var html2 = '<img class="i2" src="./resources/images/plugin/pw2_';
				if(record.get('status')==2) {
					html2=html2+'1';
					var press2= true;
				} else {
					html2=html2+'0';
					var press2=false;
				}
				html2= html2+ retina + '.png" />';
				var html3 = '<img class="i3" src="./resources/images/plugin/pw3_';
				if(record.get('status')==3) {
					html3=html3+'1';
					var press3= true;
				} else {
					html3=html3+'0';
					var press3=false;
				}
				html3= html3+ retina + '.png" />';
				var me =this;
				var segmentedButton = Ext.create('Ext.SegmentedButton', {
						//numid: record.get('id'),
						allowMultiple: true,
						items: [
						{
							text: "0",
							pressed: press0,
							html: html0
						},
						{
							text: "1",
							pressed: press1,
							html: html1
						},
						{
							text: "2",
							pressed: press2,
							html: html2
						},
						{
							text: "3",
							pressed: press3,
							html: html3
						}
						],
						listeners: {
							toggle: function(container, button, pressed){
								if(pressed) {
										me.onPilotWireTap(record.get('id'), button.getText());
								}
								Ext.getCmp('popup_tap').hide();
							}
						}
				});
				
				if(Ext.getCmp('popup_tap')){
					var popup = Ext.getCmp('popup_tap');
					//popup.setWidth(width+10);
					//popup.setHeight(height+10);
					//popup.setHtml(html);
					popup.setItems(segmentedButton);
					popup.show();
				}else{
					var popup=new Ext.Panel({
						modal:true,
						id: 'popup_tap',
						hideOnMaskTap: true,
						padding: 10,
						//width:width+10,
						//height:height+10,
						centered: true,
						items: [segmentedButton],
						//html:html,
						listeners: {
							hide: function(panel) {
								//Ext.getCmp('popup_tap').setHtml('');
							}
						}
					});
					Ext.Viewport.add(popup);
					popup.show();
				}
				return;
			}
			
			//Hvac Heater
			if(cat == 5&&record.get('sceneon') == null) {
				this.onDeviceHoldTap(view, index, target, record, event);
				//this.vthermPopup(record.get('id'), record.get('name'), record.get('var2'));
				return;
			}
			
			
			
			//Smart Virtual Thermostat
			if(cat == 105&&record.get('sceneon') == null) {
				this.vthermPopup(record.get('id'), record.get('name'), record.get('status'), record.get('var4'), record.get('var2'), record.get('var3'), record.get('graphlink'));
				return;
			}
			
			//Day and night : peut forcer l'état jour et nuit.
			if(cat == 106&&record.get('sceneon') == null) {
				dservice = "urn:rts-services-com:serviceId:DayTime";
				//daction = 'SetTarget';
				//dtargetvalue = 'newTargetValue';
			}
			
			//Custom Device
			if(cat == 108&&record.get('sceneon') == null) {
				if(record.get('var4')!=""&&record.get('var4')!=null&&(record.get('subcategory')==0||record.get('subcategory')==2)) {
					//Exemple : urn:upnp-org:serviceId:VSwitch1|SetTarget|newTargetValue
					var commande =record.get('var4').split('|')
					dservice = commande[0];
					daction = commande[1];
					dtargetvalue = commande[2];
					if(record.get('subcategory')==2) {
						if (record.get('armed') == 1) {
							newstatus = "0";
						} else {
							newstatus = "1";
						}
					}
				} else {
					if(record.get('graphlink')!=""&&record.get('graphlink')!=null) {
						this.widgetPopup(record.get('wwidth'), record.get('height'), record.get('graphlink'));
					}
					return;
				}
			}
			
			//Sonos plugin
			if(cat == 109&&record.get('sceneon') == null) {
				/*dservice = "urn:micasaverde-com:serviceId:MediaNavigation1";
				if(record.get('status')==1) {
					//if(shorttitle.length>10) shorttitle= shorttitle.substring(0,10)
					if(record.get('var1').substring(0,15) == "Group driven by") daction = 'Stop';
					else daction = 'Pause';
				} else {
					if(record.get('var1')=="") return;
					daction = 'Play';
				}
				newstatus = '';*/
				this.onDeviceHoldTap(view, index, target, record, event);
				return;
			}
			//Custom Slider
			if(cat == 111&&record.get('sceneon') == null) {
				this.onDeviceHoldTap(view, index, target, record, event);
				return;
			}
			//Battery Monitor
			if(cat == 112&&record.get('sceneon') == null) {
				this.onDeviceHoldTap(view, index, target, record, event);
				return;
			}
			//RGB Controller
			if(cat == 113&&record.get('sceneon') == null) {
				dservice = "urn:upnp-org:serviceId:RGBController1";
				//daction = 'SetTarget';
				//dtargetvalue = 'newTargetValue';
			}
			//Scene
			if (cat == 1000) {
				dservice = "urn:micasaverde-com:serviceId:HomeAutomationGateway1";
				daction = 'RunScene';
				newstatus = record.get('id').substring(1);
			}
			
			//widget ou bouton
			if (cat == 1001) {
				switch (record.get('subcategory')) {
				//widget, ne fait rien
				case 0:
					break;
				//widget avec icône
				case 1:
					this.widgetPopup(record.get('wwidth'), record.get('height'), record.get('graphlink'));
					break;
				//command html
				case 2:
					this.runHtml(record.get('id'), record.get('graphlink'));
					break;
				//bouton de navigation
				case 3:
					//console.log(view.getParent().id);
					this.changeView(view.getParent(),record.get('status'));
					break;
				//bouton pour afficher masquer la barre d'onglet
				case 4:
					this.showHideMenu();
					break;
				default:
					break;
				}
				return;
			}
			
			//Lancement d'une scène à la place de l'action normal
			if ((record.get('sceneon') != null && newstatus == "1") || (record.get('sceneoff') != null && newstatus == "0")) {
				dservice = 'urn:micasaverde-com:serviceId:HomeAutomationGateway1';
				daction = 'RunScene';
				if (newstatus == "1") {
					newstatus = record.get('sceneon');
				} else {
					newstatus = record.get('sceneoff');
				}
			//Pas d'action pour les modules qui ne lancent rien sauf sceneon et sceneoff
			} else if (Ext.Array.contains([0, 4, 102, 103, 107, 120], cat)) {
				return;
			}
			
		} else {
			//Action lors d'un clic ailleurs que sur l'icône
			if (cat == 104) {
				dservice = "urn:antor-fr:serviceId:PilotWire1";
				daction = 'SetTarget';
				dtargetvalue = 'newTargetValue';
			} else if  (cat == 109) {
				if (tap.hasCls('i4')) {
					dservice = 'urn:upnp-org:serviceId:RenderingControl';
					daction = 'SetMute';
					dtargetvalue = 'notargetvalue';
					//record.set('state', -2);
					//return;
				//'<img class="i5" src="./resources/images/plugin/plus{retina}.png" />'+
				//} else if (tap.hasCls('i5')) {
				//	this.onDeviceHoldTap(view, index, target, record, event);
				//	return;
				}
			} else if  (cat == 113) {
				if (tap.hasCls('i4')) {
					this.onDeviceHoldTap(view, index, target, record, event);
					return;
				}
			}
		}

		//Lancement de l'action
		console.log("switch : " + record.get('name'));
		record.set('state', -2);
		var recordid="";
		if(record.get('type')!='clone') recordid=record.get('id');
		else recordid=record.get('ref');
		var vera_url = './protect/syncvera.php';
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		var ipvera = this.ipvera;
		Ext.Ajax.request({
			url: vera_url,
			headers: syncheader,
			method: 'GET',
			timeout: 90000,
			scope: this,
			params: {
				id: 'lu_action',
				ipvera: ipvera,
				DeviceNum: recordid,
				serviceId: dservice,
				action: daction,
				newvalue: newstatus,
				targetvalue: dtargetvalue
				//newLoadlevelTarget: newstatus,
				//newTargetValue: newstatus,
				//newArmedValue: newstatus,
				//output_format: 'json'
			},
			success: function(response) {
				//var category = record.get('category');
				if (Ext.Array.contains([2, 3, 8], cat)) {
					record.set('state', -2);
				} else if (cat==1000) {
					record.set('state', -1);
				}
			},
			failure: function(response) {
				console.log("switch error :" + record.get('name'));
				Ext.Msg.alert(locale.getSt().misc.error,'Switch Error');
			}
		});
	},
	
	onDeviceHoldTap: function(view, index, target, record, event) {
		var me = this;
		//record.set('state', 2);
		//return;
		if(record.get('category')==109) { //Sonos
			var popup=new Ext.Panel({
			modal:true,
			hideOnMaskTap: true,
			width:300,
			//maxHeight:300,
			centered: true,
			id: "sonos" + record.get('id'),
			showart: 'none',
			nodirectip: "",
			toogleplay:true,
			items:[
			{
				xtype:'container',
				padding: 5,
				layout:{
					type:'hbox'
				},
				items: [
				{
					xtype:'slider',
					itemId:'volumeslider',
					width: 225,
					//value:record.get('level'),
					listeners: {
						change: function(Slider, thumb, newValue, oldValue, eOpts) {
							console.log("slider change");
							me.ondeviceaction(record.get('id'), 'urn:upnp-org:serviceId:RenderingControl', 'SetVolume', 'DesiredVolume', newValue);
						}
					}
				},
				{
					xtype: "button",
					itemId: 'mute',
					handler: function(btn) {
						console.log("mute change");
						me.ondeviceaction(record.get('id'), "urn:upnp-org:serviceId:RenderingControl", 'SetMute', "targetvalue", "");
						btn.disable();
					}
				}
				]
			},
			//play : 4, A: enceinte: A, jauge : J et K, info : ) audio : > et <
			//pause: 5, stop : 6, next: 7 before : 8
			{
				xtype:'container',
				padding: 5,
				layout:{
					type:'hbox'
				},
				items: [
				{
					xtype: 'segmentedbutton',
					itemId: 'playpause',
					pressedCls: 'mypressedbt',
					ui: 'confirm',
					allowMultiple: false,
					//layout:{pack:'center'},
					//disabled: true,
					items: [
					{
						//text: "Pause",
						itemId: "Pause",
						iconCls: 'pause'//,
						//html: html0,
						//pressed: press0
					},
					{
						//text: "Play",
						itemId: "Play",
						//ui: 'confirm',
						iconCls: 'play'//,
						//pressed: press1,
						//html: html1
					},
					{
						//text: "Stop",
						itemId: "Stop",
						iconCls: 'stop'//,
						//pressed: press2,
						//html: html2
					}
					],
					listeners: {
						toggle: function(container, button, pressed){
							if(pressed) {
								if(popup.toogleplay) {
									console.log("Play change");
									console.log(button.getItemId());
									container.disable();
									//Pas de targetvalue dans cette commande
									me.ondeviceaction(record.get('id'), "urn:micasaverde-com:serviceId:MediaNavigation1", button.getItemId(), "targetvalue", "");
									//me.onPilotWireTap(record.get('id'), button.getText());
								} else {
									console.log("Play not change");
									popup.toogleplay = true;
								}
							}
							//Ext.getCmp('popup_tap').hide();
						}
					}
				},
				{ xtype: 'spacer' },
				{
					xtype: 'segmentedbutton',
					itemId: 'nextbefore',
					//allowMultiple: false,
					//layout:{pack:'center'},
					allowToggle: false,
					items: [
					{
						//text: "Pause",
						//action: "Prev",
						iconCls: 'prev',
						//html: html0,
						handler: function(btn) {
							me.ondeviceaction(record.get('id'), "urn:micasaverde-com:serviceId:MediaNavigation1", 'SkipUp', "targetvalue", "", "nostate");
						}
					},
					{
						//text: "Play",
						action: "Next",
						iconCls: 'next',
						//html: html1,
						handler: function(btn) {
							me.ondeviceaction(record.get('id'), "urn:micasaverde-com:serviceId:MediaNavigation1", 'SkipDown', "targetvalue", "", "nostate");
						}
					}
					]
				}
				]
			},
			{
				padding: 5,
				maxHeight: 180,
				//html: record.get('var1'),
				itemId: 'audiotxt'
			},
			{
				xtype:'img',
				itemId: 'sonosimg'//,
				//src: record.get('var3'),
				//flex: 1
				//width: 300//,
				//height: 300
			}
			],
			listeners: {
				hide: function(panel) {
					delete myvera.view.dataplan.lastTapHold;
					this.destroy();
				}
			}
			});
			
			//Test pour voir s'il faut afficher la jaquette (mode tablette et ip qui commence comme celle de l'enceinte Sonos
			var matches = record.get('var3').match(/^https?\:\/\/([^\/:?#]+)/i);
			//var ip = matches && matches[1]; 
			var ip = "none";
			
			if(matches && matches[1]) {
				var endpoint = matches[1].lastIndexOf(".");
				if(endpoint>0) ip = matches[1].substring(0,endpoint);
			}
			
			var hostname= window.location.hostname.substring(0, ip.length);
			//if(ip&&ip.length>hostname.length) window.location.hostname.substring(0, ip.length)
			
			//console.log(hostname, ip);
			
			if(this.getApplication().getCurrentProfile().getName()=='Tablet') {
				popup.down('#sonosimg').setHeight(300);
				//pas besoin de passer par sonosart.php
				if(hostname!=ip) popup.nodirectip="sonosart.php?art=";
				else  popup.nodirectip="";
				popup.showart = "";
			} else {
				popup.showart = "none";
				//record.set('var6', "nojaq");
			}
			popup.toogleplay = true;
			this.updatesonospopup(popup, record);
		} else if(record.get('category')==5) { //hvac - heater (sous-cat:2)
			var dservice = 'urn:upnp-org:serviceId:TemperatureSetpoint1_Heat';
			var daction = 'SetCurrentSetpoint';
			var dtargetvalue = 'NewCurrentSetpoint';
			if(record.get('graphlink')!="") {
				var incrminmax=record.get('graphlink').split('|');
				var incr=Number(incrminmax[0]);
				var min = Number(incrminmax[1]);
				var max = Number(incrminmax[2]);
			} else {
				var incr=0.1;
				var min = 0;
				var max = 35;
			}
			var popup=new Ext.Panel({
			modal:true,
			hideOnMaskTap: true,
			width:290,
			height:55,
			centered: true,
			items:[{
				xtype:'sliderText',
				values:record.data.var2,
				width: 200,
				increment: incr,
				minValue: min,
				maxValue: max,
				fontsize: '20px',
				suffix: record.data.camuser,
				listeners: {
					changeValues: function(Slider, thumb, newValue, oldValue, eOpts) {
						//console.log(Slider.getHelperValue());
						//console.log(newValue);
						record.set('var2', newValue);
						me.ondeviceaction(record.get('id'), dservice, daction, dtargetvalue, newValue);
					}
				}
			}],
			listeners: {
				hide: function(panel) {
					//delete myvera.view.dataplan.lastTapHold;
					this.destroy();
				}
			}
			});
		} else if(record.get('category')==111) { //Custom Slider
			var commande =record.get('var4').split('|');
			//var dservice = 'urn:upnp-org:serviceId:Dimming1';
			//var daction = 'SetLoadLevelTarget';
			//var dtargetvalue = 'newLoadlevelTarget';		
			var popup=new Ext.Panel({
			modal:true,
			hideOnMaskTap: true,
			width:300,
			height:50,
			centered: true,
			items:[{
				xtype:'slider',
				value:record.data.level,
				listeners: {
					change: function(Slider, thumb, newValue, oldValue, eOpts) {
						me.ondeviceaction(record.get('id'), commande[0], commande[1], commande[2], newValue);
					}
				}
			}],
			listeners: {
				hide: function(panel) {
					//delete myvera.view.dataplan.lastTapHold;
					this.destroy();
				}
			}
			});
		} else if(record.get('category')==112) { //Battery Monitor
			var isretina = myvera.app.isretina;
			var status=record.get('status');
			var devices = Ext.getStore('devicesStore');
			var device = "";
			var html='';
			if(status==2) {
				html='<img src="./resources/images/l112_2'+isretina+'.png" width=25/>';
				if(record.get('var3')!="") {
					var id =record.get('var3').split(',');
					for (var iddevice in id) {
						device= devices.getById(id[iddevice]);
						if(device) html=html+"<br /> "+device.get("name")+" ("+device.get("batterylevel")+"%)";
						else  html=html+"<br /> ID:"+id[iddevice];
					}
				}

			} else {
				if(record.get('var2')!="") {
					html='<img src="./resources/images/l112_1'+isretina+'.png" width=25/>';
					var id =record.get('var2').split(',');
					for (var iddevice in id) {
						device= devices.getById(id[iddevice]);
						if(device) html=html+"<br /> "+device.get("name")+" ("+device.get("batterylevel")+"%)";
						else  html=html+"<br /> ID:"+id[iddevice];
					}
				}
				if(record.get('var1')!="") {
					if(record.get('var2')!="") html=html+'<br />';
					html=html+'<img src="./resources/images/l112_0'+isretina+'.png" width=25/>';
					var id =record.get('var1').split(',');
					for (var iddevice in id) {
						device= devices.getById(id[iddevice]);
						if(device) html=html+"<br /> "+device.get("name")+" ("+device.get("batterylevel")+"%)";
						else  html=html+"<br /> ID:"+id[iddevice];
					}
				}
			}
			var popup=new Ext.Panel({
			modal:true,
			hideOnMaskTap: true,
			width: '400px',
			height: '290px',
			maxWidth: '95%',
			maxHeight: '95%',
			centered: true,
			scrollable: {
				direction: 'vertical',
				directionLock: true
			},
			items:[{
				style: {
					'margin': '5px'
				},
				html: html
			},
			{
				xtype:'toolbar',
				docked: 'bottom',
				items: [{xtype: 'spacer'},
				{
					text: locale.getSt().msg.updating,
					ui: 'action',
					centered  :true,
					maxWidth:150,
					handler: function(){
					me.ondeviceaction(record.get('id'), "urn:upnp-org:serviceId:BatteryMonitor1", 'Check', "targetvalue", "", "notarget");
					this.getParent().getParent().hide();
					}
				}]
			}
			],
			listeners: {
				hide: function(panel) {;
					this.destroy();
				}
			}
			});
			
			
		} else if(record.get('category')==113) { //RGB Controller
			var color=record.get('var1');
			var popup=new Ext.Panel({
			modal:true,
			hideOnMaskTap: true,
			width: '312px',
			height: '312px',
			maxWidth: '95%',
			maxHeight: '95%',
			centered: true,
			scrollable: false, /*{
				direction: 'vertical',
				directionLock: true
			},*/
			items:[
			{
				xtype: 'colorpicker',
				hexColor: color,
				//state: record.get('state'),
				listeners: {
					change: function(Slider, thumb, newValue, oldValue, eOpts) {
						//console.log("color change:"+newValue);
						me.ondeviceaction(record.get('id'), 'urn:upnp-org:serviceId:RGBController1', 'SetColor', 'newColor', '#'+newValue);
					}
				}
			}
			],
			listeners: {
				hide: function(panel) {;
					this.destroy();
				}
			}
			});
		} else {
			var dservice = 'urn:upnp-org:serviceId:Dimming1';
			var daction = 'SetLoadLevelTarget';
			var dtargetvalue = 'newLoadlevelTarget';
			
			var popup=new Ext.Panel({
			modal:true,
			hideOnMaskTap: true,
			width:300,
			height:50,
			centered: true,
			items:[{
				xtype:'slider',
				value:record.data.level,
				listeners: {
					change: function(Slider, thumb, newValue, oldValue, eOpts) {
						me.ondeviceaction(record.get('id'), dservice, daction, dtargetvalue, newValue);
					}
				}
			}],
			listeners: {
				hide: function(panel) {
					delete myvera.view.dataplan.lastTapHold;
				}
			}
			});
		}
		Ext.Viewport.add(popup);
		popup.show();
	},
	
	updatesonospopup: function(popup, record) {
		var status=record.get('status');
		var playbuttons = popup.down('#playpause');
		//Mise à jour de la jaquette
		//_name: "Tablet"
		//console.log(this.getApplication().getCurrentProfile().getName());
		//console.log("popup.showart:" +popup.showart);
		//console.log("popup.toogleplay:" +popup.toogleplay);
		console.log("new image:"+ record.get('var3'));
		if(popup.showart!="none"&&record.get('var3')!=popup.showart) {
			var img = popup.down('#sonosimg');
			var imgurl="";
			if(record.get('var3').substr(record.get('var3').lastIndexOf("/") + 1)=="Sonos.png") {
				imgurl="./resources/images/plugin/sonos.jpg";
			} else {
				imgurl=popup.nodirectip+record.get('var3');
			}
			//console.log('new image');
			//console.log("new image:"+ record.get('var3'));
			img.setSrc(imgurl);
			popup.showart = record.get('var3');
		}
		
		if(status!=3&&record.get('var1')!="") {
			if(!playbuttons.isPressed(playbuttons.getAt(status))) {
				//console.log("Mise à jour bouton status");
				popup.toogleplay = false;
				playbuttons.setPressedButtons(status);
			}
			if(record.get('state')!=-2) playbuttons.setDisabled(false);
			if(status==2||record.get('var1').substring(0,15) == "Group driven by") playbuttons.getAt(0).disable();
			else playbuttons.getAt(0).enable();
		} else {
			playbuttons.setDisabled(true);
		}
		
		popup.down('#volumeslider').setValue(record.get('level'));
		
		if(record.get('armed')==0) {
			popup.down('#mute').setUi('confirm');
			popup.down('#mute').setIconCls('audio');
		} else {
			popup.down('#mute').setUi('decline');
			popup.down('#mute').setIconCls('muted');
		}
		popup.down('#mute').setDisabled(false);
		
		popup.down('#audiotxt').setHtml(record.get('var1'));
		
		//console.log(window.location.hostname);
		//console.log(record.get('var3'));
	},
	
	onRetinaTap: function() {
		console.log("Retina Change");
		if(this.logged==true) {
		Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
			success: function(user) {
				var isretina = myvera.app.isretina;
				if(isretina=="@2x") isretina="";
				else isretina="@2x";
				user.set("isRetina", isretina);
				user.save();
				window.location.reload();
			},
			failure: function() {
				// this should not happen, nevertheless:
				alert(locale.getSt().misc.error);
			}
		}, this);
		}
	},
	
	onLoginTap: function() {
		if(this.logged!=true) {
			var username = this.getUsernameCt().getValue(),
				password = this.getPasswordCt().getValue(),
				ipvera = this.getIpveraCt().getValue(),
				isVueL = this.getIsVueL().getValue(),
				isVueP = this.getIsVueP().getValue(),
				isReveil = this.getIsReveil().getValue(),
				isTab = this.getIsTab().getValue(),
				autoVue = this.getAutoVue().getValue(),
				autoBord = this.getAutoBord().getValue(),
				profil = this.getViewprofil().getValue();
				config = this.getIsConfig().getValue();
			if(this.getIsRetina().getValue()) var isRetina="@2x";
			else var isRetina = "";
				
			if(!Ext.isEmpty(password) && !Ext.isEmpty(username) && !Ext.isEmpty(ipvera)) {
				var user = Ext.create('myvera.model.CurrentUser', {
					id: 1,
					name: username,
					pass: password,
					ipvera: ipvera,
					isVueL: isVueL,
					isVueP: isVueP,
					isReveil: isReveil,
					isTab: isTab,
					autoVue: autoVue,
					autoBord: autoBord,
					isRetina: isRetina,
					profil: profil,
					config: config
				});
				user.save();
				this.loggedUserId=this.base64_encode(username+":"+password);
				this.ipvera=this.getIpveraCt().getValue();
				this.profilchoice=this.getViewprofil().getValue();
				
				console.log('logUserIn: ', username);
				
				//Affichage bouton Retina et affectation valeur @2x
				myvera.app.setIsretina(isRetina);
				if(myvera.app.isretina=="@2x") this.getRetinaBt().setText(locale.getSt().button.noretinamode);
				else  this.getRetinaBt().setText(locale.getSt().button.retinamode);
				this.getIsRetina().hide();
				this.getRetinaBt().show();
				
				this.getUsernameCt().hide();
				this.getPasswordCt().hide();
				this.getIpveraCt().hide();
				this.getViewprofil().disable();
				this.getIsConfig().hide();
				
				//Affichage des onglets
				Ext.getCmp('datalist').tab.show();
				Ext.getCmp('panelinfo').tab.show();
				if(this.getIsReveil().getValue()) Ext.getCmp('listclock').tab.show();
				
				if(config) {
					Ext.getCmp('PanelConfig').getTabBar().getComponent(1).show();
					Ext.getCmp('PanelConfig').getTabBar().getComponent(2).show();
					Ext.getCmp('PanelConfig').getTabBar().getComponent(3).show();
				}
				//Sauvegarde de la dernière adresse IP de la Vera et le mode Retina
				var url = './protect/saveconfig.php';
				var syncheader = "";
				syncheader={'Authorization': 'Basic ' + this.loggedUserId};
				var ipvera = this.ipvera;
				Ext.Ajax.request({
					url: url,
					headers: syncheader,
					params: {
						ipvera: ipvera,
						isRetina: isRetina
					},
					method: 'GET',
					timeout: 10000,
					scope: this,
					success: function(response) {
					},
					failure: function(response) {
						Ext.Msg.alert(locale.getSt().misc.error,locale.getSt().msg.saveiperror);
					}
				});
				
				//this.startstore();
				this.LogIn();
				
//*******				var application = this.getApplication().getController('Application');
//*******				var orientation= application.getOrientationFix();
				
//*******				application.setPanel3dL(isVueL);
//*******				if(isVueL==true&&orientation=='landscape') {
//*******					Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('carouselplan'));
					//Ext.getCmp('carouselplan').hide();
//*******				}
				
//*******				application.setPanel3dP(isVueP);
//*******				if(isVueP==true&&orientation=='portrait') {
//*******					Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('carouselplan'));
					//Ext.getCmp('carouselplan').hide();
//*******				}
				
//*******				Ext.getCmp('main').setActiveItem(Ext.getCmp('homepanel'));
			} else Ext.Msg.alert(locale.getSt().misc.error,locale.getSt().msg.mustloginandpass);
		} else {
			Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
				success: function(user) {
					Ext.Msg.confirm(locale.getSt().misc.msg, locale.getSt().msg.notlogin, function(confirmed) {
						if (confirmed == 'yes') {
							user.erase({success: function() {window.location.reload(); } });
						}
					}, this);
				},
				failure: function() {
					// this should not happen, nevertheless:
					window.location.reload();
				}
			}, this);
		}
	},
	
	onIsVueChangeL: function() {
		if(this.logged==true) {
		Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
			success: function(user) {
				var isvue = this.getIsVueL().getValue();
				user.set("isVueL", isvue);
				user.save();
//*******				this.ChangeVue("landscape", isvue);
				
			},
			failure: function() {
				// this should not happen, nevertheless:
				alert(locale.getSt().misc.error);
			}
		}, this);
		}
	},
	
	onIsVueChangeP: function() {
		if(this.logged==true) {
		Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
			success: function(user) {
				var isvue = this.getIsVueP().getValue();
				user.set("isVueP", isvue);
				user.save();
//*******				this.ChangeVue("portrait", isvue);
				
			},
			failure: function() {
				// this should not happen, nevertheless:
				alert(locale.getSt().misc.error);
			}
		}, this);
		}
	},
	
//******* Pas utilisée	
	ChangeVue: function(orient, isvue) {
		var application = this.getApplication().getController('Application');
		if(orient=="landscape") {
				application.setPanel3dL(isvue);
		} else {
				application.setPanel3dP(isvue);
		}
		
		var orientation= application.getOrientationFix();
		
		if (isvue) {
			//Ext.getCmp('carouselplan').show();
			if(orientation==orient) {
//*******				Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('carouselplan'));
			}
		} else {
			if(orientation==orient) {
//*******				Ext.getCmp('homepanel').setActiveItem(Ext.getCmp('datalist'));
				//Ext.getCmp('carouselplan').hide();
			}
		}
	},
	
	onIsReveilChange: function() {
		if(this.logged==true) {
		Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
			success: function(user) {
				var isreveil = this.getIsReveil().getValue();
				user.set("isReveil", isreveil);
				user.save();
				if(isreveil) {
					Ext.getCmp('listclock').tab.show();
				} else {
					Ext.getCmp('listclock').tab.hide();
				}
			},
			failure: function() {
				// this should not happen, nevertheless:
				alert(locale.getSt().misc.error);
			}
		}, this);
		}
	},
	
	onIsTabChange: function() {
		if(this.logged==true) {
		Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
			success: function(user) {
				var isTab = this.getIsTab().getValue();
				user.set("isTab", isTab);
				user.save();
				if(isTab==0&&this.tabshow===true) {
					this.tabshow=false;
					Ext.Msg.alert(locale.getSt().misc.msg,locale.getSt().msg.addbtntab);
				}
			},
			failure: function() {
				// this should not happen, nevertheless:
				alert(locale.getSt().misc.error);
			}
		}, this);
		}
	},
	
	onAutoVueChange: function() {
		if(this.logged==true) {
		Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
			success: function(user) {
				var autoVue = this.getAutoVue().getValue();
				user.set("autoVue", autoVue);
				user.save();
				var application = this.getApplication().getController('Application');
				application.setAutoVue(autoVue);
			},
			failure: function() {
				// this should not happen, nevertheless:
				alert(locale.getSt().misc.error);
			}
		}, this);
		}
	},
	
	onAutoBordChange: function() {
		if(this.logged==true) {
		Ext.ModelMgr.getModel('myvera.model.CurrentUser').load(1, {
			success: function(user) {
				var autoBord = this.getAutoBord().getValue();
				user.set("autoBord", autoBord);
				user.save();
				var application = this.getApplication().getController('Application');
				application.setAutoBord(autoBord);
			},
			failure: function() {
				// this should not happen, nevertheless:
				alert(locale.getSt().misc.error);
			}
		}, this);
		}
	},
	
	onClockSaveTap: function() {
		this.getPaneloverlay().hide();
		var id = this.getPaneloverlay().down('#deviceid').getValue();
		var datedeb = this.getPaneloverlay().down('#heuredeb').getValue();
		//le controleur, change le jour (il met le jour en cours). il faut donc le corriger.
		datedeb = new Date("February 5, 2001 " + Ext.Date.format(datedeb, 'H:i:s'));
		var datefin = this.getPaneloverlay().down('#heurefin').getValue();
		datefin = new Date("February 5, 2001 " + Ext.Date.format(datefin, 'H:i:s'));
			//Ext.Msg.alert('Message',Ext.Date.format(datedeb, 'd/m/y H:i:s')+' '+Ext.Date.format(datefin, 'd/m/y H:i:s'));
		var message = this.getPaneloverlay().down('#message').getValue();		
		var devices = Ext.getStore('devicesStore');
		var device=devices.getById(id);
		var devicetype=device.get('subcategory');
		var change=false;
		var heurefin="";
		if (devicetype == "1") {
			if (Date.parse(datefin) < Date.parse(datedeb)) {
				datefin.setTime(datefin.getTime() + (24 * 60 * 60 * 1000));
			}
			heurefin = (datefin.getTime() - datedeb.getTime()) / 1000;
			if(!heurefin>=10) heurefin=10;
			change=true;
		} else  heurefin="";
		var heuredeb=Ext.Date.format(datedeb, 'H:i:s');
		if(heuredeb!=device.get('var1')) {
			change=true;
		}
		if(devicetype=="2"&&message!=device.get('var4')) {
			change=true;
		} else message="";
		
		var weekdays=device.get('var6');
		if (devicetype != "2") {
			var multidays = eval(this.getPaneloverlay().down('#multidays').getValue());
			var week = [0, 0, 0, 0, 0, 0, 0];
			for (var day in multidays) {
				week[multidays[day]]=1;
			}
			weekdays="";
			for (var day in week) {
				weekdays=weekdays+" "+week[day];
			}
			weekdays=weekdays.substring(1);
			//console.log(weekdays);
			//var result = 
			//ex: ["0", "3", "6"] 
		}
		if(weekdays!=device.get('var6')) change=true;
		else weekdays="";
		
		//change=false;
		if (change == true) {
			device.set('state', -2);
			var recordid="";
			if(device.get('type')!='clone') recordid=device.get('id');
			else recordid=device.get('ref');
			var vera_url = './protect/syncvera.php';
			var syncheader = "";
			syncheader={'Authorization': 'Basic ' + this.loggedUserId};
			var ipvera = this.ipvera;
			Ext.Ajax.request({
				url: vera_url,
				headers: syncheader,
				params: {
					id: 'vclock',
					ipvera: ipvera,
					DeviceNum: recordid,
					alarmtime: heuredeb,
					alarmduration: heurefin,
					text1: message,
					weekdays: weekdays
				},
				method: 'GET',
				timeout: 10000,
				scope: this,
				success: function(response) {
				},
				failure: function(response) {
					//console.log("switch error :" + record.get('name'));
					Ext.Msg.alert(locale.getSt().misc.error,'Clock Error');
				}
			});
		} else {
			Ext.Msg.alert(locale.getSt().misc.msg,locale.getSt().msg.nochange);
			//Ext.Msg.alert('Message',''+heuredeb+' '+heurefin);
		}
	
	},
	
	onPilotWireTap: function(iddevice, newstatus) {
		dservice = "urn:antor-fr:serviceId:PilotWire1";
		daction = 'SetTarget';
		dtargetvalue = 'newTargetValue';
		var devices = Ext.getStore('devicesStore');
		var device = devices.getById(iddevice);
		if(device) {
		//switch status
		console.log("switch : " + device.get('name'));
		device.set('state', -2);
		var recordid="";
		if(device.get('type')!='clone') recordid=device.get('id');
		else recordid=device.get('ref');
		var vera_url = './protect/syncvera.php';
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		var ipvera = this.ipvera;
		Ext.Ajax.request({
			url: vera_url,
			headers: syncheader,
			method: 'GET',
			timeout: 10000,
			scope: this,
			params: {
				id: 'lu_action',
				ipvera: ipvera,
				DeviceNum: recordid,
				serviceId: dservice,
				action: daction,
				newvalue: newstatus,
				targetvalue: dtargetvalue
			},
			success: function(response) {
				//var category = device.get('category');
				//device.set('state', -2);
				
			},
			failure: function(response) {
				console.log("switch error :" + device.get('name'));
				Ext.Msg.alert(locale.getSt().misc.error,'Switch Error');
			}
		});
		} else {
			console.log("PilotWireTap - module non trouvé.");
		}
	},
		
	initfloors: function() {
		Ext.Msg.confirm(locale.getSt().misc.error, locale.getSt().msg.createviews, function(confirmed) {
				if (confirmed == 'yes') {
					Ext.Viewport.setMasked({
						xtype: 'loadmask',
						message: locale.getSt().msg.initlist
					});

					console.log("Create Floors");
					var url = './protect/initfloors.php';
					var syncheader = "";
					syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
					Ext.Ajax.request({
							url: url,
							headers: syncheader,
							method: 'GET',
							timeout: 35000,
							scope: this,
							params: {
								timeout: '30',
								profil: this.profilchoice
							},
							success: function(result) {
								Ext.Viewport.setMasked(false);
								if (result.responseText=="OK") {
									this.pushviews();
									//this.pushplans();
								} else {
									Ext.Msg.alert(locale.getSt().misc.error, locale.getSt().msg.createlisterror);
								}
							},
							failure: function(response) {
								Ext.Viewport.setMasked(false);
								Ext.Msg.alert(locale.getSt().misc.error, locale.getSt().msg.createlisterror);
							}
					});
				}
			}, this);
	},
	
	//Lancé quand la liste des onglets n'existe pas pour la créer
	initTabsViews: function() {
		Ext.Msg.confirm(locale.getSt().misc.error, locale.getSt().msg.createtabs, function(confirmed) {
				if (confirmed == 'yes') {
					Ext.Viewport.setMasked({
						xtype: 'loadmask',
						message: locale.getSt().msg.initlist
					});

					console.log("Create Tabs");
					var url = './protect/inittabs.php';
					var syncheader = "";
					syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
					Ext.Ajax.request({
							url: url,
							headers: syncheader,
							method: 'GET',
							timeout: 35000,
							scope: this,
							params: {
								timeout: '30',
								profil: this.profilchoice
							},
							success: function(result) {
								Ext.Viewport.setMasked(false);
								if (result.responseText=="OK") {
									this.startstore();
								} else {
									Ext.Msg.alert(locale.getSt().misc.error, locale.getSt().msg.createlisterror);
								}
							},
							failure: function(response) {
								Ext.Viewport.setMasked(false);
								Ext.Msg.alert(locale.getSt().misc.error, locale.getSt().msg.createlisterror);
							}
					});
				}
			}, this);
	},
	
	base64_encode: function(data) {
		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			enc = "",
			tmp_arr = [];
		
		if (!data) {
			return data;
		}
		
		//data = this.utf8_encode(data + '');
		
		do { // pack three octets into four hexets
			o1 = data.charCodeAt(i++);
			o2 = data.charCodeAt(i++);
			o3 = data.charCodeAt(i++);
			
			bits = o1 << 16 | o2 << 8 | o3;
			h1 = bits >> 18 & 0x3f;
			h2 = bits >> 12 & 0x3f;
			h3 = bits >> 6 & 0x3f;
			h4 = bits & 0x3f;
			
			// use hexets to index into b64, and append result to encoded string
			tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
		} while (i < data.length);
		
		enc = tmp_arr.join('');
		
		var r = data.length % 3;
		
		return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
	},
	
	onVersionTap: function() {
		console.log("Version Verif");
		var url = './version/newversion.php';
		Ext.Viewport.setMasked({
				xtype: 'loadmask',
				message: locale.getSt().msg.search + '...'
		});
		Ext.Ajax.request({
			url: url,
			method: 'GET',
			timeout: 10000,
			scope: this,
			success: function(result) {
				var response = Ext.decode(result.responseText, true);
				Ext.Viewport.setMasked(false);
				if (response) {
					if(response.result=="true") {
						this.getUrlversiontxt().setHtml(locale.getSt().msg[response.msg]+' <a style="font-size:12px;" target="_blank" href="' +response.url+'">'+response.url+'</a>');
						//this.getUsernameCt()
						this.getUrlversiontxt().show();
						Ext.Msg.alert(locale.getSt().misc.version,locale.getSt().msg[response.msg]);
					} else {
						this.getUrlversiontxt().hide();
						Ext.Msg.alert(locale.getSt().misc.version,locale.getSt().msg[response.msg]);
					}
				} else {
					Ext.Msg.alert(locale.getSt().misc.error,locale.getSt().msg.noanswer);
				}
			},
			failure: function(result) {
				Ext.Viewport.setMasked(false);
				Ext.Msg.alert(locale.getSt().misc.error,locale.getSt().msg.noanswer);
			}
		});

	},
	
	vthermPopup: function(deviceid, name, status, energymode, heatsp, coolsp, incrminmax) {
		//device.set('var2', response.devices[idrecord].heatsp);
		//device.set('var3', response.devices[idrecord].coolsp);
		//device.set('var4', response.devices[idrecord].hvacstate);
		
		var me=this;
		if(incrminmax!=""&&incrminmax!=null) {
			incrminmax=incrminmax.split('|');
			var incr=Number(incrminmax[0]);
			var min = Number(incrminmax[1]);
			var max = Number(incrminmax[2]);
		} else {
			var incr=0.1;
			var min = 0;
			var max = 35;
		}
//		var automode=1;
//		if(hvacstate=="Heating") automode=0;
			
		//Status 5 : non connu, 0 : mode off, 1 : mode CoolOn (Inactif), 2: Mode HeatOn (Forcé), 3: Auto
		var popup=new Ext.Panel({
		    modal:true,
		    id: 'popup_temp',
		    hideOnMaskTap: true,
		    padding: 2,
		    //margin: '0,0,0,0',
		    //border: 1,
		    width: '320px',
		    centered: true,
		    items:[
		    {
			xtype: 'fieldset',
			name:'fieldset1',
			itemId:'fieldset1',
			//title:name,
			defaults: {
				labelWidth: '140px'
			},
			items: [
			{
				xtype: 'selectfield',
				label: locale.getSt().device.vtherm.mode,
				name: 'status',
				itemId: 'status',
				options: [{
					text: locale.getSt().device.vtherm["0"],
					value: 0
				}, {
					text: locale.getSt().device.vtherm["1"],
					value: 1
				}, {
					text: locale.getSt().device.vtherm["2"],
					value: 2
				}, {
					text: locale.getSt().device.vtherm["3"],
					value: 3
				}]
			},
			{
				xtype: 'radiofield',
				name: 'automode',
				itemId: 'automodeeco',
				value: 'EnergySavingsMode',
				label: locale.getSt().device.vtherm["3"]+" "+locale.getSt().device.vtherm.eco//,
				//checked: true
			},
			{
				xtype: 'radiofield',
				name: 'automode',
				itemId: 'automodeconf',
				value: 'Normal',
				label: locale.getSt().device.vtherm["3"]+" "+locale.getSt().device.vtherm.normal
			},
			{
				html:'<span class="formlabel">'+locale.getSt().device.vtherm.tempeco+'</span>'
			},
			{
				xtype: 'sliderText',
				name: 'coolsp',
				itemId: 'coolsp',
				values: coolsp,
				minValue: min,
				maxValue: max,
				increment: incr,
				width: 230,
				fontsize: '16px',
				suffix: locale.getSt().unit.temp
			},
			{
				html:'<span class="formlabel">'+locale.getSt().device.vtherm.tempnorm+'</span>'
			},
			{
				xtype: 'sliderText',
				name: 'heatsp',
				itemId: 'heatsp',
				values: heatsp,
				minValue: min,
				maxValue: max,
				increment: incr,
				width: 230,
				fontsize: '16px',
				suffix: locale.getSt().unit.temp
			},
			{
				xtype: 'button',
				margin: 5,
				itemId: 'confirm',
				ui: 'confirm',
				text: locale.getSt().button.update,
				iconCls: 'refresh',
				iconMask: true,
				handler: function(){
					var result="";
					var newvalue="";
					var form = popup.down('#fieldset1');
					if(form.down('#coolsp').getValues() != coolsp) {
						newvalue=form.down('#coolsp').getValues();
						//data_request?id=lu_action&serviceId=urn:upnp-org:serviceId:TemperatureSetpoint1_Cool&DeviceNum=86&action=SetCurrentSetpoint&NewCurrentSetpoint=18.2
						me.ondeviceaction(deviceid, "urn:upnp-org:serviceId:TemperatureSetpoint1_Cool", "SetCurrentSetpoint", "NewCurrentSetpoint", newvalue);
						//result=result +"Temp. Eco:" + newvalue;
					}
					
					if(form.down('#heatsp').getValues() != heatsp) {
						newvalue=form.down('#heatsp').getValues();
						//data_request?id=lu_action&serviceId=urn:upnp-org:serviceId:TemperatureSetpoint1_Heat&DeviceNum=86&action=SetCurrentSetpoint&NewCurrentSetpoint=18.2
						me.ondeviceaction(deviceid, "urn:upnp-org:serviceId:TemperatureSetpoint1_Heat", "SetCurrentSetpoint", "NewCurrentSetpoint", newvalue);
						//result=result +"Temp. Confort:" + newvalue;
					}
					
					if(form.down('#automodeconf').getGroupValues() != energymode) {
						//alert(form.down('#automodeconf').getGroupValues());
//					//if(form.down('#automode').getValue() != automode) {
//						if(form.down('#automode').getValue()==1) newvalue="EnergySavingsMode";
						if(form.down('#automodeconf').getGroupValues()=="EnergySavingsMode") newvalue="EnergySavingsMode";
						else newvalue="Normal";
						//data_request?id=lu_action&serviceId=urn:upnp-org:serviceId:HVAC_UserOperatingMode1&DeviceNum=86&action=SetEnergyModeTarget&NewEnergyModeTarget=EnergySavingsMode
						me.ondeviceaction(deviceid, "urn:upnp-org:serviceId:HVAC_UserOperatingMode1", "SetEnergyModeTarget", "NewEnergyModeTarget", newvalue);
						//result=result +" Mode auto:" + newvalue;
					}
					
					if(form.down('#status').getValue() != status) {
						newvalue="";
						//Status 5 : non connu, 0 : mode Off, 1 : mode CoolOn (Inactif), 2: Mode HeatOn (Forcé), 3: Auto
						switch (form.down('#status').getValue()) {
						case 3:
							newvalue="AutoChangeOver";
							break;
						case 2:
							newvalue="HeatOn";
							break;
						case 1:
							newvalue="CoolOn";
							break;
						case 0:
							newvalue="Off";
							break;
						default:
							
							break;
						}
						//data_request?id=lu_action&serviceId=urn:upnp-org:serviceId:HVAC_UserOperatingMode1&DeviceNum=86&action=SetModeTarget&NewModeTarget=AutoChangeOver
						me.ondeviceaction(deviceid, "urn:upnp-org:serviceId:HVAC_UserOperatingMode1", "SetModeTarget", "NewModeTarget", newvalue);
						//result=result +" Nouveau mode :" + newvalue;
					}
					
					this.getParent().getParent().hide();
					//if(result!="") Ext.Msg.alert('Modif', result);
					//else Ext.Msg.alert('Modif', "Pas de modif");
				}
			}
			]
			}],
			listeners: {
				hide: function(panel) {
					this.destroy();
				}
			}
		});
		
		popup.down('#fieldset1').down('#status').setValue(status);
		//popup.down('#heatsp').setValue(heatsp);
		//popup.down('#coolsp').setValue(coolsp);
		//popup.down('#automodeeco').setGroupValues(hvacstate);
		if(energymode=="Normal") {
			//popup.down('#automode').setValue(0);
			popup.down('#automodeconf').check();
		} else {
			popup.down('#automodeeco').check();
		}
		
		Ext.Viewport.add(popup);
		popup.show();
	},
	
	stopsynchro: function() {
		if(this.ajaxsynchro) {
			this.dostopsynchro=true;
			Ext.Ajax.abort(this.ajaxsynchro);
		} else console.log("no synchro");
	},
	
	widgetPopup: function(width, height, url) {
		this.stopsynchro();
		var popup=new Ext.Panel({
			modal:true,
			hideOnMaskTap: true,
			baseCls:'transparentmodal',
			//styleHtmlContent: true,
			width: width,
			height: height,
			centered: true,
			border:false,
			//html: '<iframe style="width:' + width + 'px;height:'+ height +'px;background:transparent;" src="'+url+'" frameborder="no" scrolling="no" marginwidth="0" marginheight="0" noresize allowtransparency="true">Your device does not support iframes.</iframe>',
			listeners: {
				hide: function(panel) {
					this.setHtml('');
					this.destroy();
				}
			}
		});
					
		Ext.Viewport.add(popup);
		popup.show();
		popup.setHtml('<iframe style="width:' + width + 'px;height:'+ height +'px;background:transparent;" src="'+url+'" frameborder="no" scrolling="no" marginwidth="0" marginheight="0" noresize allowtransparency="true">Your device does not support iframes.</iframe>');
	},
	
	changeView: function(panel, index) {
		//syntaxe : nom onglet/carousel "id" : tabvue+id, nom vue : vue + id
		var FloorsStore = Ext.getStore('FloorsStore');
		var view = FloorsStore.getById(index);
		if(view) {
			var tabname = "tabvue" + view.get('tab');
			var vuename = "vue" + index;
			if(tabname==panel.id) {
				panel.setActiveItem(Ext.getCmp(vuename));
				return;
			} else {
				var newpanel = Ext.getCmp(tabname);
				if(newpanel) {
					Ext.getCmp('main').setActiveItem(newpanel);
					newpanel.setActiveItem(Ext.getCmp(vuename));
					return;
				}
			}
		}
		Ext.Msg.alert(locale.getSt().misc.error,locale.getSt().misc.noview);
	},
	
	runHtml: function(iddevice, url) {
		var devices = Ext.getStore('devicesStore');
		var device = devices.getById(iddevice);
		device.set('state', -2);
		
		var send_url = './protect/sendhtml.php';
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		Ext.Ajax.request({
			url: send_url,
			headers: syncheader,
			method: 'POST',
			//timeout: 10000,
			scope: this,
			params: {
				url: url
			},
			success: function(response) {
				console.log("Command OK "+response.responseText);
				device.set('state', 0);
			},
			failure: function(response) {
				//console.log("switch error :" + record.get('name'));
				Ext.Msg.alert(locale.getSt().misc.error,locale.getSt().msg.noanswer);
				device.set('state', 0);
			}
		});
	},
	
	showHideMenu: function() {
		var tabbar = Ext.getCmp('main').getTabBar();
		console.log("tap 1");
		if(tabbar.getHidden()) {
			console.log("Show Tabbar");
			tabbar.show();
		} else {
			console.log("Hide Tabbar");
			tabbar.hide();
		}
	},
	
	ondeviceaction: function(iddevice, dservice, daction, dtargetvalue, newstatus, statechange) {
		var devices = Ext.getStore('devicesStore');
		var device = devices.getById(iddevice);
		if(device) {
		//switch status
		console.log("switch : " + device.get('name'));
		if(statechange!="nostate") device.set('state', -2);
		
		//var cat=device.get('category');
		var recordid="";
		if(device.get('type')!='clone') recordid=device.get('id');
		else recordid=device.get('ref');
		var vera_url = './protect/syncvera.php';
		var syncheader = "";
		syncheader = {'Authorization': 'Basic ' + this.loggedUserId};
		var ipvera = this.ipvera;
		Ext.Ajax.request({
			url: vera_url,
			headers: syncheader,
			method: 'GET',
			timeout: 40000,
			scope: this,
			params: {
				id: 'lu_action',
				ipvera: ipvera,
				DeviceNum: recordid,
				serviceId: dservice,
				action: daction,
				newvalue: newstatus,
				targetvalue: dtargetvalue
			},
			success: function(response) {
				if (Ext.Array.contains([2, 3, 8], device.get('category'))) {
					if(statechange!="nostate") device.set('state', -2);
				}
			},
			failure: function(response) {
				console.log("switch error :" + device.get('name'));
				Ext.Msg.alert(locale.getSt().misc.error,'Switch Error');
			}
		});
		} else {
			console.log("Erreur - module non trouvé.");
		}
	},
	updatedevice: function(device, deviceupdate) {
		//Niveau de batterie s'il existe
		device.set('batterylevel', deviceupdate.batterylevel);
		//Le status des Smart Virtual Thermostat - category 105 et des sonos - 109 n'est pas dans status
		if(device.get('category')!=7&&device.get('category')!=105&&device.get('category')!=109&&device.get('category')!=108&&device.get('category')!=111)
		{
			device.set('status', deviceupdate.status);
		}
		if(device.get('category')!=111) device.set('level', deviceupdate.level);
		device.set('watts', deviceupdate.watts);
		device.set('comment', deviceupdate.comment);
		if (deviceupdate.state == null) {
			device.set('state', 0);
		} else {
			device.set('state', deviceupdate.state);
		}
		device.set('tripped', deviceupdate.tripped);
		var armed =deviceupdate.armed;
		if(device.get('category')!=108) device.set('armed', armed);
		
		var category = device.get('category');
		switch (category) {
		case 5: //hvac
			device.set('var1', deviceupdate.temperature);
			device.set('var2', deviceupdate.heatsp);
			device.set('camuser', locale.getSt().unit.temp);//Unité utilisée ex: °C
			break;
		case 6: //camera
			device.set('var1', deviceupdate.ip);
			device.set('var2', deviceupdate.url);
			break;
		case 7: //camera
			device.set('status', deviceupdate.locked);
			break;
		case 16: //humidity sensor
			device.set('var1', deviceupdate.humidity);
			break;
		case 17: //temperature sensor
			device.set('var1', deviceupdate.temperature);
			device.set('var3', locale.getSt().unit.temp);//Unité utilisée ex: °C
			break;
		case 18: //light sensor
			device.set('var1', deviceupdate.light);
			break;
		case 21: //Power Meter : watts (déjà ajouté) + kwh
			device.set('var1', deviceupdate.kwh);
			break;
		case 101: //vswitch
			device.set('var1', deviceupdate.text1);
			device.set('var2', deviceupdate.text2);
			break;
		case 102: //vcontainer
			device.set('var1', deviceupdate.variable1);
			device.set('var2', deviceupdate.variable2);
			device.set('var3', deviceupdate.variable3);
			device.set('var4', deviceupdate.variable4);
			device.set('var5', deviceupdate.variable5);
			break;
		case 103: //gcal
			if(deviceupdate.nextevent) device.set('var1', deviceupdate.nextevent);
			break;
		case 104:
			device.set('var1', locale.getSt().device.pilotwire[deviceupdate.status]);
			break;
		case 105: //Smart Virtual Thermostat
			//Status 5 : non connu, 0 : mode off, 1 : mode CoolOn (Inactif), 2: Mode HeatOn (Forcé), 3: Auto
			switch (deviceupdate.mode) {
			case "AutoChangeOver":
				device.set('status', 3);
				device.set('var6', locale.getSt().device.vtherm["3"]);//status en texte et traduit
				break;
			case "HeatOn":
				device.set('status', 2);
				device.set('var6', locale.getSt().device.vtherm["2"]);
				break;
			case "CoolOn":
				device.set('status', 1);
				device.set('var6', locale.getSt().device.vtherm["1"]);
				break;
			case "Off":
				device.set('status', 0);
				device.set('var6', locale.getSt().device.vtherm["0"]);
				break;
			default:
				device.set('status', 5);
				device.set('var6', "Unknown");
				break;
			}
			device.set('var1', deviceupdate.temperature);
			device.set('var2', deviceupdate.heatsp); //Temp. utilisée en mode Auto. confort
			device.set('var3', deviceupdate.coolsp); //Temp. utilisée en mode Auto. Eco
			device.set('var4', deviceupdate.EnergyMode); //Normal pour le mode Confort et EnergySavingsMode pour Eco
			device.set('var5', deviceupdate.hvacstate); //Heating quand le radiateur est en chauffe et Idle quand il est à l'arrêt
			device.set('camuser', locale.getSt().unit.temp);//Unité utilisée ex: °C
			if(deviceupdate.EnergyMode=="Normal") {
				device.set('campassword', locale.getSt().device.vtherm.normal);//mode auto : Conf ou Eco, traduction de var4
			} else {
				device.set('campassword', locale.getSt().device.vtherm.eco);
			}
			break;
		case 107: //colored vcontainer
			if(!isNaN(parseInt(deviceupdate.variable1))) device.set('status', parseInt(deviceupdate.variable1));
			else device.set('status', "");
			device.set('var1', deviceupdate.variable2);
			break;
		case 108: //Custom Device utilise: var1: variable status, var2: text 1, var3: suffixe 1, var5: text 2, var 6: suffixe 2,
			//var4: commande, graphlink pour l'url du popup, wwidth et height
			//Affectation : status en fonction de var1
			//camuser : contient var2+var3
			//campassword : contient var5+var6
			//sous-catégorie 0 : normal var1=status
			//sous-catégorie 1 : security sensor var1=status|armed
			if(device.get('var1')!=""&&device.get('var1')!= null) {
				if(device.get('subcategory')==1||device.get('subcategory')==2) {
					var commande=device.get('var1').split('|');
					device.set('status', deviceupdate[commande[0]]);
					device.set('armed', deviceupdate[commande[1]]);
				} else {
					device.set('status', deviceupdate[device.get('var1')]);
				}
			} else device.set('status', 0);
			if(device.get('var2')!=""&&device.get('var2')!= null) {
				device.set('camuser', deviceupdate[device.get('var2')] + device.get('var3') );
			} else device.set('camuser', "");
			if(device.get('var5')!=""&&device.get('var5')!= null) {
				device.set('campassword', deviceupdate[device.get('var5')] + device.get('var6') );
			} else device.set('campassword', "");
			
			break;
		case 109: //Sonos plugin status : transportstate, level : volume, armed: mute, var1 : currentstatus
			//var2 : version courte de currentstatus, var3 : currentalbumart
			var status = 3;
			switch (deviceupdate.transportstate) {
			case "PAUSED_PLAYBACK":
				status = 0;
				break;
			case "PLAYING":
				status = 1;
				break;
			case "STOPPED":
				status = 2;
				break;
			default:
				status = 3
				break;
			}
			if(status!=3) {
				device.set('status', status);
			} else {
				device.set('state', -2);
			}
			device.set('level', deviceupdate.volume);
			device.set('armed', deviceupdate.mute);
			device.set('var1', deviceupdate.currentstatus);
			var shorttitle = deviceupdate.currentstatus;
			if(shorttitle.length>10) shorttitle= shorttitle.substring(0,10)+"...";
			device.set('var2', shorttitle);
			device.set('var3', deviceupdate.currentalbumart);
			//device.set('var5', deviceupdate.ip);
			//si le menu de configuration du module est ouvert/existe, il est mis à jour
			var popup=Ext.getCmp('sonos' + deviceupdate.id);
			if(popup) this.updatesonospopup(popup, device);
			break;
		case 111: //Custom Slider
			//wwidth pour la largeur/hauteur si vertical du slider
			//graphlink pour l'increment le min, max et hauteur du thumb. du slider
			//var1 : pour indiquer quel paramètre est repris pour le level
			//var2: n° d'image
			//var3: largeur pour vslider - image
			//var4: la commande de level
			//var5: suffixe
			//color: pour la couleur du texte
			//fontsize
			
			//icon : pour l'icône du tableau de bord
			//pas utilisé : width, height, var6, camuser, campassword
			
			if(device.get('var1')!=""&&device.get('var1')!= null) {
				//if(device.get('subcategory')==0||)
				device.set('level', deviceupdate[device.get('var1')]);
			} else device.set('level', 0);
			
			//if(device.get('var2')!=""&&device.get('var2')!= null) {
			//	device.set('camuser', deviceupdate[device.get('var2')] + device.get('var3') );
			//} else device.set('camuser', "");
			//if(device.get('var5')!=""&&device.get('var5')!= null) {
			//	device.set('campassword', deviceupdate[device.get('var5')] + device.get('var6') );
			//} else device.set('campassword', "");
			
			break;
		case 112: //Battery Monitor
			device.set('var1', deviceupdate.lowdevicelist);
			device.set('var2', deviceupdate.middevicelist);
			device.set('var3', deviceupdate.highdevicelist);
			break;
		case 113: //RGB Controller
			device.set('var1', deviceupdate.color);
			break;
		case 120: //vclock
			device.set('var1', deviceupdate.alarmtime);
			if (deviceupdate.alarmtime != null) {
				var heuredep = new Date("February 5, 2001 " + deviceupdate.alarmtime);
				var duration = deviceupdate.alarmduration;
				heuredep.setTime(heuredep.getTime() + (eval(duration) * 1000));
				var heures = Ext.Date.format(heuredep, 'H:i:s');
				device.set('var2', heures);
			}
			device.set('var3', deviceupdate.next);
			device.set('var4', deviceupdate.text1);
			device.set('var5', deviceupdate.alarmtype);
			device.set('var6', deviceupdate.weekdays);
			break;
		default:
			break;
		}
	}
});
