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

                container.append(html);

                if (!container.inDoc()) {
                    Y.one('body').append(container);
                }

                debugger;
            }
        }
    );

    Y.namespace('mojito').TestMojit1 = Y.Base.create('TestMojit1', Y.mojito.Mojit, [],
        {
            initializer: function() {
                var msgModel;
                var msgView;
               
                msgModel = new Y.Model({'msg': 'Howdy!'});
                this.get('models')['index'] = msgModel;

                msgView = new Y.mojito.TestView1({model: msgModel,
                                                    id: this.get('id')});
                this.get('views')['index'] = msgView;

                msgView.set('templateObj', new Y.mojito.Template(Y.Handlebars));
            },
            index: function() {
                this.get('models')['index'].set('msg', 'Hey pal!');
            }
        }
    );

}, '0.0.1', {requires: ['mojito-yaf', 'test', 'handlebars']});

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
            //Y.Assert.areEqual(Y.one('#testMojit1').get('text'),
            //                    'The msg is: Hey pal!');
        }

    }));

    Y.Test.Runner.add(suite);
});
