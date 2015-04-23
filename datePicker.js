(function () {

    function datePicker() {
        var TEMPLATE = [
            '<div class="input-group">',
                '<div class="input-group-addon" ng-click="dateOpen($event)">',
                    '<a href="#"><i class="icon-calendar"></i></a>',
                '</div>',
                '<input type="text" class="form-control datepicker" datepicker-popup="MM/dd/yyyy" ng-model="pickerDate" is-open="dateOpened" ng-focus="dateOpen($event)" close-text="Close" ng-required="required" ng-disabled="disabled" placeholder="Select a date" />',
            '</div>'
        ];
        var linkFunction = function (scope, element, attrs, ngModelCtrl) {
            scope.required = attrs.ngRequired;
            scope.disabled = attrs.ngDisabled;

            ngModelCtrl.$parsers.push(function (datepickerValue) {
                return moment(datepickerValue).toISOString();
            });

            ngModelCtrl.$render = function () {
                scope.pickerDate = ngModelCtrl.$viewValue;
            };

            scope.$watch('pickerDate', function () {
                ngModelCtrl.$setViewValue(scope.pickerDate);
            });
        };
        return {
            require: 'ngModel',
            link: linkFunction,
            replace: true,
            restrict: 'EA',
            scope: {},
            template: TEMPLATE.join(''),
            controller: ['$scope', function ($scope) {

                $scope.dateOpen = function ($event) {
                    if ($scope.disabled !== "true") {
                        $event.preventDefault();
                        $event.stopPropagation();
                        $scope.dateOpened = !$scope.dateOpened;
                    }
                };

            }]
        };
    }

    angular.module("app")
        .directive('datePicker', datePicker);
})();
