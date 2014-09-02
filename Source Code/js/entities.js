function record(id, name, ip, ttl, source, dataType, geoIpFilter, geoIpProximity) {
    this.id = id;
    this.name = name;
    this.ip = ip;
    this.ttl = ttl;
    this.source = source;
    this.dataType = dataType;
    this.geoIpFilter = geoIpFilter;
    this.geoIpProximity = geoIpProximity;
}

function CName(id, name, host, ttl, source, dataType, geoIpFilter, geoIpProximity) {
	this.id = id;
    this.name = name;
    this.host = host;
    this.ttl = ttl;
    this.source = source;
    this.dataType = dataType;
    this.geoIpFilter = geoIpFilter;
    this.geoIpProximity = geoIpProximity;
}

function allRecords(id, name, value, ttl, source) {
	this.id = id;
    this.name = name;
    this.value = value;
    this.ttl = ttl;
    this.source = source;
}

function MX(id,name,ttl,value,level,source) {
    this.id = id;
    this.name = name;
    this.ttl = ttl;
    this.server = value;
    this.level = level;
    this.source = source;
}

function SRV(id,name,ttl,value,priority,weight,port,source) {
    this.id = id;
    this.name = name;
    this.ttl = ttl;
    this.host = value;
    this.priority = priority;
    this.weight = weight;
    this.port = port;
    this.source = source;
}

function pool(id, name, numReturn, minFailover, value, weight) {
	this.id = id;
	this.name = name;
	this.numReturn  = numReturn;
	this.minFailover = minFailover;
	this.value = value;
	this.weight = weight;
}

function geoIpFilter(id, name, ipContinents, ipv4, ipv6) {
	this.id = id;
	this.name = name;
	this.ipContinents = ipContinents;
	this.ipv4 = ipv4;
	this.ipv6 = ipv6;
}

function geoIpProximity(id, name, region, city, country, latitude, longitude) {
	this.id = id;
	this.name = name;
	this.region = region;
	this.city = city;
	this.country = country;
	this.latitude = latitude;
	this.longitude = longitude;
}

function vanityNS(id, name, isPublic, isDefault, nameservers, nameserverGroup) {
	this.id = id;
	this.name = name;
	this.isPublic = isPublic;
	this.isDefault = isDefault;
	this.nameservers = nameservers;
	this.nameserverGroup = nameserverGroup;
}