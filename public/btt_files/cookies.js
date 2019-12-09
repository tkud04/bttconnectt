// Global Variables used to passed data between functions
var firstBTcookie = 'Targeting';
var hasCookie = false;

BT_cookieLevels = {
    "Targeting": {
        "index": "Targeting",
        "level": 4,
        "name": "Targeting",
        "will": ['Remember what is in your shopping basket', 'Remember your log-in details', 'Make sure your logged in areas are secure', 'Offer live chat support', 'Make sure the website looks consistent', 'Allow you to share pages with social networks', 'Allow you to comment on blogs', 'Send information to other websites so that their advertising is more relevant'],
        "wont": ['No items listed'],
        "TTtitle": "Targeting cookies",
        "TTtext": "These cookies share information about your browsing habits with 3rd parties to help make advertising relevant to you and your interests."
    },
    "Functional": {
        "index": "Functional",
        "level": 3,
        "name": "Functional",
        "will": ['Remember what is in your shopping basket', 'Remember your log-in details', 'Make sure your logged in areas are secure', 'Offer live chat support'],
        "wont": ['Allow you to share pages with social networks', 'Allow you to comment on blogs', 'Send information to other websites so that their advertising is more relevant'],
        "TTtitle": "Functional cookies",
        "TTtext": "These cookies remember choices you make to improve your experience. This information is not used for advertising on other sites."
    },
    "Strict": {
        "index": "Strict",
        "level": 2,
        "name": "Strictly necessary &amp; Performance",
        "will": ['Remember what is in your shopping basket'],
        "wont": ['Remember your log-in details', 'Allow you to share pages with social networks', 'Allow you to comment on blogs', 'Send information to other websites so that their advertising is more relevant', 'Provide you with live, online chat support', 'Improve overall performance of the website'],
        "TTtitle": "Strictly necessary cookies",
        "TTtext": "These cookies enable services you have asked for. This information is not used for advertising on other sites."
    }
};

/**
 * Controller
 * - becouse we can use only 1 script, we need to include important libs before executing script,
 * - we dont have access to backend, and it prints only: <script src="/static/includes/globalheader/cookies/v3/js/cookies.js" id="BT_cookies"></script>
 */
$.getScript("/Content/Hub/assets/cookie-toolbar/libs/underscore.js", function(data, textStatus, jqxhr) {
    var call1 = $.get('/Content/Hub/assets/cookie-toolbar/tpl/cookie_template.js', function (tpl) {
        var bt = new BTCookiesClass(_.template(tpl));
        bt.init();
    }, 'html');
});


/**
 * BTCookiesClass
 */
