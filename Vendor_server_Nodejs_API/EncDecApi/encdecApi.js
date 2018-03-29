const express = require('../../include/import_express.js');
const app = express();
var crypt = require('../../include/encdec.js');

app.get('/decrypt/:id', (req, res) => {
  var result = crypt.decrypt(req.params.id);
  res.send(result);
});

app.get('/encrypt/:id', (req, res)=> {
  var result = crypt.encrypt(req.params.id);
  res.send(result);
})


app.get('/',(req, res) => {
  res.send('it is working!');
});

app.listen(3300, () => console.log('Server running on port 3300'));
