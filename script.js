$(document).ready(function() {
    let currentQuestionIndex = 0;
    let score = 0;
    const questions = [
        {
            text: "What is between the glass and rhino?",
            options: ["Dust", "Bugs", "Jason", "Who knows?"],
            answer: 2,
            image: "images/rhino.jpg",
            attempted: false // Flag to track if the question has been attempted
        },
        // {
        //     text: "What is this creature?",
        //     options: ["Satan", "Droid", "Just a Peep", "Squishy", "Something from Santa Cruz", "Ralph"],
        //     answer: 1,
        //     image: "images/peep.jpg",
        //     attempted: false // Flag to track if the question has been attempted
        // },
        // {
        //     text: "What was the original rendezvous point?",
        //     options: ["Starbucks", "Oga's Cantina", "Mars", "Atic", "Great America", "Star Tours"],
        //     answer: 5,
        //     image: "images/c3po.jpg",
        //     attempted: false // Flag to track if the question has been attempted
        // },
        // {
        //     text: "What does Thanos need?",
        //     options: ["Hair cut", "Loofah", "To get his ass kicked", "Breath Mints", "Infinity stones", "Kidney Stones"],
        //     answer: 1,
        //     image: "images/thanos.jpg",
        //     attempted: false // Flag to track if the question has been attempted
        // },
        // {
        //     text: "Which board game was used in a puzzle?",
        //     options: ["Monopoly", "Clue", "Khet", "Scrabble", "CAH", "Telestrations"],
        //     answer: 3,
        //     image: "images/cards.jpg",
        //     attempted: false // Flag to track if the question has been attempted
        // },
        // {
        //     text: "How many times did Mom curse at this?",
        //     options: ["About as many times as she cursed at Dad.", "What, Mom curse?", "10"],
        //     answer: 0,
        //     image: "images/circuit.jpg",
        //     attempted: false // Flag to track if the question has been attempted
        // },
        // {
        //     text: "How did you get the balloons off of the ceiling?",
        //     options: ["Waited until they deflated", "Nerf dart gun + Tacks", "Human sacrifice", "Jumped", "Poked them with a stick", "Called the fire department"],
        //     answer: 1,
        //     image: "images/balloons.jpg",
        //     attempted: false // Flag to track if the question has been attempted
        // },
        // {
        //     text: "What was put in the Easter Eggs as filler material?",
        //     options: ["Air", "Rice", "Confetti", "Glitter", "Rocks", "Bad puns"],
        //     answer: 5,
        //     image: "images/egg.jpg",
        //     attempted: false // Flag to track if the question has been attempted
        // },
        // {
        //     text: "Who is Ralph?",
        //     options: ["Wonder LLama", "Mega Beaver", "Super Cat", "Emperor Possum", "The Builder", "The Destroyer"],
        //     answer: 0,
        //     image: "images/ralph.jpg",
        //     attempted: false // Flag to track if the question has been attempted
        // },
       // Add more questions here, each with an 'attempted' property
    ];

    function displayQuestion() {
        const question = questions[currentQuestionIndex];
        $("#question-text").text(question.text);
        $("#answers-list").empty();
        $("#next-question").prop("disabled", true); // Ensure next question can't be accessed until the current one is answered correctly
        question.attempted = false; // Reset attempt flag for new question
        
        if(question.image) {
            $("#question-image").html(`<img src="${question.image}" alt="Question Image">`);
        } else {
            $("#question-image").empty();
        }

        question.options.forEach((option, index) => {
            $("#answers-list").append(`<li><button class="answer-btn" data-index="${index}">${option}</button></li>`);
        });
    }

    $(document).on("click", ".answer-btn", function() {
        const selectedOption = $(this).data("index");
        const question = questions[currentQuestionIndex];
        if(!question.attempted) {
            // If this is the first attempt
            question.attempted = true;
            if(selectedOption === question.answer) {
                score++;
                $("#correct-sound")[0].play();
                $(this).addClass("right-answer"); // Add CSS class for visual feedback of right answer
                $("#score").text(`Score: ${score}`);
                $("#next-question").prop("disabled", false); // Allow moving to the next question
            } else {
                $("#incorrect-sound")[0].play();
                $(this).addClass("wrong-answer"); // Add CSS class for visual feedback of wrong answer
            }
        } else {
            // If the question was already attempted, we don't increment the score but we allow for correction without score penalty
            if(selectedOption === question.answer) {
                $("#correct-sound")[0].play();
                $(this).addClass("right-answer"); // Add CSS class for visual feedback of right answer
                $("#next-question").prop("disabled", false); // Allow moving to the next question
            } else {
                $(this).addClass("wrong-answer"); // Further attempts at wrong answers
            }
        }
    });

    $("#next-question").click(function() {
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            // Game completed
            $("#victory-sound")[0].play();
        // Delay the alert by 3 seconds (3000 milliseconds) to give the sound time to play
        setTimeout(function() {
            alert("Congratulations! You've completed the game.");
            $("#final").prop("hidden", false); // Display the final message
        }, 3000);
        
        }
    });

    displayQuestion(); // Display the first question
    $("#score").text(`Score: ${score}`); // Initialize score display
});
