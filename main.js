const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = !app.isPackage;

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}
// if (process.env.NODE_ENV === "development") {
//   require("electron-reload")(__dirname, {
//     electron: path.join(__dirname, "node_modules", ".bin", "electron"),
//   });
// }

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
