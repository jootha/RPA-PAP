/** 
 * @ignore
 * @summary     Options for the 'ag2r.sso' library
 * @path        ag2r.options.sso
 * @class       ag2r.options.sso
 * @struct
 */
//ag2r.options.sso = {
 /** 
  * @summary    Trace level (see [[lib:common:ctx.enum#etracelevel|e.trace.level]])
  * @property   {e.trace.level} traceLevel
  * @path       ag2r.options.sso.traceLevel 
  */ 
//  traceLevel: e.trace.level.None
//};

/**
 * @ignore 
 * @constructor
 */
 ag2r.sso = (function () {
  /** @type {Object} */ /*var _options = ag2r.options.sso;*/
  // array used to memorize temporarly the sso parameters.
  // ex _map[App1][Page11]{login:..., password:'...', disabled:false}
  //               [Page12]{login:..., password:'...', disabled:false}
  //        [App2][Page21]{login:..., password:'...', disabled:false}
  var _map = {}; 

  var _initPage = function(pg) {
    if (pg && pg.parent && pg.parent.name && pg.name) {
      if (!_map[pg.parent.name])
        _map[pg.parent.name] = {};
      if (!_map[pg.parent.name][pg.name])
        _map[pg.parent.name][pg.name] = {};
      _map[pg.parent.name][pg.name] = {
        disabled: false,
        login: '',
        password: ''
      }
      return true;
    }
    return false;
  };

  var self = 
  /** @lends ag2r.sso */
  {
   /**
    * @method      clearCredentials
    * @summary     Clears credentials (login / password) saved in registry.
    * @description
    *
    * __Ex.:__
<code javascript>
ag2r.sso.clearCredentials(Mantis.pLogin);
</code>
    * @path        ag2r.sso.clearCredentials
    * @param       {ctx.page} pg Page
    * @return      {boolean} true for success, false otherwise
    */
    clearCredentials : function (pg) {
      ctx.notifyAction('ag2r.sso.clearCredentials');
      if (pg && pg.parent && pg.parent.name && pg.name) {
        var root = ctx.registry.getRoot("SSO") + pg.parent.name + "\\" + pg.name + "\\";
        ctx.registry.del(root + "Login", e.registry.root.CurrentUser);
        ctx.registry.del(root + "Password", e.registry.root.CurrentUser);
        if (_map[pg.parent.name][pg.name]) {
          _map[pg.parent.name][pg.name].login = '';
          _map[pg.parent.name][pg.name].password = '';
        }
        return true;
      }
      return false;
    },

   /**
    * @method      disable
    * @summary     Disables/enables automatic login SSO mechanism.
    * @description
    *
    * __Ex.:__
<code javascript>
// Disable mechanism
ag2r.sso.disable(Mantis.pLogin, false);
</code>
    * @path        ag2r.sso.disable
    * @param       {ctx.page} pg Page on which SSO mechanism is enabled
    * @param       {boolean} [state] SSO auto-login state : 'disable' (true) or 'enable' (false) (default is 'disable')
    * @return      {boolean} true for success, false otherwise
    */
    disable : function (pg, state) {
      ctx.notifyAction('ag2r.sso.disable');
      if (pg && _map[pg.parent.name] && _map[pg.parent.name][pg.name]) {
        _map[pg.parent.name][pg.name].disabled = (state === false ? false : true);
        return true;
      }
      return false;
    },
    
   /**
    * @method      getCredentials
    * @summary     Collects credentials from objects in page or from captured data.
    * @description
    * __Ex.:__
<code javascript>
Mantis.pLogin.events.UNLOAD.on(function(ev) {
  ag2r.sso.getCredentials(this.oUsername, this.oPassword, ev);
});
</code>
    * @advanced
    * @path        ag2r.sso.getCredentials
    * @param       {ctx.item} itLogin Page item to set login
    * @param       {ctx.item} itPassword Page item to set password
    * @param       {ctx.event} ev Current event with data XML string containing 'CaptData'
    * @return      {boolean} true for success, false otherwise
    */
    getCredentials : function (itLogin, itPassword, ev) {
      ctx.notifyAction('ag2r.sso.getCredentials');
      var pg = (itLogin ? itLogin.parent : null);
      if (pg) {
        _initPage(pg);
        var obj = {};
        if (pg.exist()) {
          obj.login = itLogin.get(true); // object is present : collect data
          obj.password = itPassword.get(true);
        }
        var xml;
        if (!obj.login) {
          // get data from 'CapturedData'
          obj.login = itLogin.getCaptData(ev);
        }
        if (!obj.password) {
          // get data from 'CapturedData'
          obj.password = itPassword.getCaptData(ev);
        }
        // store cyphered data in map
        if (obj.login || obj.password) {
          _map[pg.parent.name][pg.name].login = ctx.cryptography.protect(obj.login);
          _map[pg.parent.name][pg.name].password = ctx.cryptography.protect(obj.password);
          return true;
        }
      }
      return false;
    },

   /**
    * @method      isDisabled
    * @summary     Disables/enables automatic login SSO mechanism.
    * @description
    * __Ex.:__
<code javascript>
// diable mechanism
if (ag2r.sso.isDisabled(Mantis.pLogin)) { ... }
</code>
    * @path        ag2r.sso.isDisabled
    * @param       {ctx.page} pg Page on which SSO mechanism is enabled
    * @return      {boolean} Disabled state
    */
    isDisabled : function (pg) {
      var res = false;
      ctx.notifyAction('ag2r.sso.isDisabled');
      if (pg && _map[pg.parent.name] && _map[pg.parent.name][pg.name]) {
        res = (_map[pg.parent.name][pg.name].disabled ? true : false);
      }
      return res;
    },
    
   /**
    * @method      saveCredentials
    * @summary     Saves credentials to registry.
    * @description Credentials are previously saved in memory using 'ag2r.sso.getCredentials'.\\ \\
    *
    * __Ex.:__
<code javascript>
Mantis.pHome.events.LOAD.on(function(ev) {
  ag2r.sso.saveCredentials(Mantis.pLogin);
});
Mantis.pMyDisplay.events.LOAD.on(function(ev) {
  ag2r.sso.saveCredentials(Mantis.pLogin);
});
</code>
    * @advanced
    * @path        ag2r.sso.saveCredentials
    * @param       {ctx.page} pg Page with added attributes
    * @return      {boolean} true for success, false otherwise
    */
    saveCredentials : function (pg) {
      ctx.notifyAction('ag2r.sso.saveCredentials');
      if (pg && _map[pg.parent.name] && _map[pg.parent.name][pg.name] && _map[pg.parent.name][pg.name].login) {
        var root = ctx.registry.getRoot("SSO") + pg.parent.name + "\\" + pg.name + "\\";
        ctx.registry.set(root + "Login", _map[pg.parent.name][pg.name].login);
        ctx.registry.set(root + "Password", _map[pg.parent.name][pg.name].password);
        _map[pg.parent.name][pg.name].login = '';
        _map[pg.parent.name][pg.name].password = '';
        return true;
      }
      return false;
    },
    
   /**
    * @method      setCredentials
    * @summary     Reads credentials from registry and set values in page.
    * @description
    * __Ex.:__
<code javascript>
Mantis.pLogin.events.LOAD.on(function(ev) {
  if (ag2r.sso.setCredentials(this.oUsername, this.oPassword))  {
    // auto logon
    ...
  }
});
</code>
    * @advanced
    * @path        ag2r.sso.setCredentials
    * @param       {ctx.item} itLogin Page item to set login
    * @param       {ctx.item} itPassword Page item to set password
    * @return      {boolean} true for success, false otherwise
    */
    setCredentials : function (itLogin, itPassword) {
      ctx.notifyAction('ag2r.sso.setCredentials');
      var pg = (itLogin ? itLogin.parent : null);
      var obj = {};
      //if (pg && !(itWarning && itWarning.exist())) {
      if (pg) {
        // read values from registry and uncypher
        var root = ctx.registry.getRoot("SSO") + pg.parent.name + "\\" + pg.name + "\\";
        var val;
        val = ctx.registry.get(root + "Login");
        obj.login = ctx.cryptography.unprotect(String(val));    
        val = ctx.registry.get(root + "Password");
        obj.password = ctx.cryptography.unprotect(String(val));
        if ((obj.login != '') && (typeof obj.login != 'undefined') && (obj.login != '_Error') && (typeof obj.password != 'undefined') && (obj.password != '_Error')) {
          if (pg.exist()) {
            itLogin.set(obj.login, true);
            itPassword.set(obj.password, true);
            return true;
          }
        }
      }
      return false;
    },

   /**
    * @method      setup
    * @summary     Sets a complete SSO process in a single function.
    * @description
    * __Ex.:__
<code javascript>
ag2r.sso.setup(Mantis.pLogin.oUsername, Mantis.pLogin.oPassword, 
  function(ev) { 
    ... 
  }, 
  function(ev) { 
    ... 
  }
);
</code>
    * @path        ag2r.sso.setup
    * @param       {ctx.item} itLogin Page item to set login
    * @param       {ctx.item} itPassword Page item to set password
    * @param       {function(ctx.event)} [callback] Callback called after credentials were set
    * @param       {function(ctx.event)} [failCallback] Callback called if credentials could not be set
    * @return      {boolean} true for success, false otherwise
    */
    setup : function (itLogin, itPassword, callback, failCallback) {
      ctx.notifyAction('ag2r.sso.setup');
      /** @type {ctx.page} */ var pg = (itLogin ? itLogin.parent : null);
      if (pg) {
        _initPage(pg);
        /** @type {ctx.application} */ var app = pg.parent;
        
        // *** scenario and step to implement SSO, named "scSSO_+page name" and "stSSO_+page name" ***
        var stepName = 'stSSO_' + pg.name;
        var scenarioName = 'scSSO_' + pg.name;

        if (!app.steps[stepName]) {
          var step = {};
          step[stepName] =  function(ev, sc, st) {
            // when Login page is displayed, try to set username / password 
            // (unless auto-login is disabled)
            if ((!ag2r.sso.isDisabled(pg)) && ag2r.sso.setCredentials(itLogin, itPassword)) {
              if (typeof callback === 'function') {
                ctx.on(null, callback, true, null, true, 0);
              }
            } /*else {
              if (typeof failCallback === 'function') {
                ctx.on(null, failCallback, true, null, true, 0);
              }
              ag2r.sso.disable(pg, false); // re-enable auto-login
            }*/
            // wait page closure
            pg.waitClose(function(ev) {
              // save login/password in memory 
              if (ag2r.sso.getCredentials(itLogin, itPassword, ev)) {
                app.waitPages(function(ev) {
                  if (ev.page) {
                    if (ev.page.name != pg.name) {
                      // if a page different from 'Login' is reached (for instance 'Home'), then credentials are valid, so can be cyphered and saved in registry
											ctx.log('Page different so credential are valid and are gonna to be save');
                      ag2r.sso.saveCredentials(pg);
											sc.endStep();
                    } else {
	                    // if loaded page is 'Login' again, then there is probably an issue (expired or wrong password, application unreachable, ...)
	                    // call the failure callback
											//ag2r.sso.clearCredentials(pg);
	                    if (typeof failCallback === 'function') {
	                    	ctx.on(null, failCallback, true, null, true, 0);
												ctx.log('Login again so credential have an issue => fail callback');
												pg.waitClose(function(ev) {
													ctx.log('Page different so credential are valid and are gonna to be save');
													ag2r.sso.getCredentials(itLogin, itPassword, ev);
													ag2r.sso.saveCredentials(pg);
													sc.endStep();
												});
	                    }
                    }
                  }
                  //sc.endStep();
                });
              } else {
                // not saved : end step...
                sc.endStep();
              }
            });
          };
          app.step(step);
        }

        if (!app.scenarios[scenarioName]) {
          var scenario = {};
          scenario[scenarioName] =  function(ev, sc) {
            sc.onError(function(sc, st, ex) { sc.endScenario();  }); // default error handler
            sc.setMode(e.scenario.mode.clearIfRunning);
            // add steps here...
            sc.step(app.steps[stepName]);
          };
          app.scenario(scenario);
        }

        // start scenario on login page LOAD
        pg.waitAll(function(ev) {
          app.scenarios[scenarioName].start();
        });
        return true;
      }
      return false;
    }
  };
  return self;
})();
