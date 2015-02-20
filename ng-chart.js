angular.module('ngChartJs', [])
    .directive('ngChartJs', function () {
        Chart.defaults.global.responsive = true;

        /* Method to get correct chart type name */
        var getChartType = function (type) {
            switch (type) {
                case 'line':
                    return 'Line';
                case 'bar':
                    return 'Bar';
                case 'radar':
                    return 'Radar';
                case 'polararea':
                    return 'PolarArea';
                case 'pie':
                    return 'Pie';
                default:
                    return type;
            }
        };

        var linker = function ($scope, $el, attrs, controller) {

            /* Method to draw chart */
            var drawChart = function () {
                var chartType = getChartType($scope.type.toLowerCase());
                var context = $el[0].getContext("2d");
                var options = $scope.options ? $scope.options : {};

                return new Chart(context)[chartType]($scope.data, options);
            };

            /* Draw initial chart */
            var chart = drawChart();

            /* Watch data scope and redraw chart if necessary */
            $scope.$watchGroup(['data', 'options'], function (newValues, oldValues) {
                if (newValues != oldValues) {
                    chart.initialize($scope.data, $scope.options);
                }
            });

        };

        return {
            restrict: 'A',
            link: linker,
            scope: {
                data: '=',
                options: '=',
                type: '@'
            }
        }
    });
