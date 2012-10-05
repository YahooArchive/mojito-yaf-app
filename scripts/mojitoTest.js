YUI.add('mojitoTest', function (Y, NAME) {

    Y.namespace('mojito')[NAME] = {
        test1: function () {
            Y.appObj.navigate('/testMojit1:index');
        }
    };
}, '0.0.1');
