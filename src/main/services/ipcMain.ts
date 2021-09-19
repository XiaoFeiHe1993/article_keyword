import { ipcMain, dialog, BrowserWindow } from 'electron'
import Server from '../server'
import { winURL } from '../config/StaticPath'
import { updater } from './HotUpdater'

// var nodejieba = require("nodejieba")

// 腾讯云sdk
const tencentcloud = require("tencentcloud-sdk-nodejs");

export default {
  Mainfunc(mainWindow: BrowserWindow, IsUseSysTitle: Boolean) {
    ipcMain.handle('IsUseSysTitle', async () => {
      return IsUseSysTitle
    })
    ipcMain.handle('windows-mini', () => {
      mainWindow.minimize()
    })
    ipcMain.handle('window-max', async () => {
      if (mainWindow.isMaximized()) {
        mainWindow.restore()
        return { status: false }
      } else {
        mainWindow.maximize()
        return { status: true }
      }
    })
    ipcMain.handle('window-close', () => {
      mainWindow.close()
    })
    ipcMain.handle('open-messagebox', async (event, arg) => {
      const res = await dialog.showMessageBox(mainWindow, {
        type: arg.type || 'info',
        title: arg.title || '',
        buttons: arg.buttons || [],
        message: arg.message || '',
        noLink: arg.noLink || true
      })
      return res
    })
    ipcMain.handle('open-errorbox', (event, arg) => {
      dialog.showErrorBox(
        arg.title,
        arg.message
      )
    })
    ipcMain.handle('start-server', async () => {
      try {
        const serveStatus = await Server.StatrServer()
        console.log(serveStatus)
        return serveStatus
      } catch (error) {
        dialog.showErrorBox(
          '错误',
          error
        )
      }
    })
    ipcMain.handle('stop-server', async (event, arg) => {
      try {
        const serveStatus = await Server.StopServer()
        return serveStatus
      } catch (error) {
        dialog.showErrorBox(
          '错误',
          error
        )
      }
    })
    ipcMain.handle('hot-update', (event, arg) => {
      updater(mainWindow)
    })
    ipcMain.handle('open-win', (event, arg) => {
      const ChildWin = new BrowserWindow({
        height: 595,
        useContentSize: true,
        width: 842,
        autoHideMenuBar: true,
        minWidth: 842,
        show: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          webSecurity: false,
          // 如果是开发模式可以使用devTools
          devTools: process.env.NODE_ENV === 'development',
          // devTools: true,
          // 在macos中启用橡皮动画
          scrollBounce: process.platform === 'darwin'
        }
      })
      ChildWin.loadURL(winURL + `#${arg.url}`)
      ChildWin.webContents.once('dom-ready', () => {
        ChildWin.show()
        // 由于渲染进程可能会加载缓慢，所以在这里，加一个延迟，等一等渲染进程
        setTimeout(() => {
          ChildWin.webContents.send('send-data-test', arg.sendData)
        }, 1000)
        if (arg.IsPay) {
          // 检查支付时候自动关闭小窗口
          const testUrl = setInterval(() => {
            const Url = ChildWin.webContents.getURL()
            if (Url.includes(arg.PayUrl)) {
              ChildWin.close()
            }
          }, 1200)
          ChildWin.on('close', () => {
            clearInterval(testUrl)
          })
        }
      })
    }),
    // 获取文章中的机构信息
    ipcMain.handle('article-org', (event, arg) => {
      // const tags = nodejieba.tag(arg) || []
      // const filters = tags.filter(item => ['nt', 'ORG'].indexOf(item.tag) > -1)
      // return filters
    })
    // 腾讯云-关键词提取
    ipcMain.handle('tencent-keywords', async (event, arg) => {
      const NlpClient = tencentcloud.nlp.v20190408.Client;
      const clientConfig = {
        credential: {
          secretId: "AKID46xd9VysoZ8vb9hjldKqBKJ7nHZgpOxM",
          secretKey: "c6OboqjT4Ujmdml6Z8e3IMEuOhtyseFi",
        },
        region: "ap-guangzhou",
        profile: {
          httpProfile: {
            endpoint: "nlp.tencentcloudapi.com",
          },
        },
      };
      const client = new NlpClient(clientConfig);
      const params = {
        Text: arg
      };
      const data = await client.KeywordsExtraction(params)
      return data.Keywords || []
    })
  }
}
