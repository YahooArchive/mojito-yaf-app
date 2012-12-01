/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/*jslint anon:true, sloppy:true, nomen:true*/

YUI.add('LightboxMojit', function (Y, NAME) {

    /**
    * Constructor for the Controller class.
    * @class Controller     
    * @constructor     
    */
    Y.namespace('mojito.controllers')[NAME] = {
        init: function(config) {
            this.config = config;
        },
        index: function(actionContext) {

            //  If there is real data for largeUrl and title, then render the
            //  lightbox with them by sending the data to the 'done' method,
            //  invoking the view rendering.
            var largeUrl = actionContext.params.merged('largeUrl') || null;
            var title = actionContext.params.merged('title') || null;
            if (largeUrl) {
                actionContext.done({photo:
                                        {
                                            largeUrl: largeUrl,
                                            title: title
                                        }
                                    });
            } else {
                //  Otherwise, nothing to render.
                actionContext.done();
            }
        }
    };

}, '0.0.1', {requires: ['dump']});
