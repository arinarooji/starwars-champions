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

	//Player and enemy objects
	var player = { health: 100, wins: 0, losses: 0, champWins: 0, isSelected: false, isChampion: false, multiplier: 1.00 };
	var enemy  = { health: 100 };

	//Hide attack buttons at start
	$("#heavy-button, #light-button").hide();

	//All SOUND FILES HERE (Shorten this)
	var themeSong   = $("<audio>").attr("src", "assets/audio/starWarsTheme.mp3");
	var saberOn     = $("<audio>").attr("src", "assets/audio/SaberOn.mp3");
	var saberOn2    = $("<audio>").attr("src", "assets/audio/SaberOn2.mp3");
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

	//Start music
	$(themeSong).trigger('play');

	//CHARACTER selections (Player and Enemy)
	$(".player, .enemy").on("click", function(){
		//Iterate through characters[]
		for (var i = 0; i < characters.length; i++) {
			
			//If the selected element has player class, id equals iterated character id, and the player IS NOT selected...
			if ($(this).hasClass("player") && $(this).attr("id") === characters[i].id && !player.isSelected) {
				
				//Reference the selected character object in player.character
				player.character  = characters[i];
				player.health     = player.character.health;
				player.isSelected = true;

				//Update the DOM (name, saber inventory, health bar, hide carousel-1 controls)
				$("#playerName").html(player.character.id);
				$("#SABERS").html("LIGHTSABER: " + player.character.sabers);
				$(".playerHealth").css("width", player.health + "%");
				$("#carousel-1-prev, #carousel-1-next, #indicators-1").hide();
				$(saberOn).trigger('play'); //Play the saberOn sound
			}

			//If the selected id equals current character id, the player id is not identical, and player IS selected...
			else if ($(this).hasClass("enemy") && $(this).attr("id") === characters[i].id && player.isSelected && $(this).attr("id") !== player.character.id) {
				
				//The enemy is now the selected character
				enemy.character = characters[i];
				enemy.health    = enemy.character.health;

				//Update DOM (name, health bar, hide carousel-2 controls, show attack btns)
				$("#enemyName").html(enemy.character.id);
				$(".enemyHealth").css("width", enemy.health + "%");
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

		enemy.health  -= (Math.floor(Math.random() * player.character.attack)) * player.multiplier;
		player.health -= Math.floor(Math.random() * enemy.character.attack);
		UpdateHealthBars(player.health, enemy.health);
	});

	//LIGHT ATTACK
	$("#light-button").on("click", function(){
		//Cycle through light saber sounds
		$(lightSabers[lightSounds]).trigger('play');
		(lightSounds < 2)? lightSounds++ : lightSounds = 0

		enemy.health  -= (Math.floor(Math.random() * player.character.lightAttack)) * player.multiplier;
		player.health -= Math.floor(Math.random() * enemy.character.lightAttack);
		UpdateHealthBars(player.health, enemy.health);
	});

	//Check health levels on every button click
	$(".btn").on("click", function(){
		
		//If enemy defeated
		if (enemy.health <= 0) {
			
			//Is the player a champion? Add to championWins. Else, add to wins
			(player.isChampion)? $("#CHAMPWINS").html("CHAMPION WINS: " + (player.champWins++)) : player.wins++
			player.multiplier += 0.05; //Increase player.multiplier
			player.health      = player.character.health; //Refill playerHealth

			//Update DOM
			$("#enemyName").html("OPPONENT");
			$("#heavy-button, #light-button").hide();
			$("#carousel-2-prev, #carousel-2-next, #indicators-2").show();
			$("#WINS").html("WINS: " + player.wins);
			UpdateHealthBars(player.health, enemy.health);

			//Check if the enemy's lightsaber is in player inventory
			if (player.character.sabers.indexOf(enemy.character.sabers[0]) == -1) {
				player.character.sabers.push(enemy.character.sabers[0]);
				$("#SABERS").html("LIGHTSABERS: " + player.character.sabers);
			}

			//Check if all lightsabers acquired
			if (player.character.sabers.length === characters.length && !player.isChampion) {
				alert("YOU ARE THE GALACTIC CHAMPION!");
				player.isChampion = true;
			}
		}

		//If player defeated
		if (player.health <= 0) {
			
			//Update selection, champion status, multiplier, losses
			player.isSelected = false, player.isChampion = false;
			player.multiplier = 1.00;
			player.losses    += 1;

			//Remove all acquired sabers and update the inventory
			player.character.sabers.length = 1;
			$("#SABERS").html("LIGHTSABER: " + player.character.sabers);

			//Update the DOM (names, losses, hide attack btns, health bars, show carousel controls)
			$("#playerName").html("PLAYER");
			$("#enemyName").html("OPPONENT");
			$("#LOSSES").html("LOSSES: " + player.losses);
			$("#heavy-button, #light-button").hide();
			$("#carousel-1-prev, #carousel-1-next, #indicators-1, #carousel-2-prev, #carousel-2-next, #indicators-2").show();
		}
	});

	//Character constructor
	function Character(id, health, attack, lightAttack, sabers) {
		this.id     = id;
		this.health = health;
		this.attack = attack;
		this.lightAttack = lightAttack;
		this.sabers = sabers;
	}

	function UpdateHealthBars(playerHealth, enemyHealth) {
		$(".playerHealth").css("width", playerHealth + "%");
		$(".enemyHealth").css("width", enemyHealth + "%");
	}
});