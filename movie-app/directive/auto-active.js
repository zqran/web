(function (angular) {
	
angular.module('moviecat.atuoActive', [])
	.directive('autoActive', ['$location', function($location) {

		return {
			link: function(scope, element, attributes) {
				// element ===> 当前对象（jqLite）
				/*element.on('click', function() {
					// console.log(this); // DOM对象
					element.parent().children().removeClass('active');
					element.addClass('active');
				});*/

				scope.location = $location;
				scope.$watch('location.url()', function(nowValue) {
					var link = element.children().attr('href').substr(1);
					if(nowValue.startsWith(link)) {
						element.parent().children().removeClass('active');
						element.addClass('active');
					}
				});
			}
		};
	}]);

})(angular);