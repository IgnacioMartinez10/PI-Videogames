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
const server = require("./src/app");
const { conn } = require("./src/db");
const { fillDBwithGenres } = require("../api/src/utils/utilsFunctions");

const PORT = 3001;

conn
  .sync({ force: true })
  .then(() => {
    fillDBwithGenres();
  }) //ACA VOY A LLAMAR A LA FUNCION QUE TRAE TODOS LOS GENEROS DE LA API Y LOS PONE EN LA BASE DE DATOS

  .then(() => {
    server.listen(PORT, () => {
      console.log("Listening on port 3001");
    });
  })
  .catch((error) => console.log("ERROR UP SERVER--->" + error.message));
