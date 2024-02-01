define(['views/end-view'], function (endView) {
    
    const externals = {};

    externals.start = () => {
        endView.render('GAMEOVER');
    };

    window.addEventListener('hashchange', function () {
        if (window.location.hash === '#details') {
            externals.start();
        }
    });

    return externals;
});

