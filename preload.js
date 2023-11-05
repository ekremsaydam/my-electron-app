const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.chrome,
  ping: () => ipcRenderer.invoke("ping"),
  close: () => ipcRenderer.invoke("close"),
});
