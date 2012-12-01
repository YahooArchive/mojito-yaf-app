/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/*jslint anon:true, sloppy:true, nomen:true*/

YUI.add('MasterMojitBinder', function (Y, NAME) {
    /** 
    * The MasterMojitBinder module. 
    * @module MasterMojitBinder 
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

            //  We listen for 'detail-link' events coming from our 'photos grid'
            //  child and then broadcast the 'broadcase-detail-link' event, in
            //  this case specifying that the receiver with an ID matching the
            //  lightbox
            mojitProxy.listen('detail-link', function(payload) {

                var children = mojitProxy.getChildren();
                var receiverID = children['lightbox'].viewId;

                mojitProxy.broadcast('broadcast-detail-link',
                    {largeUrl: payload.data.largeUrl,
                        title: payload.data.title},
                    {target: {viewId: receiverID}});
            });
        }
    };
}, '0.0.1', {requires: ['mojito-client']});
