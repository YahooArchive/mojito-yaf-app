/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

YUI.add('TestRootMojit', function (Y, NAME) {

    var MOJITO_NS = Y.namespace('mojito');

    MOJITO_NS.TestRootMojitView = Y.Base.create('TestRootMojitView', MOJITO_NS.View, [],
        {
            getDOMAttachPoint: function () {
                return Y.one('#mainMojit');
            }
        }, {
            ATTRS: {
                'templateLocation': {value: 'tests/mojits/TestRootMojit/templates/index.hb.html'},
            }
        }
    );

    //  ---

    MOJITO_NS.TestRootMojitHandler = Y.Base.create('TestRootMojitHandler', MOJITO_NS.Handler, [],
        {
        }, {
            ATTRS: {
                routes: {value: [{route: '/', event: 'mojit:index'}]}
            }
        }
    );

    //  ---

    MOJITO_NS.TestRootMojitController = Y.Base.create('TestRootMojit', MOJITO_NS.Controller, [],
        {
            initializer: function () {
                var msgView;

                msgView = new MOJITO_NS.TestRootMojitView({id: this.get('id'),
                                                        mojit: this});
                msgView.set('templateEngine',
                             new MOJITO_NS.Template(Y.Handlebars));

                msgView.loadTemplate();
                msgView.render();

                this.addViewNamed(msgView, 'indexView');

                this.setupEventObservations();
            },

            onMojitIndex: function (evt) {
                console.log('got to TestRootMojitController::index');
            }

        }, {
            ATTRS: {
                controllerEvents: {value: ['mojit:index']},
                handlerType: {value: MOJITO_NS.TestRootMojitHandler}
            }
        }
    );

}, '0.0.1', {
    requires: [
        'mojito-yaf',
        'handlebars'
    ]
});
