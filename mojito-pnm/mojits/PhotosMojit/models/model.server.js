/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

/*jslint anon:true, sloppy:true, nomen:true*/

YUI.add('PhotosMojitModel', function(Y, NAME) {
    var API_KEY = '84921e87fb8f2fc338c3ff9bf51a412e';

    /** 
    * The PhotosMojitModel module.
    * @module PhotosMojitModel 
    */
    /**
    * Constructor for the Model class.
    * @class Model 
    * @constructor 
    */
    Y.namespace('mojito.models')[NAME] = {
        init: function(config) {
            this.config = config;
        },
        getData: function (query, start, count, callback) {
            var q = null;

            start = parseInt(start, 10) || 0;
            count = parseInt(count, 10) || 100;

            q = 'select * from flickr.photos.search(' + start +
                ',' + count + ') ' +
                'where text="' + 'Sunnyvale, CA' + '" ' +
                'and api_key="' + API_KEY + '"';

            Y.log('QUERY: ' + q);

            Y.YQL(q, function (rawData) {
                if (!rawData.query.results) {
                    callback([]);
                    return;
                }

                var rawImages = rawData.query.results.photo,
                    rawImage = null,
                    images = [],
                    image = null,
                    i = 0;

                for (i; i < rawImages.length; i += 1) {
                    rawImage = rawImages[i];
                    image = {
                        title: rawImage.title,
                        thumbUrl: 'http://farm' + rawImage.farm + '.static.flickr.com/' + rawImage.server + '/' + rawImage.id + '_' + rawImage.secret + '_s' + '.jpg',
                        largeUrl: 'http://farm' + rawImage.farm + '.static.flickr.com/' + rawImage.server + '/' + rawImage.id + '_' + rawImage.secret + '.jpg',
                        image_id: rawImage.id,
                    };

                    if (!image.title) {
                        image.title = "Generic Title: " + query;
                    }

                    images.push(image);
                }

                callback(images);
            });
        }
    };
}, '0.0.1', {requires: ['mojito', 'yql']});
