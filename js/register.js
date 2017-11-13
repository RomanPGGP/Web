$(function(){
	$("#logo").click(function(){
		location.href="./index.html"
	});

	$("#registerbutton").click(function(){
		var flag = true;
		if($("#uidnum").val()=="")
		{	
			$("#uidnum").attr("placeholder", "Please provide your id number");
			$("#uidnum").addClass("border border-danger");
			flag = false;
		}

		if($("#uName").val()=="")
		{
			$("#uName").attr("placeholder", "Please provide your name").focus();
			$("#uName").addClass("border border-danger");
			flag = false;
		}
		
		if($("#uLastName").val()=="")
		{
			$("#uLastName").attr("placeholder", "Please provide your last name").focus(); 
		    $("#uLastName").addClass("border border-danger");
			flag = false;
		}

		if($("#username").val()=="")
		{
			$("#username").attr("placeholder", "Please provide your name").focus(); 
		    $("#username").addClass("border border-danger");
			flag = false;
		}

		if($("#userpassword").val()=="")
		{
			$("#userpassword").attr("placeholder", "Please provide your password").focus(); 
		    $("#userpassword").addClass("border border-danger");
			flag = false;
		}

		if($("#userpasswordconfirmation").val()=="")
		{
			$("#userpasswordconfirmation").attr("placeholder", "Please confirm your password").focus(); 
		    $("#userpasswordconfirmation").addClass("border border-danger");
			flag = false;
		}

		if($("#userpassword").val()!=$("#userpasswordconfirmation").val())
		{
			alert("Confirm your password");
			flag = false;
		}

		if(!$("[name='gender']").is(":checked"))
		{
			$("#genero").addClass("text-danger");
			flag = false;
		}

		if(flag)
		{
			var jsontosend = {
								"useridnumber" : $("#uidnum").val(),
								"name" : $("#uName").val(),
								"lastname" : $("#uLastName").val(),
								"username" : $("#username").val(),
								"psswrd" : $("#userpassword").val(),
								"gender" : $("[name='gender']").val(),
								"action" : "register"
			};

			$.ajax({
				url : "data/applicationlayer.php",
				type : "POST",
				data : jsontosend,
				dataType : "json",
				contentType : "application/x-www-form-urlencoded",
				success : function(jsonreceived){
					window.location.replace("index.html");
				},
				error : function(errorMessage){
					console.log(errorMessage);
				}
			});


		}
		else
		{
			location.href="#logo";
		}

	});


});