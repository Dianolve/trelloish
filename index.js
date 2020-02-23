const { app, BrowserWindow, Menu, Tray, session, ipcMain, ipcRenderer  } = require('electron');
const path = require("path");

  app.on('ready', () => {
        win = new BrowserWindow({
        darkTheme: true,
        title: 'Trelloish',
        webPreferences: {
          preload: path.join(__dirname, 'inject.js'),
          nodeIntegration: true,
          contextIsolation: true
        }
      });
      console.log(__dirname+'/inject.js');
      win.webContents.loadURL('https://trello.com',
      {userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:73.0) Gecko/20100101 Firefox/73.0'});

    });

let tray = null
app.on('ready', () => {
  tray = new Tray('external-content.duckduckgo.com.jpg');
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Settings', click() { console.log('item 1 clicked'); }},
    { label: 'Separator', type: 'separator' },
    { label: 'Exit', click() {tray = null;app.quit();}},
  ]);
  tray.setToolTip('Trelloish');
  tray.setContextMenu(contextMenu);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    tray = null;
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});