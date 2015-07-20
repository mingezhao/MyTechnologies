(function (window, angular) {
    'use strict';

    /**
     * Config Module
     */
    angular.module('app.config', []).
        constant('config', {
            siteTitle: 'Technologies',
            siteRootUri: '/index.html',
            modules: [
                {
                    order: 1,
                    key: 'jQuery',
                    name: 'jQuery',
                    src: '/jquery/index',
                    desc: ''
                },
                {
                    order: 2,
                    key: 'Icons',
                    name: 'Icons',
                    src: '/icons/index.html',
                    desc: 'Glyphicons & Font Awesome',
                },

            ]
        });

    /**
     * Directives Module
     */
    angular.module('app.directives', ['app.config', 'app.directives.header', 'app.directives.footer']);

    /**
     * Header Directive
     */
    angular.module('app.directives.header', []).
        controller('HeaderCtrl', function ($scope, config) {
            var modules = config.modules;

            this.getConfig = function () {
                return config;
            };

            this.getModule = function (key) {
                for (var i = 0; i < modules.length; i++) {
                    if (angular.equals(angular.lowercase(modules[i].key), angular.lowercase(key))) {
                        return modules[i];
                    }
                }
            }
        }).
        directive('headerBody', function () {
            return {
                restrict: 'AE',
                replace: true,
                transclude: true,
                templateUrl: 'template/header-body.html',
                scope: {
                    moduleKey: '@'
                },
                controller: 'HeaderCtrl',
                link: function (scope, element, attrs, headerCtrl) {
                    if (angular.isUndefined(scope.moduleKey)) {
                        scope.title = 'Technologies';
                    }
                    else {
                        var module = headerCtrl.getModule(scope.moduleKey);
                        scope.title = module.name;
                        scope.desc = module.desc;
                    }
                }
            };
        }).
        directive('headerMenus', function () {
            return {
                restrict: 'AE',
                replace: true,
                require: '^headerBody',
                template: function (element, attrs) {
                    var menusHtml =
                        '<nav>\n' +
                        '   <a class="navbar-brand" href="{{siteRootUri}}">{{siteTitle}}</a>\n' +
                        '   <ul class="nav navbar-nav">\n' +
                        '       <li class="dropdown" dropdown>\n' +
                        '           <span role="button" class="dropdown-toggle" dropdown-toggle>\n' +
                        '               Modules <b class="caret"></b>\n' +
                        '           </span>\n' +
                        '           <ul class="dropdown-menu">\n' +
                        '               <li ng-repeat="module in modules">\n' +
                        '                   <a ng-href="{{module.src}}">{{module.name}}</a>\n' +
                        '               </li>\n' +
                        '           </ul>\n' +
                        '       </li>\n'

                    angular.forEach(element.children(), function (item, index) {
                        menusHtml += item.outerHTML;
                    });

                    menusHtml +=
                        '       <li><a href="https://github.com/mingezhao/Technologies"><i class="fa fa-github"></i>&nbsp;Git Hub</a></li>\n' +
                        '   </ul>\n' +
                        '</nav>\n';

                    return menusHtml;
                },
                link: function (scope, element, attrs, headerCtrl) {
                    var config = headerCtrl.getConfig();
                    scope.modules = config.modules;
                    scope.siteTitle = config.siteTitle;
                    scope.siteRootUri = config.siteRootUri;
                }
            };
        }).
        run(function ($templateCache) {
            $templateCache.put('template/header-body.html',
                '<div role="header">\n' +
                '   <header class="navbar navbar-default navbar-fixed-top">\n' +
                '       <div class="navbar-inner">\n' +
                '           <div class="container" ng-transclude>\n' +
                '               <nav>\n' +
                '                   <a class="navbar-brand" href=""></a>\n' +
                '                   <ul class="nav navbar-nav">\n' +
                '                       <li class="dropdown" dropdown>\n' +
                '                           <span role="button" class="dropdown-toggle" dropdown-toggle>\n' +
                '                               Directives <b class="caret"></b>\n' +
                '                           </span>\n' +
                '                           <ul class="dropdown-menu">\n' +
                '                               <li ng-repeat="module in modules">\n' +
                '                                   <a ng-href="{{module.src}}">{{module.name}}</a>\n' +
                '                               </li>\n' +
                '                           </ul>\n' +
                '                       </li>\n' +
                '                       <li><a href="https://github.com/mingezhao/Technologies"><i class="fa fa-github"></i>&nbsp;Git Hub</a></li>\n' +
                '                   </ul>\n' +
                '               </nav>\n' +
                '           </div>\n' +
                '       </div>\n' +
                '   </header>\n' +
                '   <header class="bs-header text-center">\n' +
                '       <div class="container">\n' +
                '           <h1>{{title}}</h1>\n' +
                '           <p>{{desc}}</p>\n' +
                '       </div>\n' +
                '   </header>\n' +
                '<div>\n'
            );
        });

    /**
     * Footer Directive
     */
    angular.module('app.directives.footer', []).
        directive('footerBody', function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'template/footer-body.html'
            };
        }).
        run(function ($templateCache) {
            $templateCache.put('template/footer-body.html',
                '<footer class="footer">\n' +
                '   <div class="container">\n' +
                '   </div>\n' +
                '</footer>');
        });

    /**
     * Init app for each page
     */
    window.app = angular.module('app', ['ui.bootstrap', 'app.config', 'app.directives']);

})(window, angular)