/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
YUI({
useConsoleOutput: true,
useBrowserConsole: true,
logInclude: { TestRunner: true }
}).use('mojitoDriver', 'testMojit1', 'node', 'node-event-simulate', 'test', 'app', function (Y) {

    var suite = new Y.Test.Suite('mojito-dispatch tests'),
        A = Y.Assert,
        OA = Y.ObjectAssert,

        msg;

    suite.add(new Y.Test.Case({

        name: 'instantiation',

        setUp: function() {
            var app = new Y.App();
            Y.appObj = app;
            Y.mojito.mojitoDriver.init();
        
            msg = Y.one('#Message');
        },

        tearDown: function() {
        },

        'test route navigation function': function() {
            Y.appObj.navigate('/testMojit1:index');

            Y.Assert.areEqual(msg.get('text'), ' || Navigated to: http://localhost/testMojit1:index');
        }

    }));

    Y.Test.Runner.add(suite);
});
