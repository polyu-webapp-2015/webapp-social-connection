/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
///<reference path="../utils.ts"/>
function load_all_stub_script(callback) {
    var done = 0;
    var total = 24;
    var lastFired = false;
    function loadOne() {
        done++;
        if (lastFired && (done == total))
            callback();
    }
    total++;
    utils.loadModel('ts/stub/Account_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Announcement_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Attraction_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/City_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Country_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/DiscussBoard_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Event_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Event_Attendee_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Event_Organization_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Exhibition_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Floor_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Friendship_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Friendship_Tag_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Image_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/JsonArray_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Message_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Organization_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Post_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Reply_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Session_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Tag_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Title_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/User_stub.js', loadOne);
    total++;
    utils.loadModel('ts/stub/Venus_stub.js', loadOne);
    lastFired = true;
}
//# sourceMappingURL=package.js.map