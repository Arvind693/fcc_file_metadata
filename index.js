var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const upload = multer();
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single('upfile'),async(req,res)=>{
  try{
    const {originalname,mimetype,size} = req.file;
    console.log(req.file)
    res.status(200).json({
      name:originalname,
      type:mimetype,
      size:size
    });
  }catch(err){
    res.status(400).json(err)
  }
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
