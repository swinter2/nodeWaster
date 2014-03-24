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

wastedApp.controller('Wasted', 
    function ($scope, $http) {
        $scope.timer = null;
        $scope.active = false;
        $scope.total = 0; // in milliseconds
        $scope.grandTotal = 0; // in milliseconds
        $scope.interval = 14; // in milliseconds
        $scope.saveInterval = 4000; // in milliseconds
        $scope.lastSavedTotal = 0; // in milliseconds

        $scope.thirtySeconds = 30 * 1000; // in milliseconds
        $scope.twoMinutes = 2 * 60 * 1000; // in milliseconds
        $scope.tenMinutes = 10 * 60 * 1000; // in milliseconds
        $scope.thirtyMinutes = 30 * 60 * 1000; // in milliseconds
        $scope.oneHour = 60 * 60 * 1000; // in milliseconds

        $scope.thirtySecondsCommentAdded = false;
        $scope.twoMinutesCommentAdded = false;
        $scope.tenMinutesCommentAdded = false;
        $scope.thirtyMinutesCommentAdded = false;
        $scope.oneHourCommentAdded = false;

        $scope.start = function() {
            // start the timer
            $scope.active = true;
            $scope.timer = setInterval(function () {
                $scope.$apply(function ($scope) {
                    $scope.total += $scope.interval;
                    $scope.grandTotal += $scope.interval;
                });
            }, $scope.interval);
        };
        $scope.stop = function() {
            clearInterval($scope.timer);
            $scope.active = false;
        };
        $scope.save = function() {
            $http.post("/session/save", { id: 'kljhsdf987623' }).success(function (data, status, headers, config) {
                console.log(status + "|data: " + data);
                // $scope.$apply(function ($scope) {
                // });
            });
        };

        $scope.reset = function () {
            if (confirm('Are you sure?')) {
                $scope.total = 0;
                $scope.thirtySecondsCommentAdded = false;
                $scope.twoMinutesCommentAdded = false;
                $scope.tenMinutesCommentAdded = false;
                $scope.thirtyMinutesCommentAdded = false;
                $scope.oneHourCommentAdded = false;
            }
        };
    }
);