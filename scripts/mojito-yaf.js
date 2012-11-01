YUI.add('mojito-yaf', function (Y, NAME) {

    var MOJITO_NS = Y.namespace('mojito');

    MOJITO_NS.App = Y.Base.create('App', Y.Base, [],
        {
            _yApp: null,
            router: null,

            init: function () {
                this._yApp = new Y.App();
                this.router = new Y.mojito.Router(this);
            },

            addMojitToRoutes: function (aMojit) {
                this.router.addMojitToRoutes(aMojit);
            },

            logMessage: function (msg) {
                Y.one('#Message').set('text', Y.one('#Message').get('text') +
                                                ' || ' + msg);
            }
        }
    );

    //  ---

    MOJITO_NS.Router = Y.Base.create('Router', Y.Base, [],
        {
            mApp: null,

            init: function (mApp) {

                this.mApp = mApp;

                //  Add a generic route for mojit dispatching
                this.mApp._yApp.route('/*mojitID:*action',
                              this.dispatchToMojit.bind(this));

                mApp._yApp.on('navigate', function (e) {
                    mApp.logMessage('Navigated to: ' + e.url);
                });
            },

            addMojitToRoutes: function (aMojit) {
                //  Add the mojit as an event target
                this.addTarget(aMojit);
            },

            dispatchToMojit: function (req, res, next) {
                var mojitID,
                    mojitAction;

                //  Right now, mojitID is unused... do we need it?
                mojitID = req.params.mojitID;
                mojitAction = req.params.action;

                //  Fire an event - the mojits should be listening
                this.fire('mojit:' + mojitAction);

                //  Call the next most-specific handler.
                next();
            },
            navigate: function (url) {
                return this.mApp._yApp.navigate(url);
            }
        }
    );

    //  ---

    //  This class is a temporary mock up of the upcoming Y.template
    //  functionality.

    MOJITO_NS.Template = Y.Base.create('Template', Y.Base, [],
        {
            _renderer: null,

            init : function (renderer) {

                var templateRenderer;

                if (!(templateRenderer = renderer)) {
                    templateRenderer = {render:
                                         function (template, data) {
                                            return Y.Lang.sub(template, data);
                                            }
                                         };
                }

                this.set('_renderer', templateRenderer);
            },

            render: function (template, data) {
                return this.get('_renderer').render(template, data);
            }
        }
    );

    //  ---

    MOJITO_NS.View = Y.Base.create('View', Y.View, [],
        {
            autoBindings: null,

            templateObj: new Y.mojito.Template(),

            initializer: function (params) {
                var model,
                    container;

                model = this.get('model');
                model.after('change', this.render, this);

                container = Y.Node.create('<div id="' + params.id + '" class="mojit"></div>');
                Y.one('body').append(container);
                container.getDOMNode()._mojit = params.mojit;

                this.set('container', container);
            },

            getChildMojitNodes: function () {
                return this.get('container').all('.mojit').getDOMNodes();
            },

            render: function () {
                var container,
                    html;

                container = this.get('container');
                html = this.get('templateObj').render(
                                                    this.get('template'),
                                                    this.get('model').toJSON());
                container.append(html);
            },

            setupBindings: function () {

                //  The default implementation of this method sets up a
                //  Y.mojito.View's "autoBindings"
                var autos,
                    i,

                    mojitEvent;

                autos = this.get('autoBindings');

                for (i = 0; i < autos.length; i++) {

                    //  Capture this outside of the nested function
                    mojitEvent = autos[i].mojitEvent;

                    Y.one(autos[i].selector).on(
                            autos[i].domEvent,
                            function () {
                                this.fire(mojitEvent);
                            }.bind(this));
                }

               return;
            }
        }
    );

    //  ---

    MOJITO_NS.Mojit = Y.Base.create('Mojit', Y.Base, [],
        {
            id: null,

            models: null,
            views: null,
            controller: null,

            mojitEvents: null,

            initializer : function (params) {

                var id = params.id;

                this.set('id', id);

                this.set('models', {});
                this.set('views', {});
            },

            addViewForKey: function (viewObj, keyName) {
                this.get('views')[keyName] = viewObj;

                //  Tell the view to set up its event bindings
                viewObj.setupBindings();

                //  Register to receive events 'bubbling' from our views
                viewObj.addTarget(this);
            },

            getChildMojits: function () {
                var ourViews,
                    i,

                    childMojitNodes,
                    childMojits;

                //  We might have multiple views which contain mojit references
                ourViews = this.get('views');

                for (i = 0; i < ourViews.length; i++) {
                    childMojitNodes = ourViews[i].getChildMojitNodes();
                    childMojits = childMojitNodes.map(
                                    function (aNode) {
                                        return aNode._mojit;
                                    });
                }
            },

            setupEventObservations: function () {
                var evts = this.get('mojitEvents'),
                    i,

                    evtName,
                    methodName;

                for (i = 0; i < evts.length; i++) {
                    evtName = evts[i];
                    methodName = 'on' + evtName.replace(/(.+):(.+)/,
                            function(whole, prefix, name) {
                                return prefix[0].toUpperCase() +
                                       prefix.slice(1) +
                                       name[0].toUpperCase() +
                                       name.slice(1);
                            });

                    this.on(evtName, this[methodName].bind(this));
                }
            },
        }
    );

    Y.mojito.Mojit.findAllMojits = function () {
        var allMojitNodes,
            allMojits;

        allMojitNodes = Y.all('.mojit');

        allMojits = {};

        allMojitNodes.each(function (yNode) {
                                var mojit;
                                
                                mojit = yNode.getDOMNode()._mojit;
                                allMojits[mojit.get('id')] = mojit;
                            });

        return allMojits;
    }

}, '0.0.1', {
    requires: [
        'base',
        'app'
    ]
});
