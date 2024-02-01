define(function () {

    const internals = {
        handlers: {},
        elements: {},
    };

    const externals = {
        counter: 0,
        counter2: 0
    };

    internals.createButton = () => '<button id="start">Start Game</button>';


    internals.createQuestion = (question, answers) => {

        internals.answer2 = [];

        while (answers.length > 0) {
            let randomIndex = Math.floor(Math.random() * answers.length);
            const removedElement = answers.splice(randomIndex, 1)[0];
            internals.answer2.push(removedElement);
        }

        return (
            '<div>' +
                '<h1 id="category"><strong>Category: </strong>' + question.category + '</h1>' +
                '<h2 id="correct-answer1"><strong>Correct Answers: </strong>' + externals.counter + '</h2>' + 
                '<h3 id="question"><strong>Question: </strong>' + question.question + '</h3>' +
                /*'<p><strong>Answer: </strong>' + question.correct_answer + '</p>' +*/
                '<div class="button-container">' + 
                    '<button id="btn1">' + internals.answer2[0] + '</button>' +
                    '<button id="btn2">' + internals.answer2[1] + '</button>' +
                    '<button id="btn3">' + internals.answer2[2] + '</button>' +
                    '<button id="btn4">' + internals.answer2[3] + '</button>' +
                '</div>' +
            '</div>'
        );
    };


    internals.renderQuestion = (question, answers) => {

        let btnPressed;

        if (internals.elements.questionCard) {
            internals.elements.questionCard.empty();
        }

        internals.elements.questionCard = $(internals.createQuestion(question, answers));
        internals.elements.app.append(internals.elements.questionCard);


        function handleButtonClick(index) {

            btnPressed = internals.answer2[index];

            if (question.correct_answer === btnPressed) {
                externals.counter++;
            }
            if (question.correct_answer !== btnPressed) {
                externals.counter2++;
            }

            internals.handlers['button'](internals.answer2[index]);
        }


        // Add click events to the buttons
        $('#btn1').on('click', function () {
            handleButtonClick(0);
        });

        $('#btn2').on('click', function () {
            handleButtonClick(1);
        });

        $('#btn3').on('click', function () {
            handleButtonClick(2);
        });

        $('#btn4').on('click', function () {
            handleButtonClick(3);
        });

        console.log(externals.counter);

    };


    internals.renderButton = () => {
        if (internals.elements.button) {
            return;
        }

        internals.elements.button = $(internals.createButton());
        internals.elements.button.click(internals.handlers['button']);
        internals.elements.app.append(internals.elements.button);
        $('#start').on('click', function (){
            $('#image-container').remove();
            internals.elements.button.remove();
        })
    };


    externals.bind = (event, handler) => internals.handlers[event] = handler;
    

    externals.render = (question, answers) => {
        internals.elements.app = $('#app');
        internals.renderButton();
        
        if (question && answers) {
            internals.renderQuestion(question, answers);
        }
    };

    return externals;
});