var BTCookiesClass = function(tpl) {
    "use strict";

    var
    // Cross browser Do Not Track enabled
        $template = tpl,
        DNTenabled = navigator.doNotTrack === "yes" ||
        navigator.doNotTrack === "1" ||
        navigator.msDoNotTrack === "1",
        optionsEvent, // Variable to check if a button has been clicked
        cookieLevel, // Variable to set cookie level
        setToUser, // Variable that makes the cookie level equal to the user selection
        setCookie, // Variable that sets the cookie level
        v, // To be used as "value" in $.each
        cookieWrap = '.cookies', // Wrapping cookie <div>
        cookieSettings = '.cookie-settings-panel', // Cookie settings panel
        current = '.current-cookie span', // Current cookie <span>
        levelWrapper = '.cookie-level', // Cookie level <div>
        settingsTrigger = '.settings-trigger', // Triggers settings panel
        input = 'input', // input field
        noBorder = 'no-border', // No border class
        unselected = 'cookie-active', // Dark gradient class
        selected = 'cookie-inactive', // Light graidient class
        cookieLevelName = 'bt_cookie_level', // Stored cookie level name
        cookieDomain	= 'bt.com',	// Stored cookie domain
        cookiePath = '/', // Stored cookie path
        cookieExpiry = 365, // Stored cookie exipry
        cookieWrapper = $('<div class="cookies"></div>');

    /** 
     * Add Css to page header
     */
    var addCssStyle = function() {
        $('head').append(
            '<link rel="stylesheet" href="/Content/Hub/assets/cookie-toolbar/css/cookies_styles.css" type="text/css" />'
        );
    };

    /**
     * Add main Cookie div at the top of the page
     * Static func
     */
    var addCookieWrapper = function() {
        $('body').prepend(cookieWrapper);
    };


    /**
     * Get selected level from DOM,
     * store it in cookieLevel variable - INT
     * and return as well - STRING
     */
    var getSelectedLevel = function() {
        var index;
        $.each(BT_cookieLevels, function(key, value) { // Function that cycles through each cookie object
            v = value;
            if ($('#' + key).is(':checked')) { // if this cookie object id is checked/selected
                cookieLevel = v.level;
                index = key;
            }
        });

        return index;

    };

    var setCookieLevel = function(level) {
        cookieLevel = level;
    };

    var getCookieLevel = function() {
        return cookieLevel;
    };

    /**
     * Get html teplate
     * Beta
     */
    var getTemplate = function(tplName) {
        return $.get('/Content/Hub/assets/cookie-toolbar/tpl/' + tplName + '.js', function (tpl) {

        }, 'html'); // or 'text', 'xml', 'more'
    };


    /**
     * Execute when cookies had been set,
     * execute the bottom toolbar ( toolbarInit )
     */
    var initHasCookie = function() {

        panelfn(settingsTrigger); // Call the panel function and tie it to the settingsTrigger buttons

        var loadInitial = function() {
            addCookieWrapper(); // Insert the cookie wrapping <div>
            toolbarInit(); // Call function that initializes the toolbar

        };

        loadInitial();

    };


    /**
     * Toolbar is the div at the bottom
     * beeing created when cookies had already been saved or ignored
     */
    var toolbarInit = function() {
        var toolbarTemplateCall = getTemplate('toolbar');
        toolbarTemplateCall.success(function(tpl) {
            $('.cookies-toolbar').remove();
            toolbarRender(_.template(tpl));
        });
    };

    /**
     * Render the HTML & events for toolbar
     */
    var toolbarRender = function($toolbar) {

        // Append toolbar HTML to <body> and add icons
        $('body').append($toolbar({
            cookieLevels: BT_cookieLevels
        }));

        // is there a point in making second loop ?
        $.each(BT_cookieLevels, function(key, value) {
            if (cookie(cookieLevelName) < this.level) {
                $('.icon' + key).addClass('grey-icon');
            }
        });

        // disable tooltip A href click
        $('.cookieTip').on('click', function(e) { // When user clicks tooltip
            e.preventDefault(); // Prevent default behaviour
        });

        // exec tooltips for the toolbar cookie icons
        toolbarTooltips();

    };

    /**
     * Toolbar tooltips
     */
    var toolbarTooltips = function() {
        $('.cookieTip').on('mouseenter', function() { // When user hovers over tooltip
            var jq_tooltip = $('#Tooltip_' + $(this).attr('href').split('#')[1]), // Set tooltip variable to the href attribute of current anchor minus the #
                topOffset = 0, // Set top position variable to 0
                leftOffset = 0, // Set left position variable to 0
                jq_windowWidth = $(window).width(); // Set window width variable the width of the users window
            $(this).attr("title", ""); // Empty title attribute of current anchor (stops text from popping up as well as tooltip)
            $(document).on('mousemove.tooltipPos', function(e) { // When user moves mouse and tooltip is being hovered
                topOffset = e.pageY - jq_tooltip.height() - 30; // Set top position to the vertical position of the hovered tooltip anchor minus the height of the tooltip minus 30px
                if (e.pageX > jq_windowWidth - 275) { // If the horizontal position of the hovered tooltip anchor is greater than the users window minus 275px
                    leftOffset = e.pageX - 235; // Set left position to the horizontal position of the hovered tooltip anchor minus 260px
                    jq_tooltip.addClass('leftTip'); // Add Class leftTip 
                } else { // If the horizontal position of the hovered tooltip anchor is NOT greater than the users window minus 275px
                    leftOffset = e.pageX - 20; // Set left position to the horizontal position of the hovered tooltip minus 20px
                    jq_tooltip.removeClass('leftTip'); // Remove Class leftTip 
                }
                jq_tooltip.css({ // Set inline CSS of tooltip
                    top: topOffset, // Top position = current variable value
                    left: leftOffset // Left positon = current variable value
                });
            });

        }).on('mouseout', function() { // When user's mouse leaves tooltip anchor
            var jq_tooltip = $('#Tooltip_' + jQuery(this).attr('href').split('#')[1]); // Set tooltip variable to the href attribute of current anchor minus the #
            jq_tooltip.css('left', '-999em'); // Set left position CSS to -999em
            $(document).off('mousemove.tooltipPos'); // Unbind the mouse move function
        });
    };


    /**
     * Set events
     * - tab click
     * - cancel change
     * - save
     * - tabbed content
     */
    var setEvents = function() {

        /* Tab change events, when changin cookie to diffrent cookie level */
        $(levelWrapper).on('click', function() {
            var $this = $(this), // Cache jQuery $(this)
                textVal = $this.find('span').text(); // Get this span text
            $(levelWrapper) // Cookie level wrapping <div>
            .addClass(selected) // Add UI class
            .removeClass(unselected); // Remove UI class
            $this // this (selected) cookie level wrapping <div>
            .addClass(unselected) // Add UI class
            .removeClass(selected) // Remove UI class
            .find(input) // Find this input
            //.attr('checked'); // Update checked attribute to true
            .prop('checked', true); // @MDW change for $2.1.1 // Update checked attribute to true
            $(current).text(textVal); // Update the cuurent cookie selected UI to this span text

            // update will & wont
            var selectedCookieLevel = getSelectedLevel();
            $('.cookie-level-content ul').hide();
            cookieWrapper.find('#cookieWill-' + selectedCookieLevel).show();
            cookieWrapper.find('#cookieWont-' + selectedCookieLevel).show();
        });

        // Keep default button event
        $('.cookie-no-change').on('click', function() {
            setCookieLevel(5);
            optionsEvent = true;
            saveSettings(true);
            toolbarInit(); // Call the function that initializes the toolbar
            $('#cookie-notifyPanel').slideUp();
        });

        // Keep default button event
        $('.cookie-cancel').on('click', function() {
            // Where no cookie set yet, or when set to 5 wich means, that user did not take any actions to change cookie settings - default settings
            if (!hasCookie) {
                setCookieLevel(4);                
            }
            if (!hasCookie) {
                optionsEvent = true;
                hasCookie = true;
                saveSettings(true);
                toolbarInit(); // Call the function that initializes the toolbar
            }
            //$(cookieSettings).slideUp(function() { $("html, body").scrollTop(0); });
            $(cookieSettings).slideUp();
        });

        // Save button event
        $('.cookie-save').on('click', function() {
            optionsEvent = true;
            saveSettings(); // Call the function that sets and saves the cookie level
            toolbarInit(); // Call the function that initializes the toolbar
            //$(cookieSettings).slideUp(function() { $("html, body").scrollTop(0); });
            $(cookieSettings).slideUp();
        });

    };


    /*
     * Execute when there is no cookies for cookie level
     * Top toolbar
     */
    var initNoCookie = function() {
        panelfn('.no-change'); // Call the panel function and tie it to the "keep defaults" button
        panelfn(settingsTrigger); // Call the panel function and tie it to the settingsTrigger buttons
        addCookieWrapper();
        $('#cookie-notifyPanel').show();
    };


    var tabCookieChangeEvent = function() {
        $(window).on('keypress', function(e) {
            if (e.keyCode === 9) {
                e.preventDefault();
                setNexTab();
            }
        });

    };

    var setNexTab = function() {
        var activeTab = $('.cookie-level.dark-blue-g');
        var nextTab = activeTab.next();
        if (typeof nextTab.attr('class') === 'undefined') {
            nextTab = $('.cookie-level').first();
        }
        nextTab.click();
    };

    /**
     * Function to show/hide top panel,
     * it shows info panel or settings panel
     */
    var panelfn = function(button) {
        $(document).delegate(button, 'click', function(e) { // Delegate each button to a click event
            e.preventDefault(); // Prevent default behaviour

            // if change settings clicked
            if (button === settingsTrigger) {

                if ($(this).hasClass('cookieLightbox')) {
                    $(cookieSettings).show();
                    $("html, body").animate({
                        scrollTop: 0
                    });

                } else {
                    $(cookieSettings)
                        .slideDown(function() {
                            $("html, body").scrollTop(0);
                        });
                }


                cookieWrapper.find('#cookieWill-' + firstBTcookie).show();
                cookieWrapper.find('#cookieWont-' + firstBTcookie).show();
                $('#' + firstBTcookie).click();
                tabCookieChangeEvent();
            } else {
                $(cookieWrap)
                    .addClass(noBorder);
            }

            $('#cookie-notifyPanel').slideUp();
        });
    };



    /**
     * Main function for loading and saving cookies
     */
    var cookie = function(key, value, options) {

        if (arguments.length > 1 && String(value) !== "[object Object]") {
            options = jQuery.extend({}, options);
            if (value === null || value === undefined) {
                options.expires = -1;
            }
            if (typeof options.expires === 'number') {
                var days = options.expires,
                    t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
            value = String(value);
            return (document.cookie = [
                encodeURIComponent(key), '=',
                options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '',
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }
        options = value || {};
        var result,
            decode = options.raw ? function(s) {
                return s;
            } : decodeURIComponent;
        return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
    };


    /*
     * Save cookies
     * @param: if true, dont refresh cookie level variable, if not - will update depends on the selected element
     */
    var saveSettings = function(dontRefreshCookieLevel) {
        if (!dontRefreshCookieLevel){
            getSelectedLevel(); // Get the cookie level that has been stored by the UI (if any)
        }

        setCookie = (function(newLevel) { // Function to set the cookie level
            setToUser = function() {
                cookie(cookieLevelName, newLevel, { // Set cookie name, set cookie level 
                    domain: cookieDomain, // Set domain for the cookie  
                    path: cookiePath, // Set the paths the cookie can access
                    expires: cookieExpiry // Set when cookie expires
                });
            };
            if (DNTenabled) { // If Do Not Track is enabled
                if (optionsEvent) { // If user has clicked a button in the cookie notify panel (change settings or keep defaults)
                    setToUser(); // Set cookie to user choice
                }
            } else { // If Do Not Track is NOT enabled
                setToUser(); // Set cookie to user choice
            }
            optionsEvent = false;
        })(cookieLevel); // Call function and pass cookieLevel as value (pulled from setSelectedLevel function) to set cookie level
        
        if (!dontRefreshCookieLevel){
            //location.reload(); // Reload the page            
        }
    };

    return {

        /*
         * Initialize function
         * @param: main template for cookies
         * Insert css, load cookies, execute funct depending on cookies existing or not
         */
        init: function() {

            $(cookieWrapper).html($template({
                cookieLevels: BT_cookieLevels
            }));

            addCssStyle();

            // load cookies
            if (cookie(cookieLevelName) === null) {
                //if ( DNTenabled )								// do not track				
                initNoCookie();
            } else {
                hasCookie = true;
                if (cookie(cookieLevelName) == 5) {
                    hasCookie = false;
                }
                $.each(BT_cookieLevels, function(key, value) { // Function that cycles through each cookie object
                    if (value.level === parseInt(cookie(cookieLevelName))) {
                        firstBTcookie = value.index;
                    }
                });

                initHasCookie();

            }

            // set events
            setEvents();
        }
    };
};
