(function(){
	var w=window,
	d=document,
	_phy=function(reference){
		switch(typeof reference) {
			case 'string':
				if(reference.match(/\#[a-zA-Z0-9-_]$/)) return d.getElementById(reference);
				else return d.getElementsByTagName(reference);
				break;
		}
	},
	_$=w.$;
	_phy.console=function(_){
		try{
			if('console' in w&&'log' in w.console)w.console.log(_);
		}catch(e){
			if($('#phy_console')) {
				$('#phy_console').innerHTML += '<li>Console: '+_+'</li>';
			}
		}
	};
	_phy.namespace=function(n){
		if(typeof n==='string'){
			w.$=_$;
			w[n]=_phy;
			return _phy;
		}
		else {
			for(var i in w) if(w[i]===_phy) return i;
			return false;
		}
	}
	var z=navigator.userAgent.toLowerCase();
	_phy.browser={
		CHROME:z.indexOf('chrome')>-1,
		FIREFOX:z.indexOf('firefox')>-1,
		OPERA:w.opera?true:false,
		IE:'msie'
	};
	_phy.ajax=function(_){
		var a=_phy.ajax._call();
		if(a==null){
			_phy.console('Your browser does not support AJAX!');
			throw new Exception('Your browse does not support AJAX!');
		}
		if(typeof _!=='object')_={};
		var v={};
		for(var i in _phy.ajax._){
			if(_[i])v[i]=_[i];else v[i]=_phy.ajax._[i];
		}
		if(typeof v.start!=='undefined')v['start']();
		if(v.url.match('\\?')) {
			var u=v.url.split('\\?');
			v.url=u[0];
			u=u[1];
		}
		else {
			var u=_phy.qs.toString(v.parameters);
		}
		if(u.length)u+='&';
		u+='_ajax=1';
		var m=_phy.ajax._.method;
		if(_phy.array.contains(v.method.toLowerCase(),phy.ajax._methods))m=v.method;
		a.onreadystatechange=function(){
			if(a.readyState==4){
				var h=a.getAllResponseHeaders(),
				r;
				if(h.match('application/json')||h.match('text/xml'))r=_phy.json.parse(a.responseText);
				else if(h.match('application/xml')||h.match('text/xml'))r=a.responseXML;
				else r=a.responseText;
				if((a.status>=200&&a.status<300)||a.status==1223){
					v['success'](r,a);
				}
				else{
					v['error'](r,a);
				}
				v['complete'](r,a);
			}
		};
		if(m==='GET') {
			a.open(m,v.url+(u?'?'+u:''),true);
			a.send(null);
		}
		else {
			a.open(m,v.url,true);
			a.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			a.setRequestHeader('Content-length',u.length);
			a.setRequestHeader('Connection','close');
			a.send(u);
		}
	};
	_phy.ajax._={
		method:'GET',
		url:'/rest.php',
		parameters:{},
		success:_phy.console,
		error:_phy.console,
		complete:_phy.console
	};
	_phy.ajax._call=function(){
		var a=null;
		try{
			a=new XMLHttpRequest();
		}catch(e){
			try{
				a=new ActiveXObject('Msxml2.XMLHTTP');
			}catch(e){
				a=new ActiveXObject('Microsoft.XMLHTTP');
			}
		}
		return a;
	};
	_phy.ajax._methods=['delete','get','put','post'];
	_phy.array=function(s){
		return typeof s==='array';
	};
	_phy.array.contains=function(n,h){
		switch(typeof h) {
			case 'array':
				for(var i=0,c=h.length;i<c;++i)if(n==h[i])return true;
			break;
			case 'object':
				for(var i in h)if(n==h[i])return true;
			break;
			default:
				return false;
		}
	}
	_phy.array.extend=function(array_1,array_2){
		if(typeof array_2!=='array')return array_1;
		else if(typeof array_1!=='array')return array_2;
		for(var i=1,c=arguments.length;i<c;++i){
			if(typeof arguments[i]==='array'){
				var h=arguments[i];
				for(var j=0,d=h.length;j<d;++j)array_1.push(h[j]);
			}
		}
		return array_1;
	};
	_phy.json=function(){};
	_phy.json.parse=function(s){
		return JSON.parse(s);
	};
	_phy.json.toJSON=function(s){
		return JSON.stringify(s);
	};
	_phy.object=function(s){
		return typeof c==='object';
	};
	_phy.object.extend=function(object_1,object_2){
		if(typeof object_2!=='object')return object_1;
		else if(typeof object_1!=='object')return object_2;
		for(var i=1,c=arguments.length;i<c;++i){
			if(typeof arguments[i]==='object'){
				for(var j in arguments[i]){
					object_1[j] = arguments[i][j];
				}
			}
		}
		return object_1;
	};
	(function(){
		var _r={};
		var e;
		_phy.resource=function(){};
		_phy.resource.push=function(r){
			if(!_r[r]){
				if(r.match('.css')){
					e=d.createElement('link');
					e.rel='stylesheet';
					e.type='text/css';
					e.href=f;
				}
				else{
					e=d.createElement('script');
					e.src=f;
					e.type='text/javascript';
				}	
				id='phy_res'+(Math.floor(Math.random()*1000001));
				e.id=id;
				_r[r]=id;
				$('head')[0].appendChild(_r[r]);
			}
		};
		_phy.resource.pop=function(r){
			if(this._pointers[r]){
				$('head')[0].removeChild($(_r[r]));
				_r[r]=false;
			}
		};
	})();
	_phy.qs=function(){};
	_phy.qs.toString=function(v){
		var p;
		switch(typeof v.parameters){
			case 'object':
				var p=[];
				for(var parameter in v.parameters){
					p.push(escape(parameter)+'='+escape(v.parameters[parameter]));
				}
				break;
			case 'string':
				p=[v];
				break;
			default:
				p=[];
				break;
		}
		return p.join('&');
	};
	_phy.qs.toObject=function(p){
		if(typeof p!=='string') { return {}; }
		p = p.split('&');
		var r = {};
		var k = [];
		for(var i=0,count=p.length;i<count;++i) {
			k = p[i].split('=');
			r[k[0]] = k[1];
		}
		return r;
	};
	w.$=w.phy=_phy;
})();