YUI.add('mojito-yaf', function (Y, NAME) {

    Y.namespace('mojito').App = Y.Base.create('App', Y.Base, [],
        {
            _yApp: null,
            router: null,

            init: function() {
                this._yApp = new Y.App();
                this.router = new Y.mojito.Router(this);
            },

            logMessage: function(msg) {
                Y.one('#Message').set('text', Y.one('#Message').get('text') +
                                                ' || ' + msg);
            }
        }
    );

    //  ---

    Y.namespace('mojito').Router = Y.Base.create('Router', Y.Base, [],
        {
            mApp: null,

            init: function (mApp) {

            var mojitNames = ['testMojit1'],
                mojitActions = ['index'],
                i;

                this.mApp = mApp;

                var mojitDispatcher = function (req, res, next) {
                    var   fullMojitID,
                          mojitParts,

                          mojitName,
                          mojitAction,
        
                          targetMojit;

                    fullMojitID = req.path.slice(req.path.lastIndexOf('/') + 1);
                    mojitParts = fullMojitID.split(':');

                    mojitName = mojitParts[0];
                    mojitAction = mojitParts[1];

                    targetMojit = Y.mojito[mojitName];

                    //  Dispatch to the mojit. Right now a Function call, but
                    //  that'll need to change - heh ;-)
                    targetMojit[mojitAction]();

                    //  Call the next most-specific handler.
                    next();
                };

                for (i=0; i < mojitNames.length; i++) {
                    mApp._yApp.route('/' + mojitNames[i] + ':' + mojitActions[i],
                                  mojitDispatcher);
                }

                mApp._yApp.route('*', function (req) {
                    mApp.logMessage('Got to: ' + req.path);
                });

                mApp._yApp.on('navigate', function (e) {
                    mApp.logMessage('Navigated to: ' + e.url);
                });
            },
            navigate: function(url) {
                return this.mApp._yApp.navigate(url);
            }
        }
    );

    //  ---

    Y.namespace('mojito').Renderer = Y.Base.create('Renderer', Y.Base, [],
        {
            execute: function (template, data) {
                //  Abstract super method
            }
        }
    );

    //  ---

    Y.namespace('mojito').StandardRenderer = Y.Base.create('StandardRenderer', Y.mojito.Renderer, [],
        {
            execute: function (template, data) {
                return Y.Lang.sub(template, data);
            }
        }
    );

    //  ---

    Y.namespace('mojito').HandlebarsRenderer = Y.Base.create('HandlebarsRenderer', Y.mojito.Renderer, [],
        {
            execute: function (template, data) {
                var templateFunc;

                templateFunc = Handlebars.compile(template);

                //  If we got a valid template Function
                if (typeof(templateFunc) == 'function') {
                    return templateFunc(data);
                }
            }
        }
    );

    //  ---

    Y.namespace('mojito').View = Y.Base.create('View', Y.View, [],
        {
            //  By default, we use a Y.mojito.StandardRenderer
            renderer: new Y.mojito.StandardRenderer(),

            initializer: function () {
                var model = this.get('model');

                this.set('renderer', new Y.mojito.StandardRenderer());

                model.after('change', this.render, this);
            },
            render: function () {
                return this.get('renderer').execute(this.get('template'),
                                                    this.get('model').toJSON());
            }
        }
    );

    //  ---

    Y.namespace('mojito').Controller = Y.Base.create('Controller', Y.Base, [],
        {
            init : function () {
                alert('got to the Controller::init function');
            }
        }
    );

    //  ---

    Y.namespace('mojito').Mojit = Y.Base.create('Mojit', Y.Base, [],
        {
            id: null,

            models: null,
            views: null,
            controller: null,

            initializer : function (params) {

                var id = params.id;

                this.set('id', id);

                this.set('models', {});
                this.set('views', {});

                this.set('container', Y.Node.create('<div id="' + id + '" class="mojit"/>'));
            }
        }
    );

}, '0.0.1', {requires: ['base', 'app']});
