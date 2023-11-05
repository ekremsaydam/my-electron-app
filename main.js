const electron = require("electron");
const { app, BrowserWindow, ipcMain, Menu, MenuItem } = electron;
const path = require("node:path");

const isMac = process.platform === "darwin";
const isLinux = process.platform === "linux";
const isWindows = process.platform === "win32";

const createMenu = () => {
  const menuTemplate = [
    new MenuItem({
      label: "Shop Menu",
      submenu: [
        new MenuItem({
          role: "close",
        }),
        new MenuItem({
          label: "Visit My Site",
          click() {
            electron.shell.openExternal("https://www.google.com");
          },
        }),
        new MenuItem({
          role: "quit",
        }),
      ],
    }),
  ];

  const myAppMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(myAppMenu);
};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    // width: 800,
    // height: 600,
    show: false,
    icon: "icon.png",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.maximize();
  createMenu();

  mainWindow.loadFile("index.html");

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  ipcMain.handle("close", () => {
    mainWindow.close();
  });
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (!isMac) app.quit();
});
