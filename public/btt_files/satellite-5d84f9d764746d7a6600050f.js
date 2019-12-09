_satellite.pushBlockingScript(function(event, target, $variables){
  // Manage Server Side Forwarding
(function () {

    function getCookie(name) {
        var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }

    var cookieLevel = getCookie('bt_cookie_level');


    if (cookieLevel > 3) {

        // allow SSF
        s.contextData['cm.ssf'] = '0';

    } else {

        // deny SSF
        s.contextData['cm.ssf'] = '1';

    }

})();

});
