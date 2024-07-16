
chrome.storage.local.get(["image"]).then((result) => {
    if(result.image){
        const imagetest=document.getElementById("showphoto")
        imagetest.src=result.image
    }

  });
 // 保存为PDF
function saveAsPDF1() {
    var screenshotUrl = document.getElementById('showphoto').src;
    console.log(screenshotUrl)
    var img = new Image();
    img.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL('image/png');
        html2canvas(document.body).then(function(canvas) {
            var pdf = new window.jspdf.jsPDF();
            pdf.addImage(dataURL, 'PNG', 0, 0);
            var blob = pdf.output('blob');
            var url = window.URL.createObjectURL(blob);
            chrome.downloads.download({
                url:url,
                filename: 'screenshot.pdf',
                saveAs: true
            });
        });
    };
    img.src = screenshotUrl;
}

// 保存为PNG
function saveAsPNG() {
    var screenshotUrl = document.getElementById('showphoto').src;
    var img = new Image();
    img.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL('image/png');
        downloadData(dataURL, 'screenshot.png');
    };
    img.src = screenshotUrl;
}

// 保存数据到本地
function saveData(dataURL, filename) {
    var link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
 // 下载数据
 function downloadData(dataURL, filename) {
    chrome.downloads.download({
        url: dataURL,
        filename: filename,
        saveAs: true
    });
}
let btnSaveAsPDF = document.getElementById("saveAsPDF");
let btnSaveAsPNG = document.getElementById("saveAsPNG");
btnSaveAsPDF.onclick = saveAsPDF1;
btnSaveAsPNG.onclick = saveAsPNG;

