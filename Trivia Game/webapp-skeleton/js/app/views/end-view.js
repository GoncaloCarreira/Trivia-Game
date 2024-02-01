define(['views/question-view'], (questionView) => {

    const internals = {};
    const externals = {};

    externals.render = (content) => {

        const container = document.getElementById('end-view');
        const container1 = document.getElementById('restart-btn')
        const container2 =document.getElementById('correct-answers');
        const container3 =document.getElementById('incorrect-answers');    

        // Clear the content of the 'app' div
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = '';
        
        container.innerHTML = '<p id="gameover">' + content + '</p>';
        container1.innerHTML = '<div class="restart-btn-container"><button id="restart">Play Again</button></div>';
        container2.innerHTML = '<h3 id="correct-answer"><strong>Correct Answers: ' + questionView.counter + '</strong></h3>';
        container3.innerHTML = '<h3 id="incorrect-answer"><strong>Incorrect answers: ' + questionView.counter2 + '</strong></h3>';

        $('#restart').on('click', function () {
            container.remove();
            container1.remove();
            window.location.hash = '#list'
            location.reload();
        })
    };

    return externals;
});
