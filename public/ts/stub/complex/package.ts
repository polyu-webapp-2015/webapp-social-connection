///<reference path="../../lang.ts"/>
///<reference path="../../utils.ts"/>
///<reference path="../../DataObjectManager.ts"/>
function load_complex_stub_script(callback) {
  var pool:lang.Consumer<Function>[] = [];
  pool.push(function (reportDone) {
    utils.loadModel('ts/stub/complex/Profile.js', reportDone)
  });
  pool.push(function (reportDone) {
    utils.loadModel('ts/stub/complex/Username.js', reportDone)
  });
  lang.async.fork_and_join(pool, callback);
}