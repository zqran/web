(function (angular) {
	
	angular.module('moviecat.itcastJSONP', [])
		.service('ItcastJSONP', ['$window', function($window){
			var doc = $window.document;

			this.jsonp = function(url, params, callback) {
				var tempScript = document.createElement("script");
				var queryString = "";
				for(var key in params) {
					queryString += key + "=" + params[key] + "&";
				}

				// ...movie/in_theaters?start=1&count=5
				url += "?" + queryString;

				// ...movie/in_theaters?start=1&count=5&callback=callback_1480401153649
				var fnName = "callback_" + (new Date - 0);
				url += "callback=" + fnName;

				// 设置 script的url
				tempScript.src = url;
				doc.body.appendChild(tempScript);

				// 添加一个回调函数，这样，就可以使用JSONP来调用该函数了
				$window[fnName] = function(data) {
					callback(data);

					doc.body.removeChild(tempScript);
					delete $window[fnName];
				};
			};

		}]);

})(angular);