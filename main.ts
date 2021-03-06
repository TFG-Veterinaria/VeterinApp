import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  let anchoVentana = 1280;
  let altoVentana = 720;

  const margenHorizontal = Math.floor((size.width - anchoVentana) / 2);
  const margenVertical = Math.floor((size.height - altoVentana) /2);
  // Create the browser window.
  win = new BrowserWindow({
    x: margenHorizontal,
    y: margenVertical,
    minWidth: anchoVentana,
    width: anchoVentana,
    minHeight: 749,
    height: 749,
    webPreferences: {
      nodeIntegration: true,
    },
    resizable: false,
    show: false,
    frame: false
  });

  const express = require('express');
  const bodyParser = require('body-parser');
  const server = express();
  const usuario = require('./src/server/routes/usuario.route');
  const cliente = require('./src/server/routes/cliente.route');
  const globalModel = require('./src/server/routes/global.route');
  const mascota = require('./src/server/routes/mascota.route');
  const clinica = require('./src/server/routes/clinica.route');


  // Set up mongoose connection
  const mongoose = require('mongoose');
  let dev_db_url = 'mongodb+srv://admin:admin@frankfurtcluster-kdmjy.mongodb.net/VeterinApp';
  let mongoDB = process.env.MONGODB_URI || dev_db_url;
  mongoose.connect(mongoDB);
  mongoose.Promise = global.Promise;
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({extended: false}));
  server.use('/usuarios', usuario);
  server.use('/clientes', cliente);
  server.use('/global', globalModel);
  server.use('/mascotas', mascota);
  server.use('/clinicas', clinica);

  let port = 9018;
  server.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.setMenu(null);

  if (true) {
    win.webContents.openDevTools();
  }

  win.setSize(anchoVentana,altoVentana+29);

  const { ipcMain } = require('electron');

  ipcMain.on('request-update-in-window', (event, arg) => {
    win.webContents.send('action-update', arg);
  });

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  win.once('ready-to-show', () => {
    win.show();
  })
}

try {


  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', () => {
    createWindow();
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
