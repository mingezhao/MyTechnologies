(function (app) {
    'use strict';

    app.controller('HomeCtrl', function ($scope, config) {
        $scope.modules = config.modules;
    });
})(app)