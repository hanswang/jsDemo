(function($) {
    'use strict';

    function showBalanced() {
        $('#bb .outcome').text('balanced');
    }

    function showUnbalanced() {
        $('#bb .outcome').text('not balanced');
    }

    function checkMatch(a, b) {
        if (a === '(' && b === ')') {
            return true;
        } else if (a === '{' && b === '}') {
            return true;
        } else if (a === '[' && b === ']') {
            return true;
        }
        return false;
    }

    $(document).ready(function() {
        $('#bb button').on('click', function() {
            var s = $('#bb textarea').val();
            if (s.length % 2 !== 0) {
                showUnbalanced();
                return;
            }
            var stack = [];
            while (true) {
                var firstChar = s.substring(0, 1);
                if (stack.length > 0) {
                    var stackedChar = stack[stack.length - 1];
                    if (checkMatch(stackedChar, firstChar)) {
                        stack.pop();
                    } else {
                        stack.push(firstChar);
                    }
                } else {
                    stack.push(firstChar);
                }
                s = s.substring(1);
                if (s === '') {
                    break;
                }
            }
            if (stack.length > 0) {
                showUnbalanced();
            } else {
                showBalanced();
            }
        });
    });
})(jQuery);