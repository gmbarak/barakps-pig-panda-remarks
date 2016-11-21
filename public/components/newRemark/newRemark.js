angular.module('remarksApp').directive('newRemark', function () {
    return {
        restrict: 'E',
        controller: ['$scope', 'remarksStorage', function newRemarkController($scope, remarksStorage) {

            $scope.email = "";
            $scope.content = "";

            $scope.addRemark = function () {
                var content = $scope.content;
                remarksStorage.addRemark($scope.email, content);
                $scope.email = "";
                $scope.content = "";
            };
        }],
        templateUrl: 'components/newRemark/newRemark.tpl.html'
    };
});