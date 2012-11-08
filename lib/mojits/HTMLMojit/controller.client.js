/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

YUI.add('HTMLMojit', function (Y, NAME) {

    var MOJITO_NS = Y.namespace('mojito');

    MOJITO_NS.HTMLMojitView = Y.Base.create('HTMLMojitView', Y.mojito.View, [],
        {
            initializer: function () {
                //  Handlebars template
                this.set('template', '<span>Foofy!</span>');
            }
        }
    );

    //  ---

    MOJITO_NS.HTMLMojitHandler = Y.Base.create('HTMLMojitHandler', Y.mojito.Handler, [],
        {
        }, {
            ATTRS: {
                routes: {value: [{route: '/', event: 'mojit:index'}]}
            }
        }
    );

    //  ---

    MOJITO_NS.HTMLMojit = Y.Base.create('HTMLMojit', Y.mojito.Mojit, [],
        {
            initializer: function () {
                var msgView;
               
                msgView = new Y.mojito.HTMLMojitView({id: this.get('id'),
                                                        mojit: this});
                msgView.set('templateEngine',
                             new Y.mojito.Template(Y.Handlebars));

                msgView.loadTemplateFrom('http://localhost/~bedney/mojito-yaf/lib/mojits/HTMLMojit/templates/index.hb.html');
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
