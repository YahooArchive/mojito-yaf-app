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

    /**
    * Constructor for the Binder class.
    *
    * @param mojitProxy {Object} The proxy to allow 
    * the binder to interact with its owning mojit. 
    * @class Binder
    * @constructor     
    */
    Y.namespace('mojito.binders')[NAME] = {
    /**
    * Binder initialization method, invoked 
    * after all binders on the page have 
    * been constructed.    
    */
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;

            //  Listen for the 'broadcast-detail-link' event. This will have
            //  been fired when someone clicks on a picture in the photos view
            //  and will bubble up from there to our master mojit.
            this.mojitProxy.listen('broadcast-detail-link', function(payload) {

                //  The photos view sent us the largeUrl and the title.
                var largeUrl = payload.data.largeUrl;
                var title = payload.data.title;

                //  Tell the mojitProxy to refresh the view, using our largeUlr
                //  and the title.
                mojitProxy.refreshView({
                    params: {
                        url: {
                            largeUrl: largeUrl,
                            title: title
                        }
                    }
                });
            });
        }
    };
}, '0.0.1', {requires: ['mojito-client']});
