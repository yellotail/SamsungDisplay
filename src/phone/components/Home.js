// $scope, $element, $attrs, $injector, $sce, $timeout, $http, $ionicPopup, and $ionicPopover services are available
$scope.toolbar = 'popup-toolbar';
$scope.reglist = 'popup-reglist';
$scope.listview = 'popup-listview';

window.category = null;
window.item = null;
window.content = null;

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
                { value: 1, display: "0_2 설비 점검 관리 Check 점검 (제출 후 설비 비교 점검 진행)", desc: "" },
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
    ],

    getIndexByCategoryName: function (displayName) {
        for (var i = 0; i < this.categories.length; i++) {
            let category = this.categories[i];
            if (category.display == displayName) {
                return i;
            }
        }
        return -1;
    },
    getIndexByItemName: function (category, displayName) {
        if (category >= 0) {
            for (var i = 0; i < this.items[category].length; i++) {
                let item = this.items[category][i];
                if (item.display == displayName) {
                    return i;
                }
            }
        }
        return -1;
    },
    getIndexByContentName: function (category, item, displayName) {
        if (category >= 0 && item >= 0) {
            for (var i = 0; i < this.contents[category][item].length; i++) {
                let content = this.contents[category][item][i];
                if (content.display == displayName) {
                    return i;
                }
            }
        }
        return -1;
    },
    getIndexByGrade: function (grade) {
        for (var i = 0; i < this.grades.length; i++) {
            if (this.grades[i] == grade) {
                return i;
            }
        }
        return -1;
    },
    getIndexByPersist: function (persist) {
        if (persist) {
            return 1;
        }
        else {
            return 0;
        }
    }
};

