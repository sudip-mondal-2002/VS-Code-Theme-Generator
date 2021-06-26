"use strict";

function getFirst(e) { return document.getElementsByClassName(e)[0] }

function offsetTop(e) { return getFirst(e).offsetTop }

function scrollTop(e) { return getFirst(e).scrollTop }

function elementExists(e) { return document.getElementsByClassName(e).length > 0 }

function hideCommentForms() { var e = document.getElementsByClassName("comment__form"); for (i = 0; i < e.length; i++) e[i].style.display = "none" }


if (window.Element && !Element.prototype.closest && (Element.prototype.closest = function(e) {
        var t, n = (this.document || this.ownerDocument).querySelectorAll(e),
            o = this;
        do { for (t = n.length; --t >= 0 && n.item(t) !== o;); } while (t < 0 && (o = o.parentElement));
        return o
    }), elementExists("comments") && document.getElementById("comments").addEventListener("click", (function(e) { console.log(e); var t = e.srcElement; "comment__reply" == t.className ? (hideCommentForms(), t.closest(".comment__parent").querySelector(".comment__form").style.display = "block") : "cancel" == t.className && hideCommentForms() })), document.querySelectorAll("#mce-EMAIL").length > 0) {
    var submits = document.querySelectorAll("#mc-embedded-subscribe");
    if (submits.length > 0)
        for (var i = 0; i < submits.length; i++) submits[i].addEventListener("click", (function(e) { setTimeout((function() { for (var e = document.querySelectorAll("#mce-EMAIL"), t = 0; t < e.length; t++) e[t].value = "" }), 1e3) }))
}