const { app, BrowserWindow, Menu, Tray, session, ipcMain } = require('electron');
const path = require("path");
const Config = require('./tools/config.js');

//Main Events <>

const config = new Config({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 800, height: 600 }
  }
});

app.on('ready', () => {
  let { width, height } = config.get('windowBounds');
  win = new BrowserWindow({
    width: width,
    height: height,
    darkTheme: true,
    title: 'Trelloish',
    webPreferences: {
      preload: path.join(__dirname, '/tools/inject.js'),
      nodeIntegration: true,
      contextIsolation: true
    }
  });
  win.webContents.loadURL('https://trello.com',
    {userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:73.0) Gecko/20100101 Firefox/73.0'});
  win.on('resize', () => {
      let { width, height } = win.getBounds();
      config.set('windowBounds', { width, height });
  });
});


var tray = null;
app.on('ready', () => {
  tray = new Tray(path.join(__dirname, '/img/external-content.duckduckgo.com.jpg'));
  var contextMenu = Menu.buildFromTemplate([
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

// IPC Events <>

ipcMain.on('async-ipc', (event, arg) => {
  switch (arg) {
    case "launch-settings": {
      set = new BrowserWindow({
        darkTheme: true,
        title: 'Settings',
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: true
        }
      });
      set.loadFile(path.join(__dirname, '/settings/settings.html'));
    }
  }
});