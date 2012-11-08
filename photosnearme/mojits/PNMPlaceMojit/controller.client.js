/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

YUI.add('pnm-place-mojit', function (Y, NAME) {

    var MOJITO_NS = Y.namespace('mojito');
    var PNM_NS = Y.namespace('PNM');

    PNM_NS.PlaceMojitView = Y.Base.create('PlaceMojitView', MOJITO_NS.View, [],
        {
            getDOMAttachPoint: function () {
                return Y.one('#mainMojit');
            }
        }, {
            ATTRS: {
                'templateLocation': {value: 'mojits/PNMPlaceMojit/templates/index.hb.html'},
            }
        }
    );

    //  ---

    PNM_NS.PlaceMojitHandler = Y.Base.create('PlaceMojitHandler', MOJITO_NS.Handler, [],
        {
        }, {
            ATTRS: {
               routes: {value: [{route: '/places/:id', event: 'mojit:placeChange'}]}
            }
        }
    );

    //  ---

    PNM_NS.PlaceMojit = Y.Base.create('PlaceMojit', MOJITO_NS.Mojit, [],
        {
            initializer: function () {
                var msgView;
               
                msgView = new PNM_NS.PlaceMojitView({id: this.get('id'),
                                                        mojit: this});
                msgView.set('templateEngine',
                             new MOJITO_NS.Template(Y.Handlebars));

                msgView.loadTemplate();
                msgView.render();

                this.addViewNamed(msgView, 'indexView');

                this.setupEventObservations();
            },

            onMojitPlaceChange: function (evt) {
                var place;

                debugger;

                place = new Place({id: evt.params.id});
                place.load(function () {
                    this.getViewNamed('placeView').render(place);
                });
            }

        }, {
            ATTRS: {
                mojitEvents: {value: ['mojit:placeChange']},
                handlerType: {value: PNM_NS.PlaceMojitHandler}
            }
        }
    );

}, '0.0.1', {
    requires: [
        'mojito-yaf',
        'handlebars'
    ]
});
