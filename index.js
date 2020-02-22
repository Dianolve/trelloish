const { app, BrowserWindow, Menu, Tray, session, ipcMain, ipcRenderer  } = require('electron')

  app.on('ready', () => {
    let win = null;
    let loading = new BrowserWindow({show: false, title: 'Trelloish'});
  
    loading.once('show', () => {
      win = new BrowserWindow({
        darkTheme: true,
        title: 'Trelloish',
        show: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: true
        }
      });
      win.webContents.once('dom-ready', () => {
        ipcMain.on('asynchronous-message', (event, arg) => {
          console.log(arg) // prints "ping"
          event.reply('asynchronous-reply', 'pong')
        });
        win.show();
        win.ipcRenderer = ipcRenderer;
        loading.hide();
        loading.close();
      });
      // long loading html
      win.loadURL('https://trello.com',
      {userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:73.0) Gecko/20100101 Firefox/73.0'});
      win.webContents.executeJavaScript(`
      var button = document.createElement("Button");
      button.innerHTML = "=";
      button.setAttribute('id', 'settingsMenu');
      button.style = "bottom:1%;right:1%;position:fixed;border-radius:100px;height:50px;width:50px;border:0px;background-color:#252525;color:white;font-size:30px;"
      document.body.prepend(button); 
      document.getElementById('settingsMenu').onclick = function(){ ipcRenderer.send('asynchronous-message', 'ping') }; 
      `);

    });
    loading.loadFile('index.html');
    loading.show();
  })

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