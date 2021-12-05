const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let justy;

function createJustyWindow () {
  justy = new BrowserWindow({
    title: "Justy",
    width: 500,
    height: 750,
    minWidth: 500,
    minHeight: 54,
    resizable: true,
    minimizable: true,
    frame: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
      contextIsolation: false,
      backgroundThrottling: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  justy.loadFile('src/start-page/start.html')
}

app.whenReady().then(() => {
  createJustyWindow()
  justy.once('ready-to-show', async () => {
      justy.show()
      justy.webContents.openDevTools({ mode: "detach" })
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createJustyWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on("exit", function (event, arg) {
  app.exit();
})