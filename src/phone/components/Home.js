// $scope, $element, $attrs, $injector, $sce, $timeout, $http, $ionicPopup, and $ionicPopover services are available

$scope.toolbar = 'popup-toolbar';
$scope.reglist = 'popup-reglist';
$scope.listview = 'popup-listview';

$scope.current = null;

// Common
function getWidget(widgetName) {
    let widget = $scope.view.wdg[widgetName];
    return widget;
}
function SetWidgetVisible(widgetName, visible) {
    let widget = getWidget(widgetName, visible);
    if (widget) {
        widget['visible'] = visible;
    }
}
function showWidget(widget) {
    if (widget) {
        widget['visible'] = true;
    }
}
function hideWidget(widget) {
    if (widget) {
        widget['visible'] = false;
    }
}

// 메인메뉴
$scope.clickRegList = function() {
    let widget = getWidget($scope.reglist);
    if (widget) {
        SetWidgetVisible($scope.toolbar, false);
        showWidget(widget);        
    }
}

$scope.clickListView = function() {
    let widget = getWidget($scope.listview);
    if (widget) {
        SetWidgetVisible($scope.toolbar, false);
        showWidget(widget);
     
    }
}

// 등록
$scope.cancelRegList = function() {
    let widget = getWidget($scope.reglist);
    if (widget) {
        hideWidget(widget);
        SetWidgetVisible($scope.toolbar, true);
    }
}

// 리스트
$scope.closeListView = function() {
    let widget = getWidget($scope.listview); 
  
    if (widget) {
        hideWidget(widget);
        SetWidgetVisible($scope.toolbar, true);
    }
}