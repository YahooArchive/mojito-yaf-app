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

                    //targetMojit = new Y.mojito[mojitName]();
                    targetMojit = new Y.mojito[mojitName];

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

    Y.namespace('mojito').Model = Y.Base.create('Model', Y.Model, [],
        {
            init: function () {
            }
        }
    );

    //  ---

    Y.namespace('mojito').View = Y.Base.create('View', Y.View, [],
        {
            initializer: function () {
                var model = this.get('model');

                model.after('change', this.render, this);
            }
        }
    );

    //  ---

    Y.namespace('mojito').Controller = Y.Base.create('Controller', Y.Base, [],
        {
            init: function () {
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

            init: function (id) {
                this.set('id', id);

                this.set('models', {});
                this.set('views', {});

                this.set('container', Y.Node.create('<div id="' + id + '" class="mojit"/>'));
            }
        }
    );

}, '0.0.1', {requires: ['base', 'app']});
