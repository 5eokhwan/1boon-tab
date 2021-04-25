function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

let $RecentBtn = document.getElementById("Recent");
let $ManyViewBtn = document.getElementById("ManyView");
let $PopularityBtn = document.getElementById("Popularity");
let $list = document.getElementById("list");

const renderData = function (text) {
    datas = JSON.parse(text);
    console.log(datas);
    let html = "";
    for (let i = 0; i < datas.length; i++) {
        html += `<h4>${datas[i].title}</h4>
    <p>${datas[i].url}</p>`;
    }
    $list.innerHTML = html;
};

let $selected = null;
function activeTap(e) {
    if ($selected) $selected.classList.remove("active");
    $selected = e.target.parentNode;
    $selected.classList.add("active");
}

const showRecent = (e) => {
    e.preventDefault();
    activeTap(e);
    readTextFile("recent.json", renderData);
};
const showManyView = (e) => {
    e.preventDefault();
    activeTap(e);
    readTextFile("view.json", renderData);
};
const showPopularity = (e) => {
    e.preventDefault();
    activeTap(e);
    readTextFile("popular.json", renderData);
};

//init
$selected = $RecentBtn;
$RecentBtn.classList.add("active");
readTextFile("recent.json", renderData);

$RecentBtn.addEventListener("click", showRecent);
$ManyViewBtn.addEventListener("click", showManyView);
$PopularityBtn.addEventListener("click", showPopularity);

// 1boon 채널 탭 UI구현 (최근,많이본,실시간인기)
// 각 탭을 누를때마다 해당 API를 사용하여 결과 표시
// 각 탭이 선택되면 선택된 탭 class(active) 적용
// 가져온 데이터를 id=list 에 노출
// 로딩이미지 효과: 각 콘텐츠 노출시에 로딩이미지를 1초 노출후에 콘텐츠 노출
// API에서 제목, 링크, 이미지, CP 를 적절히 표시
// 처음 10개만 보여주고 더보기 클릭이 남은 10개 보여주기 (로딩이미지 효과도 구현)
// JS 에러 발생하면 안됨
// JS 네이티브 함수 사용, 최신 DOM 사용하여 구현
// JS 함수화
