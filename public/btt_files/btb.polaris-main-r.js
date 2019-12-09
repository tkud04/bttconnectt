(function () {
    /* Set all the dynamic links here */
    var polarisNavLinks = {
        loginWIdgetURL: 'https://secure.business.bt.com/CommonLogin.aspx',
        trackOrderLoggedInLink: 'https://secure.business.bt.com/Account/LoginRedirect.aspx?tabId=3',
        trackOrderNonLoggedInLink: 'https://secure.business.bt.com/Account/login.htm?tabId=3',
        faultManagementLoggedInLink: 'https://secure.business.bt.com/Account/LoginRedirect.aspx?tabId=4',
        faultManagementNonLoggedInLink: 'https://secure.business.bt.com/account/login.htm?tabId=4',
        emailLoggedInLink: 'https://secure.business.bt.com/Account/LoginRedirect.aspx?tabId=2',
        emailNonLoggedInLink: 'https://secure.business.bt.com/Account/LoginRedirect.aspx?tabId=2',
        tellUsPaidLoggedInLink: 'https://secure.business.bt.com/eserve/cust/loggedin/tellUsYouHavePaidLoggedIn.html?dl=true&flag=showall',
        tellUsPaidNonLoggedInLink: 'https://secure.business.bt.com/eserve/cust/loggedout/tellUsYouHavePaid.html',
        payBillSwitch: 'https://secure.business.bt.com/eserve/cust/loggedin/payByCardLoggedIn.html?flag=showall&dl=true',
        cdeLoggedIn: 'https://secure.business.bt.com/Account/LoginRedirect.aspx?tabId=0'
    };

    Modernizr.load([
            //test for matchMedia
            {
                test: window.matchMedia,
                nope: "https://btbsecure.business.bt.com/CommonContent/js/polyfill_matchMedia.js"
            },

            "https://btbsecure.business.bt.com/CommonContent/js/enquire.js",
            "https://btbsecure.business.bt.com/CommonContent/v2/js/polaris.js?v=1.2"
    ]);
    window.setPrimaryNavTabSelceted = function (elementID) {
        // code to set primary nav
        jQuery('#' + elementID).addClass('selected');
    };

    window.setSecondaryNavLinkSelceted = function (elementID) {
        // no longer needed
    };

    window.setLoginStatus = function (status) {
        if (status == '1') {
            jQuery('.polaris-reg-ref').hide();
            setLoggedinLinks();
        }
    };

    /* method for manipulating auth status based links */
    window.setLoggedinLinks = function () {
        jQuery('.lnkTrackOrderSwitch').attr('href', polarisNavLinks.trackOrderLoggedInLink);
        jQuery('.lnkFaultsSwitch').attr('href', polarisNavLinks.faultManagementLoggedInLink);
        jQuery('.lnkEmailSwitch').attr('href', polarisNavLinks.emailLoggedInLink);
        jQuery('.lnkTellPaidSwitch').attr('href', polarisNavLinks.tellUsPaidLoggedInLink);
        jQuery('.lnkPayBillSwitch').attr('href', polarisNavLinks.payBillSwitch);
        jQuery('#your-accout > a').attr('href', polarisNavLinks.cdeLoggedIn);
        jQuery('#polaris-log-in').hide();
        jQuery('#polaris-register').hide(); 
        jQuery('#polaris-log-out').show();   
        jQuery('#polaris-log-in-mob').hide();
        jQuery('#polaris-log-out-mob').show();                      
    };

    window.setLoginSuccessUrl = function (successUrl) {
        var currentUrl = polarisNavLinks.loginWIdgetURL;
        var retUrl = populateWidgetUrl(currentUrl, 'successurl', successUrl);

        jQuery('#polaris-login-frame').attr('src', retUrl);
    };
    window.setLoginSuccessURL = window.setLoginSuccessUrl;
    
    window.populateWidgetUrl = function (widgetUrl, paramName, paramValue) {
        var resultUrl = widgetUrl;
        var data = {};
        data[paramName] = paramValue;
        var pParam = jQuery.param(data);

        if (resultUrl.indexOf('?') > 0)
            resultUrl += '&' + pParam;
        else
            resultUrl += '?' + pParam;

        return resultUrl;
    };

    jQuery(document).ready(function () {
        var polarisOmnitureTracking = function () {
            //var a = "btcomdev"; // for preview
            var a = "btcom"; // for live
            var s = s_gi(a);
            var id = ["BTB", jQuery(this).attr("data-polaris-omtrack")].join(":");
            s.linkTrackVars = "eVar19,prop50,prop20";
            s.eVar19 = s.prop50 = id;
            var getPageName = function () {
                var pn1 = "Omni pageName not found on the page";
                if (typeof s_pageName === "undefined" || s_pageName === null) {
                    if (typeof s !== "undefined" && s !== null && typeof s.pageName !== "undefined" && s.pageName !== null)
                        pn1 = s.pageName;
                } else
                    pn1 = s_pageName;

                return pn1;
            };

            s.prop20 = getPageName();
            s.tl(this, "o", id);
        };
        try {
            jQuery("[data-polaris-omtrack]").bind("click", polarisOmnitureTracking);
        }
        catch (err) {
            // leave error for now
        }

        var pageUrl = jQuery(location).attr('href');
        var loginWidgetUrl = polarisNavLinks.loginWIdgetURL;
        var retUrl = populateWidgetUrl(loginWidgetUrl, 'parenturl', pageUrl);

        jQuery('#polaris-login-frame').attr('src', retUrl);
    });
})();
