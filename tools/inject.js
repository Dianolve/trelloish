const { ipcRenderer } = require('electron');
const Config = require('../tools/config.js');

const config = new Config({ configName: 'user-preferences' });

function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

function makeDark(set) {
    var background = document.getElementById('body'); //set #1c1e1f, set fff
    var bottomGradient = document.getElementById('bottom-gradient'); //-webkit-gradient(linear, left top, left bottom, from(#1c1e1f), color-stop(46%, #1c1e1f), color-stop(74%, #1c1e1f), to(#1c1e1f))
    var languagepicker = document.getElementById('language-picker'); //set #1c1e1f, set fff
    var arrowleft = document.getElementsByClassName('arrow.arrow-left'); //
    var quicksignup = document.getElementsByClassName('quick-signup'); //.atlassian-brand
    var atlassianbrand = document.getElementsByClassName('atlassian-brand'); //inner-section .account-form
    var innersection = document.getElementsByClassName('inner-section');
    var accountform = document.getElementsByClassName('account-form');
    var formfield = document.getElementsByClassName('form-field'); //.atlassian-brand .inner-section .form-field google-button
    var googlebutton = document.getElementsByClassName('google-button');
    if(set) {
        document.body.style.backgroundColor = "#1c1e1f";
        document.body.style.color = "#fff";
    }
    else {
        document.body.style.backgroundColor = "#fff";
        document.body.style.color = "#172B4D";
    }
}

var old;

function check1() {
    old = config.get('darkMode');
    setInterval(function(){
        setTimeout(function(){
            const configlive = new Config({ configName: 'user-preferences' });
            if(configlive.get('darkMode') == old) {
            }
            else {
                old = configlive.get('darkMode');
                switch(configlive.get('darkMode')) {
                    case true: {
                        makeDark(true);
                        break;
                    }
                    case false: {
                        makeDark(false);
                        break;
                    }
                }
            }
        }, 500);
     }, 1000);
}

function injectSettings() {
    switch(config.get('darkMode')) {
        case true: {
            makeDark(true);
            break;
        }
        case false: {
            makeDark(false);
            break;
        }
    }
    check1();
    var menu = '<i id="settingslogo" class="material-icons">settings</i>';
    var materialIcons = document.createElement('link');
    materialIcons.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');
    materialIcons.setAttribute('rel', 'stylesheet');
    document.body.prepend(materialIcons);
    var menuDiv = document.createElement("div");
    menuDiv.setAttribute('id', 'settingsMenuTLI');
    menuDiv.innerHTML = menu;
    document.body.prepend(menuDiv);
    addStyleString(`
    @keyframes fadeOut {
        0% { opacity: 1;}
        100% { opacity: 0.1;}
    }
    @keyframes fadeIn {
        0% { opacity: 0.1;}
        100% { opacity: 1;}
    }
    #settingsMenuTLI {
        bottom:5px;
        right:5px;
        position:fixed;
        height:50px;
        width:50px;
        border:0px;
        color:white;
        animation: fadeOut 1s;
        opacity: 0.1;
        z-indes: 999;
    }
    #settingsMenuTLI:hover {
        cursor: pointer;
        -webkit-transition: opacity 3s ease-in-out;
        animation: fadeIn 1s;
        opacity: 1;
    }
  `);
}

function injectListeners() {
    const settingsDiv = document.getElementById('settingsMenuTLI');
    settingsDiv.addEventListener('click', () => { 
        ipcRenderer.send('async-ipc', 'launch-settings'); 
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    injectSettings();
    injectListeners();
});

