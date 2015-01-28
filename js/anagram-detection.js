(function($) {
    'use strict';

    function outputPrint(msg) {
        $('#ad .outcome').text(msg);
    }

    function findAllAnagrams(needle) {
        var strSet = {}, usedChars = [];
        var permute = function(input) {
            var letters = input.split('');
            var i, pick;
            for (i = 0; i < input.length; i++) {
                pick = letters.splice(i, 1);
                usedChars.push(pick);
                if (letters.length === 0) {
                    var newNeedle = usedChars.join('');
                    strSet[newNeedle] = 1;
                }
                permute(letters.join(''));
                letters.splice(i, 0, pick);
                usedChars.pop();
            }
        }

        permute(needle);
        return Object.keys(strSet);
    }

    $(document).ready(function() {
        $('#ad button').on('click', function() {
            var s = $('#ad textarea').val();
            var lines = s.split("\n");
            var parentString = lines[0];
            var queryString = lines[1];

            var anagrams = findAllAnagrams(queryString);
            var i, count = 0;
            for (i = 0; i < anagrams.length; i++) {
                var searchRex = new RegExp(anagrams[i], 'g');
                var finders = parentString.match(searchRex);
                if (finders !== null) {
                    count += finders.length;
                }
            }

            outputPrint(count);
        });
    });
})(jQuery);