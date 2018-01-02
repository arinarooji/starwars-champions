//Character constructor
function Character(id, health, attack, lightAttack, sabers) {
	this.id 	= id;
	this.health = health;
	this.attack = attack;
	this.lightAttack = lightAttack;
	this.sabers = sabers;
}

//Character instances (ID, health, attack, lightAttack, sabers[])
var darthVader = new Character("VADER", 100, 20, 10, [" Vader's"]);
var masterYoda = new Character("YODA", 100, 23, 13, [" Yoda's"]);
var kylo       = new Character("KYLO", 100, 19, 10, [" Kylo's"]);
var rey 	   = new Character("REY", 100, 19, 10, [" Rey's"]);
var luke 	   = new Character("LUKE", 100, 23, 13, [" Luke's"]);

//Reference all character instances
var characters = [darthVader, masterYoda, kylo, rey, luke];

//Global variables
var player;
var playerIndex = 0;
var playerSelected = false;
var playerMultiplier = 1.00;
var newPlayerHealth;
var enemy;
var newEnemyHealth;
var wins = 0;
var losses = 0;
var champion = false;
var winsAsChampion = 0;

$(document).ready(function(){
	//Hide attack buttons at start (improve this)
	$("#heavy-button, #light-button").hide();

	//All SOUND FILES HERE (Shorten this)
	var themeSong = document.createElement("audio");
	var saberOn = document.createElement("audio");
	var saberOn2 = document.createElement("audio");
	var hoverSaber = document.createElement("audio");
	var hoverSaber2 = document.createElement("audio");
	var heavySaber = document.createElement("audio");
	var heavySaber2 = document.createElement("audio");
	var heavySaber3 = document.createElement("audio");
	var lightSaber = document.createElement("audio");
	var lightSaber2 = document.createElement("audio");
	var lightSaber3 = document.createElement("audio");

	themeSong.setAttribute("src", "assets/audio/starWarsTheme.mp3");
	saberOn.setAttribute("src", "assets/audio/SaberOn.mp3");
	saberOn2.setAttribute("src", "assets/audio/SaberOn2.mp3");
	hoverSaber.setAttribute("src", "assets/audio/Hum_4.mp3");
	hoverSaber2.setAttribute("src", "assets/audio/Hum_1.mp3");
	heavySaber.setAttribute("src", "assets/audio/lasrhit2.mp3");
	heavySaber2.setAttribute("src", "assets/audio/LSwall01.mp3");
	heavySaber3.setAttribute("src", "assets/audio/lasrhit3.mp3");
	lightSaber.setAttribute("src", "assets/audio/clash_01.mp3");
	lightSaber2.setAttribute("src", "assets/audio/3_clash_2.mp3");
	lightSaber3.setAttribute("src", "assets/audio/2_clash_2.mp3");
	//END OF SOUND FILES========================================

	//Start/loop music
	themeSong.loop = true;
	themeSong.play();

	//Cycle through these sounds
	var heavySabers = [heavySaber, heavySaber2, heavySaber3];
	var heavySounds = 0;
	var lightSabers = [lightSaber, lightSaber2, lightSaber3];
	var lightSounds = 0;

	//PLAYER selection
	$(".img-1").on("click", function(){
		for(var i = 0; i < characters.length; i++){
			if ($(this).attr("id") === characters[i].id && !playerSelected){
				player = characters[i];
				playerIndex = i;
				newPlayerHealth = player.health;
				$(".bg-success").css("width", newPlayerHealth + "%");
				$("#SABERS").html("LIGHTSABER: " + player.sabers);
				$("#playerName").html(player.id);
				$("#carousel-1-prev, #carousel-1-next, #indicators-1").hide();
				saberOn.play();
				playerSelected = true;
			}
		}
	});

	//ENEMY selection
	$(".img-2").on("click", function(){
		for(var i = 0; i < characters.length; i++){
			if ($(this).attr("id") === characters[i].id){
				if (i !== playerIndex && playerSelected) {
					enemy = characters[i];
					newEnemyHealth = enemy.health;
					$(".bg-danger").css("width", newEnemyHealth + "%");
					$("#heavy-button").show();
					$("#light-button").show();
					$("#enemyName").html(enemy.id);
					$("#carousel-2-prev, #carousel-2-next, #indicators-2").hide();
					saberOn2.play();
				}
			}
		}
	});

	//HEAVY ATTACK
	$("#heavy-button").on("click", function(){
		//Cycle through heavy saber sounds
		heavySabers[heavySounds].play()
		heavySounds ++;
		if(heavySounds > 2){heavySounds = 0;}

		newEnemyHealth -= (Math.floor(Math.random() * player.attack)) * playerMultiplier;
		console.log(newEnemyHealth);
		newPlayerHealth -= Math.floor(Math.random() * enemy.attack);
		$(".bg-danger").css("width", newEnemyHealth + "%");
		$(".bg-success").css("width", newPlayerHealth + "%");
	});

	//LIGHT ATTACK
	$("#light-button").on("click", function(){
		//Cycle through light saber sounds
		lightSabers[lightSounds].play()
		lightSounds ++;
		if(lightSounds > 2){lightSounds = 0;}

		newEnemyHealth  -= (Math.floor(Math.random() * player.lightAttack)) * playerMultiplier;
		newPlayerHealth -= Math.floor(Math.random() * enemy.lightAttack);
		$(".bg-danger").css("width", newEnemyHealth + "%");
		$(".bg-success").css("width", newPlayerHealth + "%");
	
	});

	//Check health levels on every button click
	$(".btn").on("click", function(){
		//If enemy dies
		if (newEnemyHealth <= 0) {
			enemy.defeated = true;
			if(champion){
				winsAsChampion++;
				$("#CHAMPWINS").html("CHAMPION WINS: " + winsAsChampion);
			}
			else{wins += 1;}
			playerMultiplier += 0.05;
			newPlayerHealth = player.health;
			$("#enemyName").html("OPPONENT");
			$("#heavy-button").hide();
			$("#light-button").hide();
			$("#carousel-2-prev, #carousel-2-next, #indicators-2").show();
			$(".bg-danger").css("width", newEnemyHealth + "%");
			$(".bg-success").css("width", newPlayerHealth + "%");
			$("#WINS").html("WINS: " + wins);

			//Check if the enemy's lightsaber is in player inventory
			if (player.sabers.indexOf(enemy.sabers[0]) == -1) {
				player.sabers.push(enemy.sabers[0]);
				$("#SABERS").html("LIGHTSABERS: " + player.sabers);
			}
			//Check if all lightsabers acquired
			if (player.sabers.length === characters.length && !champion) {
				alert("YOU ARE THE GALACTIC CHAMPION!");
				champion = true;
			}
		}

		//If player dies
		if (newPlayerHealth <= 0) {
			
			//Update selection, multiplier, losses
			player.defeated  = true;
			playerSelected   = false, champion = false;
			playerMultiplier = 1.00;
			losses += 1;

			//Remove all acquired sabers
			player.sabers.length = 1;
			$("#SABERS").html("LIGHTSABER: " + player.sabers);

			//Update the DOM
			$("#playerName").html("PLAYER");
			$("#enemyName").html("OPPONENT");
			$("#heavy-button, #light-button").hide();
			$("#carousel-1-prev, #carousel-1-next, #indicators-1").show();
			$("#carousel-2-prev, #carousel-2-next, #indicators-2").show();
			$(".bg-success").css("width", newPlayerHealth + "%");
			$(".bg-danger").css("width", newEnemyHealth + "%");
			$("#LOSSES").html("LOSSES: " + losses);
		}
	});

	//HEAVY ATTACK HOVER EFFECT
	$("#heavy-button").hover(function(){ hoverSaber.play(); });
	//LIGHT ATTACK HOVER EFFECT
	$("#light-button").hover(function(){ hoverSaber2.play(); });
});