/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

YUI.add('pnm-root-mojit', function (Y, NAME) {

    var MOJITO_NS = Y.namespace('mojito');
    var PNM_NS = Y.namespace('PNM');

    PNM_NS.RootMojitView = Y.Base.create('RootMojitView', MOJITO_NS.View, [],
        {
            getDOMAttachPoint: function () {
                return Y.one('#mainMojit');
            }
        }, {
            ATTRS: {
                'templateLocation': {value: 'mojits/PNMRootMojit/templates/index.hb.html'},
            }
        }
    );

    //  ---

    PNM_NS.RootMojitHandler = Y.Base.create('RootMojitHandler', MOJITO_NS.Handler, [],
        {
        }, {
            ATTRS: {
                routes: {value: [{route: '/', event: 'mojit:index'}]}
            }
        }
    );

    //  ---

    PNM_NS.RootMojit = Y.Base.create('RootMojit', MOJITO_NS.Mojit, [],
        {
            initializer: function () {
                var msgView;
               
                msgView = new PNM_NS.RootMojitView({id: this.get('id'),
                                                        mojit: this});
                msgView.set('templateEngine',
                             new MOJITO_NS.Template(Y.Handlebars));

                msgView.loadTemplate();
                msgView.render();

                this.addViewNamed(msgView, 'indexView');

                this.setupEventObservations();
            },

            onMojitIndex: function (evt) {
                console.log('got to PNM_NS.RootMojit::index');
            }

        }, {
            ATTRS: {
                mojitEvents: {value: ['mojit:index']},
                handlerType: {value: PNM_NS.RootMojitHandler}
            }
        }
    );

}, '0.0.1', {
    requires: [
        'mojito-yaf',
        'handlebars'
    ]
});
