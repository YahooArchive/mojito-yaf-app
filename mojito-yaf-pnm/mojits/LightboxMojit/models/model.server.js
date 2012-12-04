/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/*jslint anon:true, sloppy:true, nomen:true*/

YUI.add('LightboxMojitModel', function(Y, NAME) {

    /** 
    * The LightboxMojitModel module.
    * @module LightboxMojitModel 
    */
    /**
    * Constructor for the Model class.
    * @class Model 
    * @constructor 
    */
    Y.namespace('mojito.models')[NAME] = {
        init: function(config) {
            this.config = config;
        }
    };
}, '0.0.1', {requires: ['mojito', 'yql']});
