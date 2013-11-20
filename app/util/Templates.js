Ext.define('myvera.util.Templates', {
    alias : 'widget.Templates',
    singleton : true,
    config: {
//avant tplplan: <tpl if="etage==... puis <div style="top:<tpl if="etage=='+floor.get('id')+'">{top}px; left:{left}px;
//Se décompose ensuite : tplplan + tplpanwebview + tplpanfin ou tplplan + tplpanwebviewmove + tplpanfin
tplplan: '<tpl if="category==1000&&subcategory!=1">'+
		 '" class="scene">'+
		 	'<div class="devicon">'+
				'<img class="deviceImage" src="./resources/images/d'+
					'<tpl if="icon!=null">{icon}<tpl else>1000</tpl>_0{retina}.<tpl if="imgformat==1">jpg<tpl else>png</tpl>" draggable="false" />'+
				'<img class="<tpl if="state==-2">djaune2<tpl elseif="state==-3">djaune2<tpl else>indic2</tpl>"'+
					' src="./resources/images/indic/vide.png" draggable="false" />'+
			'</div><div class="txtscene">'+
		 		'<span class="scenemiddle"<tpl if="color!=null> style="color:#{color};"</tpl> >{name}</span><div>'+
		 '</div>',
//Affichage des webviews dans une iframe
tplpanwebview:	'<tpl elseif="category==1001&&subcategory==0">'+
	' z-index:6;width:{wwidth}px;height:{height}px;" class="x-img x-floating">'+
	'<iframe style="width:{wwidth}px;height:{height}px;" src="{graphlink}" frameborder="no" scrolling="no" marginwidth="0" marginheight="0" noresize >Your device does not support iframes.</iframe></div>',
//Pour ne pas afficher l'iframe lors du drag and drop ou mettre un carré pour le slider (catégorie 111)
tplpanwebviewmove: '<tpl elseif="category==1001&&subcategory==0">'+
		' z-index:5;width:{wwidth}px;height:{height}px; background-color:rgba(137,224,156,0.6);" class="x-img x-floating">{name}</div>'+
	'<tpl elseif="category==111">'+
			' z-index:5;'+
				'<tpl if="subcategory==0">padding-left:28px;padding-top:15px;'+
				'<tpl elseif="subcategory==1">padding-left:28px;padding-top:15px;'+
				'<tpl elseif="subcategory==2">padding-left:20px;padding-top:30px;'+
				'<tpl elseif="subcategory==3">padding-left:18px;padding-top:18px;</tpl>'+
				'" class="x-img x-floating"><div style=\'background-color:rgba(137,224,156,0.6);'+
				'<tpl if="subcategory==1">width:30px;height:{wwidth}px;'+
				'<tpl elseif="subcategory==2">width:{wwidth}px;height:{wwidth}px;'+
				'<tpl elseif="subcategory==3">width:{var3}px;height:{wwidth}px;'+
				'<tpl else>width:{wwidth}px;height:30px;</tpl>\'>S</div></div>'+
	'<tpl elseif="(category==108&&subcategory==3)||(category==108&&subcategory==4)">'+
			' z-index:5;> </div>',

tplpanfin: '<tpl else><tpl if="!(category==108&&subcategory==3)&&!(category==108&&subcategory==4)"> z-index: 6;</tpl>" class="x-img x-floating">'+
	'<img draggable="false" <tpl if="retina==\'@2x\'">width="{width}px"</tpl>src="'+
	'<tpl if="(category==108&&subcategory==3&&status!=0)||(category==108&&subcategory==4&&status!=1)">'+
		'./resources/images/indic/vide.png'+
	'<tpl else>./resources/images/d'+
	    '<tpl if="category==2||category==3||category==4||category==7||category==8||category==101||category==103||category==106||category==120">'+
	    	'<tpl if="icon!=null">{icon}<tpl elseif="category==4&&(subcategory==4||subcategory==1)">4{subcategory}<tpl else>{category}</tpl>_<tpl if="category==4||category==103||category==120">{tripped}<tpl else>{status}</tpl>'+
	    '<tpl elseif="category==5&&subcategory==2">'+
	    	'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_<tpl if="state==2">2<tpl elseif="state==4">4<tpl else>0</tpl>'+
	    '<tpl elseif="category==6||category==16||category==17||category==18||category==21||category==102||category==1000">'+
		'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_0'+
	    '<tpl elseif="category==104">'+
	    	'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_{status}'+
	    '<tpl elseif="category==105">'+
	    	'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl><tpl if="var5!=\'Heating\'">_0<tpl else>_1</tpl>'+
	    '<tpl elseif="category==107">'+
	    	'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_{status}'+
	    '<tpl elseif="category==108">'+
	    	'<tpl if="icon!=null">{icon}<tpl elseif="subcategory==1||subcategory==2">110<tpl else>{category}</tpl>_{status}'+
		'<tpl if="subcategory==1||subcategory==2"><tpl if="armed!=null">{armed}<tpl else>1</tpl></tpl>'+
	    '<tpl elseif="category==109">'+
	    	'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl><tpl if="var1!=\'\'">_{status}</tpl>'+
	    '<tpl elseif="category==112">'+
	    	'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_<tpl if="status!=3">{status}</tpl>'+
	    '<tpl elseif="category==1001&&subcategory!=0">'+
	    	'<tpl if="icon!=null">{icon}<tpl else>{category}{subcategory}</tpl>_0'+
	    '<tpl else>0_0</tpl>{retina}.<tpl if="imgformat==1">jpg<tpl else>png</tpl>'+
	'</tpl>" />'+
	    
	    
	    '<tpl if="category==16&&var1!=null"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >{var1} %</div>'+
	    '<tpl elseif="category==17&&var1!=null"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >{var1} {var3}</div>'+
	    '<tpl elseif="category==18&&var1!=null"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >{var1} %</div>'+
	    '<tpl elseif="category==21&&(watts!=null||var1!=null)"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' ><tpl if="watts!=null">{watts} W<br/></tpl><tpl if="var1!=null">{var1} kwh</tpl></div>'+
	    '<tpl elseif="(category==2||category==8)&&level!=null&&watts!=null"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >{level} %<br/>{watts} W</div>'+
	    '<tpl elseif="(category==2||category==8)&&level!=null"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >{level} %</div>'+
	    '<tpl elseif="category==3&&watts!=null"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >{watts} W</div>'+
	    '<tpl elseif="category==120&&var1!=null"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >{var1}<tpl if="subcategory==1&&var2!=null"><br/>{var2}</tpl></div>'+
	    '<tpl elseif="category==101||category==102"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >'+
	    	'<tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl><tpl if="var2!=null"><br/>{var2}</tpl></div>'+
	    '<tpl elseif="category==107&&var1!=null"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >'+
	    '{var1}</div>'+
	    '<tpl elseif="category==108">'+
	    	'<tpl if="camuser!=null||campassword!=null"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >'+
	    	'<tpl if="camuser!=null">{camuser}<br/></tpl><tpl if="campassword!=null">{campassword}</tpl></div></tpl>'+	    	
	    '<tpl elseif="category==109">'+
		'<div class="dbadge" style="font-size:{fontsize}; position: absolute; left:4px; top:-2px;" >{level}</div>'+
		'<tpl if="armed==1"><img style="position:absolute; left:0px; top:8px; height: 16px;" src="./resources/images/plugin/dnosound{retina}.png" draggable="false" /></tpl>'+
	    	'<div class="texticon" style=\'font-size:{fontsize}; <tpl if="color!=null"> color:#{color};</tpl>\' >'+
	    	'<tpl if="status==1">{var2}</tpl></div>'+
	    '<tpl elseif="category==104"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >'+
	    	'{var1}</div>'+
	    '<tpl elseif="category==5&&subcategory==2">'+
	    	'<tpl if="var1!=\'\'&&var1!=null"><div class="texticon" style=\'width:{width}px; font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >'+
	    	'{var2}{camuser}</div></tpl>'+
		'<div class="texthvac" style=\'font-size:{fontsize}; width:{width}px;'+
		'color:#<tpl if="color!=null">{color}<tpl else>000000</tpl>;"\' > '+
		'<tpl if="var1!=\'\'&&var1!=null">{var1}<tpl else>{var2}</tpl>{camuser}</div>'+
	    
	    '<tpl elseif="category==105"><div class="texticon" style=\'font-size:{fontsize};<tpl if="color!=null"> color:#{color};</tpl>\' >'+
	    	'<tpl if="status==3">{var6} {campassword}<br/><tpl if="var4==\'Normal\'">{var2}<tpl else>{var3}</tpl>{camuser}'+
		'<tpl else>{var6}<br/>&nbsp;</tpl></div>'+
		'<div style=\'font-weight:bold; text-shadow: 0 0 5px white; font-size:{fontsize}; position: absolute; color:#009ade; width:50px; text-align:center; top: 25%;"\' > {var1}{camuser} </div>'+
	    '</tpl>'+
	    
	    '<tpl if="state==-2"><img class="djaune" src="./resources/images/indic/vide.png" draggable="false" />'+
	    '<tpl elseif="state==-3"><img class="djaune" src="./resources/images/indic/vide.png" draggable="false" />'+
	    '<tpl elseif="state==2&&category!=5"><img class="dalert" src="./resources/images/indic/vide.png" draggable="false" />'+
	    '<tpl elseif="(category==4||category==103)&&armed!=null"><img class="indic" src="./resources/images/indic/darm{armed}{retina}.png" draggable="false" />'+
	    '<tpl elseif="category==120"><tpl if="armed==1&&var3==\'off\'"><img class="indic" src="./resources/images/indic/doff{retina}.png" draggable="false" />'+
	    	'<tpl elseif="armed==0&&var3==\'off\'"><img class="indic" src="./resources/images/indic/darmoff{retina}.png" draggable="false" /><tpl elseif="armed==0&&var3==\'on\'"><img class="indic" src="./resources/images/indic/darm0{retina}.png" draggable="false" /></tpl>'+
	    '</tpl>'+
	    
	    
	'</div></tpl>',
	
tpllist: "",
tplphone: "",
tpllistfull: "",
tplphonefull: "",
	
tpllisticon:'<div class="devicon">'+
			'<img class="deviceImage" src="./resources/images/l'+
				'<tpl if="category==2||category==3||category==4||category==7||category==8||category==101||category==103||category==106||category==120">'+
					'<tpl if="icon != null">{icon}<tpl elseif="category==4&&(subcategory==4||subcategory==1)">4{subcategory}'+
					'<tpl elseif="category==120&&subcategory==1">121<tpl elseif="category==120&&subcategory==2">122'+
					'<tpl else>{category}</tpl>'+
					'_<tpl if="category==4||category==103||category==120">{tripped}<tpl else>{status}</tpl>'+
				'<tpl elseif="category==5&&subcategory==2">'+
					'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_<tpl if="state==2">2<tpl elseif="state==4">4<tpl else>0</tpl>'+
				'<tpl elseif="category==6||category==16||category==17||category==18||category==21||category==102||category==104||category==1000">'+
					'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_0'+
				'<tpl elseif="category==105">'+
					'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl><tpl if="var5!=\'Heating\'">_0<tpl else>_1</tpl>'+
				'<tpl elseif="category==107">'+
					'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_{status}'+
				'<tpl elseif="category==108">'+
					'<tpl if="icon!=null">{icon}<tpl elseif="subcategory==1||subcategory==2">110<tpl else>{category}</tpl>_{status}'+
				'<tpl elseif="category==109">'+
					'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl><tpl if="var1!=\'\'">_{status}</tpl>'+
				'<tpl elseif="category==111">'+
					'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_0'+
				'<tpl elseif="category==112">'+
					'<tpl if="icon!=null">{icon}<tpl else>{category}</tpl>_<tpl if="status!=3">{status}</tpl>'+
				'<tpl elseif="category==1001">'+
					'<tpl if="icon!=null">{icon}<tpl else>{category}{subcategory}</tpl>_0'+
	   			'<tpl else>0_0</tpl>{retina}.png" />'+
	   			'<img class="<tpl if="state==-2">djaune2<tpl elseif="state==-3">djaune2<tpl elseif="state==2&&category!=5">dalert2<tpl else>indic2</tpl>"'+
	   				'src="./resources/images/indic/vide.png">'+
			'</div>',
			
tplfooter: '<div class="footer"><tpl if="watts != null&&category!=3&&category!=21"><span class="wattfooter">{watts} W</span>'+
		'<tpl elseif="category==104"><span class="wattfooter">{var1}</span>'+
		'</tpl>' +
		'<tpl if="comment!=\'\'&&comment!=null">{comment}<tpl else>&nbsp;</tpl>' + '</div>',

tplcontenu: 		'<tpl if="category==4&&armed!= null"><div class="floatleft">'+
					'<img class="armed" src="./resources/images/indic/arm{armed}{retina}.png" /> '+
					'</div>'+
			'<tpl elseif="category==5&&subcategory==2">'+
				'<div class="vargros"><tpl if="var1!=\'\'&&var1!=null">{var1}{camuser}</tpl></div><div class="varcenter">'+
				'{var2}{camuser}</div>'+
			'<tpl elseif="category==16"><div class="vargros"><tpl if="var1==null">&nbsp;<tpl else>{var1} %</tpl></div>'+
			'<tpl elseif="category==17"><div class="vargros"><tpl if="var1==null">&nbsp;<tpl else>{var1} {var3}</tpl></div>'+
			'<tpl elseif="category==18"><div class="vargros"><tpl if="var1==null">&nbsp;<tpl else>{var1} %</tpl></div>'+
			'<tpl elseif="category==3"><div class="vargros"><tpl if="watts==null">&nbsp;<tpl else>{watts} W</tpl></div>'+
			'<tpl elseif="category==21"><div class="vargros"><tpl if="watts==null">&nbsp;<tpl else>{watts} W</tpl><br /><tpl if="var1!=null">{var1} kwh</tpl></div>'+
			'<tpl elseif="category==101"><div class="var"><tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl><br /><tpl if="var2==null">&nbsp;<tpl else>{var2}</tpl></div>'+
			'<tpl elseif="category==102"><div class="var"><tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl><br /><tpl if="var2==null">&nbsp;<tpl else>{var2}</tpl><br /><tpl if="var3==null">&nbsp;<tpl else>{var3}</tpl><br /><tpl if="var4==null">&nbsp;<tpl else>{var4}</tpl> <tpl if="var5==null">&nbsp;<tpl else>{var5}</tpl></div>'+
			'<tpl elseif="category==103"><div class="floatleft"><div class="longvar"><tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl></div>'+
					'<tpl if="armed!= null"><div class="clock2"><img class="armed2" src="./resources/images/indic/arm{armed}{retina}.png" /></div></tpl></div>'+
			'<tpl elseif="category==104">'+
				'<div class="floatleft">'+
					'<img class="i0" src="./resources/images/plugin/pw0_<tpl if="status==0">1<tpl else>0</tpl>{retina}.png" />'+
					'&nbsp;&nbsp;&nbsp;<img class="i1" src="./resources/images/plugin/pw1_<tpl if="status==1">1<tpl else>0</tpl>{retina}.png" />'+
					'&nbsp;&nbsp;&nbsp;<img class="i2" src="./resources/images/plugin/pw2_<tpl if="status==2">1<tpl else>0</tpl>{retina}.png" />'+
					'&nbsp;&nbsp;&nbsp;<img class="i3" src="./resources/images/plugin/pw3_<tpl if="status==3">1<tpl else>0</tpl>{retina}.png" />'+
				'</div>'+
			'<tpl elseif="category==105">'+
				'<div class="vargros">{var1}{camuser}</div><div class="varcenter">'+
				'<tpl if="status==3">{var6} {campassword}<br/><tpl if="var4==\'Normal\'">{var2}<tpl else>{var3}</tpl>{camuser}'+
				'<tpl else>{var6}</tpl></div>'+
			'<tpl elseif="category==107"><div class="var"><tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl></div>'+
			'<tpl elseif="category==108">'+
				'<div class="floatleft">'+
					'<div class="longvar"><tpl if="camuser==null">&nbsp;<tpl else>{camuser}</tpl>'+
						'<tpl if="campassword!=null"></br>{campassword}</tpl></div>'+
					'<tpl if="(subcategory==1||subcategory==2)&&armed!= null">'+
						'<div class="clock2"><img class="armed2" src="./resources/images/indic/arm{armed}{retina}.png" /></div></tpl>'+
				'</div>'+
			'<tpl elseif="category==109">'+
				'<div class="floatleft">'+
					'<img class="i4" src="./resources/images/plugin/lnosound<tpl if="armed==1">1<tpl else>0</tpl>{retina}.png" />'+
					'<div style="font-size:10px; vertical-align:middle; display:inline-block; height:12px; padding-bottom:10px; margin-bottom:10px; margin-top:-12px;">&nbsp;&nbsp;&nbsp;{level}%</div>'+
					'<div class="varlong">{var1}</div>'+
				'</div>'+
			'<tpl elseif="category==111">'+
				'<div class="vargros">{level}<tpl if="var5!=null>{var5}</tpl></div>'+
			'<tpl elseif="category==120"><div class="floatleft">'+
					'<div class="clock1"><tpl if="var1==null">&nbsp;<tpl else>{var1}</tpl><br /><tpl if="var2==null||subcategory!=1">&nbsp;<tpl else>{var2}</tpl></div>'+
					'<tpl if="armed!= null"><div class="clock2"><img class="armed2" src="./resources/images/indic/arm{armed}{retina}.png" /></div></tpl>'+
					'<div class="clock3"><tpl if="var3==null">&nbsp;<tpl else><img width="42px" class="clocknext" src="./resources/images/indic/{var3}{retina}.png" /></tpl></div>'+
					'</div>'+
			'<tpl elseif="category==2||category==8"><div>'+
				'<div class="floatleft">'+
					'<div class="devicelevel1">'+
						'<div class="lpourcent"><tpl if="level != null">{level} %<tpl else> </tpl></div>'+
						'<img class="d25" src="./resources/images/indic/25<tpl if="level&gt;=25">on<tpl if="category==2">j</tpl></tpl>{retina}.png" />'+
						'<img class="d50" src="./resources/images/indic/50<tpl if="level&gt;=50">on<tpl if="category==2">j</tpl></tpl>{retina}.png" />'+
					'</div>'+
					'<div class="devicelevel2">'+
						'<img class="d75" src="./resources/images/indic/75<tpl if="level&gt;=75">on<tpl if="category==2">j</tpl></tpl>{retina}.png" />'+
						'<img class="d100" src="./resources/images/indic/100<tpl if="level==100">on<tpl if="category==2">j</tpl></tpl>{retina}.png" />'+
					'</div>'+
				'</div>'+
			'</tpl>',

tplliston: '<tpl if="onboard&&type!=\'clone\'&&(verif!=\'off\'&&verif!=\'no\')&&('+
	'((category==4||category==103||category==120)&&tripped==1)||'+
	'(category!=4&&category!=106&&category!=112&&category!=7&&category!=1001&&status==1)||'+
	'(category==7&&status==0)||'+
	'((category==104||category==105||category==5)&&(status==2||status==3)))">',
tpllistoff: '<tpl if="onboard&&type!=\'clone\'&&((verif==\'off\'&&('+
	'((category==4||category==103||category==120)&&tripped==0)||'+
	'(category!=4&&category!=103&&category!=112&&category!=120&&category!=7&&category!=1001&&status==0)||'+
	'(category==7&&status==1)))||'+
	'(verif!=\'no\'&&(category==4||category==103||category==120)&&armed==0))">'
    },
    
    constructor: function(config) {
        this.initConfig(config);
        this.callParent([config]);
    },
    applyTplphone: function() {
	    var result = '<div class="listdevice">' +this.config.tpllisticon +
	    '<div class="listdevicename">{name}</div>'+this.config.tplcontenu+
	    this.config.tplfooter + '</div>';
	    return result;    },
    applyTpllist: function() {
	    var result = '<div class="devicecadre"><div class="devtitle">{name}</div>'+
		'<div class="devmain">'+ this.config.tpllisticon + '<div class="contenu">'+ this.config.tplcontenu + '</div></div>' +
		this.config.tplfooter + '</div>';
	    return result;
     },
     
     applyTpllistfull: function() {
	    var result = '<div class="devtitle">{name}</div>'+
		'<div class="devmain">'+ this.config.tpllisticon + '<div class="contenu">'+ this.config.tplcontenu + '</div></div>' +
		this.config.tplfooter;
	    return result;
     },
     
     applyTplphonefull: function() {
	    var result = this.config.tpllisticon +
	    '<div class="listdevicename">{name}</div>'+this.config.tplcontenu+
	    this.config.tplfooter;
	    return result;
     }
});