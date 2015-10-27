	var REG_EX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/[a-zA-Z0-9]|https:\/\/[a-zA-Z0-9])[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
	
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
			var link=$("#txt").val();
			if (!link == null) 
			{
				$("#phone").removeClass();
				$("#phone").addClass($(this).val());
				$("#display").prop("src",link)
			}
			else 
			{
				$("#phone").removeClass();
				$("#phone").addClass($(this).val());
			}
		});
		
		$("#landscape").click(function(){
			$("#rotate").removeClass();
			$("#rotate").addClass("landscape");
		});
		
		$("#portrait").click(function(){
			$("#rotate").removeClass();
			$("#rotate").addClass("portrait");
		});
		
		initialize();
	});
	
	function initialize()
	{
		var url = "http://www.w3schools.com";
		var device = "iphone";
		var orientation = "portrait";
		
		$("#txt").val(url);
		$("#display").prop("src",url);
		$("#phone").addClass(device);
		$("#rotate").addClass(orientation);
		
		updateCache(url);
		
		updateHistory();
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
		
		$("#display").prop("src",url)
		
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
			//alert(url);
			var storedUrl = localStorage.getItem("url");					
			var urls = storedUrl.split(",");
			var index = urls.indexOf(url);
		//	alert(index);
			if (index > -1)
			{
				urls.splice(index, 1);
			}
		//	alert(urls);
			urls.splice(0,0,url);
		//	alert(urls);
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
			onHistoryUrlClick($(this).text	());
		});
	}	
		
	
	function onHistoryUrlClick(urlElemTxt)
	{
		$(".form-group").removeClass("has-error");
		$("#display").prop("src",urlElemTxt);
		$("#txt").val(urlElemTxt);
		
		renderDevice();
	}