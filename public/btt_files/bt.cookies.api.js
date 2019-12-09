/**
* BT Cookies API
*
* @version  1.0
* @author   LBi
* @license  GPL v3
**/

var btCookiesAPI = btCookiesAPI || {};

btCookiesAPI = function () {
    var getCookie = function getCookie(name) {
            // get the cookie value
            // returns a number as a string

            // original function written by ppk - http://www.quirksmode.org/js/cookies.html
            // tweaked slightly to make it more readable
            var nameEQ = name + "=",
                ca = document.cookie.split(';'),
                i;

            for (i = 0; i < ca.length; i += 1) {
                var c = ca[i];

                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }

                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
        },
        oc = function oc(a) {
            // convert array (a) into an object (o) so you can use the 'in' operator to search the array
            // function written by snook - http://snook.ca/archives/javascript/testing_for_a_v

            var o = {}, i;

            for (i = 0; i < a.length; i += 1) {
                o[a[i]] = '';
            }
            return o;
        },
        BT_cookieLevels = {
        "targeting": 4,
        "functional": 3,
        "strict": 2
        };


    return {
        getAllPossibleCookieLevels: function () {
            var listOfCookies = [],
                cookieName;
                
            for (cookieName in BT_cookieLevels) {
                listOfCookies.push(cookieName);
            }
            return listOfCookies;
        },
        
        getSupportedCookieLevels: function () {
            var listOfCookies = [],
                currentCookieLevel = Number(getCookie('bt_cookie_level')),
                cookieName;
                
            for (cookieName in BT_cookieLevels) {
                if (BT_cookieLevels[cookieName] <= currentCookieLevel) {
                    listOfCookies.push(cookieName);
                }
            }
            return listOfCookies;
        },
        
        hasSupportFor: function () {
            var BT_cookieLevels = btCookiesAPI.getSupportedCookieLevels(),
                BT_cookieLevelsObject = oc(BT_cookieLevels),
                result = true,
                i;

            if (BT_cookieLevels.length > 0) {
                for (i = 0; i < arguments.length; i += 1) {
                    if (!(arguments[i] in BT_cookieLevelsObject)) {
                        result = false;
                        break;
                    }
                }
            }
            return result;
        },

        getCurrentCookieLevel: function () {
            var result = getCookie('bt_cookie_level');
            return result;
        }
    };
}();
