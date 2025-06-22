import { electronApp } from '@electron-toolkit/utils'
import { app, globalShortcut } from 'electron'
import { setup } from './helpers'
import mainWindow from './windows/mainWindow'

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // ----------------------------------------
  setup({
    app,
    electronApp
  })
  // ----------------------------------------
  mainWindow()
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
