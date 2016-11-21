var app = angular.module('remarksApp', []);

app.service('remarksStorage', function ($http) {
    var storage = [];
    var addRemark = function (email, content) {
        var imageHash = "";
        if (typeof email == "string") {
            var trimmedEmail = email.trim();
            trimmedEmail = trimmedEmail.toLowerCase();
            imageHash = md5(trimmedEmail);
        }
        var image = 'https://www.gravatar.com/avatar/' + imageHash + '?s=50';
        var entry = {
            image: image,
            email: email,
            content: content
        };

        var req = {
            method: 'POST',
            url: '/remark',
            headers: {
                'Content-Type': "application/json"
            },
            data: entry
        }

        $http(req).then(function () {
            storage.push(entry);
        }, function (err) {
            console.log("error while trying to save the remark: " + err);
        });
    }

    $http({
        method: 'GET',
        url: '/remarks'
    }).then(function successCallback(response) {
        if (response.data) {
            response.data.forEach(function (item) {
                storage.push(item);
            });
        }
    }, function errorCallback(response) {
        console.log("error while trying to get the remarks: " + response);
    });

    getContent = function () {
        return storage;
    }

    return {
        addRemark: addRemark,
        getContent: getContent
    };
});