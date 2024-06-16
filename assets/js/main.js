! function(e) {
    var t = e(window),
        o = e("body"),
        n = e("#wrapper"),
        a = e("#header"),
        i = e("#banner");
    breakpoints({
        xlarge: ["1281px", "1680px"],
        large: ["981px", "1280px"],
        medium: ["737px", "980px"],
        small: ["481px", "736px"],
        xsmall: ["361px", "480px"],
        xxsmall: [null, "360px"]
    }), e.fn._parallax = "ie" == browser.name || "edge" == browser.name || browser.mobile ? function() {
        return e(this)
    } : function(t) {
        var o = e(window),
            n = e(this);
        if (0 == this.length || 0 === t) return n;
        if (this.length > 1) {
            for (var a = 0; a < this.length; a++) e(this[a])._parallax(t);
            return n
        }
        return t || (t = .25), n.each((function() {
            var n, a, i = e(this);
            n = function() {
                i.css("background-position", "center 100%, center 100%, center 0px"), o.on("scroll._parallax", (function() {
                    var e = parseInt(o.scrollTop()) - parseInt(i.position().top);
                    i.css("background-position", "center " + e * (-1 * t) + "px")
                }))
            }, a = function() {
                i.css("background-position", ""), o.off("scroll._parallax")
            }, breakpoints.on("<=medium", a), breakpoints.on(">medium", n)
        })), o.off("load._parallax resize._parallax").on("load._parallax resize._parallax", (function() {
            o.trigger("scroll")
        })), e(this)
    }, t.on("load", (function() {
        window.setTimeout((function() {
            o.removeClass("is-preload")
        }), 100)
    })), t.on("unload pagehide", (function() {
        window.setTimeout((function() {
            e(".is-transitioning").removeClass("is-transitioning")
        }), 250)
    })), "ie" != browser.name && "edge" != browser.name || o.addClass("is-ie"), e(".scrolly").scrolly({
        offset: function() {
            return a.height() - 2
        }
    }), e(".tiles > article").each((function() {
        var t, o = e(this),
            a = o.find(".image"),
            i = a.find("img"),
            r = o.find(".link");
        o.css("background-image", "url(" + i.attr("src") + ")"), (t = i.data("position")) && a.css("background-position", t), a.hide(), r.length > 0 && ($x = r.clone().text("").addClass("primary").appendTo(o), (r = r.add($x)).on("click", (function(e) {
            var t = r.attr("href");
            e.stopPropagation(), e.preventDefault(), "_blank" == r.attr("target") ? window.open(t) : (o.addClass("is-transitioning"), n.addClass("is-transitioning"), window.setTimeout((function() {
                location.href = t
            }), 500))
        })))
    })), i.length > 0 && a.hasClass("alt") && (t.on("resize", (function() {
        t.trigger("scroll")
    })), t.on("load", (function() {
        i.scrollex({
            bottom: a.height() + 10,
            terminate: function() {
                a.removeClass("alt")
            },
            enter: function() {
                a.addClass("alt")
            },
            leave: function() {
                a.removeClass("alt"), a.addClass("reveal")
            }
        }), window.setTimeout((function() {
            t.triggerHandler("scroll")
        }), 100)
    }))), i.each((function() {
        var t = e(this),
            o = t.find(".image"),
            n = o.find("img");
        t._parallax(.275), o.length > 0 && (t.css("background-image", "url(" + n.attr("src") + ")"), o.hide())
    }));
    var r, s = e("#menu");
    s.wrapInner('<div class="inner"></div>'), r = s.children(".inner"), s._locked = !1, s._lock = function() {
        return !s._locked && (s._locked = !0, window.setTimeout((function() {
            s._locked = !1
        }), 350), !0)
    }, s._show = function() {
        s._lock() && o.addClass("is-menu-visible")
    }, s._hide = function() {
        s._lock() && o.removeClass("is-menu-visible")
    }, s._toggle = function() {
        s._lock() && o.toggleClass("is-menu-visible")
    }, r.on("click", (function(e) {
        e.stopPropagation()
    })).on("click", "a", (function(t) {
        var o = e(this).attr("href");
        t.preventDefault(), t.stopPropagation(), s._hide(), window.setTimeout((function() {
            window.location.href = o
        }), 250)
    })), s.appendTo(o).on("click", (function(e) {
        e.stopPropagation(), e.preventDefault(), o.removeClass("is-menu-visible")
    })).append('<a class="close" href="#menu">Close</a>'), o.on("click", 'a[href="#menu"]', (function(e) {
        e.stopPropagation(), e.preventDefault(), s._toggle()
    })).on("click", (function(e) {
        s._hide()
    })).on("keydown", (function(e) {
        27 == e.keyCode && s._hide()
    }));
    document.addEventListener("DOMContentLoaded", function() {
        // Array of phrases
        const l = [
            "「 In doubt, reboot 」",
            "「 Viruses are mostly explicitly accepted, but you didn't notice 」",
            "「 Never trust brands, only reviews 」",
            "「 Always copy your files, never cut them 」",
            "「 Update your system if you have some spare time, otherwise it will update when you don't 」",
            "「 You can't download RAM 」",
            "「 Most cloud services you use are on land, and even underwater 」",
            "「 Clean your keyboard thoroughly at least twice a year, don't ask why 」",
            "「 Antivirus are malware that hate competition 」",
            "「 All software is licensed, even if it's free 」",
            "「 The less social networks you have, the more sane you are 」",
            "「 There's no way you can be %100 anonymous on the internet 」",
            "「 A real backup is made by three copies, on two different types of storage, with one copy offsite 」",
            "「 Data redundancy is not a backup 」",
            "「 Remembering your passwords is a fatal security flaw, use a password manager instead 」",
            "「 AI is a misleading commercial term, same as High Definition 」",
            "「 Automation doesn't imply optimization 」"
        ];
    
        // Set random phrase
        const randomPhraseElement = document.getElementById("random-phrase");
        if (randomPhraseElement) {
            const randomIndex = Math.floor(Math.random() * l.length);
            randomPhraseElement.textContent = l[randomIndex];
        }
    
        // Set copyright information
        const copyright = document.getElementById("copyright");
        if (copyright) {
            copyright.innerHTML = `
                <ul class="copyright">
                    <li><b>&copy; Carino Systems</b></li>
                    <li>Design: a modified <a href="https://html5up.net">HTML5 UP</a> template</li>
                    <li>
                        <a href="https://github.com/MiguelCarino" class="icon brands alt fa-github"><span class="label">Github</span></a>
                        <a href="https://www.linkedin.com/in/miguelcarino94" class="icon brands alt fa-linkedin"><span class="label">LinkedIn</span></a>
                        <a href="https://mastodon.social/@miguelcarino" class="icon brands alt fa-mastodon"><span class="label">Mastodon</span></a>
                    </li>
                </ul>
            `;
        }
    });


}(jQuery);

function loadTawkToChat() {
    var Tawk_API = Tawk_API || {},
        Tawk_LoadStart = new Date();
    (function() {
        var s1 = document.createElement("script"),
            s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/655c3bf8d600b968d31553e3/1hfo4kh3h';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();
}(jQuery);