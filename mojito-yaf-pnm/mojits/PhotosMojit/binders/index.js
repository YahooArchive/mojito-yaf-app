/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/*jslint anon:true, sloppy:true, nomen:true*/

YUI.add('PhotosMojitBinder', function (Y, NAME) {

    var MOJITO_NS = Y.namespace('mojito');

    MOJITO_NS.PhotosMojitView = Y.Base.create('PhotosMojitView', MOJITO_NS.View, [],
        {
        }
    );

    //  ---

    MOJITO_NS.PhotosMojitHandler = Y.Base.create('PhotosMojitHandler', MOJITO_NS.Handler, [],
        {
            setupEventBindings: function () {
                //  Make sure and set up the auto bindings
                this.constructor.superclass.setupEventBindings.apply(
                                                         this, arguments);

                Y.all('li.photo a').on(
                        'click',
                        function (evt) {
                            var largeUrl,
                                title;

                            evt.halt();
                            largeUrl = evt.currentTarget.getDOMNode().getAttribute('data-large-url');
                            title = evt.currentTarget.one('img').get('title');

                            this.fire('mojit:showLightbox',
                                        {largeUrl: largeUrl, title: title});
                        }.bind(this));
            }
        }, {
            ATTRS: {
                eventBindings: {value: []}
            }
        }
    );

    //  ---

    MOJITO_NS.PhotosMojitModel = Y.Base.create('PhotosMojitModel', Y.Model, [],
        {
        }
    );

    //  ---

    MOJITO_NS.PhotosMojitController = Y.Base.create('PhotosMojitController', MOJITO_NS.Controller, [],
        {
            initializer: function (params) {
                var photosModel;
                var photosView;

                this.set('appObj', params.appObj);

                photosModel = new MOJITO_NS.PhotosMojitModel();

                photosView = new MOJITO_NS.PhotosMojitView(
                                                {model: photosModel,
                                                    id: this.get('id'),
                                                    mojit: this});
                photosView.set('templateEngine',
                             new MOJITO_NS.Template(Y.Handlebars));
                photosView.render();

                this.addViewNamed(photosView, 'photosView');

                this.setupEventObservations();
            },

            onMojitShowLightbox: function (evt) {
                this.get('appObj').navigate(
                        '/lightbox/show/' + encodeURIComponent(evt.largeUrl));
            },
        }, {
            ATTRS: {
                name: {value: 'photos'},
                controllerEvents: {value:
                            ['mojit:showLightbox']},
                handlerType: {value: MOJITO_NS.PhotosMojitHandler},
                routes: {value: []},
                appObj: {value: null}
            }
        }
    );

}, '0.0.1', {requires: ['yql', 'io', 'dump', 'mojito-yaf-client']});
