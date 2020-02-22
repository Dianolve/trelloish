const {
    app,
    BrowserWindow,
    BrowserView,
    ipcMain
  } = require("electron");
function createWindow () {
    view = new BrowserView({
        webPreferences: {
          nodeIntegration: true,
          preload: '/utils/inject.js' //using ytmdesktops method i guess???
        }
      });
  win.loadURL('https://trello.com');
  win.webContents.on('did-finish-load', ()=>{
    let code = `
    document.title = 'trelloish';
    var authButton = document.getElementById("bottom-gradient");
    authButton.style.display = 'none';
    `;
            win.webContents.executeJavaScript(code);
    });
}

app.whenReady().then(createWindow);

/* MACOS STANDARDS */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
/*                 */