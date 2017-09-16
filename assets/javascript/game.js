//I intended to have one object for all characters, then modify the properties
	var darthVader = {
		id: "VADER",
		health: 100,
		attack: 21,
		lightAttack: 10,
		sabers: [" Vader's"]
	};
	var masterYoda = {
		id: "YODA",
		health: 100,
		attack: 20,
		lightAttack: 11,
		sabers: [" Yoda's"]
	};
	var kyloRen = {
		id: "KYLO",
		health: 100,
		attack: 21,
		lightAttack: 10,
		sabers: [" Kylo's"]
	};
	var reySkywalker = {
		id: "REY",
		health: 100,
		attack: 20,
		lightAttack: 11,
		sabers: [" Rey's"]
	};
	var lukeSkywalker = {
		id: "LUKE",
		health: 100,
		attack: 20,
		lightAttack: 11,
		sabers: [" Luke's"]
	};
	var characters = [darthVader, masterYoda, kyloRen, reySkywalker, lukeSkywalker];
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
		//All SOUND FILES HERE, I TRIED TO SHORTEN THIS WITH AN ARRAY AND LOOP, COULDN'T GET IT TO WORK
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
		//END OF SOUND FILES==========================================================================
		
		//Cycle through these sounds
		var heavySabers = [heavySaber, heavySaber2, heavySaber3];
		var heavySounds = 0;
		var lightSabers = [lightSaber, lightSaber2, lightSaber3];
		var lightSounds = 0;

		themeSong.loop = true;
		themeSong.play();
		//Hide buttons at start
		$("#heavy-button").hide();
		$("#light-button").hide();

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

			newEnemyHealth -= (Math.floor(Math.random() * player.attack)) * playerMultiplier;
			console.log(newEnemyHealth);
			newPlayerHealth -= Math.floor(Math.random() * enemy.attack);
			$(".bg-danger").css("width", newEnemyHealth + "%");
			$(".bg-success").css("width", newPlayerHealth + "%");
		
		});

		//LIGHT ATTACK HOVER EFFECT
		$("#light-button").hover(function(){
		hoverSaber2.play();
		});
		//LIGHT ATTACK
		$("#light-button").on("click", function(){
			//Cycle through light saber sounds
			lightSabers[lightSounds].play()
			lightSounds ++;
			if(lightSounds > 2){lightSounds = 0;}

			newEnemyHealth -= (Math.floor(Math.random() * player.lightAttack)) * playerMultiplier;
			newPlayerHealth -= Math.floor(Math.random() * enemy.lightAttack);
			$(".bg-danger").css("width", newEnemyHealth + "%");
			$(".bg-success").css("width", newPlayerHealth + "%");
		
		});
	
		//Check health levels on every button click
		$(".btn").on("click", function(){
			//If enemy dies
			if(newEnemyHealth <= 0){
				enemy.defeated = true;
				if(champion){
					winsAsChampion++;
					$("#CHAMPWINS").html("CHAMPION WINS: " + winsAsChampion);
				}
				else{wins += 1;}
				playerMultiplier += 0.01;
				newPlayerHealth = player.health;
				$("#enemyName").html("OPPONENT");
				$("#heavy-button").hide();
				$("#light-button").hide();
				$("#carousel-2-prev, #carousel-2-next, #indicators-2").show();
				$(".bg-danger").css("width", newEnemyHealth + "%");
				$(".bg-success").css("width", newPlayerHealth + "%");
				$("#WINS").html("WINS: " + wins);
				//Check if all lightsabers acquired
				if(!player.sabers.includes(enemy.sabers[0])){
					player.sabers.push(enemy.sabers[0]);
					$("#SABERS").html("LIGHTSABERS: " + player.sabers);
				}
				if(player.sabers.length === characters.length){
					if(!champion){
						alert("YOU ARE THE GALACTIC CHAMPION!");
						champion = true;
					}
				}
			}
			//If player dies
			if(newPlayerHealth <= 0){
				player.defeated = true;
				playerSelected = false;
				champion = false;
				playerMultiplier = 1.00;
				losses += 1;
				//Remove all acquired sabers
				for(var n = player.sabers.length - 1; n > 0; n--){
					player.sabers.pop();
					$("#SABERS").html("LIGHTSABER: " + player.sabers);
				}
				$("#playerName").html("PLAYER");
				$("#enemyName").html("OPPONENT");
				$("#heavy-button").hide();
				$("#light-button").hide();
				$("#carousel-1-prev, #carousel-1-next, #indicators-1").show();
				$("#carousel-2-prev, #carousel-2-next, #indicators-2").show();
				$(".bg-success").css("width", newPlayerHealth + "%");
				$(".bg-danger").css("width", newEnemyHealth + "%");
				$("#LOSSES").html("LOSSES: " + losses);
			}
		});
	});