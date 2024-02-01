define(function () {

    const internals = {

        data: null,
        apiUrl: "https://opentdb.com/api.php?amount=25&type=multiple",
        repeatedAnswers: [],
        answers: [],
        chosenQuestions: [], // New array to keep track of chosen questions
        totalQuestions: 11,  // Total number of questions
        answeredQuestions: 0,
    };

    const externals = {};


    internals.question = (async function getObject() {
        const result = await fetch(internals.apiUrl);
        const data = await result.json();
        internals.data = data.results;
        console.log(internals.data);

    })();

    externals.getQuestion = (index, cb) => {

        const chosenQuestion = internals.data[index];

        if (internals.chosenQuestions.includes(chosenQuestion)) {
            // If the question has already been chosen, get a new random index
            return externals.getQuestion(Math.floor(Math.random() * internals.data.length), cb);
        }

        internals.chosenQuestions.push(chosenQuestion);

        // Clear the answers array for each new question
        internals.answers = [];
        internals.answers.push(chosenQuestion.correct_answer);
        internals.answers.push(chosenQuestion.incorrect_answers[0]);
        internals.answers.push(chosenQuestion.incorrect_answers[1]);
        internals.answers.push(chosenQuestion.incorrect_answers[2]);

        cb(chosenQuestion, internals.answers);

        // Check if all questions have been answered
        internals.answeredQuestions++;
        if (internals.answeredQuestions === internals.totalQuestions) {
            window.location.hash = '#details'
        }

    };
    return externals;
});

