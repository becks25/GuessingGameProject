
$(document).ready(function(){
	var number;
	var num_guesses;
	var prev_guesses = [];
	reset();

	$('.center-block').on('click', 'button', guess_num);

	function guess_num(){
		var warning = $(this).closest('.center-block').find('.warning');
		var guess = $(this).closest('.center-block').find('#guess');
		var message = $(this).closest('.jumbotron').find('.how_close');
		var input = +guess.val();
		var hotness = '';
		var direction = '';
		var repeat = false;
		guess.css('border-color','#4cae4c');
		warning.text('');

		//test to make sure that the number is a number between 0 and 100
		if(input>0 && input <100){
			//check to see if input is a repeat
			for(var i = 0; i<prev_guesses.length; i++){
				if(prev_guesses[i]==input){
					repeat=true;
				}
			}

			if(repeat == true){
				warning.text("You've already guessed that number.  Please pick a different one.");
			}else{
				$('#count').text(num_guesses);
				//check to see if the number is right
				if(input == number){

				}else{
					//check if input is higher or lower than the number
					if(input>number){
						direction = 'lower';
					}else{
						direction = 'higher';
					}

					hotness = howfar(input);

					message.text('You are '+ hotness + '. Guess '+ direction);
					num_guesses = num_guesses-1;
					prev_guesses.push(input);

					if(num_guesses == -1){
						gameover();
					}
				}
			}
		}else{
			//if the entry isn't a number between 1 and 100, change the input box border to red and 
			//show a warning
			guess.css('border-color','red');
			warning.text('Please enter a valid number between 1 and 100');
		}
		
	}

	$('#hint').on('click', function(){
		gameover();

		$(this).closest('.row').find('.how_close').text('The number is: ' + number);
	});

	$('#new_game').on('click', reset);

	function howfar(input){
		var diff = Math.abs(input-number);
		var prev_diff = Math.abs(prev_guesses[prev_guesses.length-1] - number);

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
		$('.how_close').text('Game over!');
		$('.form-group').hide();
		$('#count').text('0');

	}

	//reset or start a new game
	function reset(){
		number = Math.floor(Math.random()*100);
		num_guesses = 4;
		prev_guesses = [];
		$('.form-group').show();
		$('.how_close').text('');
		$('#count').text('5');
		$('#guess').val('');
	}
});