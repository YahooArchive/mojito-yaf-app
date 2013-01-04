/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

YUI.add('MsgMojit', function (Y, NAME) {

    var MOJITO_NS = Y.namespace('mojito');

    MOJITO_NS.MsgMojitView = Y.Base.create('MsgMojitView', MOJITO_NS.View, [],
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

    MOJITO_NS.MsgMojitHandler = Y.Base.create('MsgMojitHandler', MOJITO_NS.Handler, [],
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
                                   mojitEvent: 'mojit:saveMsg'}]}
            }
        }
    );

    //  ---

    MOJITO_NS.MsgMojitModel = Y.Base.create('MsgMojitModel', Y.Model, [Y.ModelSync.Local],
        {
            root: 'mojito-test',
        }
    );

    //  ---

    MOJITO_NS.MsgMojitController = Y.Base.create('MsgMojitController', MOJITO_NS.Controller, [],
        {
            initializer: function () {
                var msgModel;
                var msgView;

                msgModel = new MOJITO_NS.MsgMojitModel({msg: 'Howdy!'});
                this.get('models')['msgHolder'] = msgModel;

                msgView = new MOJITO_NS.MsgMojitView({model: msgModel,
                                                    id: this.get('id'),
                                                    mojit: this});
                msgView.set('templateEngine',
                             new MOJITO_NS.Template(Y.Handlebars));
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

            onFooBar: function (evt) {
                console.log('got to "foo:bar" event handler');
            }
        }, {
            ATTRS: {
                name: {value: 'msg'},
                controllerEvents: {value:
                            ['mojit:index', 'mojit:setMsg', 'mojit:saveMsg',
                             'foo:bar']},
                handlerType: {value: MOJITO_NS.MsgMojitHandler},
                routes: {value: [{route: '/foo', event: 'foo:bar'}]}
            }
        }
    );

}, '0.0.1', {
    requires: [
        'mojito-yaf',
        'handlebars',
        'gallery-model-sync-local'
    ]
});

