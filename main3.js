// // pretraga gradova - URADJENO!!!
// // cek boks za home town - URADJENO!!!
// // localstorage za home town - URADJENO!!!
// // pozadina se menja u odnosu kakvo je vreme - URADJENO!!!

let polje = document.querySelector('#polje');
let area = document.querySelector('#area');
let btn = document.querySelector('#btn');
let homeTown = document.querySelector('#homeTown');

window.addEventListener('load', getData);
btn.addEventListener('click' , move);
homeTown.addEventListener('click' , city);

function getData(){
    if (localStorage.getItem('City') !="") {
        $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + localStorage.getItem('City') + "&units=metric&APPID=bb58eea718d09f100d5a5002f25f715a",
                dataType: "json"
        })
        .done(function (res) {
            setImage(res);
            area.value = "";
            $(area).css('color', 'yellow')
            area.value += 'Trenutna temperatura u gradu ' + localStorage.getItem('City') + ' je ' + res.main.temp + ' stepeni. \n';
            area.value += 'Maksimalna temperatura u gradu ' + localStorage.getItem('City') + ' je ' + res.main.temp_max + ' stepeni. \n';
            area.value += 'Minimalna temperatura u gradu ' + localStorage.getItem('City') + ' je ' + res.main.temp_min + ' stepeni. \n';
            area.value += 'Brzina vetra u gradu ' + localStorage.getItem('City') + ' je ' + res.wind.speed + ' metara u sekundi. \n';
        })
    }
}

function move() {
    let msg = polje.value;
    $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + msg + "&units=metric&APPID=bb58eea718d09f100d5a5002f25f715a",
            dataType: "json"
    })
    .done(function (res) { 
        setImage(res);
        area.value = "";
        $(area).css('color', 'yellow')
        area.value += 'Trenutna temperatura u gradu ' + msg + ' je ' + res.main.temp + ' stepeni. \n';
        area.value += 'Maksimalna temperatura u gradu ' + msg + ' je ' + res.main.temp_max + ' stepeni. \n';
        area.value += 'Minimalna temperatura u gradu ' + msg + ' je ' + res.main.temp_min + ' stepeni. \n';
        area.value += 'Brzina vetra u gradu ' + msg + ' je ' + res.wind.speed + ' metara u sekundi. \n';
    })       
}

function city(){
    if (homeTown.checked == true) {
       localStorage.setItem('City' , polje.value);
    }
}

function setImage(res){
    if (res.weather[0].description === 'clear sky') {
        $(area).css('background-image', 'url(img/vedro.jpg)')
    } else if (res.weather[0].description === 'light rain') {
        $(area).css('background-image', 'url(img/oblaci.jpg)')
    } else if (res.weather[0].description === 'shower rain') {
        $(area).css('background-image', 'url(img/kisa.jpg)')
    }
}

// KRUSEVAC, NEW YORK, TOKYO