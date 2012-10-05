YUI.add('mojitoDriver', function (Y, NAME) {

    Y.namespace('mojito')[NAME] = {
        init: function() {

          var   mojitNames = ['testMojit1'],
                mojitActions = ['index'],
                i;

          var mojitDispatcher = function (req, res, next) {
              var   fullMojitID,
                    mojitParts,
                    mojitName,
                    mojitAction;

              fullMojitID = req.path.slice(req.path.lastIndexOf('/') + 1);
              mojitParts = fullMojitID.split(':');
              mojitName = mojitParts[0];
              mojitAction = mojitParts[1];

              //  Dispatch to the mojit. Right now a Function call, but that'll
              //  need to change - heh ;-)
              Y.mojito[mojitName][mojitAction]();

              //  Call the next most-specific handler.
              next();
          };

          for (i=0; i < mojitNames.length; i++) {
              Y.appObj.route('/' + mojitNames[i] + ':' + mojitActions[i],
                            mojitDispatcher);
          }

          Y.appObj.route('*', function (req) {
              Y.mojito.mojitoDriver.logMessage('Got to: ' + req.path);
          });

          Y.appObj.on('navigate', function (e) {
              Y.mojito.mojitoDriver.logMessage('Navigated to: ' + e.url);
          });
        },
        logMessage: function(msg) {
            Y.one('#Message').set('text', Y.one('#Message').get('text') +
                                            ' || ' + msg);
        }
    };
}, '0.0.1');
