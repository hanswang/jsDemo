(function($) {
    'use strict';

    function outputPrint(msg) {
        $('#tc .outcome').html(msg);
    }

    function appendSummary(summary, result) {
        if (result === false) {
            summary += "Look at the sun.<br>";
        } else {
            summary += "The correct time is "+result+".<br>";
        }
        return summary;
    }

    function convertToMinutes(time) {
        var ns = time.split(':');
        return (ns[0] % 12)*60 + parseInt(ns[1]);
    }

    /** check for each single line
    */
    function checkTime(times) {
        if (times.length !== 3) {
            return false;
        }
        var minutes = [];
        var i;
        var middle = false;
        for (i = times.length - 1; i >= 0; i--) {
            minutes.push(convertToMinutes(times[i]));
        }
        for (i = 0; i < minutes.length; i++) {
            var m = minutes.pop();
            var diff = minutes[0] - minutes[1];
            if (diff < 0) {
                diff += 720;
            }
            var expectedM = minutes[0] + diff;
            if (expectedM > 720) {
                expectedM -= 720;
            }
            // avoid 3 time spot evenly distributed among 12 hours - 720 minutes
            if (expectedM === m && diff % 240 !== 0) {
                middle = minutes[0];
                break;
            }
            diff = minutes[1] - minutes[0];
            if (diff < 0) {
                diff += 720;
            }
            expectedM = minutes[1] + diff;
            if (expectedM > 720) {
                expectedM -= 720;
            }
            if (expectedM === m && diff % 240 !== 0) {
                middle = minutes[1];
                break;
            }
            minutes.unshift(m);
        }
        if (middle === false) {
            return false;
        }
        for (i = 0; i < times.length; i++) {
            if (convertToMinutes(times[i]) === middle) {
                return times[i];
            }
        }
    }

    $(document).ready(function() {
        $('#tc button').on('click', function() {
            var s = $('#tc textarea').val();
            var lines = s.split("\n");
            if (lines[0] != lines.length -1) {
                outputPrint('Input is not valid');
                return;
            }

            lines.shift();
            var i;
            var resultSummary = '';
            for (i = 0; i < lines.length; i++) {
                var times = lines[i].split(' ');

                resultSummary = appendSummary(resultSummary, checkTime(times));
            }
            outputPrint(resultSummary);
        });
    });
})(jQuery);