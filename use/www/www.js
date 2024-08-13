let root = 'www.lingningyu.cn', howHttp = 'http://', addURL = '';

window.onload = function () {
    addHtmlStr();// -----补充内容-----
    setPageUrl();// -----页面链接适应-----
    setWidthHeight();// -----页面模块高度适应-----
    window.addEventListener('scroll', showVisible);// -----图片加载-----
    infoHtml.addEventListener('scroll', showVisible);
    setInterval(webViews, 1000);// -----网站访问人数-----
    // console.log(getRandomStr(15))
}

// -----页面模块高度适应-----
function setWidthHeight() {
    let windowWidth = getWindowsWidth();
    let windowHeight = getWindowsHeight() - 1;
    document.getElementById('pageBox').style.height = windowHeight + 'px';
    const basicBgImg = document.getElementById('basicBgImg');// 背景图
    const typeBgImg = document.getElementById('typeBgImg');
    if ((windowWidth / windowHeight) > (2862 / 1660)) {
        basicBgImg.style.height = 'auto';
        basicBgImg.style.width = '100%';
        typeBgImg.style.height = 'auto';
        typeBgImg.style.width = '100%';
    } else {
        basicBgImg.style.height = '100%';
        basicBgImg.style.width = 'auto';
        typeBgImg.style.height = '100%';
        typeBgImg.style.width = 'auto';
    }
    // 信息盒
    document.getElementById('infoHtml').style.height = document.getElementById('info').clientHeight - document.getElementById('infoTitle').clientHeight - document.getElementById('infoLink').clientHeight + 'px';
    clearTimeout(timeoutId);
}
window.onresize = setWidthHeight;

// 网页窗口宽度、高度获取
function getWindowsWidth() {
    let windowWidth = 0;
    if (window.innerWidth) windowWidth = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth)) windowWidth = document.body.clientWidth;
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) windowWidth = document.documentElement.clientWidth;
    return windowWidth;
}
function getWindowsHeight() {
    let windowHeight = 0;
    if (window.innerHeight) windowHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight)) windowHeight = document.body.clientHeight;
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) windowHeight = document.documentElement.clientHeight;
    return windowHeight;
}

