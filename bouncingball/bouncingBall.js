window.onload = function () {
	var messages = [
	  "Nice job!",
		"Excellent clickin'!",
		"That was Awesome!",
		"Man are you good!",
		"Boom!",
		"You're a pro!",
		"Unbelievable!",
		"Insanity!",
		"You're on fire!",
		"That was crazy!",
		"You are blowin' my mind!"
	];
	var levels = 0;
	var speed = 4;
	var oball = document.getElementById('ball');
	oball.onclick = function () {
		if(levels < 11) {
			flashMessage();
			speed -= 0.33;
			document.getElementById('ball').style.webkitAnimation = "bounce " + speed + "s infinite";
			console.log(document.getElementById('ball').style);
		} else {
			document.getElementById('congrats').innerHTML = "WINNER!";
			document.getElementById('nextLevel').innerHTML = "Holy cow! You won the whole freakin' thing!";
			document.getElementById('replay').style.display = "block";
			document.getElementById('ballContainer').style.display = "none";
			document.getElementById('messageContainer').style.display = "block";
		}
	}

	function flashMessage () {
		var message = messages[levels];

		document.getElementById('congrats').innerHTML = message;

		levels++;

		document.getElementById('level').innerHTML = levels + 1;

		document.getElementById('ballContainer').style.display = "none";
		document.getElementById('messageContainer').style.display = "block";

		setTimeout(function () {
			document.getElementById('ballContainer').style.display = "block";
			document.getElementById('messageContainer').style.display = "none";
		}, 3000);
	}
}