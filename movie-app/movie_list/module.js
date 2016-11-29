(function (angular) {
	// 正在热映 模块
	var movie_list = angular.module('moviecat.movie_list', [
		'ngRoute',
		'moviecat.itcastJSONP']);

	// 正在热映 路由
	movie_list.config(['$routeProvider',function($routeProvider) {
		$routeProvider.when('/:movieType/:page?', {
			templateUrl: './movie_list/view.html',
			controller: 'MovieListController'
		});
	}]);

	// 正在热映 控制器
	movie_list.controller('MovieListController', [
		'$scope', '$http', '$routeParams', '$route',
		'ItcastJSONP',
		function($scope, $http, $routeParams, $route, ItcastJSONP){
		$scope.data = {};
		console.log($routeParams)

		// 加载动画
		$scope.lodingFlag = true;

		// 分页公式：
		// start = (curPage - 1) * pageSize
		// 第 1 页：0, 1, 2, 3, 4
		// 第 2 页：5, 6, 7, 8, 9
		// 第 3 页：10, 11, 12, 13, 14
		$scope.pageSize = 5;
		$scope.curPage = ($routeParams.page || "1") - 0;

		var startIndex = ($scope.curPage - 1) * $scope.pageSize;

		// 使用自己封装好的JSONP服务获取数据
		ItcastJSONP.jsonp("https://api.douban.com/v2/movie/" + 
			$routeParams.movieType, {
			start: startIndex,
			count: $scope.pageSize,
			// 搜索功能
			q: $routeParams.q
		}, function(data) {

			$scope.data = data;
			$scope.total = data.total;
			$scope.totalPage = Math.ceil( data.total / $scope.pageSize );
			$scope.lodingFlag = false;

			$scope.$apply();
		});

		// 分页事件
		$scope.goPage = function(curPage) {
			// 判断页数
			if(curPage < 1 || curPage > $scope.totalPage) {
				return;
			}

			$route.updateParams({page: curPage});
		};
	}]);
})(angular);