
/*@deprecated ("AngularJS does not support cross-origin?")*/
serv_addr = "http://58.96.176.223:9000/api/main.php";
// serv_address = "";

var app = angular.module('myApp', ['ui.bootstrap']);

/*
function site_join(path) {
	return serv_address+path;
}
*/

function Modal(url, scope, settings) {
  this.templateUrl = url;
  this.scope = scope;

  if (settings === undefined) settings = {};  // if no settings passed, default values
  this.backdrop = settings.backdrop === undefined? true: settings.backdrop;
  this.backdropClick = settings.backdropClick === undefined? true: settings.backdropClick;
  this.dialogFade = settings.dialogFade === undefined? false: settings.dialogFade;
  this.keyboard = settings.keyboard === undefined? true: settings.keyboard;
  this.size = settings.size === undefined? 'md': settings.size;
}

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // setup CSRF support
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    // http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
    // Rewrite POST body data
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    // $httpProvider.defaults.withCredentials = true;
    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data)
    {
      /**
       * The workhorse; converts an object to x-www-form-urlencoded serialization.
       * @param {Object} obj
       * @return {String}
       */
      var param = function(obj)
      {
        var query = '';
        var name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj)
        {
          value = obj[name];

          if(value instanceof Array)
          {
            for(i=0; i<value.length; ++i)
            {
              subValue = value[i];
              fullSubName = name + '[' + i + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
          else if(value instanceof Object)
          {
            for(subName in value)
            {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
          else if(value !== undefined && value !== null)
          {
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
          }
        }

        return query.length ? query.substr(0, query.length - 1) : query;
      };

      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
  }
]);


app.factory("$global", function($uibModal) {

  var user = {isAnonymous: true, account_id: "-1"};
  var session_id = null;

  return {

    getUser: function () {
    // objects in javascript are volatile,
    // so it might be safer to use user like this
      return angular.copy(user);
    },

    setUser: function (theUser) {
      user = theUser; // set it when user is got from the server
    },

    setUserAttr: function (key, value) {
      // set attribute of the User
      user[key] = value;
    },

    setUserAnonymous: function () {
      user = {isAnonymous: true, sessionid: "-1"};
    },

    loggedIn: function () {
      console.log(user.isAnonymous);
      return !user.isAnonymous;
    },

    setSessionId: function (id) {
      session_id = id;
    },

    getSessionId: function () {
      return session_id;
    }

  };
})
