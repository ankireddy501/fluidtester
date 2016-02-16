

chrome.webRequest.onBeforeSendHeaders.addListener(
	
	function(details){
		headers = details.requestHeaders;
		var id = localStorage.getItem("tabId");
		var os = localStorage.getItem("OS");
		if (id == JSON.stringify(details.tabId)){
			for(var i = 0; l = headers.length; ++i) {
				if( headers[i].name === 'User-Agent' ) {
					if(os == "iphone-6" || os == "iphone-5s" || os == "iphone6-plus"){
						headers[i].value = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25"; 
					}
					else if (os == "ipad-2" || os == "ipad-air2"){
						headers[i].value = "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25"; 
					}
					else{
					headers[i].value = "Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36"; 
					}
					break;
				}
			}
		}
	
	return {requestHeaders: headers};
}, 
{urls: ["<all_urls>"]},
["blocking","requestHeaders"]);