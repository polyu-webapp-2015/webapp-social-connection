function loadModel(full_path:string) {
    console.log("loading model " + full_path);
    var script = document.createElement("script");
    script.src = full_path;
    document.body.appendChild(script);
}
