(function (angular) {
	
	// 主页模块
	var home = angular.module('moviecat.home_page', ['ngRoute']);

	// 配置路由
	home.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when("/home_page", {
			templateUrl: "./home_page/view.html"
		}).otherwise({
			redirectTo: '/home_page'
		});
	}]);
	
	// 查询 - 控制器
	home.controller('HomeController', ['$scope', '$location', function($scope, $location){
		$scope.query = '';

		$scope.search = function() {
			$location.url('/search?q=' + $scope.query);
		};
	}]);

})(angular);