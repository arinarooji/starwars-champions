//The first goal is to get the selection process working/displaying properly
//Create variables/arrays to store all characters, playerCharacter, opponentCharacter
//Characters can be an object, each slightly modified.
var darthVader = {
	id: "VADER",
	health: 110,
	attack: 25,
	counterAttack: 10,
	defeated: false
};
var masterYoda = {
	id: "YODA",
	health: 115,
	attack: 22,
	counterAttack: 15,
	defeated: false
};
var kyloRen = {
	id: "KYLO",
	health: 100,
	attack: 20,
	counterAttack: 15,
	defeated: false
};
//Can create one object, store values in corresponding array? More optimization

var characters = [darthVader, masterYoda, kyloRen];
var defeated = [darthVader.defeated, masterYoda.defeated, kyloRen.defeated];

var player;
var enemy;
var newPlayerHealth;
var newEnemyHealth;
var wins = 0;
var losses = 0;

$(document).ready(function(){
	
	$("#heavy-button").hide();
	//PLAYER selection OPTIMIZED/EFFICIENT
	$(".img-1").on("click", function(){
		for(var i = 0; i < characters.length; i++){
			if ($(this).attr("id") === characters[i].id){
				player = characters[i];
				newPlayerHealth = player.health;
				$(".bg-success").css("width", newPlayerHealth + "%");
			}
		}
		//Hide this selection from carousel-2
		$("#playerName").html(player.id);
		$("#carousel-1-prev, #carousel-1-next, #indicators-1").hide();
	});

	//ENEMY selection
	$(".img-2").on("click", function(){
		for(var i = 0; i < characters.length; i++){
			if ($(this).attr("id") === characters[i].id){
				enemy = characters[i];
				newEnemyHealth = enemy.health;
				$(".bg-danger").css("width", newEnemyHealth + "%");
				$("#heavy-button").show();
			}
		}
		$("#enemyName").html(enemy.id);
		$("#carousel-2-prev, #carousel-2-next, #indicators-2").hide();
	});

	//HEAVY ATTACK
	$("#heavy-button").on("click", function(){
		newEnemyHealth -= player.attack;
		newPlayerHealth -= enemy.attack;
		$(".bg-danger").css("width", newEnemyHealth + "%");
		$(".bg-success").css("width", newPlayerHealth + "%");
		
	});
	
	//Check health levels on every button click
	$(".btn").on("click", function(){
		//If enemy dies, pick a new enemy
		if(newEnemyHealth <= 0){
			enemy.defeated = true;
			wins += 1;
			newPlayerHealth = player.health;
			$("#enemyName").html("OPPONENT");
			$("#heavy-button").hide();
			$("#carousel-2-prev, #carousel-2-next, #indicators-2").show();
			$(".bg-danger").css("width", newEnemyHealth + "%");
			$(".bg-success").css("width", newPlayerHealth + "%");
			$("#WINS").html("WINS: " + wins);
		}
		//If player dies, pick a new player
		if(newPlayerHealth <= 0){
			player.defeated = true;
			losses += 1;
			$("#playerName").html("PLAYER");
			$("#enemyName").html("OPPONENT");
			$("#heavy-button").hide();
			$("#carousel-1-prev, #carousel-1-next, #indicators-1").show();
			$("#carousel-2-prev, #carousel-2-next, #indicators-2").show();
			$(".bg-success").css("width", newPlayerHealth + "%");
			$(".bg-danger").css("width", newEnemyHealth + "%");
			$("#LOSSES").html("LOSSES: " + losses);
		}
	});


});

