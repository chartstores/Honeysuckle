function $$(id) {
    return document.getElementById(id);
}

function debug(html) {
    var oTest = $$("debug-info");
    var newNode = document.createElement("div");
    newNode.innerHTML = html;
    oTest.insertBefore(newNode, null);
}