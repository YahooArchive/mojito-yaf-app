/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

YUI.add('mojito-test-mojits', function (Y, NAME) {

    function TestMojit1() {
        TestMojit1.superclass.constructor.apply(this);
    }

    Y.extend(TestMojit1, Y.mojito.Mojit,
        {
            init: function() {
            },
            index: function() {
                //  Just need a test to say we got here.
                Y.Assert.areEqual('foo', 'foo');
            }
        }
    );

    Y.namespace('mojito').TestMojit1 = TestMojit1;

}, '0.0.1', {requires: ['mojito-yaf', 'test']});

YUI({
useConsoleOutput: true,
useBrowserConsole: true,
logInclude: { TestRunner: true }
}).use('mojito-yaf', 'mojito-test-mojits', 'node', 'node-event-simulate', 'test', 'app', function (Y) {

    var suite = new Y.Test.Suite('mojito-dispatch tests'),
        A = Y.Assert,
        OA = Y.ObjectAssert,

        msg;

    suite.add(new Y.Test.Case({

        name: 'instantiation',

        setUp: function() {
            Y.mApp = new Y.mojito.App();
            msg = Y.one('#Message');
        },

        tearDown: function() {
        },

        'test route navigation function': function() {
            Y.mApp.router.navigate('/TestMojit1:index');
        }

    }));

    Y.Test.Runner.add(suite);
});
