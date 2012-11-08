/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

YUI.add('TestRootMojit', function (Y, NAME) {

    var MOJITO_NS = Y.namespace('mojito');

    MOJITO_NS.TestRootMojitView = Y.Base.create('TestRootMojitView', Y.mojito.View, [],
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

    MOJITO_NS.TestRootMojitHandler = Y.Base.create('TestRootMojitHandler', Y.mojito.Handler, [],
        {
        }, {
            ATTRS: {
                routes: {value: [{route: '/', event: 'mojit:index'}]}
            }
        }
    );

    //  ---

    MOJITO_NS.TestRootMojit = Y.Base.create('TestRootMojit', Y.mojito.Mojit, [],
        {
            initializer: function () {
                var msgView;
               
                msgView = new Y.mojito.TestRootMojitView({id: this.get('id'),
                                                        mojit: this});
                msgView.set('templateEngine',
                             new Y.mojito.Template(Y.Handlebars));

                msgView.loadTemplate();
                msgView.render();

                this.addViewNamed(msgView, 'indexView');

                this.setupEventObservations();
            },

            onMojitIndex: function (evt) {
                console.log('got to TestRootMojit::index');
            }

        }, {
            ATTRS: {
                mojitEvents: {value: ['mojit:index']},
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
