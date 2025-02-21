const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('Creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(rootPath, 'profit-win32-x64'),
    authors: 'profit Network',
    version: process.env.PROFIT_INSTALLER_VERSION,
    noMsi: true,
    iconUrl: 'https://raw.githubusercontent.com/profitcrypto/profit-blockchain/master/electron-react/src/assets/img/profit.ico',
    outputDirectory: path.join(outPath, 'windows-installer'),
    certificateFile: 'win_code_sign_cert.p12',
    certificatePassword: process.env.WIN_CODE_SIGN_PASS,
    exe: 'profit.exe',
    setupExe: 'ProfitSetup-' + process.env.PROFIT_INSTALLER_VERSION + '.exe',
    setupIcon: path.join(rootPath, 'src', 'assets', 'img', 'profit.ico')
  })
}
