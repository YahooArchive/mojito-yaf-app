/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/*jslint anon:true, sloppy:true, nomen:true*/

YUI.add('LightboxMojitBinder', function (Y, NAME) {
    /** 
    * The LightboxMojitBinder module. 
    * @module LightboxMojitBinder 
    */

    var MOJITO_NS = Y.namespace('mojito');

    MOJITO_NS.LightboxMojitView = Y.Base.create('LightboxMojitView', MOJITO_NS.View, [],
        {
            initializer: function (params) {
               //  Handlebars template¬
               this.set('template', '<div class="lightbox"><div class="photo"><img src="{{largeUrl}}" alt="A photo titled: {{title}}" /><div class="photo-info"><h2 class="photo-title"><a href="{{pageUrl}}" title="View on Flickr">{{title}}</a></h2></div></div></div></div>');
            }
        }
    );

    //  ---

    MOJITO_NS.LightboxMojitHandler = Y.Base.create('LightboxMojitHandler', MOJITO_NS.Handler, [],
        {
            setupEventBindings: function () {
                //  Make sure and set up the auto bindings
                this.constructor.superclass.setupEventBindings.apply(
                                                         this, arguments);
            }
        }, {
            ATTRS: {
                eventBindings: {value: []}
            }
        }
    );

    //  ---

    MOJITO_NS.LightboxMojitModel = Y.Base.create('LightboxMojitModel', Y.Model, [],
        {
        }
    );

    //  ---

    MOJITO_NS.LightboxMojitController = Y.Base.create('LightboxMojitController', MOJITO_NS.Controller, [],
        {
            initializer: function (params) {
                var lightboxModel;
                var lightboxView;

                this.set('appObj', params.appObj);

                lightboxModel = new MOJITO_NS.LightboxMojitModel({largeUrl: ''});
                this.get('models')['urlHolder'] = lightboxModel;

                lightboxView = new MOJITO_NS.LightboxMojitView(
                                                {model: lightboxModel,
                                                    id: this.get('id'),
                                                    mojit: this});
                lightboxView.set('templateEngine',
                             new MOJITO_NS.Template(Y.Handlebars));
                lightboxView.render();

                this.addViewNamed(lightboxView, 'lightboxView');

                this.setupEventObservations();
            },

            onLightboxShow: function (evt) {
                this.get('models')['urlHolder'].set(
                        'largeUrl', decodeURIComponent(evt.params.largeUrl));
            },
        }, {
            ATTRS: {
                name: {value: 'lightbox'},
                controllerEvents: {value: ['lightbox:show']},
                handlerType: {value: MOJITO_NS.LightboxMojitHandler},
                routes: {value: []},
                appObj: {value: null}
            }
        }
    );

}, '0.0.1', {requires: ['handlebars', 'mojito-yaf-client']});
