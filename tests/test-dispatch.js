/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

YUI.add('mojito-test-mojits', function (Y, NAME) {

    var MOJITO_NS = Y.namespace('mojito');

    MOJITO_NS.MsgView = Y.Base.create('MsgView', Y.mojito.View, [],
        {
            initializer: function () {
                //  Regular Y.Lang sub template
                //this.set('template', 'The msg is: {msg}<br>');

                //  Handlebars template
                this.set('template', 'The msg is: {{msg}}<br>');
            }
        }
    );

    //  ---

    MOJITO_NS.MsgHandler = Y.Base.create('MsgHandler', Y.mojito.Handler, [],
        {
            setupEventBindings: function () {
                //  Make sure and set up the auto bindings
                this.constructor.superclass.setupEventBindings.apply(
                                                         this, arguments);

                Y.one('#setMsgButton').on(
                        'click',
                        function () {
                            this.fire('mojit:setMsg',
                                      {msg: Y.one('#setMsgText').get('value')});
                        }.bind(this));
            }
        }, {
            ATTRS: {
                eventBindings: {value:
                                 [{selector: '#saveMsgButton',
                                   domEvent: 'click',
                                   mojitEvent: 'mojit:saveMsg'}]},
                routes: {value: [{route: '/foo', event: 'foo:fooEvent'}]}
            }
        }
    );

    //  ---

    MOJITO_NS.MsgModel = Y.Base.create('MsgModel', Y.Model, [Y.ModelSync.Local],
        {
            root: 'mojito-test',
        }
    );

    //  ---

    MOJITO_NS.MsgMojit = Y.Base.create('MsgMojit', Y.mojito.Mojit, [],
        {
            initializer: function () {
                var msgModel;
                var msgView;
               
                msgModel = new Y.mojito.MsgModel({msg: 'Howdy!'});
                this.get('models')['msgHolder'] = msgModel;

                msgView = new Y.mojito.MsgView({model: msgModel,
                                                    id: this.get('id'),
                                                    mojit: this});
                msgView.set('templateEngine',
                             new Y.mojito.Template(Y.Handlebars));
                msgView.render();

                this.addViewNamed(msgView, 'msgView');

                this.setupEventObservations();
            },

            onMojitIndex: function (evt) {
                console.log('got to "mojit:index" event handler');
            },

            onMojitSetMsg: function (evt) {
                this.get('models')['msgHolder'].set('msg', evt.msg);
            },

            onMojitSaveMsg: function (evt) {
                this.get('models')['msgHolder'].save();
            },

            onFooFooEvent: function (evt) {
                console.log('got to "foo:fooEvent" event handler');
            }
        }, {
            ATTRS: {
                mojitEvents: {value:
                            ['mojit:index', 'mojit:setMsg', 'mojit:saveMsg',
                             'foo:fooEvent']},
                handlerType: {value: MOJITO_NS.MsgHandler}
            }
        }
    );

}, '0.0.1', {
    requires: [
        'mojito-yaf',
        'test',
        'handlebars',
        'gallery-model-sync-local'
    ]
});

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
