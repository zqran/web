(function (angular) {

var details = angular.module('moviecat.details', ['ngRoute', 'moviecat.itcastJSONP']);

details.config(['$routeProvider',function($routeProvider) {
	$routeProvider.when('/details/:id', {
		templateUrl: './details/view.html',
		controller: 'DetailsController'
	});
}]);

details.controller('DetailsController', ['$scope', '$routeParams', 'ItcastJSONP',
	function($scope, $routeParams, ItcastJSONP){
	
	ItcastJSONP.jsonp('https://api.douban.com/v2/movie/subject/' + $routeParams.id, {}, 
		function(data) {
		console.log(data)
		$scope.details = data;
		$scope.$apply();
	});
}]);

})(angular);