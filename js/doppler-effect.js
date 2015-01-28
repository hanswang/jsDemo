(function($) {
    'use strict';

    function updateStarColor(length) {
        /** convert to color change
            middle color : yellow rgb (255, 255, 0)
            positive color : red rgb (255, 0, 0)
            negative color : blue (0, 0, 255)
        */
        if (length > 0) {
            var newGColor = Math.round(255 - (length * 255 / 100));
            $('#star').css('background-color', 'rgb(255, '+newGColor+',0)');
        } else if (length < 0) {
            var newRColor = Math.round(255 + (length * 255 / 100));
            var newBColor = Math.round(0 - (length * 255 / 100));
            $('#star').css('background-color', 'rgb('+newRColor+', '+newRColor+','+newBColor+')');
        }
    }

    $(document).ready(function() {
        $('#slider').slider()
            .on('slide', function(e) {
                var v = $(this).val();
                /** convert to inputbox value - using exp scaling
                    slider range : 0 ~ 200 as x axis range from 0 ~ 10 => t = 20u
                    inputbox value range : output y axis as exp(x) range from exp(0) ~ exp(10), which later scales to [-100, 100]
                                           for matching exp(0) ~ exp(10) to [-100, 100] => (t-1)*200 = (u+100) * exp(10)
                */
                var converted = (Math.exp(v / 20) - 1) * 200 / (Math.exp(10) - 1) - 100;

                $('#de input.form-control').val(converted.toFixed(2));

                updateStarColor(converted);
            });

        $('#de input.form-control').on('keyup', function(e) {
            var s = $(this).val();
            // check for float type and negative value
            var floatPart = 0, result = 0;
            var isPositive = true;
            if (s.indexOf('.') !== 0 && s.indexOf('.') !== -1) {
                var decimalPoint = s.indexOf('.');
                floatPart = s.substring(decimalPoint+1).replace(/[^\d]/, '');
                s = s.substring(0, decimalPoint);
            }
            if (s.indexOf('-') === 0) {
                s = s.substring(1);
                isPositive = false;
            }
            s = s.replace(/[^\d]/, '');
            if (s.length === 0 && floatPart != 0) {
                s = floatPart;
                isPositive = true;
                floatPart = 0;
            }
            if (floatPart !== 0) {
                result = isPositive ? (s+'.'+floatPart) : '-'+s+'.'+floatPart;
            } else if (s !== 0) {
                result = isPositive ? s : '-'+s;
            } else {
                result = 0;
            }
            // limit input number range
            if (result < -100) {
                result = -100;
            } else if (result > 100) {
                result = 100;
            }
            $(this).val(result);

            result = parseInt(result);
            if (isNaN(result)) {
                result = 0;
            }

            updateStarColor(result);
            /** convert to slider position
                inputbox value range : -100 ~ 100 scale to exp(0) ~ exp(10) as y axis
                slider range : find x axis value as log(y) range from 0 ~ 10, which later scales to 0 ~ 200
            */
            var converted = Math.round(Math.log(((result + 100) * Math.exp(10) / 200) + 1) * 20);
            $('#slider').slider('setValue', converted);
        });
    });
})(jQuery);