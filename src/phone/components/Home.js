// $scope, $element, $attrs, $injector, $sce, $timeout, $http, $ionicPopup, and $ionicPopover services are available
$scope.toolbar = 'popup-toolbar';
$scope.reglist = 'popup-reglist';
$scope.listview = 'popup-listview';

$scope.checklist = {
    currentIndex: -1,
    currentCategory: -1,
    currentItem: -1,
    currentContent: -1,
    currentGrade: -1,
    currentPersist: -1,

    grades: [
        'A', 'B', 'C', 'D'
    ],
    persists: [
        'OneTime',
        'Repeat'
    ],

    categories: [
        { value: 0, display: "공통" },
        { value: 1, display: "체결" },
        { value: 2, display: "윤활" },
        { value: 3, display: "구동" },
        { value: 4, display: "전달" },
        { value: 5, display: "공압" },
        { value: 6, display: "전장" },
        { value: 7, display: "제어" },
        { value: 8, display: "계장" }
    ],

    items: [
        // 공통
        [
            { value: 0, display: "미진사항 점검" },
            { value: 1, display: "관리 시트 점검" }
        ],
        // 체결
        [
            { value: 0, display: "체결 상태 관리" },
            { value: 1, display: "I-Marking" },
            { value: 2, display: "부품 2S 관리상태" },
        ],
        // 윤활
        [
            { value: 0, display: "윤활 라인 및 그리스 충진" },
            { value: 1, display: "윤활부 마감" }
        ]
    ],

    contents: [
        // 공통
        [
            // 미진사항 점검
            [
                { value: 0, display: "0_1 출하 불합리 사항 점검 진행 (조치율)", desc: "" },
            ],
            // 관리 시트 점검
            [
                { value: 0, display: "0_2 설비 점검 관리 Check 점검 (제출 후 설비 비교 점검 진행)", desc: "" },
            ]
        ],
        // 체결
        [
            // 체결 상태 관리
            [
                { value: 0, display: "1_2 미 체결, 체결 풀림, Bolt 방치", desc: "" },
                { value: 1, display: "1_3 풀림 방지", desc: "" },
                { value: 2, display: "1_4 Bolt 체결 방향 (구동부, Chamber)", desc: "" },
                { value: 3, display: "1_8 Bolt 및 Nut간 기본 체결 기준", desc: "" },
            ],
            // I-Marking
            [
                { value: 0, display: "1_5 I-Marking 표식", desc: "" },
                { value: 1, display: "1_6 I-Marking용 Pen", desc: "" },
                { value: 2, display: "1_7 기초 Bolt 체결 및 지진방지 Bracket 표준 Torque 적용", desc: "" },
            ],
            // 부품 2S 관리 상태
            [
                { value: 0, display: "1_11 부품 고정부 흔들림 방지 설계", desc: "" },
                { value: 1, display: "1_14 설비 內 모든 Unit 고정 관리", desc: "" },
                { value: 2, display: "1_15 틀어짐 방지 보호 Cover 장착", desc: "" },
            ],
        ]
    ]
};

