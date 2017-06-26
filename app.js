// our required packages
const electron = require("electron");

// deconstruct electron and declare some of the variables we'll need
const { app, BrowserWindow, ipcMain  } = electron;

// load our environment variables
require("dotenv").config();

// define mainWindow outside of the scope
let mainWindow;

// when all windows are closed, make sure we quit
app.on("window-all-closed", function() {
  app.quit();
});

// when the application is ready, start doing shit
app.on("ready", function() {
  console.log("App is running.");

  const { screen } = electron;

  // get the user's primary monitor
  let mainScreen = screen.getPrimaryDisplay();

  // create our BrowserWindow
  mainWindow = new BrowserWindow({
    name: "Electron Project Management",
    title: "Electron Project Management",
    x: mainScreen.bounds.x,
    y: mainScreen.bounds.y,
    width: 1280,
    height: 720,
    toolbar: false
  });

  // entry point
  if (process.env.PACKAGE === "true") {
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
  } else {
    // load the dev url and open dev tools in another window
    mainWindow.loadURL(process.env.HOST);
    mainWindow.webContents.openDevTools({detach:true});
  }

});
