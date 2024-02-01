define(['views/question-view', 'services/question-service'], function(
    questionView,
    questionService
) {
    const externals = {};
    const internals = {};

    externals.start = () => {
        internals.bindEventHandlers();
        questionView.render();
    };

    internals.bindEventHandlers = () => {
        questionView.bind('button', internals.buttonHandler);
    };

    internals.buttonHandler = () => {
        const questionIndex = Math.floor(Math.random() * 11);
        
        questionService.getQuestion(questionIndex, (question, answers) => {
            
            questionView.render(question, answers);
            
        });
        
    };

    return externals;
});
