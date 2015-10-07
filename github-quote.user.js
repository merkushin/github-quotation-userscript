// ==UserScript==
// @name Github Quotation
// @description Quote line parts on github just by selecting
// @author Dmitry Merkushin
// @license MIT
// @version 1.0
// @include https://github.com/*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// ==/UserScript==
(function(window, undefined) {
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow;
    } else {
        w = window;
    }

    if (w.self != w.top) {
        return;
    }

    if (/https:\/\/github.com/.test(w.location.href)) {
        (function(w) {
            var container = document.getElementById('diff');
            if (!container) {
                return;
            }

            var codeStrings = container.getElementsByClassName('blob-code');
            for (var i = 0; i < codeStrings.length; i++) {

                (function() {
                    var codeString = codeStrings[i];
                    codeString.onmouseup = function(e) {
                        var selectedObject = w.getSelection();
                        var selectedText = selectedObject.toString();
                        var commentBtn = codeString.getElementsByClassName('js-add-line-comment')[0];
                        commentBtn.click();

                        var codeRow = codeString.parentNode;
                        var commentRow = codeRow.nextSibling;
                        var textArea = commentRow.getElementsByClassName('js-comment-field')[0];
                        textArea.innerHTML = '```\n' + selectedText + '\n```\n';
                    };
                })();

            }
        })(w);
    }
})(window);
