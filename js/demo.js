var hours = [], minutes = [];
for(i=1; i < 25; i++){
	hours.push(i);
}
for(i=0; i < 60; i=i+5){
	minutes.push(i);
}

$(document).ready(function(){
	$('#hourPicker').selectRoulette({data: hours});
	$('#minutePicker').selectRoulette({data: minutes});
});

$('.btn').click(function(){
	var minutes = $('#minutePicker').val();
	if(minutes < 10)
		minutes = "0" + minutes;
	$('p#result').text($('#hourPicker').val() + " : " + minutes);
});