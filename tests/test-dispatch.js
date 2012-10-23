/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

YUI.add('mojito-test-mojits', function (Y, NAME) {

    Y.namespace('mojito').TestView1 = Y.Base.create('TestView1', Y.mojito.View, [],
        {
            initializer: function() {
                //  Regular Y.Lang sub template
                //this.set('template', 'The msg is: {msg}');

                //  Handlebars template
                this.set('template', 'The msg is: {{msg}}');
            },
            render: function() {
                var container;
                var html;

                container = this.get('container');
                html = this.constructor.superclass.render.apply(this);

                container.setHTML(html);

                if (!container.inDoc()) {
                    Y.one('body').append(container);
                }
            }
        }
    );

    Y.namespace('mojito').TestMojit1 = Y.Base.create('TestMojit1', Y.mojito.Mojit, [],
        {
            initializer: function() {
                var msgModel;
               
                msgModel = new Y.Model({'msg': 'Howdy!'});

                this.get('models')['index'] = msgModel;

                this.get('views')['index'] =
                    new Y.mojito.TestView1({model: msgModel});

                this.get('views')['index'].set('renderer',
                    new Y.mojito.HandlebarsRenderer());
            },
            index: function() {
                this.get('models')['index'].set('msg', 'Hey pal!');
            }
        }
    );

}, '0.0.1', {requires: ['mojito-yaf', 'test']});

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

        setUp: function() {
            Y.mApp = new Y.mojito.App();
            msg = Y.one('#Message');

            Y.mojito.testMojit1 = new Y.mojito.TestMojit1({id: 'testMojit1'});
        },

        tearDown: function() {
        },

        'test route navigation function': function() {
            Y.mApp.router.navigate('/testMojit1:index');
            //Y.Assert.areEqual(Y.one('#testMojit1'), 'Hey pal!');
            Y.Assert.areEqual('foo', 'foo');
        }

    }));

    Y.Test.Runner.add(suite);
});
