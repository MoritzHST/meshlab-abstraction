var saveByteArray = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, name, contentType) {
        var blob = new Blob(data, {type: contentType}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        a.click();
        //window.URL.revokeObjectURL(url);
    };
}());


export  {saveByteArray}