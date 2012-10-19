YUI.add('mojito-yaf', function (Y, NAME) {

    function App() {
        App.superclass.constructor.apply(this);
    }

    Y.extend(App, Y.Base,
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

    Y.namespace('mojito').App = App;

    //  ---

    function Controller() {
        Controller.superclass.constructor.apply(this);
    }

    Y.extend(Controller, Y.Base,
        {
            init: function () {
                alert('got to the Controller::init function');
            }
        }
    );

    Y.namespace('mojito').Controller = Controller;

    //  ---

    function Router(mApp) {
        Router.superclass.constructor.apply(this, [mApp]);
    }

    Y.extend(Router, Y.Base,
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

                    targetMojit = Y.mojito[mojitName]();

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

    Y.namespace('mojito').Router = Router;

    //  ---

    function Mojit() {
        Mojit.superclass.constructor.apply(this);
    }

    Y.extend(Mojit, Y.Base,
        {
            init: function () {
                alert('got to the Mojit::init function');
            }
        }
    );

    Y.namespace('mojito').Mojit = Mojit;

}, '0.0.1', {requires: ['base', 'app']});
