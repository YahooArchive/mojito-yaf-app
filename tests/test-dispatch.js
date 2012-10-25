/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

YUI.add('mojito-test-mojits', function (Y, NAME) {

    Y.namespace('mojito').TestView1 = Y.Base.create('TestView1', Y.mojito.View, [],
        {
            initializer: function () {
                //  Regular Y.Lang sub template
                //this.set('template', 'The msg is: {msg}');

                //  Handlebars template
                this.set('template', 'The msg is: {{msg}}');

                //  "Automatic" event bindings
                this.set('autoBindings',
                         [{selector: '#saveMsgButton',
                           domEvent: 'click',
                           mojitEvent: 'mojit:saveMsg'}]);
            },
            setupBindings: function () {
                //  Make sure and set up the auto bindings
                this.constructor.superclass.setupBindings.apply(this, arguments);

                Y.one('#setMsgButton').on(
                        'click',
                        function () {
                            this.fire('mojit:setMsg',
                                      {msg: Y.one('#setMsgText').get('value')});
                        }.bind(this));
            },
        }
    );

    Y.namespace('mojito').TestMojit1 = Y.Base.create('TestMojit1', Y.mojito.Mojit, [],
        {
            initializer: function () {
                var msgModel;
                var msgView;
               
                msgModel = new Y.Model({'msg': 'Howdy!'});
                this.get('models')['msgHolder'] = msgModel;

                msgView = new Y.mojito.TestView1({model: msgModel,
                                                    id: this.get('id')});
                msgView.set('templateObj', new Y.mojito.Template(Y.Handlebars));
                this.addViewForAction(msgView, 'msgView');

                this.set('mojitEvents', ['mojit:setMsg', 'mojit:saveMsg']);

                this.setupEventObservations();
            },
            onMojitSetMsg: function (evt) {
                this.get('models')['msgHolder'].set('msg', evt.msg);
            },
            onMojitSaveMsg: function (evt) {
                alert('save to model');
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

        setUp: function () {
            Y.mApp = new Y.mojito.App();
            msg = Y.one('#Message');

            Y.mojito.testMojit1 = new Y.mojito.TestMojit1({id: 'testMojit1'});
        },

        tearDown: function () {
        },

        'test route navigation function': function () {
            Y.mApp.router.navigate('/testMojit1:index');
            //Y.Assert.areEqual(Y.one('#testMojit1').get('text'),
            //                    'The msg is: Hey pal!');
        }

    }));

    Y.Test.Runner.add(suite);
});
