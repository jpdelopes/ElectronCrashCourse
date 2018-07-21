/*
 * Tutorial from:   https://www.youtube.com/watch?v=2RxHQoiDctI
 *                  https://coursetro.com/courses/22/Creating-Desktop-Apps-with-Electron-Tutorial
 */

const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')
var price = document.querySelector('h1')
var targetPrice = document.getElementById('targetPrice')

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=EUR')
        .then(res => {
            const cryptos = res.data.BTC.EUR
            price.innerHTML = '€'+cryptos.toLocaleString('en')
        })
}

getBTC()
setInterval(getBTC, 30000);

notifyBtn.addEventListener('click', function(event) {
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({ width: 400, height: 200, frame: false, alwaysOnTop: true, transparent: true })
    win.on('close', function() { win = null })
    win.loadURL(modalPath)
    win.show()
})

ipc.on('targetPriceVal', function(event, arg){
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = '€'+targetPriceVal.toLocaleString('en')
})