// Common
// Clamp number between two values with the following line:
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function getWidget(widgetName) {
    let widget = $scope.view.wdg[widgetName];
    return widget;
}
function setWidgetVisible(widgetName, visible) {
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
function setText(widgetName, text) {
    let widget = getWidget(widgetName);
    if (widget) {
        widget['text'] = text;
    }
}


// 드랍다운
angular.element(document).ready(function () {
    $scope.view.wdg["dropdown-category"].list = $scope.checklist.categories;
});

$scope.onChangeCategory = function () {
    let category = $scope.view.wdg["dropdown-category"].value;
    $scope.checklist.currentCategory = category;
    $scope.checklist.currentItem = -1;
    $scope.checklist.currentContent = -1;

    let dropdownItem = getWidget('dropdown-item');

    dropdownItem.value = '';
    dropdownItem.list = $scope.checklist.items[category];

    let dropdownContent = getWidget('dropdown-content');
    if (dropdownContent) {
        dropdownContent.value = '';
        dropdownContent.list = null;
    }
}

$scope.onChangeItem = function () {
    let item = $scope.view.wdg["dropdown-item"].value;
    $scope.checklist.currentItem = item;
    $scope.checklist.currentContent = -1;

    console.dir($scope.checklist);

    let dropdownContent = getWidget('dropdown-content');
    dropdownContent.value = '';
    dropdownContent.list = $scope.checklist.contents[$scope.checklist.currentCategory][$scope.checklist.currentItem];
}

$scope.onChangeContent = function () {
    let content = $scope.view.wdg["dropdown-content"].value;
    $scope.checklist.currentContent = content;
}

// 메인메뉴
$scope.openRegList = function () {
    let widget = getWidget($scope.reglist);
    if (widget) {
        setWidgetVisible($scope.toolbar, false);
        showWidget(widget);
    }
}

$scope.openListView = function () {
    let widget = getWidget($scope.listview);
    if (widget) {
        setWidgetVisible($scope.toolbar, false);
        showWidget(widget);

    }
}

// 등록
function registerNewList() {

}

$scope.addRegList = function() {
    let widget = getWidget($scope.reglist);
    if (widget) {
        registerNewList();
        hideWidget(widget);
        setWidgetVisible($scope.toolbar, true);
    }
}

$scope.cancelRegList = function () {
    let widget = getWidget($scope.reglist);
    if (widget) {
        hideWidget(widget);
        setWidgetVisible($scope.toolbar, true);
    }
}

function updateToggleButton(toggleName, id) {
    let toggle = $scope.view.wdg[toggleName];
    if (toggle) {
        let widgetName = toggle.widgetName;
        let tokens = widgetName.split('-');       
        let checked = (tokens[tokens.length - 1] == id) ? true : false;
        toggle.pressed = checked;
    }
}

function getGradeID(index) {
    let idx = clamp(index, 0, 3);
    return $scope.checklist.grades[idx];
}

$scope.onChangeGrade = function(index) {
    $scope.checklist.currentGrade = index;
    
    let id = getGradeID(index);    
    updateToggleButton('toggleButton-A', id);
    updateToggleButton('toggleButton-B', id);
    updateToggleButton('toggleButton-C', id);
    updateToggleButton('toggleButton-D', id);
}

function getPersistID(index) {
    let idx = clamp(index, 0, 1);
    return $scope.checklist.persists[idx];
}
$scope.onChangePersist = function(index) {
    $scope.checklist.currentPersist = index;

    let id = getPersistID(index);
    updateToggleButton('toggleButton-OneTime', id);
    updateToggleButton('toggleButton-Repeat', id);
}

// 리스트
$scope.closeListView = function () {
    let widget = getWidget($scope.listview);

    if (widget) {
        hideWidget(widget);
        setWidgetVisible($scope.toolbar, true);
    }
}

$scope.clickListViewRow = function(index) {
    $scope.checklist.currentIndex = index;
    
}
$scope.showPrevPicture = function(index) {    
    let NGList = $scope.app.mdl.Samsung_Display_NG.properties.NGList[index];
    let picture = NGList.beforeAction;    
    $scope.view.wdg['image-imageView']['imgsrc'] =  'data:image/png;base64,' + picture;

    setText('label-imageViewTitle', '조치 전 사진');
    setWidgetVisible('popup-imageView', true);
}

$scope.showCurrPicture = function(index) {
    let NGList = $scope.app.mdl.Samsung_Display_NG.properties.NGList[index];
    let picture = NGList.afterAction;    
    $scope.view.wdg['image-imageView']['imgsrc'] =  'data:image/png;base64,' + picture;

    setText('label-imageViewTitle', '조치 후 사진');
    setWidgetVisible('popup-imageView', true);
}

$scope.closeImageView = function() {
    setWidgetVisible('popup-imageView', false);
}