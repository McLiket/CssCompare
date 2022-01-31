var StartupHandler = {
  createUnusedReports: function () {
    var fs = require("fs");
    var fileManager = require('./FileManager.js');
    var coverageProcesser = require('./CoverageReportProcesser.js');

    let fileContent = fileManager.getAllChromeReports();
    let urls = fileManager.getCheckedUrls(fileContent);
    console.log("found " + urls.length + " css files");
    coverageProcesser.getUsageReportForUrl(fileContent, urls[1]);

    var coverageUrls = new Array();

    urls.forEach(url => {
      console.log(url);
      let coverageForFile = coverageProcesser.getUsageReportForUrl(fileContent, url);
      fileManager.saveResults(url, coverageForFile);
    })
  }
};

module.exports = StartupHandler