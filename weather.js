
$(document).ready(function(){
	$('.search-btn').click(function(){

		var location = $(".location").val();
		var unit = $("input[name='unitss']:checked").val();
		 

		if(location != ''){

			$.ajax({

				url: 'http://api.openweathermap.org/data/2.5/weather?q='+ location +"&units="+ unit+"&APPID=14374d3ebfcaf8483b6efb255f57b10a",
				type: "GET",
				dataType:"jsonp",
				success: function(data){
					console.log(data);
					var widget = show(data);

					$("#show").html(widget);
					$(".location").val('');

				}
			
			});


		}else{
			$("#error").html('City and Units field can not be empty');

		 }  
	});


});

function show(data){ 
	var unit = $("input[name='unitss']:checked").val();
	var speed; 
	var pres;

		if (unit=='metric') {
		unit = "C"
		speed = "m/s"
		pres="hPa"
		}
		else if (unit== 'imperial') {
		unit = "F"
		speed="mph"
		pres="hPa"
		}

	return "<h2>Current Weather for " + data.name + ", "+data.sys.country+"</h2>" +
		   "<h3><strong>Weather</strong>: " + data.weather[0].main + "<img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'> </h3>" + 
		   "<h3><strong>Description</strong>: " + data.weather[0].description + "</h3>" +
		   "<h3><strong>Temperature</strong>: " + data.main.temp + "&deg;"+unit+"</h3>" + 
		   //I ADDED UNIT HERE                                              ^^^!!!!
		   "<h3><strong>Min Temperature</strong>: " + data.main.temp_min + "&deg;"+unit+"</h3>" +
		   "<h3><strong>Max Temperature</strong>: " + data.main.temp_max + "&deg;"+unit+"</h3>"+
		   "<h3><strong>Pressure</strong>: " + data.main.pressure +" "+pres+"</h3>" +
		   "<h3><strong>Humidity</strong>: " + data.main.humidity + "%</h3>" +
		   "<h3><strong>Wind Speed</strong>: " + data.wind.speed +" "+speed+ "</h3>";
}

