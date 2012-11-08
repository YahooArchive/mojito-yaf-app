/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

YUI.add('HTMLMojit', function (Y, NAME) {

    var MOJITO_NS = Y.namespace('mojito');

    MOJITO_NS.HTMLMojitView = Y.Base.create('HTMLMojitView', MOJITO_NS.View, [],
        {
        }, {
            ATTRS: {
                'templateLocation': {value: null},
            }
        }
    );

    //  ---

    MOJITO_NS.HTMLMojitHandler = Y.Base.create('HTMLMojitHandler', MOJITO_NS.Handler, [],
        {
        }, {
            ATTRS: {
                routes: {value: null}
            }
        }
    );

    //  ---

    MOJITO_NS.HTMLMojit = Y.Base.create('HTMLMojit', MOJITO_NS.Mojit, [],
        {
            initializer: function () {
                var msgView;
               
                msgView = new MOJITO_NS.HTMLMojitView({id: this.get('id'),
                                                        mojit: this});
                msgView.set('templateEngine',
                             new MOJITO_NS.Template(Y.Handlebars));

                msgView.loadTemplate();
                msgView.render();

                this.addViewNamed(msgView, 'indexView');

                this.setupEventObservations();
            },

            onMojitIndex: function (evt) {
                console.log('got to HTMLMojit::index');
            }

        }, {
            ATTRS: {
                mojitEvents: {value: ['mojit:index']},
                handlerType: {value: MOJITO_NS.HTMLMojitHandler}
            }
        }
    );

}, '0.0.1', {
    requires: [
        'mojito-yaf',
        'handlebars'
    ]
});
