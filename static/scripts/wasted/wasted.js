/*
Have fun calculating the time wasted while waiting for an Ektron site to load.
*/

Number.prototype.toHHMMSS = function () {
    var milliseconds = parseInt(this, 10);
    var secNum = milliseconds / 1000; //parseInt(this, 10); // don't forget the second parm
    var hours = Math.floor(secNum / 3600);
    var minutes = Math.floor((secNum - (hours * 3600)) / 60);
    var seconds = parseFloat(secNum - (hours * 3600) - (minutes * 60)).toFixed(3);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
};

(function ($) {
    
    var $body = $('body');
    var $startStop = $('#startStop');
    var $reset = $('#reset');
    var $total = $('.total');
    var $grandTotal = $('.grand-total');
    var $currentSession = $('.session-current');
    var sessionId = parseInt($total.data('sessionId'));
    var $comment1 = $('#comment1');
    var $comment2 = $('#comment2');
    var $comment3 = $('#comment3');
    var $comment4 = $('#comment4');
    var $comment5 = $('#comment5');
    
    var timer = null;
    var active = false;
    var total = parseInt($total.data('currentTotal')) || 0; // in milliseconds
    var grandTotal = parseInt($grandTotal.data('grandTotal')) || 0; // in milliseconds
    var interval = 14; // in milliseconds
    var saveInterval = 4000; // in milliseconds
    var lastSavedTotal = total; // in milliseconds

    var thirtySeconds = 30 * 1000; // in milliseconds
    var twoMinutes = 2 * 60 * 1000; // in milliseconds
    var tenMinutes = 10 * 60 * 1000; // in milliseconds
    var thirtyMinutes = 30 * 60 * 1000; // in milliseconds
    var oneHour = 60 * 60 * 1000; // in milliseconds

    var thirtySecondsCommentAdded = false;
    var twoMinutesCommentAdded = false;
    var tenMinutesCommentAdded = false;
    var thirtyMinutesCommentAdded = false;
    var oneHourCommentAdded = false;
    
    function saveCurrentState() {
        if (!isNaN(sessionId) && sessionId > 0 && total != lastSavedTotal) {
            $.ajax({
                type: "POST",
                url: "/Default.ashx?action=saveSession",
                data: {
                    sessionId: sessionId,
                    duration: total
                },
                success: function (data) {},
                dataType: 'json'
            });
            
            lastSavedTotal = total;
        }
    };

    function updateTotal() {
        if (!thirtySecondsCommentAdded && total >= thirtySeconds) {
            $comment1.removeClass('hide');
            thirtySecondsCommentAdded = true;
        }
        if (!twoMinutesCommentAdded && total >= twoMinutes) {
            $comment2.removeClass('hide');
            twoMinutesCommentAdded = true;
        }
        if (!tenMinutesCommentAdded && total >= tenMinutes) {
            $comment3.removeClass('hide');
            tenMinutesCommentAdded = true;
        }
        if (!thirtyMinutesCommentAdded && total >= thirtyMinutes) {
            $comment4.removeClass('hide');
            thirtyMinutesCommentAdded = true;
        }
        if (!oneHourCommentAdded && total >= oneHour) {
            $comment5.removeClass('hide');
            oneHourCommentAdded = true;
        }

        var t = total.toHHMMSS();
        // Update the current total.
        $total.html(t);
        // Update the current session's total in the list as well.
        $currentSession.find('.duration').html(t);
        // Update the grand total as well.
        $grandTotal.data("grandTotal", grandTotal);
        $grandTotal.html(grandTotal.toHHMMSS());
    }
    
    function startStopHandler() {

        if (!active) {
            timer = setInterval(function () {
                total += interval;
                grandTotal += interval;
                updateTotal();
            }, interval);
            $startStop.html("Stop");
            $reset.addClass('disabled');
            active = true;
        } else {
            clearInterval(timer);
            $startStop.html("Start");

            // Show the reset button if applicable.
            if (total > 0) {
                $reset.removeClass('disabled');
            }
            active = false;
        }
    }
    
    function resetHandler() {
        if (!$reset.hasClass('disabled')) {
            if (confirm('Are you sure?')) {
                total = 0;
                updateTotal();
                $reset.addClass('disabled');
                
                // Also hide the fun little messages again.
                $comment1.addClass('hide');
                $comment2.addClass('hide');
                $comment3.addClass('hide');
                $comment4.addClass('hide');
                $comment5.addClass('hide');
            }
        }
    }

    $startStop.click(function(e) {
        startStopHandler();
        e.stopPropagation();
        e.preventDefault();
    });
    
    $reset.click(function (e) {
        resetHandler();
        e.stopPropagation();
        e.preventDefault();
    });

    $body.keypress(function(e) {
        if (e.which == 32) { // spacebar
            startStopHandler();
            
            e.stopPropagation();
            e.preventDefault();
        }
    });

    // Set a timer for the current state to be saved if it has changed.
    setInterval(saveCurrentState, saveInterval);

})($ || jQuery);