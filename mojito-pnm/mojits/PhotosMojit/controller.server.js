/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/*jslint anon:true, sloppy:true, nomen:true*/

YUI.add('PhotosMojit', function (Y, NAME) {

    var PAGE_SIZE = 100;

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
            var page = 0,
                start,
                model = actionContext.models.PhotosMojitModel;

            if (actionContext.params.hasOwnProperty('merged')) {
                page = actionContext.params.merged('page');
            } else {
                page = actionContext.params.getFromUrl('page');
            }

            page = parseInt(page, 10) || 1;
            if ((!page) || (page < 1)) {
                page = 1;
            }

            // Page param is 1 based, but the model is 0 based       
            start = (page - 1) * PAGE_SIZE;

            // Data is an array of images
            model.getData('mojito', start, PAGE_SIZE, function(data) {

                Y.log('DATA: ' + Y.dump(data));

                var theData = {
                    data: data // images
                };

                actionContext.done(theData);
            });
        }
    };

}, '0.0.1', {requires: ['dump']});
