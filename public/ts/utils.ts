module utils {
  var indentText = " ";
  var indentCount = 0;
  export var debug = true;

  function getIndentPrefix():string {
    var indent = "";
    for (let i = 0; i < indentCount; i++)
      indent += indentText;
    return indent;
  }

  export function log(message:any = "") {
    message = message.toString();
    message = getIndentPrefix() + message;
    console.log(message);
    if (debug) {
      var element = document.createElement("span");
      element.innerHTML = "<pre>\n" + message + "</pre>";
      document.body.appendChild(element);
    }
  }

  export function indent(delta:number) {
    indentCount += delta;
  }

  export function loadModel(full_path:string, onload:Function) {
    utils.log("loading model " + full_path);
    var script = document.createElement("script");
    script.onload = function () {
      utils.log("loaded model " + full_path);
      onload();
    };
    script.src = full_path;
    document.body.appendChild(script);
  }
}
