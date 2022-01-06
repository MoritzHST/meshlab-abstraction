var express = require('express');
var router = express.Router();
const templateDao = require('../dao/templatesDao')()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(templateDao.getTemplates());
});

router.post('/', function(req, res, next){
  templateDao.addTemplate(req.body)
  res.send().status(200)
});

router.delete('/:templateName', function(req, res, next){
  templateDao.deleteTemplate(req.params.templateName)

  res.send().status(200)
})



module.exports = router;
