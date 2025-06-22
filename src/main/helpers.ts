import { ElectronApp, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, globalShortcut, ipcMain } from 'electron'
import mainWindow from './windows/mainWindow'

export const setup = ({
  app,
  electronApp
}: {
  app: Electron.App
  electronApp: ElectronApp
}): void => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  // ----------------------------------------
  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  // ----------------------------------------
  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  // ----------------------------------------
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) mainWindow()
  })
}

// ---------------------------------------------------------------

export const registerShortcuts = (): void => {
  // Register a global shortcut, e.g., Ctrl+Shift+O
  globalShortcut.register('Control+Shift+O', () => {
    console.log('Global shortcut Ctrl+Shift+O pressed')
  })
}