// Common
// Clamp number between two values with the following line:
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function getWidgetByName(widgetName) {
    let widget = $scope.view.wdg[widgetName];
    return widget;
}
function setWidgetVisible(widgetName, visible) {
    let widget = getWidgetByName(widgetName, visible);
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
function setWidgetText(widgetName, text) {
    let widget = getWidgetByName(widgetName);
    if (widget) {
        widget['text'] = text;
    }
}

function selectDropdown(widgetName, value) {
    let widget = getWidgetByName(widgetName);
    if (widget) {
        let newValue = value >= 0 ? ('' + value) : ''
        widget['value'] = newValue;
    }
}

function initPhotoPreview() {    

    let widget = getWidgetByName('image-photoPreview');
    if (widget) {  
       let markup = getWidgetByName('markupCoe-1');
        console.dir(markup);
        
        // $scope.app.params.photo = undefined;        
        // markup['markedup'] = undefined;
        // widget['imgsrc'] = undefined;
    }
}

// 드랍다운
angular.element(document).ready(function () {
    $scope.view.wdg['dropdown-category'].list = $scope.checklist.categories;
});

$scope.onChangeCategory = function () {
    let category = $scope.view.wdg["dropdown-category"].value;
    $scope.checklist.currentCategory = category;
    $scope.checklist.currentItem = -1;
    $scope.checklist.currentContent = -1;
    window.category = $scope.checklist.categories[$scope.checklist.currentCategory].display;

    let dropdownItem = getWidgetByName('dropdown-item');
    dropdownItem.value = '';
    dropdownItem.list = $scope.checklist.items[category];
    window.item = null;

    let dropdownContent = getWidgetByName('dropdown-content');
    if (dropdownContent) {
        dropdownContent.value = '';
        dropdownContent.list = null;
    }
    window.content = null;
}

$scope.onChangeItem = function () {
    let item = $scope.view.wdg["dropdown-item"].value;
    $scope.checklist.currentItem = item;
    $scope.checklist.currentContent = -1;
    window.item = $scope.checklist.items[$scope.checklist.currentCategory][$scope.checklist.currentItem].display;

    let dropdownContent = getWidgetByName('dropdown-content');
    dropdownContent.value = '';
    dropdownContent.list = $scope.checklist.contents[$scope.checklist.currentCategory][$scope.checklist.currentItem];
    window.content = null;

}

$scope.onChangeContent = function () {
    let content = $scope.view.wdg["dropdown-content"].value;
    console.log('content: ' + content);
    $scope.checklist.currentContent = content;
    window.content = $scope.checklist.contents[$scope.checklist.currentCategory][$scope.checklist.currentItem][$scope.checklist.currentContent].display;
}

// 메인메뉴
function initPopup(index) {
    let title = (index < 0) ? '불합리 등록' : '불합리 수정';
    setWidgetText('label-reglist-title', title);

    let button = (index < 0) ? '등록' : '수정';
    setWidgetText('button-reglist-ok', button);

    selectDropdown('dropdown-category', -1);
    selectDropdown('dropdown-item', -1);
    selectDropdown('dropdown-content', -1);

    setWidgetText('textArea-status', '');

    $scope.onChangeGrade(-1);
    $scope.onChangePersist(-1);

    setWidgetText('textInput-rating', undefined);
    initPhotoPreview();
}

function fillModList(index) {
    let NGList = $scope.app.mdl.Samsung_Display_NG.properties.NGList[index];

    let category = $scope.checklist.getIndexByCategoryName(NGList.analysis);
    selectDropdown('dropdown-category', category);
    $scope.onChangeCategory();

    let item = $scope.checklist.getIndexByItemName(category, NGList.item);
    selectDropdown('dropdown-item', item);
    $scope.onChangeItem();

    let content = $scope.checklist.getIndexByContentName(category, item, NGList.contents);
    selectDropdown('dropdown-content', content);
    $scope.onChangeContent();

    setWidgetText('textArea-status', NGList.status);

    let grade = $scope.checklist.getIndexByGrade(NGList.rating);
    $scope.onChangeGrade(grade);

    let persist = $scope.checklist.getIndexByPersist(NGList.persistence);
    $scope.onChangePersist(persist);

    setWidgetText('textInput-rating', NGList.score);
}

$scope.openRegList = function () {
    $scope.checklist.currentIndex = -1;

    let widget = getWidgetByName($scope.reglist);
    if (widget) {
        initPopup(-1);

        showWidget(widget);
        setWidgetVisible($scope.toolbar, false);
        
    }
}

$scope.openModList = function (index) {
    $scope.checklist.currentIndex = index;

    let widget = getWidgetByName($scope.reglist);
    if (widget) {
        initPopup(index);
        fillModList(index);
        
        showWidget(widget);
        setWidgetVisible($scope.toolbar, false);
        setWidgetVisible($scope.listview, false);
        
    }
}

$scope.openListView = function () {
    let widget = getWidgetByName($scope.listview);
    if (widget) {
        setWidgetVisible($scope.toolbar, false);
        showWidget(widget);
    }
}


// 등록
function registerNewList() {
    let status = getStatus();
    let grade = getGradeID($scope.checklist.currentGrade);
    let score = getRating();
    let persist = $scope.checklist.currentPersist != 0 ? true : false;
    let photo = $scope.app.params.photo;

    var newList =  {
        'analysis': window.category,
        'item': window.item,
        'contents': window.content,
        'status': status,
        'rating': grade,
        'persistence': persist,
        'score': score,        
    };
    if ($scope.checklist.currentIndex >= 0) {
        newList.index = $scope.checklist.currentIndex;
        newList.afterAction = photo;        
    }
    else {
        newList.beforeAction = photo;
    }
    console.dir(newList);
    twx.app.fn.triggerDataService('Samsung_Display_NG', 'addNG', newList);
}

$scope.onRegister = function () {
    let widget = getWidgetByName($scope.reglist);
    if (widget) {
        registerNewList();
        hideWidget(widget);
        setWidgetVisible($scope.toolbar, true);
    }
}

$scope.cancelRegister = function () {
    let widget = getWidgetByName($scope.reglist);
    if (widget) {
        hideWidget(widget);
        setWidgetVisible($scope.toolbar, true);
    }
}

$scope.cancelRegister = function () {
    let widget = getWidgetByName($scope.reglist);
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

function getStatus() {
    let widget = getWidgetByName('textArea-status');
    return widget ? widget['text'] : '';
}
function getRating() {
    let widget = getWidgetByName('textInput-rating');
    return widget ? widget['text'] : '';
}

function getGradeID(index) {
    //let idx = clamp(index, 0, 3);
    return (index >= 0 && index <= 3) ? $scope.checklist.grades[index] : '';
}

$scope.onChangeGrade = function (index) {
    $scope.checklist.currentGrade = index;

    let id = getGradeID(index);
    updateToggleButton('toggleButton-A', id);
    updateToggleButton('toggleButton-B', id);
    updateToggleButton('toggleButton-C', id);
    updateToggleButton('toggleButton-D', id);
}

function getPersistID(index) {
    //let idx = clamp(index, 0, 1);
    return (index >= 0 && index <= 1) ? $scope.checklist.persists[index] : '';
}
$scope.onChangePersist = function (index) {
    $scope.checklist.currentPersist = index;

    let id = getPersistID(index);
    updateToggleButton('toggleButton-OneTime', id);
    updateToggleButton('toggleButton-Repeat', id);
}

// 리스트
$scope.closeListView = function () {
    let widget = getWidgetByName($scope.listview);

    if (widget) {
        hideWidget(widget);
        setWidgetVisible($scope.toolbar, true);
    }
}

$scope.showCapture = function () {
    if ($scope.app.params.photo) {

        $scope.view.wdg['image-imageView']['imgsrc'] = $scope.app.params.photo;
        setWidgetText('label-imageViewTitle', '캡쳐 사진');

        setWidgetVisible('popup-imageView', true);
    }
}


$scope.showPrevPicture = function (index) {
    let NGList = $scope.app.mdl.Samsung_Display_NG.properties.NGList[index];
    let picture = NGList.beforeAction;
    if (picture) {
        let image = $scope.view.wdg['image-imageView'];
        image['imgsrc'] = 'data:image/png;base64,' + picture;

        setWidgetText('label-imageViewTitle', '조치 전 사진');
        setWidgetVisible('popup-imageView', true);
    }
}

$scope.showCurrPicture = function (index) {
    let NGList = $scope.app.mdl.Samsung_Display_NG.properties.NGList[index];
    let picture = NGList.afterAction;
    if (picture) {
        let image = $scope.view.wdg['image-imageView'];        
        image['imgsrc'] = 'data:image/png;base64,' + picture;

        setWidgetText('label-imageViewTitle', '조치 후 사진');
        setWidgetVisible('popup-imageView', true);        
    }
}

$scope.closeImageView = function () {
    setWidgetVisible('popup-imageView', false);
}
