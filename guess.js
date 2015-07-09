
$(document).ready(function(){
	var number;
	var num_guesses;
	var prev_guesses;
	var guesses_text;

	reset();

	$('.center-block').on('click', 'button', guess_num);

	//call function is enter is pressed
	$('.center-block').keydown(function(event){
		if(event.keyCode == 13){
			event.preventDefault();
			guess_num.call($('.center-block'));
		}
	});

	$('#hint').on('click', gameover);

	$('#new_game').on('click', reset);

	function guess_num(){
		var jumbo = $(this).closest('.jumbotron');
		var warning = jumbo.find('.help-block');
		var guess = jumbo.find('#guess');
		var input = +guess.val();
		var direction = '';

console.log(number);
		cleanup();

		//test to make sure that the number is a number between 0 and 100
		if(input>0 && input <100){

			//check to see if input is a repeat
			for(var i = 0; i<prev_guesses.length; i++){
				if(prev_guesses[i]==input){
					warning.text("You've already guessed that number.  Please pick a different one.");
					return null;
				}
			}


			//update the number of guesses left
			$('#count').text(num_guesses);

			//check to see if the number is right
			if(input == number){
				$('.setup').hide();
				jumbo.find('.win').html("<h1>" + number + "<br />You win!!</h1>");
				$('body').addClass('winner');
			}else{
				//check if input is higher or lower than the number
				if(input>number){
					direction = 'lower';
				}else{
					direction = 'higher';
				}

				//tell the player how they're doing.
				jumbo.find('.how_close').text("You're " + howfar(input) + '. Guess '+ direction);
				
				num_guesses--;
				prev_guesses.push(input);
				$('.guesses').html(guesses_text);


				if(num_guesses == -1){
					gameover();
				}
			}

		}else{
			//if the entry isn't a number between 1 and 100, change the input box border to red and 
			//show a warning
			guess.parent().addClass('has-error');
			warning.text('Please enter a valid number between 1 and 100');
		}
		
	}



	function howfar(input){
		var diff = Math.abs(input-number);
		var prev_diff = Math.abs(prev_guesses[prev_guesses.length-1] - number);

		//assign hot/red to input number depending on if it's closer than the previous guess
		//or if it's within 40 of the number (if it's the first guess)
		if((diff<prev_diff)||(isNaN(prev_diff)&& diff<40)){
			guesses_text += "<span class='hot'>" + input + "</span>, ";
		}else{
			guesses_text += "<span class='cold'>" + input + "</span>, ";
		}

		if(prev_guesses.length == 0){

			if(diff<10){
				return 'on fire';
			}else if(diff<20){
				return 'very hot';
			}else if(diff<30){
				return 'hot';
			}else if(diff<40){
				return 'warm';
			}else if(diff<50){
				return 'cool';
			}else if(diff<60){
				return 'cold';
			}else if(diff<70){
				return 'ice cold';
			}else{
				return 'in antartica';
			}
		}else{
			if(diff<prev_diff){
				return 'getting warmer!';
			}else{
				return 'getting colder :(';
			}
		}
		

	}

	function gameover(){
		$('.how_close').html('Game over! <br /> The number is: ' + number);
		$('.form-group').hide();
		$('#count').text('0');

	}


	//reset or start a new game
	function reset(){
		number = Math.floor(Math.random()*100)+1;
		num_guesses = 4;
		prev_guesses = [];
		guesses_text = "Previous guesses: ";

		$('body').removeClass('winner');
		$('.blankstart').text('');
		$('.setup').show();
		$('#count').text('5');
	}

	function cleanup(){
		$('#guess').val('');
		$('.help-block').text('');
		$('#guess').parent().removeClass('has-error');

	}
});