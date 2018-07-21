/*
 * Tutorial from:   https://www.youtube.com/watch?v=2RxHQoiDctI
 *                  https://coursetro.com/courses/22/Creating-Desktop-Apps-with-Electron-Tutorial
 */

const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.close();
})

const updateBtn = document.getElementById('updateBtn')

updateBtn.addEventListener('click', function(){
    ipc.send('update-notify-value', document.getElementById('notifyVal').value)

    var win =  remote.getCurrentWindow();
    win.close();
})