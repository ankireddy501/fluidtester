	var REG_EX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/[a-zA-Z0-9]|https:\/\/[a-zA-Z0-9])[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
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
		//	alert($("#sel").val());		
			if (!link == null) 
			{
				$("#phone").removeClass();
				$("#phone").addClass($(this).val());
				$("#display").prop("src",link)
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
				$(".width").keydown(function(a){
				var key1=a.which;
				if (key1 == 40)
				{
					$(".height").focus();
				}
				});
				
				$(".height").keydown(function(b){
				var key2=b.which;
				if (key2 == 38)
				{
					$(".width").focus();
				}
				});
				
				$(".ok-btn").click(function(){
				setHeightAndWidthPort();
				});
				
				$(".height").keypress(function(c){
				var key3=c.which;
				if (key3 == 13)
				{
					$("#myModal").modal('hide');
					setHeightAndWidthPort();
				}
				});
			}
		});
		
		function setHeightAndWidthPort()
			{
				var wid = $(".width").val();
				var heigh = $(".height").val();
				if (wid && heigh != null)
				{
					$(".custom > .portrait > .display").prop('width', wid);
					$(".custom > .portrait > .display").prop('height', heigh);
					$(".custom > .portrait > .display").attr('style','display: block');
					$(".custom > .portrait").css('width', parseInt(wid) +100);
					$(".custom > .portrait").css('height', parseInt(heigh) +100);
					$(".custom > .portrait").css('background-color', 'black');
				}
				else
				{
				
				}
			}
			
		function setHeightAndWidthLand()
		{
			var wid = $(".width").val();
			var heigh = $(".height").val();
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
		
		$("#landscape").click(function(){
			$("#rotate").removeClass();
			$("#rotate").addClass("landscape");
			alignment();
			setHeightAndWidthLand();
		});
		
		$("#portrait").click(function(){
			$("#rotate").removeClass();
			$("#rotate").addClass("portrait");
			alignment();
			setHeightAndWidthPort();
		});
		
		initialize();
	});
	function alignment()
	{
		var test= "samsung-tab";
		if (width == 1280)
			{
			//	alert("width");
				if ($("#sel").val() == test) 
				{
				//	alert("if");
					if ($("#rotate").hasClass("landscape"))
					{
					//	alert("has class");
					$(".samsung-tab > .landscape").css('margin-left' , '-13%');
					}
					else
					{
					//	alert("rotate else");
						$(".portrait").css('margin-left', '');
					}
				}
				else
				{
				//	alert("else");
					$(".landscape").css('margin-left' , '');
				}
			}
		else if (width == 1024)
		{
			if ($("#sel").val() == test) 
			{
				if ($("#rotate").hasClass("landscape"))
				{
					$(".samsung-tab > .landscape").css('margin-left' , '-16.25%');
				}
				else
				{
					$(".portrait").css('margin-left', '');
				}
			}
			else
			{
				$(".landscape").css('margin-left' , '');
			}
		}
		else if (width == 1366 || width == 1400 || width == 1440)
		{
			if ($("#sel").val() == test) 
			{
				if ($("#rotate").hasClass("landscape"))
				{
					$(".samsung-tab > .landscape").css('margin-left' , '-12%');
				}
				else
				{
					$(".portrait").css('margin-left', '');
				}
			}
			else
			{
				$(".landscape").css('margin-left' , '');
			}
		}
	}
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
	
	