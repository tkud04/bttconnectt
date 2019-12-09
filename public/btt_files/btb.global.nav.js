$(document).ready(function() {
    if (b() > 0) {
        $(".bt-header .header-icons .basket").addClass("alert")
    }
    $(".bt-header .accordion").on("click", ".accordion-title", function() {
        var c = $(this);
        c.siblings(".accordion-content").slideToggle("fast");
        c.parent(".accordion").toggleClass("nav-open")
    });
    $(".bt-header .menu").on("click", function() {
        $(this).hide();
        $(".bt-header .close").show();
        $(".bt-header .header-main-container").addClass("nav-open");
        $(".bt-header .global-nav-mobile").slideToggle()
    });
    $(".bt-header .close").on("click", function() {
        $(".bt-header .global-nav-mobile").slideToggle();
        $(".bt-header .header-main-container").removeClass("nav-open");
        $(this).hide();
        $(".bt-header .menu").show()
    });
    $(".bt-header .accordion-sub-nav").on("click", ".category", function() {
        $(this).toggleClass("nav-open").siblings(".sub-categories").slideToggle(300);
        $(this).parent().siblings(".sub-categories").slideToggle("fast")
    });
    $(".bt-header .search").on("click", ".search-icon", function() {
        var d = $(".bt-header").hasClass("search-open");
        var c = window.innerWidth;
        $(".bt-header").addClass("search-open");
        if (c < 768) {
            $(".header-logo").toggle()
        } else {}
        if (d === true) {
            $("#searchbar").submit()
        }
    });
    $(".bt-header .search").on("click", ".search-bar-close", function() {
        $(".bt-header").removeClass("search-open")
    });

    function b() {
        return localStorage["angular-cache.caches.profileCache.data.basket"] ? JSON.parse(localStorage["angular-cache.caches.profileCache.data.basket"]).value.length : 0
    }

    function a(c) {
        var f = c.find("[name=q]");
        var d = f.val().replace(/\s+/g, " ").trim();
        if (/\S/.test(d)) {
            d = encodeURIComponent(d);
            window.location.href = "https://business.bt.com/search/#q=" + d;
            if (window.location.href.indexOf(c.attr("action")) !== -1) {
                window.location.reload()
            }
        }
    }
    $(document).on("submit", ".search-bar form", function(d) {
        var c = $(this);
        if (c.data("isendeca")) {
            return
        }
        d.preventDefault();
        a(c)
    });
    $("#productsLink").hover(function() {
        $(".productsServicesNav").toggleClass("open")
    });
    $("#solutionsLink").hover(function() {
        $(".solutionsNav").toggleClass("open")
    });
    $("#supportLink").hover(function() {
        $(".supportNav").toggleClass("open")
    });
    $(".channel-selector-mobile").on("click", ".channel-selector", function() {
        $(".channel-selector-text").hide();
        $(".mobile-channels").slideToggle()
    });
    $(".channel-identifier").on("click", function() {
        $(".channels").slideToggle()
    });
    $(".channel-selected").hover(function() {
        $(".channels").show()
    });
    $(".more-links").on("click", function() {
        $(".bt-footer-wrapper").toggleClass("open")
    })
});
var BTB = window.BTB || {};
BTB.constant = {
    BTB_CAMPAIGN_PPC: "ppc",
    BTB_CAMPAIGN_PPC_REFERRAL: "ppc-referral",
    BTB_CAMPAIGN_AFFILIATES: "affiliates"
};
var BTB = window.BTB || {};
BTB.utils = {
    readQueryStringByName: function(a) {
        a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var c = new RegExp("[\\?&]" + a + "=([^&#]*)"),
            b = c.exec(location.search);
        return b === null ? "" : decodeURIComponent(b[1].replace(/\+/g, " "))
    },
    readCookie: function(d) {
        var b = " " + document.cookie;
        var c = b.indexOf(" " + d + "=");
        if (c == -1) {
            c = b.indexOf(";" + d + "=")
        }
        if (c == -1 || d === "") {
            return ""
        }
        var a = b.indexOf(";", c + 1);
        if (a == -1) {
            a = b.length
        }
        return unescape(b.substring(c + d.length + 2, a))
    },
    writeCookie: function(h, g, d, f, c) {
        var b = new Date();
        var a = new Date();
        if (d === null || d === 0) {
            d = 1
        }
        a.setTime(b.getTime() + 3600000 * 24 * d);
        document.cookie = h + "=" + escape(g) + ";path=" + f + ";domain=" + c + ";expires=" + a.toGMTString()
    },
    removeCookie: function(a) {
        BTB.utils.writeCookie(a, "", -1, "/", "business.bt.com")
    },
    isEncoded: function(a) {
        return decodeURIComponent(a) !== a
    },
    sanitizeURI: function(a) {
        return decodeURIComponent(a) !== a ? a : encodeURIComponent(a)
    },
    parseLocation: function(a) {
        var c = a.substring(1).split("&");
        var d = {};
        var f;
        var b;
        for (b in c) {
            if (c.hasOwnProperty(b)) {
                if (c[b] === "") {
                    continue
                }
                f = c[b].split("=");
                d[decodeURIComponent(f[0])] = decodeURIComponent(f[1])
            }
        }
        return d
    }
};
jQuery.expr[":"].focus = function(a) {
    return a === document.activeElement && (a.type || a.href)
};
jQuery.cookie = function(d, f, b) {
    if (arguments.length > 1 && String(f) !== "[object Object]") {
        b = jQuery.extend({}, b);
        if (f === null || f === undefined) {
            b.expires = -1
        }
        if (typeof b.expires === "number") {
            var h = b.expires,
                c = b.expires = new Date();
            c.setDate(c.getDate() + h)
        }
        f = String(f);
        return (document.cookie = [encodeURIComponent(d), "=", b.raw ? f : encodeURIComponent(f), b.expires ? "; expires=" + b.expires.toUTCString() : "", b.path ? "; path=" + b.path : "", b.domain ? "; domain=" + b.domain : "", b.secure ? "; secure" : ""].join(""))
    }
    b = f || {};
    var a, g = b.raw ? function(i) {
        return i
    } : decodeURIComponent;
    return (a = new RegExp("(?:^|; )" + encodeURIComponent(d) + "=([^;]*)").exec(document.cookie)) ? g(a[1]) : null
};
var btCookiesAPI = btCookiesAPI || {};
btCookiesAPI = function() {
    var f = function(j, i, g) {
        if (arguments.length > 1 && String(j) !== "[object Object]") {
            g = jQuery.extend({}, g);
            if (j === null || j === undefined) {
                g.expires = -1
            }
            if (typeof g.expires === "number") {
                var k = g.expires,
                    h = g.expires = new Date();
                h.setDate(h.getDate() + k)
            }
            j = String(j);
            return (document.cookie = [encodeURIComponent(i), "=", g.raw ? j : encodeURIComponent(j), g.expires ? "; expires=" + g.expires.toUTCString() : "", g.path ? "; path=" + g.path : "", g.domain ? "; domain=" + g.domain : "", g.secure ? "; secure" : ""].join(""))
        }
    };
    var c = function c(h) {
            var k = h + "=",
                g = document.cookie.split(";"),
                j;
            for (j = 0; j < g.length; j += 1) {
                var l = g[j];
                while (l.charAt(0) === " ") {
                    l = l.substring(1, l.length)
                }
                if (l.indexOf(k) === 0) {
                    return l.substring(k.length, l.length)
                }
            }
        },
        b = function b(g) {
            var j = {},
                h;
            for (h = 0; h < g.length; h += 1) {
                j[g[h]] = ""
            }
            return j
        },
        a = {
            targeting: 4,
            functional: 3,
            strict: 2
        },
        d = 5;
    return {
        getDomain: function() {
            return typeof(btb_domain) != "undefined" ? btb_domain : ""
        },
        getAllPossibleCookieLevels: function() {
            var g = [],
                h;
            for (h in a) {
                g.push(h)
            }
            return g
        },
        getSupportedCookieLevels: function() {
            var h = [],
                g = Number(c("bt_cookie_level")),
                i;
            for (i in a) {
                if (a[i] <= g) {
                    h.push(i)
                }
            }
            return h
        },
        hasSupportFor: function() {
            var h = btCookiesAPI.getSupportedCookieLevels(),
                k = b(h),
                g = true,
                j;
            if (h.length > 0) {
                for (j = 0; j < arguments.length; j += 1) {
                    if (!(arguments[j] in k)) {
                        g = false;
                        break
                    }
                }
            }
            return g
        },
        getCurrentCookieLevel: function(h) {
            var g = c(h || "bt_cookie_level");
            return g
        },
        addOrUpdateCookie: function(g, i, h) {
            f(g, i || "bt_cookie_level", h || {
                path: "/",
                expires: 365
            })
        },
        init: function() {}
    }
}();
(function(a) {
    if (typeof(disable_cookie) == "undefined" || disable_cookie == false) {
        btCookiesAPI.init();
        a("body").on("click", ".cookie-agree-container", function(b) {
            btCookiesAPI.addOrUpdateCookie();
            a("#cmp-cookie-notification").remove();
            b.preventDefault()
        });
        a("body").on("click", ".cmp-cookie-info", function() {
            location.href = btCookiesAPI.getDomain() + "/content/bt/business/en/cookie-settings.html?referrer=" + location.href;
            e.preventDefault()
        })
    }
})($);
(function(c) {
    if (typeof(disable_cookie) == "undefined" || disable_cookie == false) {
        var j = {
            path: "/",
            expires: 365,
            domain: ".bt.com"
        };
        var d = c(".global-notification");
        var b = c(".header-main-container");
        var f = BTB.utils.readCookie("s_chid_ref");
        var g = c(".channel-identifier[data-hub]").data("hub");
        if (g !== undefined && g !== f) {
            btCookiesAPI.addOrUpdateCookie(g, "s_chid_ref", j);
            f = g
        }
        if (!f) {
            btCookiesAPI.addOrUpdateCookie("sme", "s_chid_ref", j);
            f = "sme"
        }
        var i = c(".channel-identifier[data-schid='" + f + "']").html();
        c(".channel-selected-identifier").html(i);
        var h = "." + f + " .header-dropdown-button";
        c(h).show();
        c(".basket").removeClass(f);
        c(".channel-identifier").each(function(k, n) {
            var m = c(n);
            if (m.data("schid") !== f) {
                var l = "." + m.data("schid");
                c(l).remove()
            }
        });
        if (d.length) {
            var a = btCookiesAPI.getCurrentCookieLevel("bt_notification_level");
            c(".notification-channel").html(i);
            if (!a || a != f) {
                c(".global-notification").show()
            }
        }
        c(".notification-icon").on("click", function() {
            var k = BTB.utils.readCookie("s_chid_ref");
            btCookiesAPI.addOrUpdateCookie(k, "bt_notification_level", j);
            c(this).hide();
            c(".global-notification").slideToggle("fast")
        })
    }
})($);