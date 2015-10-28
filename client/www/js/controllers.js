
app.controller('RegisterController', function ($scope, $http) {
        var rule = {
            username: {
                min: 5
                , max: 20
            }
            , password: {
                min: 8
                , max: 32
            }
            , email: {
                min: 8,
                max: 256
                , bannedDomain: ["junk.com", "junk.net"]
            }
        };
        $scope.reset = function () {
            $scope.username = '';
            $scope.username_res = '';
            $scope.password = '';
            $scope.password_res = '';
            $scope.retype_password = '';
            $scope.retype_password_res = '';
            $scope.email_str = '';
            $scope.email_res = '';
        };
        $scope.isUsernameValid = function () {
            return isBetweenMinMax($scope.username.length, rule.username);
        };
        $scope.isPasswordValid = function () {
            return isBetweenMinMax($scope.password.length, rule.password);
        };
        $scope.isEmailValid = function (emailStr, msgHolder) {
            emailStr = emailStr || $scope.email_str;
            /* return boolean, save msg into msgHolder.content */
            msgHolder.content = '';
            if (!isBetweenMinMax(emailStr.length, rule.email))
                msgHolder.content = 'This email is not supported';
            else {
                var index1 = emailStr.indexOf("@");
                var index2 = -1;
                if (index1 > 0) index2 = emailStr.indexOf(".", index1);
                if (index2 == emailStr.length - 1)index2 = -1;
                if (index2 < 0)
                    msgHolder.content = 'Please input the service provider of this email account (e.g. @yahoo.com.hk)';
                else
                    rule.email.bannedDomain.forEach(function (element) {
                        if (emailStr.indexOf(element) >= 0)
                            msgHolder.content = element + ' is not allowed';
                    });
            }
            return msgHolder.content == '';
        };
		$scope.sendRegisterRequest = function() {
			$http.post(site_join('/httpAdd'), {"data": JSON.stringify({"a": 456, "b": 4})})
				.success(function(data, status, headers, config) {
					alert("success!");
                    console.log(data);
				})
				.error(function(data, status, header, config) {
					console.log(status);
					alert(status);
				});
		}
        $scope.isUsernameUnique = function (username) {
            //TODO require web service
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == XMLHttpRequest.DONE && xmlHttp.status == 200) {
                    var res = xmlHttp.responseText;
                    $scope.username_res = res;
                }
            };
            xmlHttp.open("GET","check.php?name="+username,true);
            //xmlHttp.open("GET", "gethint.php?q=" + username, true);
            xmlHttp.send();
            return true;
        };
        $scope.isPasswordSame = function () {
            return password == $scope.retype_password;
        };
        $scope.checkAll = function () {
            return $scope.isUsernameValid()
                && $scope.isPasswordValid()
                && $scope.isEmailValid()
                && $scope.isPasswordSame()
                && $scope.isUsernameUnique();
        };
        $scope.onChanged = {
            onUsernameChanged: function () {
                if ($scope.username.length == 0) {
                    $scope.username_res = '';
                } else {
                    var msg = $scope.username + ' ';
                    if ($scope.isUsernameUnique($scope.username)) {
                        msg += 'is ready to be used';
                    } else {
                        msg += 'is already used';
                    }
                    $scope.username_res = "loading";
                }
            }
            , onPasswordChanged: function () {
                if ($scope.password.length > 0) {
                    var msg = "This password is safe";
                    //TODO check if reserved char is used
                    //TODO check password security level
                    $scope.password_res = msg;
                    $scope.retype_password = '';
                }
            }
            , onRetypePasswordChanged: function () {
                var msg;
                if ($scope.password.length == 0) {
                    msg = '';
                } else {
                    if ($scope.password == $scope.retype_password) {
                        msg = 'The password matched';
                    } else {
                        msg = 'The password are different!'
                    }
                }
                $scope.retype_password_res = msg;
            }
            , onEmailChanged: function () {
                var msgHolder = {content: ''};
                if ($scope.email_str.length > 0) {
                    if ($scope.isEmailValid($scope.email_str, msgHolder)) {
                        msgHolder.content = 'This email is ok';
                    }
                }
                $scope.email_res = msgHolder.content;
            }
        };
        $scope.trySubmit = function () {
            if ($scope.checkAll()) {
                //TODO submit
                console.log("submit");
            } else {
                //TODO info user cannot submit
                console.log("not submit");
            }
        };
        $scope.reset();
    })
;
