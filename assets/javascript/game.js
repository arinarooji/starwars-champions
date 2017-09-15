//The first goal is to get the selection process working/displaying properly
//Create variables/arrays to store all characters, playerCharacter, opponentCharacter
//Characters can be an object, each slightly modified.
var darthVader = {
	id: "VADER",
	health: 110,
	attack: 24,
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
	attack: 21,
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
	
	//All SOUND FILES HERE, I TRIED TO SHORTEN THIS WITH AN ARRAY AND LOOP, COULDN'T GET IT TO WORK
	var saberOn = document.createElement("audio");		saberOn.setAttribute("src", "assets/audio/SaberOn.mp3");
	var saberOn2 = document.createElement("audio");		saberOn2.setAttribute("src", "assets/audio/SaberOn2.mp3");
	var hoverSaber = document.createElement("audio");	hoverSaber.setAttribute("src", "assets/audio/Hum_4.mp3");
	//var hoverSaber2 = document.createElement("audio");	hoverSaber2.setAttribute("src", "assets/audio/.mp3")
	var heavySaber = document.createElement("audio");	heavySaber.setAttribute("src", "assets/audio/lasrhit2.mp3");
	var heavySaber2 = document.createElement("audio");	heavySaber2.setAttribute("src", "assets/audio/LSwall01.mp3");
	var heavySaber3 = document.createElement("audio");	heavySaber3.setAttribute("src", "assets/audio/lasrhit3.mp3");
	//END OF SOUND FILES (I KNOW, IT LOOKS INEFFICIENT)

	var heavySabers = [heavySaber, heavySaber2, heavySaber3];
	var heavySounds = 0;

	//Hide button at start
	$("#heavy-button").hide();

	//PLAYER selection
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
		saberOn.play();
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
		saberOn2.play();
	});

	//HEAVY ATTACK HOVER EFFECT
	$("#heavy-button").hover(function(){
		hoverSaber.play();
	});
	//HEAVY ATTACK
	$("#heavy-button").on("click", function(){
		//Cycle through heavy saber sounds
		heavySabers[heavySounds].play()
		heavySounds ++;
		if(heavySounds > 2){heavySounds = 0;}

		newEnemyHealth -= Math.floor(Math.random() * player.attack);
		console.log(newEnemyHealth);
		newPlayerHealth -= Math.floor(Math.random() * enemy.attack);
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
			//Check if all enemies defeated
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

