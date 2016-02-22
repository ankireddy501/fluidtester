	var REG_EX = /^(http:\/\/www\.|http:\/\/m\.|https:\/\/www\.|http:\/\/[a-zA-Z0-9]|https:\/\/[a-zA-Z0-9])[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
	var width = $(window).width();
	$(document).ready(function(){
	  $('#main-sidebar').simplerSidebar({
			opener: '#toggle-sidebar',
			top: 116,
			mask: false, 
			animation: {
				easing: "easeOutQuint"
			},
			sidebar: {
				align: 'left',
				closingLinks: '.close-sb'
			}
		});
		
		chrome.tabs.query({
		currentWindow: true, active:true},
			function(tabArray){
				var tabId = JSON.stringify(tabArray[0].id);
				localStorage.setItem("tabId", tabId);
		});
	
		$("#txt").keypress(function(e){
			var key=e.which;
			if (key == 13)
			{
				renderDevice();
			}
		});
		
		$(".input-group-btn").click(function(){
			renderDevice();
		});
		
		$("#txt").on("paste", function(){
			setTimeout(function(){
				renderDevice();
			});
		});
		
		$("#sel").change(function(){
			$("#rotate").removeAttr("style");
			$("#display").removeAttr("style");
			var link=$("#txt").val();
			localStorage.setItem("OS", $(this).val());
			
			if (!link == null) 
			{
				$("#phone").removeClass();
				$("#phone").addClass($(this).val());
				$("#display").prop("src",link);
				
				alignment();
			}
			else 
			{
				$("#phone").removeClass();
				$("#phone").addClass($(this).val());
				alignment();
			}
			
			if ($(this).val() == "custom")
			{
				$("#myModal").modal('show');
				$(".name").focus();
				if ($("#cd").closest(".form-group").hasClass("has-error"))
				{
					$("#cd").closest(".form-group").removeClass("has-error");
				}
				setTimeout(function(){
					$("#sel").val("1");
				},1000);
				nameKeyDown();
				widthKeyUp();
				widthKeyDown();
				heightKeyDown();
				$(".ok-btn").click(function(){
				//	var customName = $(".name").val();
					pushingIntoOptions();
				});
				
				$(".height").keypress(function(c){
				var key3=c.which;
				if (key3 == 13)
				{
					pushingIntoOptions();
				}
				});
			}
			else
			{
				setCustomDimensions();			
			}
		});
		function pushingIntoOptions()
		{
			var customName = $(".name").val();
			if (validateCustomDeviceName(customName))
			{
				$("#myModal").modal('hide');
				
				if ($("#rotate").hasClass("portrait"))
				{
					setHeightAndWidthPort();
				}
				else
				{
					setHeightAndWidthLand();
				}
				
				deviceCache();
				
				var storedDevice = localStorage.getItem("custom_device");
				var obj = JSON.parse(storedDevice); 
				var options = "";
				for (var index=0; index < obj.length; index++)
				{
					if (cacheValidate(obj[index].name))
					{
						options += "<option>";
						options += obj[index].name;
						options += "</option>"; 
					}
				}
				
				$("#sel > .user_defined").append(options);
			}
		}
		
		function nameKeyDown()
		{
			$(".name").keydown(function(k){
			var key4 = k.which;
			if (key4 == 40)
			{
				$(".width").focus();
			}
			});
		}
		
		function widthKeyDown()
		{
			$(".width").keydown(function(a){
			var key1=a.which;
			if (key1 == 40)
			{
				$(".height").focus();
			}
			});
		}
		
		function widthKeyUp()
		{
			$(".width").keydown(function(l){
			var key5 = l.which;
			if (key5 == 38)
			{
				$(".name").focus();
			}
			});
		}
		
		function heightKeyDown()
		{
			$(".height").keydown(function(b){
			var key2=b.which;
			if (key2 == 38)
			{
				$(".width").focus();
			}
			});
		}
		
		
		function setHeightAndWidthPort()
			{
				var wid = $(".width").val();
				var heigh = $(".height").val();
				var nme = $(".name").val();
				if (wid && heigh != null)
				{
					$(".custom > .portrait > .display").prop('width', wid);
					$(".custom > .portrait > .display").prop('height', heigh);
					$(".custom > .portrait > .display").attr('style','display: block');
					$(".custom > .portrait").css('width', parseInt(wid) +100);
					$(".custom > .portrait").css('height', parseInt(heigh) +100);
					$(".custom > .portrait").css('background-color', 'black');
				}
			}
			
		function setHeightAndWidthLand()
		{
			var wid = $(".width").val();
			var heigh = $(".height").val();
			var nme = $(".name").val();
			if (wid && heigh != null)
			{
				$(".custom > .landscape > .display").prop('width', heigh);
				$(".custom > .landscape > .display").prop('height', wid);
				$(".custom > .landscape > .display").attr('style','display: block');
				$(".custom > .landscape").css('width', parseInt(heigh) +100);
				$(".custom > .landscape").css('height', parseInt(wid) +100);
				$(".custom > .landscape").css('background-color', 'black');
			}
		}
		
		function setCustomDimensions()
		{
			var storedDevice = localStorage.getItem("custom_device");
			var obj = JSON.parse(storedDevice); 
			for (var index=0; index < obj.length; index++)
			{	
				if ($("#sel").val() == obj[index].name)
				{
					if ($("#rotate").hasClass("portrait"))
					{
						$("#display").prop('width', obj[index].width);
						$("#display").prop('height', obj[index].height);
						$("#display").attr('style', 'background-color: white; margin-top: 50px; transition: 0.5s ease-in');
						$("#rotate").css({'width': parseInt(obj[index].width) +100, 'height': parseInt(obj[index].height) +100 , 'background-color': 'black', 'border-radius':'30px' , 'transition':'0.5s ease-in'});
					}
					else
					{
						$("#display").prop('width', obj[index].height);
						$("#display").prop('height', obj[index].width);
						$("#display").attr('style', 'background-color: white; margin-top: 50px; transition: 0.5s ease-in');
						$("#rotate").css({'width': parseInt(obj[index].height) +100, 'height': parseInt(obj[index].width) +100 , 'background-color': 'black', 'border-radius':'30px' , 'transition':'0.5s ease-in'});
					}
				}
				
			} 
		}
		
		$("#landscape").click(function(){
			$("#rotate").removeClass();
			$("#rotate").addClass("landscape");
			alignment();
			setHeightAndWidthLand();
			setCustomDimensions();
		});
		
		$("#portrait").click(function(){
			$("#rotate").removeClass();
			$("#rotate").addClass("portrait");
			alignment();
			setHeightAndWidthPort();
			setCustomDimensions();
		});
		
		initialize(); 
	});
	function alignment()
	{
		var test= "samsung-tab";
		if (width == 1280)
			{	
				if ($("#sel").val() == test && $("#rotate").hasClass("landscape")) 
				{
					$(".samsung-tab > .landscape").css('margin-left' , '-13%');
				}
			}
		else if (width == 1024)
		{
			if ($("#sel").val() == test && $("#rotate").hasClass("landscape")) 
			{
				$(".samsung-tab > .landscape").css('margin-left' , '-16.25%');
			}
		}
		else if (width == 1366 || width == 1400 || width == 1440)
		{
			if ($("#sel").val() == test && $("#rotate").hasClass("landscape")) 
			{
				$(".samsung-tab > .landscape").css('margin-left' , '-12%');
			}
		}
	}
	function initialize()
	{
		var url = "http://www.w3schools.com";
		var device = "iphone-5s";
		var orientation = "portrait";
		localStorage.setItem("OS", device);
		
		$("#txt").val(url);
		$("#display").prop("src",url);
		$("#phone").addClass(device);
		$("#rotate").addClass(orientation);
		
		updateCache(url);
		
		updateHistory();
		
		updateOption();
	}
	
	function renderDevice()
	{
		var url =$("#txt").val();
		if(REG_EX.test(url))
		{
			$(".form-group").removeClass("has-error");
		
		} 
		else 
		{
			$(".form-group").addClass("has-error");
			$("#txt").focus();
			return false;
		}
			$("#display").prop("src",url);
		updateCache(url);
		updateHistory();
	}
	
	function updateCache(url)
	{
		if (localStorage.getItem("url") == null)
		{
			var urls = [];
			urls.splice(0,0,url);
			localStorage.setItem("url", urls);
		}
		else
		{
			var storedUrl = localStorage.getItem("url");					
			var urls = storedUrl.split(",");
			var index = urls.indexOf(url);
			if (index > -1)
			{
				urls.splice(index, 1);
			}
			urls.splice(0,0,url);
			localStorage.setItem("url", urls);
		}
	}

	function updateHistory()
	{
		var storedUrl = localStorage.getItem("url");					
		var urls = storedUrl.split(",");
		var generatedHtml = "";
		for (var index=0; index < urls.length; index++)
		{
			generatedHtml += "<li>"
			generatedHtml += urls[index];
			generatedHtml += "</li>";
		}
		$("#history-url").html(generatedHtml);
		$(".navigation li").click(function(){
			onHistoryUrlClick($(this).text());
		});
	}	
		
	
	function onHistoryUrlClick(urlElemTxt)
	{
		$(".form-group").removeClass("has-error");
		$("#display").prop("src",urlElemTxt);
		$("#txt").val(urlElemTxt);
		
		renderDevice();
	}
	
	function deviceCache()
	{  
		var wid = $(".width").val();
		var heigh = $(".height").val();
		var nme = $(".name").val();
				
		var customDevicesJson;
		
		var customDevices = localStorage.getItem("custom_device");
			
		if (customDevices == null)
		{
			customDevicesJson = [];
		}
		else
		{
			customDevicesJson = jQuery.parseJSON(customDevices);
		}
		
		var currentDevice = {"name":nme, "width": wid, "height": heigh};
		
		customDevicesJson.splice(0,0,currentDevice);
		
	//	alert(JSON.stringify(customDevicesJson));
		
		localStorage.setItem("custom_device", JSON.stringify(customDevicesJson));
	}
		
	function updateOption()
	{  
		var storedDevice = localStorage.getItem("custom_device");
		var obj = JSON.parse(storedDevice); 
		var options = "";
		for (var index=0; index < obj.length; index++)
		{
			options += "<option>";
			options += obj[index].name;
			options += "</option>"; 			
		}
		$("#sel > .user_defined").append(options);			  
	}
	
	function cacheValidate(deviceName)
	{  
	//	alert("deviceName::::" + deviceName)
		var isValid = true;
		$("#sel option").each(function(){
	//		alert("option:::" + $(this).text());
			if ($(this).text() == deviceName)
			{
			//	alert("return false");
				isValid = false;
			}
		});
	//	alert("final return " + isValid);
		return isValid;	
	}
	
	function validateCustomDeviceName(customName)
	{ 
		var storedDevice = localStorage.getItem("custom_device");
		if (storedDevice == null)
		{
			return true;
		}
	
		var obj = JSON.parse(storedDevice); 
		for (var index=0; index < obj.length; index++)
		{	
			if (obj[index].name == customName)
			{
				$("#cd").closest(".form-group").addClass("has-error");
				return false;
			}
		}
		return true;
	}
	
	window.onbeforeunload = function(){
		
		localStorage.removeItem("tabId");
		localStorage.removeItem("OS");
	};