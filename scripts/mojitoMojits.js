YUI.add('testMojit1', function (Y, NAME) {

    Y.namespace('mojito')[NAME] = {
        index: function () {
            Y.mojito.mojitoDriver.logMessage('Got to index function of testMojit1');
        }
    };
}, '0.0.1');
