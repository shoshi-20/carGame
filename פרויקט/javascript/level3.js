var x = document.getElementsByClassName("cars");// מערך שלוש מכוניות למטה
x[0].style.display = "none";
x[1].style.display = "block";
x[2].style.display = "none";
var random;
var numOfCoin;
var p = 0;            //ניקוד
var linePoint = 0;    //מילוי הניקוד בקו למעלה
var num_time = 60;    //זמן
//====================מזיז את המכונית למטה ע"י החיצים================================

document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") { moveLeft(); }
    if (event.key === "ArrowRight") { moveRight(); }
});
function moveRight() {
    for (var i = 0; i < x.length; i++) {
        if (x[i].style.display == "block")
            if (i < x.length - 1) {
                x[i + 1].style.display = "block";
                x[i].style.display = "none";
                break;
            }
    }
}
function moveLeft() {
    for (var i = x.length - 1; i >= 0; i--) {
        if (x[i].style.display == "block") {
            if (i > 0) {
                x[i - 1].style.display = "block";
                x[i].style.display = "none";
                break;
            }
        }
    }
}

//====================loading-כמה זמן יהיה================================

setTimeout(function () {
    document.getElementById("out1").style.display = "none";
}, 3000);

//====================עושה שהמחק יטען אחרי שה-לואדינג נגמר================================

setTimeout(function () {
    if (document.getElementById("out1").style.display == "none") {
        setInterval(roading, 1500);
        setInterval(time, 500)
        setInterval(line, 1500);
        setInterval(coin, 1)

        setInterval(function () {
            if (document.getElementById("winimg").style.display != "block" && document.getElementById("loseimg").style.display != "block") {
                p += 100;
                document.getElementById("points").innerHTML = p;
                document.getElementById("points_result").innerHTML = p;
                linePoint += 0.15;
                document.getElementsByClassName("line_pionts")[0].style.width = linePoint + "%";
            }
        }, 500);
    }
}, 3000);

//====================הזמן של המשחק ששמוצג בשעון למטה================================

var watch = document.getElementById("watch_num");
function time() {
    if (num_time > 0 && document.getElementById("loseimg").style.display != "block") {
        num_time--;
        if (num_time < 10)
            watch.innerHTML = "0" + num_time + "";
        else watch.innerHTML = num_time;
    }
}

//===============יצירת ומחיקת המכוניות שיורדות מלמעלה והיהלומים================================

let picturesCars = ['../images/cars/carblueh1.png', '../images/cars/cargreenh.png', '../images/cars/carpurpleh1.png', '../images/cars/carredh.png', '../images/cars/caryellowh.png', '../images/cars/carpinkh1.png'];
function roading() {
    let car = document.createElement("div");
    let coin = document.createElement("div");
    random = Math.floor(Math.random() * x.length) + 1;
    numOfCoin = Math.floor(Math.random() * 5) + 2;
    let rnd = Math.floor(Math.random() * picturesCars.length);
    car.id = "cl";
    coin.id = "noMatter";
    var imgSrc = picturesCars[rnd];
    var imgDollarSrc = '../images/levels/diamondbo.png';
    car.style.backgroundImage = `url(${imgSrc})`;
    coin.style.backgroundImage = `url(${imgDollarSrc})`;
    car.classList.add("image-box");
    coin.classList.add("image-coin");
    console.log(coin.id);
    car.classList.add("random-car");
    document.getElementById(`road${random}`).appendChild(car);
    if (random < 3) {
        console.log("Tzivi Shoshi Lali")
        document.getElementById(`road${random + 1}`).appendChild(coin);
    }
    else {
        document.getElementById(`road${random - 2}`).appendChild(coin);
    }

    setTimeout(function () {
        car.remove();
        coin.remove();
    }, 1500);
};
let roads = document.getElementsByClassName("roads");

//=========================התנגשות עם יהלומים וצבירת נקודות מהם===========================================

function coin() {
    for (var i = x.length - 1; i >= 0; i--) {
        var coins = document.getElementsByClassName("image-coin");
        for (let coin of coins) {
            if (x[i].style.display == "block" && x[i].parentElement.id == coin.parentElement.id
                && coin.offsetTop >= "480" && document.getElementById("winimg").style.display != "block" && document.getElementById("loseimg").style.display != "block") {
                document.getElementById("audio_coin").play();
                document.getElementById("point_coin").style.display = "block";
                linePoint += 0.28;
                document.getElementsByClassName("line_pionts")[0].style.width = linePoint + "%";

                p += 10;
                document.getElementById("points").innerHTML = p;
                document.getElementById("points_result").innerHTML = p;


                coin.remove();
                break;
            }
            document.getElementById("point_coin").style.display = "none";

        }
    }
}

//=========================pouop lose-התנגשות עם מכונית===========================================

setInterval(lose, 1)
function lose() {
    for (var i = x.length - 1; i >= 0; i--) {
        var cars = document.getElementsByClassName("image-box");
        for (let car of cars) {
            if (x[i].style.display == "block" && x[i].parentElement.id == car.parentElement.id
                && car.offsetTop >= "400" && document.getElementById("winimg").style.display != "block") {
                document.getElementById("pop").style.display = "block";
                document.getElementById("loseimg").style.display = "block";
                document.getElementById("lose").style.height = "100%";
                document.getElementById("audio1").load();
                document.getElementById("audio_lose").play();

                break;
            }
        }
    }
}

//====================הפסים הלבנים שיורדים באמצע הכביש================================

function line() {
    var line1 = document.createElement("div");
    line1.id = "line";
    document.getElementById(`road${1}`).appendChild(line1);
    line1.classList.add("lines");
    var line = document.createElement("div");
    line.id = "line1";
    document.getElementById(`road${2}`).appendChild(line);
    line.classList.add("lines");
    setTimeout(function () {
        line.remove();
        line1.remove();
    }, 3000);
}

//====================מתי הקול במשחק ידלק================================

function playAudio() {
    document.getElementById("audio1").play();
}

//====================מתי הקול במשחק יכבה================================

function stopPlay() {
    document.getElementById("audio1").load();
}

//====================localStorce-שמירת שיא================================

var localStorage
function localStorege() {
    if (localStorage.level3 == null)
        localStorage.level3 = p;
    else if (localStorage.level3 < p) {
        localStorage.level3 = p;
    }
    else {
        localStorage.level3 = localStorage.level3;
    }
    document.getElementById("score").innerHTML = localStorage.level3;
}

//====================popup win-המשחק נגמר ניצחון================================

setTimeout(function () {
    if (document.getElementById("loseimg").style.display != "block") {
        document.getElementById("pop").style.display = "block";
        document.getElementById("winimg").style.display = "block";
        document.getElementById("lose").style.height = "100%";
        document.getElementById("audio1").load();
        document.getElementById("audio_win").play();
        localStorege();

        setTimeout(function () {
            document.getElementById("points").style.left = "54%";
            document.getElementById("points").style.top = "35%";
            document.getElementById("points_result").style.display = "block";
        }, 100)
    }
}, 33000);


