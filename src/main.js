// eslint-disable-next-line import/no-extraneous-dependencies
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const { checkForUpdates } = require("./updater");

let justy;

function createJustyWindow() {
  justy = new BrowserWindow({
    title: "Justy",
    width: 500,
    height: 750,
    minWidth: 500,
    minHeight: 650,
    resizable: true,
    minimizable: true,
    frame: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      devTools: false,
      contextIsolation: false,
      backgroundThrottling: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (fs.existsSync(path.join(app.getPath("userData"), "preferences.json"))) {
    justy.loadFile("src/dashboard/dashboard.html");
  } else {
    justy.loadFile("src/start-page/start.html");
  }
}

app.whenReady().then(() => {
  checkForUpdates();
  createJustyWindow();
  justy.once("ready-to-show", async () => {
    justy.show();
    // justy.webContents.openDevTools({ mode: "detach" });
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createJustyWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("load-preferences", function (event) {
  const clickedEvent = event;
  const preferences = fs.readFileSync(
    path.join(app.getPath("userData"), "preferences.json")
  );
  clickedEvent.returnValue = JSON.parse(preferences);
});

ipcMain.on("save-preferences", function (event, arg) {
  fs.writeFileSync(
    path.join(app.getPath("userData"), "preferences.json"),
    JSON.stringify(arg, null, 2)
  );
});

ipcMain.on("delete-preferences", function () {
  fs.unlinkSync(path.join(app.getPath("userData"), "preferences.json"));
});

ipcMain.on("exit", function () {
  app.exit();
});

ipcMain.on("load-dashboard", () => {
  justy.loadFile("src/dashboard/dashboard.html");
});

ipcMain.on("load-start", () => {
  justy.loadFile("src/start-page/start.html");
});

ipcMain.on("reload-app", () => {
  justy.reload();
});
