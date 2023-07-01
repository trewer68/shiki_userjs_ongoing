// ==UserScript==
// @name         Подсчет онгоингов
// @namespace    https://github.com/trewer68/shiki_userjs_ongoing
// @version      1.2
// @description  Добавляет дополнительные кнопки и статистику по количеству серий на странице списков.
// @author       trewer68
// @license      MIT
// @match        https://shikimori.one/*
// @match        http://shikimori.me/*
// @match        https://shikimori.me/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shikimori.one
// @updateURL    https://github.com/trewer68/shiki_userjs_ongoing/script.user.js
// @downloadURL  https://github.com/trewer68/shiki_userjs_ongoing/script.user.js
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  function checkPage () {
    let currentURL = location.pathname.substring(1).split('/');
    let hrefURL = location.href.split("/");
    hrefURL = hrefURL[0]+"//"+hrefURL[1]+"/"+hrefURL[2]+"/"+hrefURL[3]+"/";
    let selector;
    let all_series = 0;
    let wathed_series = 0;
    let max_series = 0;

    switch (currentURL[1]) {
      case 'list':
        selector = 'scores';
        for (let test_count = 0; test_count < document.getElementsByClassName("user_rate selectable editable").length; test_count++) {
            let ss = document.getElementsByClassName("user_rate selectable editable")[test_count].getElementsByClassName("num hoverable")[1];
            all_series += Number(ss.getElementsByClassName("misc-value")[0].childNodes[1].textContent);
            wathed_series += Number(ss.getElementsByClassName("current-value")[0].getElementsByTagName('span')[0].innerHTML);
            max_series += Number(ss.getElementsByClassName("current-value")[0].getAttribute('data-max'));
        }
        ap("Осталось: ",(all_series-wathed_series));
        ap("Часов: ",(Math.round((all_series-wathed_series)*22/60))+"~");
        ap("Вышедшие: ",all_series);
        ap("Выйдет: ",max_series);
        al(hrefURL+"achievements","Достижения");
        al(hrefURL+"favorites","Избранное");
        al(hrefURL+"history","История");
        break;
    }
  }
  function ap (z,x) {
    var newEl = document.createTextNode(z);
    var newEl1 = document.createElement("span");
    newEl1.className = "stat-value";
    newEl1.innerHTML = x;
    document.getElementsByClassName("summary list lines")[0].appendChild(newEl);
    document.getElementsByClassName("summary list lines")[0].appendChild(newEl1);
  }
  function al (z,x) {
    var newEl = document.createElement("span");
    var newEl1 = document.createElement("a");
    newEl1.className = "b-link";
    newEl1.title = x;
    newEl1.href = z;
    var newEl2 = document.createElement("span");
    newEl2.innerHTML = x;
    document.getElementsByClassName("b-breadcrumbs")[0].appendChild(newEl).appendChild(newEl1).appendChild(newEl2);
  }
  checkPage();

  document.addEventListener('page:load', checkPage);
  document.addEventListener('turbolinks:load', checkPage);
})();
