/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

YUI({
useConsoleOutput: true,
//useBrowserConsole: true,
logInclude: { TestRunner: true }
}).use('mojito-yaf', 'mojito-test-mojits', 'node', 'node-event-simulate', 'test', 'app', function (Y) {

    var suite = new Y.Test.Suite('mojito-dispatch tests'),
        A = Y.Assert,
        OA = Y.ObjectAssert,

        msg;

    suite.add(new Y.Test.Case({

        name: 'instantiation',

        setUp: function () {
            msg = Y.one('#Message');

            Y.mApp = new Y.mojito.App();

            //  create a new mojit - this will register itself using the DOM so
            //  that we can find it.
            var msgMojit = new Y.mojito.MsgMojit({id: 'msgMojit'});

            Y.mApp.addMojitToRoutes(msgMojit);
        },

        tearDown: function () {
        },

        'test route navigation function': function () {
            //Y.mApp.router.navigate('/msgMojit:index');
            //Y.Assert.areEqual(Y.one('#msgMojit').get('text'),
            //                    'The msg is: Hey pal!');
        }

    }));

    Y.Test.Runner.add(suite);
});
