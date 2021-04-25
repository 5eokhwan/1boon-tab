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

const showRecent = (e) => {
    e.preventDefault();
    readTextFile("recent.json", renderData);
};
const showManyView = (e) => {
    e.preventDefault();
    readTextFile("view.json", renderData);
};
const showPopularity = (e) => {
    e.preventDefault();
    readTextFile("popular.json", renderData);
};

readTextFile("recent.json", renderData);
$RecentBtn.addEventListener("click", showRecent);
$ManyViewBtn.addEventListener("click", showManyView);
$PopularityBtn.addEventListener("click", showPopularity);
