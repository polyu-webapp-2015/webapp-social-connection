var utils;
(function (utils) {
    var indentText = " ";
    var indentCount = 0;
    utils.debug = true;
    function getIndentPrefix() {
        var indent = "";
        for (var i = 0; i < indentCount; i++)
            indent += indentText;
        return indent;
    }
    function log(message) {
        if (message === void 0) { message = ""; }
        message = message.toString();
        message = getIndentPrefix() + message;
        console.log(message);
        if (utils.debug) {
            var element = document.createElement("span");
            element.innerHTML = "<pre>\n" + message + "</pre>";
            document.body.appendChild(element);
        }
    }
    utils.log = log;
    function indent(delta) {
        indentCount += delta;
    }
    utils.indent = indent;
    function loadModel(full_path, onload) {
        console.log("loading model " + full_path);
        var script = document.createElement("script");
        script.onload = function () {
            onload();
        };
        script.src = full_path;
        document.body.appendChild(script);
    }
    utils.loadModel = loadModel;
})(utils || (utils = {}));
//# sourceMappingURL=utils.js.map