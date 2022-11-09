//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/* const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {    // el force en false no borra lo guardado de la base de datos...
  server.listen(process.env.PORT, () => {
    console.log('%s listening at' + process.env.PORT); // deployado Mi Proyecto
  });
}); */

// Proyecto con deploy

require("dotenv").config();
const server = require("./src/app.js");
const PORT = 3001;
const { conn } = require("./src/db.js");
const cors = require('cors');

 conn.sync({ force: false }).then(() => {
  server.use(cors({ credentials: true }));
  server.listen(process.env.PORT || PORT, () => {
    console.log(`Servidor Activo!`);
  }); 
}); 