// -----补充内容-----
function addHtmlStr() {
    let date = new Date();
    let year = date.getFullYear();
    const copyright = document.getElementById('copyright');
    if (copyright) copyright.innerHTML = '©2019-' + year + ' JS 版权所有';
    if (!/\/license\/yuko\//.test(window.location.href))
        document.getElementById('infoBg').style.height = '0';

}

// -----页面链接适应-----
function setPageUrl() {
    getAddUrlStr();
    let file = addURL + 'use/www/www_webInfo.txt';
    fetch(file)
        .then(response => response.text())
        .then(data => {
            // 解析文本文件内容为键值对
            const lines = data.split('\n');
            const dataObj = {};
            lines.forEach(line => {
                const parts = line.split('=');
                if (parts.length === 2) {
                    const key = parts[0].trim();
                    const value = parts[1].trim().replace(/"/g, '');
                    dataObj[key] = value;
                }
            });

            // 文件root、howHttp
            if (dataObj.hasOwnProperty('root')) root = dataObj['root'];
            if (dataObj.hasOwnProperty('howHttp')) howHttp = dataObj['howHttp'];
            let a = document.getElementsByTagName('a');
            for (i = 0; i < a.length; i++) {
                if (a[i].href.lastIndexOf('root&') != -1) {
                    let newHref = a[i].href.substring(a[i].href.lastIndexOf('root&'));
                    newHref = newHref.replace('root&', (howHttp + root + '/'));
                    a[i].href = newHref;
                }
            }
        })
        .catch(error => {
            console.error('文件加载失败：', error);
            // 本地root、howHttp
            let a = document.getElementsByTagName('a');
            for (i = 0; i < a.length; i++) {
                if (a[i].href.lastIndexOf('root&') != -1) {
                    let newHref = a[i].href.substring(a[i].href.lastIndexOf('root&'));
                    newHref = newHref.replace('root&', (howHttp + root + '/'));
                    a[i].href = newHref;
                }
            }
        });
}
function getWebRoot() {
    getAddUrlStr();
    let file = addURL + 'use/www/www_webInfo.txt';
    let webRoot = root;
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const dataObj = {};
            lines.forEach(line => {
                const parts = line.split('=');
                if (parts.length === 2) {
                    const key = parts[0].trim();
                    const value = parts[1].trim().replace(/"/g, '');
                    dataObj[key] = value;
                }
            });
            if (dataObj.hasOwnProperty('root')) webRoot = dataObj['root'];
        })
        .catch(error => { });
    return webRoot;
}
function getWebHowHttp() {
    getAddUrlStr();
    let file = addURL + 'use/www/www_webInfo.txt';
    let webHowHttp = howHttp;
    fetch(file)
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n');
            const dataObj = {};
            lines.forEach(line => {
                const parts = line.split('=');
                if (parts.length === 2) {
                    const key = parts[0].trim();
                    const value = parts[1].trim().replace(/"/g, '');
                    dataObj[key] = value;
                }
            });
            if (dataObj.hasOwnProperty('howHttp')) webHowHttp = dataObj['howHttp'];
        })
        .catch(error => { });
    return webHowHttp;
}
function getAddUrlStr() {
    let nowURL = window.location.href;
    nowURL = nowURL.substring(nowURL.lastIndexOf(root));
    if (nowURL.lastIndexOf('/') < nowURL.lastIndexOf('.')) nowURL = nowURL.substring(0, nowURL.lastIndexOf('/') + 1);
    let layer = (nowURL.replace(/\/$/, '').match(/\//g) || []).length;
    i = 0; addURL = '';
    for (; i < layer; i++) addURL += '../';
}

// 信息窗口开关功能
let infoBox = false, bgImg = false;
let timeoutId;
const infoBg = document.getElementById('infoBg'), infoTitle = document.getElementById('infoTitle'), infoHtml = document.getElementById('infoHtml'), infoLink = document.getElementById('infoLink');
const barBox = document.getElementById('barBox'), link = document.getElementById('link'), bgInfo = document.getElementById('bgInfo'), typeBgImg = document.getElementById('typeBgImg');
const basicBgInfo = document.getElementById('basicBgInfo'), typeBgInfo = document.getElementById('typeBgInfo');
function openInfoBox(str) {
    link.style.opacity = 0;
    barBox.style.width = '0';
    infoTitle.innerText = getInfoboxTypeName(str);
    let src = 'use/www/background_' + str + '.webp';
    str = 'type_' + str;
    infoHtml.innerHTML = document.getElementById(str).innerHTML;
    let strLink = document.getElementById(str + '_link');
    if (strLink)
        infoLink.innerHTML = strLink.innerHTML;
    let strBgInfo = document.getElementById(str + '_bgInfo');
    if (strBgInfo) {
        basicBgInfo.style.display = 'none';
        typeBgInfo.innerHTML = strBgInfo.innerHTML;
    } else bgInfo.style.opacity = 0;
    infoBg.style.height = '';
    if (bgImg) {
        typeBgImg.src = src;
        typeBgImg.alt = getInfoboxTypeName(str);
        typeBgImg.style.opacity = 1;
    } else {
        typeBgImg.src = '';
        typeBgImg.alt = '';
    }
    function delayed() {
        timeoutId = setTimeout(setWidthHeight, 600);
    }
    delayed();
    showVisible();
    infoBox = true;
}
function closeInfoBox() {
    infoBg.style.height = '0';
    infoTitle.innerText = '';
    infoHtml.innerHTML = '';
    infoLink.innerHTML = '';
    basicBgInfo.style.display = 'inline';
    typeBgInfo.innerHTML = '';
    barBox.style.width = '';
    bgInfo.style.opacity = '';
    link.style.opacity = '';
    typeBgImg.style.opacity = '0';
    infoBox = false;
}
function getInfoboxTypeName(str) {
    switch (str) {
        case 'yuko': bgImg = true; return '介绍';
        case 'mcid': bgImg = true; return 'API';
        case 'ws': bgImg = true; return '变娃';
        case 'project': bgImg = true; return '伶宁布划';
        case 'animegao': bgImg = false; return '规约';
        case 'about': bgImg = true; return '关于';
        default: return '';
    }
}

// -----图片加载-----
function isVisible(elem) {
    let coords = elem.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;
    let topVisible = coords.top > 0 && coords.top < windowHeight;
    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;
    return topVisible || bottomVisible;
}
function showVisible() {
    for (let img of document.querySelectorAll('img')) {
        let realSrc = img.dataset.src;
        if (!realSrc) continue;
        if (isVisible(img)) {
            img.src = realSrc;
            img.dataset.src = '';
        }
    }
}


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
    }
    return "";
}

function getRandomStr(length) {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}