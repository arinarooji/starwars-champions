//The first goal is to get the selection process working/displaying properly
//Create variables/arrays to store all characters, playerCharacter, opponentCharacter
//Characters can be an object, each slightly modified.
var characters = ["VADER", "YODA", "KYLO"];
var player;
var enemy;

$(document).ready(function(){
	
	//Character selection OPTIMIZED/EFFICIENT
	$(".img-1").on("click", function(){
		for(var i = 0; i < characters.length; i++){
			if ($(this).attr("id") == characters[i]){
				player = characters[i];
			}
		}
		//Hide this selection from carousel-2
		//Print
		console.log(player);
		$("#carousel-1-prev, #carousel-1-next, #indicators-1").hide();
	});

	$(".img-2").on("click", function(){
		for(var i = 0; i < characters.length; i++){
			if ($(this).attr("id") == characters[i]){
				enemy = characters[i];
			}
		}
		//Print
		console.log(enemy);
		$("#carousel-2-prev, #carousel-2-next, #indicators-2").hide();
	});


});
