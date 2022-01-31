var fileManager = {
    getAllChromeReports: function () {

        let fs = require("fs");
        let filesToParse = this.getAllFileinFolder('./input');
        let fileContentArray = new Array;
        filesToParse.forEach(fileName => {
            fileContentArray.push(fs.readFileSync('./input/' + fileName));
        })

        return fileContentArray;
    },

    getAllFileinFolder: function (folder){
        let fs = require("fs");
        return  fs.readdirSync(folder);
    },

    getCheckedUrls: function (fileArray) {
        let urls = new Array();
        fileArray.forEach(filesContent => {

            let jsonGile = JSON.parse(filesContent)

            jsonGile.forEach(entry => {
                let css = ".css";
                if (!urls.includes(entry.url) && (entry.url).includes(".css")) {
                    urls.push(entry.url);
                }
            })

        })
        return urls;
    },

    saveResults: function (filename, data) {
        let fs = require("fs");
        filename = filename.replaceAll('/', '').replaceAll(':', '').replaceAll('.', '').replaceAll('?', '').replaceAll(',', '') + ".json";
        fs.writeFileSync('./output/' + filename, JSON.stringify(data), 'utf8');
    },

    getHtml: function () {
        let fs = require("fs");
        return fs.readFileSync('./index.html')
    },

    getUsageReport: function (fileName){
        let fs = require("fs");
        return fs.readFileSync('./output/' + fileName);
    }
};

module.exports = fileManager