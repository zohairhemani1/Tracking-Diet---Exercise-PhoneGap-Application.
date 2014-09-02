var app = {
	mobile_init : false,

    isAndroid: function(){
        return navigator.userAgent.indexOf("Android") > 0;
    },
    
    isiOS: function (){
        return ( navigator.userAgent.indexOf("iPhone") > 0 || navigator.userAgent.indexOf("iPad") > 0 || navigator.userAgent.indexOf("iPod") > 0); 
    },
	
    isWindowsPhone: function () {
        return navigator.userAgent.indexOf("Windows Phone") > 0;
    },

    onDeviceReady: function() {
        if (window.device.platform === 'iOS' && parseFloat(window.device.version) === 7.0)
            StatusBar.overlaysWebView(false);

        document.addEventListener("backbutton", onBackKeyDown, false);
        app.onMobileInit();		
        app.checkConnection();
		//console.log(" Field LOG: " + $('[field=asd]').html());
		
    },
	
    checkConnection: function () {
        var networkState;
        var states = {};

        networkState = navigator.network.connection.type;

        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
        
        if((states[networkState] == 'No network connection') || (states[networkState] == 'Unknown connection')) {
        	alert("Your phone’s web connection is not working. Please check and then login.");
        }
        
    },

    onMobileInit: function () {
        this.mobile_init = true;
        $.extend($.mobile.zoom, { locked: true, enabled: false });
        $.extend($.mobile, { loadingMessageTextVisible : true });
    	this.initializeApp();
    },

    initializeApp: function() {
        if (this.mobile_init) {
    		startApp();
    	}
    }
};