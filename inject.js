const { remote, ipcRenderer } = require("electron");
window.ipcRenderer = ipcRenderer;
var content = remote.getCurrentWebContents();

content.addListener("dom-ready", function() {
    injectSettings();
});

content.addListener("will-navigate", function() {
    injectSettings();
});


function injectSettings() {
    var menu = `<i id="settingslogo" class="material-icons">settings</i>`;
    console.log('injected');
    content.executeJavaScript(`
    var materialIcons = document.createElement('link');
    materialIcons.setAttribute('href', 'https://fonts.googleapis.com/icon?family=Material+Icons');
    materialIcons.setAttribute('rel', 'stylesheet');
    document.body.prepend(materialIcons);
    var menuDiv = document.createElement("div");
    menuDiv.setAttribute('id', 'settingsMenu');
    menuDiv.innerHTML = '${menu}';
        document.body.prepend(menuDiv);; 
    `);
    content.insertCSS(`
    @keyframes fadeOut {
        0% { opacity: 1;}
        99% { opacity: 0.3;}
        100% { opacity: 0.1;}
    }
    #settingslogo {
        bottom:5px;
        right:5px;
        position:fixed;
        height:50px;
        width:50px;
        border:0px;
        color:white;
        opacity: 0.1;
    }
    #settingslogo:hover {
        cursor: pointer;
        -webkit-transition: opacity .5s ease-in-out;
        -moz-transition: opacity .5s ease-in-out;
        -ms-transition: opacity .5s ease-in-out;
        -o-transition: opacity .5s ease-in-out;
        opacity: 1;
    }
    `)
}