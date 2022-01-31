var coverageProcesser = {
    getUsageReportForUrl: function (filesContent, url) {

        let entryText = getTextForURL(filesContent, url);

        if (entryText == null) {
            return;
        }
        let usedByteArray = new Array(entryText.length).fill(false);

        filesContent.forEach(fileContent => { //loops files
            let jsonFile = JSON.parse(fileContent);


            jsonFile.forEach(coverageEntry => { //loops file entrys
                if (coverageEntry.url == url) {
                    var currentUsageArray = getCoverageByByteForEntry(coverageEntry);
                    for (let i = 0; i < currentUsageArray.length + 1; i++) {
                        if (currentUsageArray[i] == true) {
                            usedByteArray[i] = true;
                        }
                    }
                }
            })

        })


        //build an object
        let processedCoverage = {
            usageByteArray: "",
            text: ""
        };
        processedCoverage.usageByteArray = usedByteArray;
        processedCoverage.text = entryText;
        return processedCoverage;

    }
};

function getTextForURL(filesContent, url) {
    var text;
    filesContent.forEach(fileContent => { //loops files
        let jsonFile = JSON.parse(fileContent);


        jsonFile.forEach(coverageEntry => { //loops file entrys
            if (coverageEntry.url == url) {
                text = coverageEntry.text;
                return;
            }
        })

    })
    return text;
}

function getCoverageByByteForEntry(coverageEntry) {
    let text = coverageEntry.text;
    let usedByteArray = new Array(text.length).fill(false);


    var ranges = coverageEntry.ranges;
    ranges.forEach(range => {

        for (var i = range.start; i < range.end + 1; i++) {
            usedByteArray[i] = true;
        }

    });
    return usedByteArray;

}

module.exports = coverageProcesser