/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/*jslint anon:true, sloppy:true, nomen:true*/

YUI.add('PhotosMojitBinder', function (Y, NAME) {
    /** 
    * The PhotosMojitBinder module. 
    * @module PhotosMojitBinder 
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
        },
        bind: function(node) {
            var mp = this.mojitProxy;
            node.all('li.photo a').on('click', function(evt) {
                evt.halt();

                var largeUrl = evt.currentTarget.getDOMNode().getAttribute('data-large-url');
                var title = evt.currentTarget.one('img').get('title');

                mp.broadcast('detail-link', {largeUrl: largeUrl,
                                                title: title});
            });
        }
    };
}, '0.0.1', {requires: ['yql', 'io', 'dump', 'mojito-client']});
