var express = require('express');
var router = express.Router();
var FormData = require('form-data');
var fs = require('fs');
const axios = require("axios")
const templateDao = require('../dao/templatesDao')()
const tmp = require("tmp")
const path = require('path');

router.post('/', async function (req, res, next) {

    let data = new FormData();
    data.append("template", templateDao.getStreamForTemplate(req.body.template))

    for (let i in req.files) {
        if (req.files[i].fieldname === "file") {
            data.append("file", fs.createReadStream(req.files[i].path))
        }
    }

    axios({
            method: 'post',
            url: 'http://meshlab:5000/process',
            data: data,
            headers: {
                "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                "enctype": "multipart/form-data"
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        }
    ).then((result) => {

        let responseObj = {file: result.data}
        res.send(responseObj).status(200)
    })

});

router.get("/:file", async function (req, res, next) {
    let file = req.params.file
    axios({
        method: 'get',
        url: `http://meshlab:5000/files/${file}`,
        responseType: 'blob',
        maxContentLength: Infinity,
        maxBodyLength: Infinity
    }).then(result => {
        let options = {
            keep: true,
            postfix: path.extname(file)
        }
        tmp.file(options, function _tempFileCreated(err, path, fd, cleanupCallback) {
            if (err) throw err;

            console.log('File: ', path);
            console.log('Filedescriptor: ', fd);

            fs.writeFile(path, result.data, function (err) {
                if (err) return console.log(err)
                res.download(path)
                cleanupCallback();
            })
        });
    })
})

router.get("/", async function (req, res, next) {
    axios({
        method: 'get',
        url: `http://meshlab:5000/files/`,
        maxContentLength: Infinity,
        maxBodyLength: Infinity
    }).then(result => {
        res.send(result.data)
    })
})

router.delete("/:file", async function (req, res, next) {
    let file = req.params.file
    axios({
        method: 'delete',
        url: `http://meshlab:5000/files/${file}`,
        maxContentLength: Infinity,
        maxBodyLength: Infinity
    }).then(result => {
        res.send().status(200)
    })
})

module.exports = router;