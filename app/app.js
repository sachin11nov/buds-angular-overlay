(function () {
'use strict';

var app = angular.module('app',[]);

app.controller("MyController", MyController);


function MyController() {
/* Controller instance acting as vm */
	var vm = this;

	vm.toggleSidebar = function () {
      vm.showSidebar = !vm.showSidebar;
  };
  vm.onCancelAction = function () {
      console.log("onCancelAction...clicked");
  };
  vm.onSaveAction = function () {
      console.log("onSaveAction...clicked");
  };
}

app.directive("budsOverlayPanel", function () {
  return {
      "scope": {
        "olShow": "=",
        "olHidePanelActions": "=", /*for boolean binding you need to use = */
        "olHideClose" : "=", /*for boolean binding you need to use = */
        "olHideHeader" : "=", /*for boolean binding you need to use = */
        "olTitle": "@",
        "olPanelContentUrl": "@",
        "olScreenPosition": "@",
        "olOnOk": "&",
        "olOnCancel": "&"
      },
      "restrict":"E",
      "templateUrl": function(element, attrs) {
        return attrs.templateUrl || "overlay.tpl.html";
      },
      "link": function (scope, element, attrs) {

          scope.$watch("olShow", function (newVal) {
              if (newVal) {
                  element.addClass("show-overlay-panel");
                  return;
              }
              element.removeClass("show-overlay-panel");
          });

          scope.goFullScreen =  function (newVal) {
            scope.fullScreen = true;
            managePanelClasses([],["overlay-content-panel-full"]);
          };

          scope.goSmallScreen =  function (newVal) {
            scope.fullScreen = false;
            managePanelClasses(["overlay-content-panel-full"],[]);
          };

          scope.goLeft =  function (newVal) {
            scope.screenPosition ="left";
            managePanelClasses(["center-block","pull-right"],["pull-left"]);
          };

          scope.goRight =  function (newVal) {
            scope.screenPosition ="right";
            managePanelClasses(["center-block","pull-left"],["pull-right"]);
          };

          scope.goCenter =  function (newVal) {
            scope.screenPosition ="center";
            managePanelClasses(["pull-right","pull-left"],["center-block"]);
          };

          scope.goToggleOverlayPanel =  function (newVal) {
            scope.olShow = false;
          };

          function managePanelClasses(remove,add){
            var panel = $(element).find(".overlay-content-panel");
            remove.forEach(function(item){
              panel.removeClass(item);
            });
            add.forEach(function(item){
              panel.addClass(item);
            });
          }
      }
  };


}); /*end directive budsOverlayPanel*/



 })();
