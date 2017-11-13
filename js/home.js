$(function(){

	var cooc = document.cookie;
	var n = cooc.indexOf("=");
	var idnumero = cooc.substring(n+1);
	console.log(idnumero);
	var informacion;
	var jsontosend = {
						"action" : "ask",
						"sessid" : idnumero
	};
	$.ajax({
				url: "data/applicationlayer.php",
				type:"POST",
				data: jsontosend,
				dataType: "json",
				contentType : "application/x-www-form-urlencoded",
				success :function(jsonreceived)
				{
					informacion = jsonreceived;
					console.log(jsonreceived);
					$("#weluser").text("Welcome "+jsonreceived.firstName+" "+jsonreceived.lastName);
					$("#mcal").text("-"+informacion.cal);
					$("#calrs").text(jsonreceived.cal);
					$("#peso").text(jsonreceived.weight);
					$("#dpeso").text(jsonreceived.dweight);
				},
				error : function(errormessage)
				{
					console.log(errormessage);
				}

	});
	jsontosend = {
						"action" : "search"
	};
	$.ajax({
				url: "data/applicationlayer.php",
				type:"POST",
				data: jsontosend,
				dataType: "json",
				contentType : "application/x-www-form-urlencoded",
				success :function(jsonreceived)
				{
					$("#comfr").text(jsonreceived.Name + " " + jsonreceived.lastName);
				},
				error : function(errormessage)
				{
					console.log(errormessage);
				}
	});
	
	$("#mhome").click(function(){
		var selected = $(".active").attr("id");
		$('#'+selected).removeClass("active");
		$("#mhome").addClass("active");
		var selectedsection = $(".nothidden").attr("id");
		$('#'+selectedsection).removeClass("nothidden");
		$('#'+selectedsection).addClass("hidden");
		$("#homesection").removeClass("hidden");
		$("#homesection").addClass("nothidden");
		$(".hidden").hide();
		$(".nothidden").show();
		console.log("hey");
		//$("#weluser").text("Welcome "+externo.sharedata.Name+" "+externo.sharedata.LName);
		//$("#mcal").text("-"+externo.sharedata.cal);
	});
	$("#mdelivery").click(function(){
		var selected = $(".active").attr("id");
		$('#'+selected).removeClass("active");
		$("#mdelivery").addClass("active");
		var selectedsection = $(".nothidden").attr("id");
		$('#'+selectedsection).removeClass("nothidden");
		$('#'+selectedsection).addClass("hidden");
		$("#deliverysection").removeClass("hidden");
		$("#deliverysection").addClass("nothidden");
		$(".hidden").hide();
		$(".nothidden").show();
	});
	$("#mcommunity").click(function(){
		var selected = $(".active").attr("id");
		$('#'+selected).removeClass("active");
		$("#mcommunity").addClass("active");
		var selectedsection = $(".nothidden").attr("id");
		$('#'+selectedsection).removeClass("nothidden");
		$('#'+selectedsection).addClass("hidden");
		$("#communitysection").removeClass("hidden");
		$("#communitysection").addClass("nothidden");
		$(".hidden").hide();
		$(".nothidden").show();
	});
	$("#mrest").click(function(){
		var selected = $(".active").attr("id");
		$('#'+selected).removeClass("active");
		$("#mrest").addClass("active");
		var selectedsection = $(".nothidden").attr("id");
		$('#'+selectedsection).removeClass("nothidden");
		$('#'+selectedsection).addClass("hidden");
		$("#restaurantssection").removeClass("hidden");
		$("#restaurantssection").addClass("nothidden");
		$(".hidden").hide();
		$(".nothidden").show();
	});
	$("#myn").click(function(){
		var selected = $(".active").attr("id");
		$('#'+selected).removeClass("active");
		$("#myn").addClass("active");
		var selectedsection = $(".nothidden").attr("id");
		$('#'+selectedsection).removeClass("nothidden");
		$('#'+selectedsection).addClass("hidden");
		$("#ynsection").removeClass("hidden");
		$("#ynsection").addClass("nothidden");
		$(".hidden").hide();
		$(".nothidden").show();
	});

	

	$("#bmf").click(function(){
		var newhtml = "<div class='bg-danger rounded container'> <text class='display-3 text-center text-white'>Order placed.</text><br> <small> thank you! </small> </div> ";
		$("#deliverysection").append(newhtml);
	});

	$("#bgmps").click(function(){
		location.href="https://www.google.com.mx/maps/search/Super+Salads/@25.6522577,-100.3069136,14z/data=!3m1!4b1?hl=en";
	});

	$("#sndmsg").click(function(){
		var texto = $("#mensajen").val();
		console.log(texto);
		var newhtml = "<text class='bg-info text-white rounded' style='padding:5px'> YOU: "+texto+"</text><br><br>";
		$("#mensajen").val("");
		$("#convn").append(newhtml);



	});
	$(".hidden").hide();

});