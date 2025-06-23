import { ElectronApp, optimizer } from '@electron-toolkit/utils'
import { globalShortcut, ipcMain } from 'electron'
import chatWindow from './windows/chatWindow'

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
}

// ---------------------------------------------------------------

export const registerShortcuts = (): void => {
  // Register a global shortcut, e.g., Ctrl+Shift+O
  globalShortcut.register('Control+Shift+O', () => {
    console.log('Global shortcut Ctrl+Shift+O pressed')
    chatWindow()
  })
}
