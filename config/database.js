let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//banco de dados rodando localmente
// caso de erro no banco alterar a url{mongodb://127.0.0.1/maximonotes}
mongoose.connect('mongodb://127.0.0.1/maximonotes'
).then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));