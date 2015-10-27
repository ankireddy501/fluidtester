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
		function MyFunction()
			{
				var link =$("#txt").val();
				$("#display").prop("src",link)					
				var storedUrl = localStorage.getItem("url");					
				localStorage.setItem("url", storedUrl)
				var urls = storedUrl.split(",");					
				for (var index=0; index < urls.length; index++)
					{
						if (link == urls[index])
							{ 
								var afterSplice = urls.splice(index, 1);				
								var insertInZerothIndex = urls.splice(0,0, link);
								localStorage.setItem("url", urls);
								return false;
							}			
					}	
					urls.splice(0,0, link);					
				//	alert("after pushing "+ urls);				
					localStorage.setItem("url", urls);
			} 
			
			
		$("#txt").keypress(function(e){
		var key=e.which;
		if (key == 13)
			{
				MyFunction();
			}
		});
		
		
			$(".input-group-btn").click(function(){
				MyFunction();
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
		
		
		$("#txt").on("paste", function(){
		setTimeout(function(){
			MyFunction();
			});
		});
		
		
		$("#landscape").click(function(){
			$("#rotate").removeClass();
				$("#rotate").addClass("landscape");
		});
		
		
			$("#portrait").click(function(){
				$("#rotate").removeClass();
					$("#rotate").addClass("portrait");
			});
	
	
				$(".optn-btn").click(function(){
				var storedUrl = localStorage.getItem("url");
				if (storedUrl == null)
					{						
						var onloadlink = $("#txt").val();						
						storedUrl = [];					
						storedUrl.splice(0,0, onloadlink);					
					}					
						localStorage.setItem("url", storedUrl);
						var urls = storedUrl.split(",");
						var generatedHtml = "";
						for (var index=0; index < urls.length; index++)
							{
								generatedHtml += "<tr><td>";
								generatedHtml += urls[index];
								generatedHtml += "</td></tr>";
								generatedHtml += "</br>";
							}
						$("#main-sidebar-wrapper").html(generatedHtml);
					//	$("#option").toggle();
						
							$("td").click(function(){
						//	alert($(this).text());
							var cachelink = $(this).text();
							$("#display").prop("src",cachelink)
							$("#txt").val(cachelink);
							MyFunction();
							//	alert("link set")
							});
					});	
	});