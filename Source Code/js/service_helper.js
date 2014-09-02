function ServiceHelper() {
	
this.httpRequest = function (request_url, type, data, dataType, succesCallBack, errorCallBack, bool) {
    	var ajaxSettings = {
    			cache: false,
    			url: request_url,
    			type: type,
    			success: function (response) {
                    console.log("resp: " + request_url);
                    succesCallBack(response);
                },  
                headers: {
                    "DEVICETYPE":"MOBILE",
//                    "X_APP_VERSION": APP_CONSTANTS.APP_VERSION,
                    "X-Requested-With":"XMLHttpRequest",
                    contentType: "text/json",
                    Accept: "text/json"
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("error: " + request_url);
                	switch (jqXHR.status) {
	                case 403 : 
	                	if(request_url.indexOf('login') == -1) {
                    		 sessionExpire();
                    	 }
	                	 else {
	                		 errorCallBack(jqXHR, textStatus, errorThrown);
	                	 }
	                	 break;
	                default:
	                	errorCallBack(jqXHR, textStatus, errorThrown);
	                }
                },
                async:bool,
                statusCode : { 
        			200 : function(jqXHR, textStatus, errorThrown) { 
        					console.log("200 : ok");
        					
        			},
        			201: function(jqXHR, textStatus, errorThrown) {
        					console.log("201 : ok");
        					
                     },
                    302: function(jqXHR, textStatus, errorThrown) {
    						console.log("302 : session expire");
                    },
                    303: function(jqXHR, textStatus, errorThrown) { 
						console.log("303 : status code");
						
                    }, 
	                400: function (jqXHR, textStatus, errorThrown) { 
	                     	console.log("400 : status code");
	                     	
	                 },
	                401: function (jqXHR, textStatus, errorThrown) {
	                 		console.log("401 : Invalid username or password");	                 		
	                 		
	                 },
	                403: function (jqXHR, textStatus, errorThrown) {
	                    	 console.log("403 : Too many request.");	 
	                 },
	                415: function (jqXHR, textStatus, errorThrown) {
	                		console.log("415 : unsupported format.");
	                		
	                 },
                     421: function (jqXHR, textStatus, errorThrown) {
                          console.log("421 : sub users are not supported.");
                     },
	                500: function (jqXHR, textStatus, errorThrown) {
	                    	console.log("500 : status code");
	                    	
	                 }
        			
                 } 
    	};
    	 
    	if(data != null) {
    		ajaxSettings["data"] = data;
    	}
    	
    	if(type == JSON_CONSTANTS.POST && (request_url.indexOf('login') == -1) ) {
    		ajaxSettings["dataType"] = dataType;
    		ajaxSettings["contentType"] = JSON_CONSTANTS.CONTENT_TYPE;
//    		ajaxSettings["headers"] = {
//					"DEVICETYPE":"MOBILE",
//					"X-Requested-With":"XMLHttpRequest",
//			        Accept : "text/json"
//        	}
		} 
    	else if(type == JSON_CONSTANTS.PUT) {
			ajaxSettings["contentType"] = JSON_CONSTANTS.CONTENT_TYPE;
			ajaxSettings["headers"] = {
					"DEVICETYPE":"MOBILE",
					"X-Requested-With":"XMLHttpRequest",
			        Accept : JSON_CONSTANTS.ACCEPT
        	}
		}
    	else if(type == JSON_CONSTANTS.DELETE ) {
			ajaxSettings["headers"] = { 
					"DEVICETYPE":"MOBILE",
					"X-Requested-With":"XMLHttpRequest",
					Accept : JSON_CONSTANTS.ACCEPT
			}
		
			ajaxSettings["contentType"] = JSON_CONSTANTS.CONTENT_TYPE; 
			ajaxSettings["dataType"] = JSON_CONSTANTS.DATA_TYPE;
		}
    	$.ajax(ajaxSettings);

    }

	this.allDomains = function(type, data, successCallBack, failedCallBack) {
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.API_DOMAIN;
		this.httpRequest(url, type, data, null, successCallBack, failedCallBack, true);
	}
	
	this.domainData = function(domainId, type, data, successCallBack, failedCallBack) {
	    var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.API_DOMAIN + "/" + domainId;
		this.httpRequest(url, type, data, null, successCallBack, failedCallBack, true);	    
	}

	/*this.domainRecordsData = function(domainId, data, successCallBack, failedCallBack) {
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.API_DOMAIN + "/" + domainId + "/" + APP_CONSTANTS.API_RECORDS;
		this.httpRequest(url, JSON_CONSTANTS.GET, data, null, successCallBack, failedCallBack, true);
	}
	*/
	
	this.domainRecordsData = function(domainId, data, successCallBack, failedCallBack) {
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.API_DOMAIN + "/" + domainId + "/" + APP_CONSTANTS.API_RECORDS+"?withUserChangesApplied=true";
		this.httpRequest(url, JSON_CONSTANTS.GET, data, null, successCallBack, failedCallBack, true);
	}
	
	this.poolsData = function(type, poolType, data, successCallBack, failedCallBack) {
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.API_POOL + "/" + poolType;
		this.httpRequest(url, type, data, null, successCallBack, failedCallBack, true);
	}
	
	this.vanityNameserverData = function(type, data, successCallBack, failedCallBack) {
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.API_VANITY;
		this.httpRequest(url, type, data, null, successCallBack, failedCallBack, true);
	}
	
	this.templateData = function(type, data, successCallBack, failedCallBack) {
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.API_TEMPLATE;
		this.httpRequest(url, type, data, null, successCallBack, failedCallBack, true);
	}	

	this.templateRecordsData = function(templateId, data, successCallBack, failedCallBack) {
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.API_TEMPLATE + "/" + templateId + "/" + APP_CONSTANTS.API_RECORDS;
		this.httpRequest(url, JSON_CONSTANTS.GET, data, null, successCallBack, failedCallBack, true);
	}
	
	this.editDeleteTemplateData = function(type, data, templateId, successCallBack, failedCallBack) {
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.API_TEMPLATE + "/" + templateId;
		this.httpRequest(url, type, data, null, successCallBack, failedCallBack, true);
	}
	
	this.getCountries = function(successCallBack, failedCallBack) {
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.API_COUNTRIES;
		this.httpRequest(url, JSON_CONSTANTS.GET, null, null, successCallBack, failedCallBack, true);
	}
	
	this.getStates = function(countryId, successCallBack, failedCallBack) {
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.API_STATES + countryId;
		this.httpRequest(url, JSON_CONSTANTS.GET, null, null, successCallBack, failedCallBack, true);
	}
	
	this.getCities = function(stateId, successCallBack, failedCallBack) {
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.API_CITIES + stateId;
		this.httpRequest(url, JSON_CONSTANTS.GET, null, null, successCallBack, failedCallBack, true);
	}
	
	this.geoProximityData = function(type, data, successCallBack, failedCallBack) {
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.API_GEO_PROXIMITY;		
		this.httpRequest(url, type, data, null, successCallBack, failedCallBack, true);
	}
	
	this.editGeoProximity = function(geoProximityId, data, successCallBack, failedCallBack) {
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.API_GEO_PROXIMITY + "/" + geoProximityId;		
		this.httpRequest(url, JSON_CONSTANTS.PUT, data, null, successCallBack, failedCallBack, true);
	}
	this.editDeleteDomainRecords = function(type, domainID, successCallBack, failedCallBack) {
		var url = APP_CONSTANTS.BASE_URL + APP_CONSTANTS.API_DOMAIN + "/" + domainID + "/" + APP_CONSTANTS.API_ALL_RECORDS;
		this.httpRequest(url, type, null, null, successCallBack, failedCallBack, true);
	}
}
