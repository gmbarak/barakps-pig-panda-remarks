app.directive('remarksList', function () {
    return {
        restrict: 'E',
        controller: ['$scope', 'remarksStorage', function remarksListController($scope, remarksStorage) {
            $scope.remarksList = remarksStorage.getContent();
        }],
        templateUrl: 'components/remarksList/remarksList.tpl.html'
    };
});