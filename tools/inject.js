const { ipcRenderer } = require('electron');
const Config = require('../tools/config.js');

const config = new Config({ configName: 'user-preferences' });

isDarkMode = {
    aInternal: config.get('darkMode'),
    aListener: function(val) {},
    set a(val) {
      this.aInternal = val;
      this.aListener(val);
    },
    get a() {
      return this.aInternal;
    },
    registerListener: function(listener) {
      this.aListener = listener;
    }
};

console.log(isDarkMode.a);

isDarkMode.registerListener(function(val) {
    console.log('var darkmode changed');
    if(config.get('darkMode') == true) {
        config.set('darkMode', false);
        darkMode(false);
    }
    else if(config.get('darkMode') == false) {
        config.set('darkMode', true);
        darkMode(true);
    }
});

function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

function darkMode(set) {
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
        console.log('darkmode enabled');
        background.style.backgroundColor = "#1c1e1f";
    }
}

function injectSettings() {
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

