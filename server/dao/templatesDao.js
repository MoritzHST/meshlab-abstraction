let templatesDao

const atob = require('atob');
const fs = require('fs');

class TemplateDAO {

    constructor() {
        this.templates = []
        fs.readdir(`data/templates`, (err, files) => {
            files.forEach(file => {
                this.templates.push({name: file})
            });
        });
    }

    addTemplate(template) {
        this.templates.push(template)
        let data = template.fileData;
        data = data.substring(data.indexOf("base64,") + "base64,".length, data.length)
        data = atob(data)
        fs.writeFile(`data/templates/${template.name}`, data, err => {
            if (err) {
                console.error(err)
            }
        })
    }

    getTemplate(templateName) {
        for (let templateId in this.templates){
            if (this.templates[templateId].name === templateName){
                return this.templates[templateId]
            }
        }
    }

    getStreamForTemplate(templateName){
        return fs.createReadStream(`data/templates/${templateName}`)
    }

    deleteTemplate(templateName) {
        for (let templateId in this.templates){
            if (this.templates[templateId].name ===templateName){
                delete this.templates[templateId]
            }
        }
    }

    getTemplates() {
        return this.templates
    }

}

module.exports = function() {
    if (!templatesDao)
        templatesDao = new TemplateDAO()
    return templatesDao
}

