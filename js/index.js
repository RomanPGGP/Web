$(function(){
	$("#loginSubmit").click(function(){
		var flag = true;
		if($("#username").val()=="")
		{
			$("#username").attr("placeholder", "Please provide the username");
			$("#username").addClass("border border-danger");
			flag = false;
		}

		if($("#upassword").val()=="")
		{
			$("#upassword").attr("placeholder", "Please provide your password");
			$("#upassword").addClass("border border-danger");
			flag = false;
		}

		if(flag)
		{
			var rememberme = $("#rememberme").is(":checked");
			var jsontosend = {	
								"username" : $("#username").val(),
								"upassword" : $("#upassword").val(),
								"rememberme" : rememberme,
								"action" : "login"
			}; 
			$.ajax({
				url: "data/applicationlayer.php",
				type:"POST",
				data: jsontosend,
				dataType: "json",
				contentType : "application/x-www-form-urlencoded",
				success :function(jsonreceived)
				{
					console.log(jsonreceived);
					if(jsonreceived.status == "EXITO")
					{
						//$.cookie("dataclient", jsonreceived);
						
						window.location.replace("home.html");
					}

					if(jsonreceived.status == "wrongpassword")
					{
						alert("Wrong Password");
					}
				},
				error : function(errormessage)
				{
					console.log(errormessage);
				}

			});
		}
		
	});

});