
registerModal = {
	backdrop:true,
	backdropClick: true,
	dialogFade: false,
	keyboard: true,
	templateUrl: '/pages/register.html',
}

modals = {};

app.controller('MainCtrl', function ($scope, $http, $uibModal) {
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

        $scope.openRegisterModal = function() {
            console.log("register");
            modals['registerModal'] = $uibModal.open(registerModal);
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
            },
            onRetypePasswordChanged: function () {
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
.controller("RegisterCtrl", function ($scope, $http) {
	$scope.re_password = '';
	$scope.re_password_valid = false;
	$scope.password = '';
	$scope.password_valid = false;
    $scope.submit = function() {
        console.log("submit");
    }

	$scope.closeModal = function(modal) {
		console.log("close");
		modals[modal].close();
		delete modals[modal]
	};

	$scope.checkUsername = function() {
		console.log("focus out of field");
		/*
		$http.post(site_join('/checkUsername'), {"data": JSON.stringify({"username": $scope.username})})
			.success(function(data, status, headers, config) {
				alert("success!");
				console.log(data);
			})
			.error(function(data, status, header, config) {
				console.log(status);
				alert(status);
			});
		*/
	};
	
	$scope.checkPassword = function () {
		console.log("checking password");
		if (!$scope.registerForm.pwd.$dirty && !$scope.registerForm.re_pwd.$dirty) {
			$scope.registerForm.pwd.$setUntouched();
			$scope.registerForm.re_pwd.$setUntouched();
		}
		console.log($scope.registerForm.pwd.$touched);
		if ($scope.password && $scope.password.length <= 15 && $scope.password.length >= 6)
			$scope.password_valid = true;
		else {
			$scope.password_valid = false;
		}
		console.log("pwd_valid: "+$scope.password_valid);
		console.log("pwd_touched: "+$scope.password_valid);
		console.log("pwd_dirty: "+$scope.registerForm.pwd.$dirty);
		console.log("display: "+(!$scope.password_valid && $scope.registerForm.pwd.$touched && $scope.registerForm.pwd.$dirty));
		if (!$scope.registerForm.re_pwd.$dirty) return;
		if ($scope.password == $scope.re_password && $scope.password_valid) {
			$scope.re_password_valid = true;
		}else {
			$scope.re_password_valid = false;
		}
		console.log($scope.re_password);
		console.log("re_valid: "+$scope.re_password_valid);
		console.log("dirty: "+$scope.registerForm.re_pwd.$dirty);
	};

	$scope.onChangeRePwd = function() {
		console.log("changing");
		if (!$scope.registerForm.re_pwd.$touched) return;
		$scope.checkPassword();
	}

	$scope.register = function() {
		console.log("username"+$scope.username);

		if (!$scope.password_valid || !$scope.re_password_valid)	return;
		
		$http.post(site_join('/register'), {"data": JSON.stringify({
			username: $scope.username,
			password: $scope.password,
			gender: $scope.gender
		})})
			.success(function(data, status, headers, config) {
				alert("success!");
				console.log(data);
			})
			.error(function(data, status, header, config) {
				console.log(status);
				alert(status);
			});
	}

	$scope.logi = function() {
		$scope.registerForm.pwd.$setUntouched();
		console.log("loging");
		console.log("pwd_valid: "+$scope.password_valid);
		console.log("pwd_dirty: "+$scope.registerForm.pwd.$dirty);
		console.log("pwd_touched: "+$scope.registerForm.pwd.$touched);
		console.log("display: "+(!$scope.password_valid && ($scope.registerForm.pwd.$touched && $scope.registerForm.pwd.$dirty)));
	}
});
