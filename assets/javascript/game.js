//Wait for the document to load
$(document).ready(function(){
	
	//Character instances (ID, health, attack, lightAttack, sabers[])
	var vader = new Character("VADER", 100, 20, 10, [" Vader's"]);
	var yoda  = new Character("YODA", 100, 23, 13, [" Yoda's"]);
	var kylo  = new Character("KYLO", 100, 19, 10, [" Kylo's"]);
	var rey   = new Character("REY", 100, 19, 10, [" Rey's"]);
	var luke  = new Character("LUKE", 100, 23, 13, [" Luke's"]);

	//Reference all character instances
	var characters = [vader, yoda, kylo, rey, luke];

	//Global player/enemy variables
	var player, playerHealth;
	var enemy, enemyHealth;
	var wins   = 0;
	var losses = 0;
	var championWins = 0;
	var playerMultiplier = 1.00;
	var champion = false;
	var playerSelected = false;
	
	//Hide attack buttons at start
	$("#heavy-button, #light-button").hide();

	//All SOUND FILES HERE (Shorten this)
	var themeSong   = $("<audio>").attr("src", "assets/audio/starWarsTheme.mp3");
	var saberOn     = $("<audio>").attr("src", "assets/audio/SaberOn.mp3");
	var saberOn2    = $("<audio>").attr("src", "assets/audio/SaberOn2.mp3");
	var hoverSaber  = $("<audio>").attr("src", "assets/audio/Hum_4.mp3");
	var hoverSaber2 = $("<audio>").attr("src", "assets/audio/Hum_1.mp3");
	var heavySaber  = $("<audio>").attr("src", "assets/audio/lasrhit2.mp3");
	var heavySaber2 = $("<audio>").attr("src", "assets/audio/LSwall01.mp3");
	var heavySaber3 = $("<audio>").attr("src", "assets/audio/lasrhit3.mp3");
	var lightSaber  = $("<audio>").attr("src", "assets/audio/clash_01.mp3");
	var lightSaber2 = $("<audio>").attr("src", "assets/audio/3_clash_2.mp3");
	var lightSaber3 = $("<audio>").attr("src", "assets/audio/2_clash_2.mp3");

	//Cycle through these sounds on attack
	var heavySabers = [heavySaber, heavySaber2, heavySaber3];
	var lightSabers = [lightSaber, lightSaber2, lightSaber3];
	var heavySounds = 0, lightSounds = 0; //Tracks index of corresponding array

	//Start/loop music
	themeSong.loop = true;
	$(themeSong).trigger('play');

	//PLAYER selection
	$(".img-1").on("click", function(){
		//Iterate through characters[]
		for (var i = 0; i < characters.length; i++) {
			//If the selected id equals current character id and the player has not selected...
			if ($(this).attr("id") === characters[i].id && !playerSelected) {
				
				//The player has now selected a character
				player = characters[i];
				playerHealth = player.health;
				playerSelected  = true;

				//Update the DOM (name, saber inventory, health bar, hide carousel-1 controls)
				$("#playerName").html(player.id);
				$("#SABERS").html("LIGHTSABER: " + player.sabers);
				$(".bg-success").css("width", playerHealth + "%");
				$("#carousel-1-prev, #carousel-1-next, #indicators-1").hide();
				$(saberOn).trigger('play'); //Play the saberOn sound
			}
		}
	});

	//ENEMY selection
	$(".img-2").on("click", function() {
		//Iterate through characters[]
		for (var i = 0; i < characters.length; i++) {
			//If the selected id equals current character id, the player id is not identical, and player is selected...
			if ($(this).attr("id") === characters[i].id && $(this).attr("id") !== player.id && playerSelected) {
				
				//The enemy is now the selected character
				enemy = characters[i];
				enemyHealth = enemy.health;

				//Update DOM (name, health bar, hide carousel-2 controls, show attack btns)
				$("#enemyName").html(enemy.id);
				$(".bg-danger").css("width", enemyHealth + "%");
				$("#carousel-2-prev, #carousel-2-next, #indicators-2").hide();
				$("#heavy-button, #light-button").show();
				$(saberOn2).trigger('play'); //Play saberOn2 sound
			}
		}
	});

	//HEAVY ATTACK
	$("#heavy-button").on("click", function(){
		//Cycle through heavy saber sounds
		$(heavySabers[heavySounds]).trigger('play');
		(heavySounds < 2)? heavySounds++ : heavySounds = 0

		enemyHealth  -= (Math.floor(Math.random() * player.attack)) * playerMultiplier;
		playerHealth -= Math.floor(Math.random() * enemy.attack);

		$(".bg-danger").css("width", enemyHealth + "%");
		$(".bg-success").css("width", playerHealth + "%");
	});

	//LIGHT ATTACK
	$("#light-button").on("click", function(){
		//Cycle through light saber sounds
		$(lightSabers[lightSounds]).trigger('play');
		(lightSounds < 2)? lightSounds++ : lightSounds = 0

		enemyHealth  -= (Math.floor(Math.random() * player.lightAttack)) * playerMultiplier;
		playerHealth -= Math.floor(Math.random() * enemy.lightAttack);

		$(".bg-danger").css("width", enemyHealth + "%");
		$(".bg-success").css("width", playerHealth + "%");
	});

	//Check health levels on every button click
	$(".btn").on("click", function(){
		
		//If enemy defeated
		if (enemyHealth <= 0) {
			
			//Is the player a champion? Add to championWins. Else, add to wins
			(champion)? $("#CHAMPWINS").html("CHAMPION WINS: " + (championWins++)) : wins++
			playerMultiplier += 0.05; //Increase playerMultiplier
			playerHealth = player.health; //Refill playerHealth

			//Update DOM
			$("#enemyName").html("OPPONENT");
			$("#heavy-button, #light-button").hide();
			$("#carousel-2-prev, #carousel-2-next, #indicators-2").show();
			$(".bg-danger").css("width", enemyHealth + "%");
			$(".bg-success").css("width", playerHealth + "%");
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

		//If player defeated
		if (playerHealth <= 0) {
			
			//Update selection, champion status, multiplier, losses
			playerSelected   = false, champion = false;
			playerMultiplier = 1.00;
			losses += 1;

			//Remove all acquired sabers and update the inventory
			player.sabers.length = 1;
			$("#SABERS").html("LIGHTSABER: " + player.sabers);

			//Update the DOM (names, losses, hide attack btns, health bars, show carousel controls)
			$("#playerName").html("PLAYER");
			$("#enemyName").html("OPPONENT");
			$("#LOSSES").html("LOSSES: " + losses);
			$("#heavy-button, #light-button").hide();
			$(".bg-danger").css("width", enemyHealth + "%");
			$(".bg-success").css("width", playerHealth + "%");
			$("#carousel-1-prev, #carousel-1-next, #indicators-1, #carousel-2-prev, #carousel-2-next, #indicators-2").show();
		}
	});

	//HEAVY ATTACK HOVER EFFECT
	$("#heavy-button").hover(function(){ $(hoverSaber).trigger('play'); });
	//LIGHT ATTACK HOVER EFFECT
	$("#light-button").hover(function(){ $(hoverSaber2).trigger('play'); });

	//Character constructor
	function Character(id, health, attack, lightAttack, sabers) {
		this.id 	= id;
		this.health = health;
		this.attack = attack;
		this.lightAttack = lightAttack;
		this.sabers = sabers;
	}
});