let fs = require('fs');
let path = require('path');
let basepath = './';
let moduleName = process.argv.splice(2)[1];
const projectName = 'Sbox';
String.prototype.firstUpperCase=function(){
    return this.replace(/^\S/,function(s){return s.toUpperCase();});
}
const actionPath = `Sbox/Actions`;
const actionFile = `Sbox/Actions/${projectName}${moduleName.firstUpperCase()}Action.js`;
const compoentPath = `Sbox/Components/${projectName}${moduleName.firstUpperCase()}`;
const compoentFile = `Sbox/Components/${projectName}${moduleName.firstUpperCase()}/${projectName}${moduleName.firstUpperCase()}ViewController.js`;
const modulePath = `Sbox/Modules/${projectName}${moduleName.firstUpperCase()}Module`;
const moduleFile = `Sbox/Modules/${projectName}${moduleName.firstUpperCase()}Module/${projectName}${moduleName.firstUpperCase()}Module.js`;
const moduleAPIPath = `Sbox/Modules/${projectName}${moduleName.firstUpperCase()}Module`;
const moduleAPIFile = `Sbox/Modules/${projectName}${moduleName.firstUpperCase()}Module/${projectName}${moduleName.firstUpperCase()}API.js`;
const storePath = `Sbox/Stores`;
const storeFile = `Sbox/Stores/${projectName}${moduleName.firstUpperCase()}Store.js`;
const dispatcherPath = `Sbox/Dispatchers`;
const dispatcherFile = `Sbox/Dispatchers/${projectName}Dispatcher.js`;

const allPath = [
                  {
                    path:actionPath,
                    file:actionFile,
                  },
                  {
                    path:compoentPath,
                    file:compoentFile,
                  },
                  {
                    path:modulePath,
                    file:moduleFile,
                  },
                  {
                    path:moduleAPIPath,
                    file:moduleAPIFile,
                  },
                  {
                    path:storePath,
                    file:storeFile,
                  },
                  {
                    path:dispatcherPath,
                    file:dispatcherFile,
                  }
                ]
let exists = function () {
    return new Promise((res) => {
        (async function () {
          for(let pathObj of allPath) {
            const path = pathObj.path;
            for (let a of path.split('/')) {
                fs.existsSync(basepath + a) ? basepath = `${basepath}${a}/` : await mkdir(a);
            }
            await writeFile(pathObj.file)
            basepath = './'
          }
          writeViewController();
          writeAction();
          writeModule();
          writeAPI();
          writeStore();
          writeDispatch();
          res(basepath);
        })()
    })
}
let mkdir = function (a) {
    return new Promise((res, rej) => {
        fs.mkdir(basepath + a, (err) => {
            if (err) rej(err);
            basepath = `${basepath}${a}/`
            res(basepath);
        });
    })
}
let writeFile = function (file) {
    return new Promise((res, rej) => {
        (async function () {
            await fs.writeFile(file,'', (err) => {
                    if (err) rej(err)
                })
            res('succ');
        })()
    })
};
let writeViewController = function () {
  fs.readFile('./tmpl/ViewController.js', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    let result = data.replace('writeViewController',`${moduleName}ViewController`);
    result = result.replace('_renderView',`_render${moduleName}View`);
    result = result.replace('_renderView',`_render${moduleName}View`);
    result = result.replace('Action',`import ${projectName}${moduleName}Action from '../../Actions/${projectName}${moduleName}Action';`);
    result = result.replace('Store',`import ${projectName}${moduleName}Store from '../../Stores/${projectName}${moduleName}Store';`);
    result = result.replace('Store.getState()',`${projectName}${moduleName}Store.getState()`);
    result = result.replace('this.state',`this.state = Object.assign({},${projectName}${moduleName}Store.getState(),{
        //init state
    })`);
    result = result.replace('addChangeListener',`${projectName}${moduleName}Store.addChangeListener(this._onChange);`);
    result = result.replace('removeChangeListener',`${projectName}${moduleName}Store.removeChangeListener(this._onChange);`);

    fs.writeFile(compoentFile, result, 'utf8', function(err) {
        if (err) {
           return console.log(err);
        };
    });
  });
}
let writeAction = function () {
  fs.readFile('./tmpl/Action.js', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    let result = data.replace('Constants',`import ${projectName}Constants from '../${projectName}Constants/${projectName}Constants';`);
    result = result.replace('Module',`import ${projectName}${moduleName}Module from '../Modules/${projectName}${moduleName}Module/${projectName}${moduleName}Module';`);
    result = result.replace('Dispatch',`import {dispatch, register} from '../Dispatchers/${projectName}Dispatcher;'`);
    result = result.replace('Module.defaultFunc',`${projectName}${moduleName}Module.defaultFunc`);
    result = result.replace('actionType',`actionType: ${projectName}Constants.DEFAULT_FUNC, data`);

    fs.writeFile(actionFile, result, 'utf8', function(err) {
        if (err) {
           return console.log(err);
        };
    });
  });
}
let writeModule = function () {
  fs.readFile('./tmpl/Module.js', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    let result = data.replace('API',`import ${projectName}${moduleName}API from './${projectName}${moduleName}API';`);
    result = result.replace('Module',`import ${projectName}${moduleName}Module from '../Modules/${projectName}${moduleName}Module/${projectName}${moduleName}Module';`);
    result = result.replace('API.getDefaultData',`${projectName}${moduleName}API.getDefaultData`);

    fs.writeFile(moduleFile, result, 'utf8', function(err) {
        if (err) {
           return console.log(err);
        };
    });
  });
}
let writeAPI = function () {
  fs.readFile('./tmpl/API.js', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }

    fs.writeFile(moduleAPIFile, data, 'utf8', function(err) {
        if (err) {
           return console.log(err);
        };
    });
  });
}
let writeStore = function () {
  fs.readFile('./tmpl/Store.js', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    let result = data.replace('Constants',`import ${projectName}Constants from '../${projectName}Constants/${projectName}Constants';`);
    result = result.replace('Dispatch',`import {dispatch, register} from ../Dispatchers/${projectName}Dispatcher;`);
    result = result.replace('Store',`${projectName}${moduleName}Store`);
    result = result.replace('Store.updateState(action.data);',`${projectName}${moduleName}Store.updateState(action.data);`);
    result = result.replace('Store.emitChange();',`${projectName}${moduleName}Store.emitChange();`);
    fs.writeFile(storeFile, result, 'utf8', function(err) {
        if (err) {
           return console.log(err);
        };
    });
  });
}
let writeDispatch = function () {
  fs.readFile('./tmpl/Dispatcher.js', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }

    fs.writeFile(dispatcherFile, data, 'utf8', function(err) {
        if (err) {
           return console.log(err);
        };
    });
  });
}
exists();
