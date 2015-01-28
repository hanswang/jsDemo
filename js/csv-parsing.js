(function($) {
    'use strict';

    function outputPrint(msg) {
        $('#cp .outcome').html(msg);
    }

    function plotPieces(pieces) {
        return pieces.join('<br/>');
    }

    function checkQuotation(ch) {
        return (ch === '"') || (ch === '"');
    }

    $(document).ready(function() {
        $('#cp button').on('click', function() {
            var s = $('#cp textarea').val();
            var pieces = [];

            if (s.indexOf('"') === -1 && s.indexOf("'") === -1) {
                pieces = s.split(',');
            } else {
                while (s.indexOf(',') > 0) {
                    var firstChar = s.substring(0, 1);
                    if (checkQuotation(firstChar)) {
                        pieces.push(s.substring(0, s.indexOf(firstChar, 1) + 1));
                        s = s.substring(s.indexOf(firstChar, 1) + 2);
                    } else {
                        pieces.push(s.substring(0, s.indexOf(',')));
                        s = s.substring(s.indexOf(',') + 1);
                    }
                }
                if (s.length > 0) {
                    pieces.push(s);
                }
            }

            outputPrint(plotPieces(pieces));
        });
    });
})(jQuery);