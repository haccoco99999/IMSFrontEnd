const  electron = require("electron");
// Module to control application life.
const app = electron.app;
const path = require('path');
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const url = require("url");
const { protocol, session } = require("electron");
// const protocol = require("protocol");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    icon: path.join(__dirname, "/../public/iconApp.png"),
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webSecurity: false,
    },
  });
  // and load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true,
    });
    mainWindow.setMenu(null)
  mainWindow.loadURL(startUrl);
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    session.defaultSession.clearStorageData();
    mainWindow = null;
  });
}






// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);
// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// app.whenReady().then(() => {
//   protocol.registerFileProtocol("file", (request, callback) => {
//     const pathname = decodeURI(request.url.replace("file:///", ""));
//     callback(pathname);
//   });
// });

// const ASSETS_PATH = app.isPackaged ?
//     path.join(process.resourcesPath, 'images') :
//     path.join(app.getAppPath(), `public${path.sep}images`);

//   import MyImage from path.join(ASSETS_PATH, `images/Logo.png`);

app.on("ready", function () {
  protocol.registerFileProtocol("file", (request, cb) => {
    const url = request.url.replace("file:///", "");
    const decodedUrl = decodeURI(url);
    try {
      return cb(decodedUrl);
    } catch (error) {
      console.error(
        "ERROR: registerLocalResourceProtocol: Could not get file path:",
        error
      );
    }
  });
});
