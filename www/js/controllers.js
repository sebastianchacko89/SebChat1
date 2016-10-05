angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $ionicPopup) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.messageData = {};


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal1 = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal1.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal1.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
     $http.get("http://greeting.cfhm3tpked.us-east-1.elasticbeanstalk.com/greeting?type=Store&name="+$scope.loginData.username+"&message="+$scope.loginData.message)
	.then(function success(response) {
		console.log(response.data);
        $scope.myPopup = $ionicPopup.alert({
        title: 'Message Stored on the Cloud. Please note the below ID',
     template: 'ID: '+response.data.id
     });
	 $scope.closeViewMsg();
    },function error(response) {
		console.log(response.data);
        $scope.myPopup = $ionicPopup.alert({
        title: 'Error',
     template: 'An error occurred, please try again'
     });
	 $scope.closeViewMsg();
    });
  };
  
   // View Message Code
   $ionicModal.fromTemplateUrl('templates/viewMsg.html', {
   scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });
  
  $scope.closeViewMsg = function() {
    $scope.modal2.hide();
  };
  
  $scope.viewMsgModal =function() {
	$scope.modal2.show();
  };
  
  $scope.viewMsg = function() {
  console.log("Ready to view message");
  $http.get("http://greeting.cfhm3tpked.us-east-1.elasticbeanstalk.com/greeting?type=Check&name=" + $scope.messageData.username +"&id=" + $scope.messageData.id)
  .then(function success(response) {
		console.log(response.data);
        $scope.myPopup = $ionicPopup.alert({
        title: 'Message',
     template: response.data.content
     });
	 $scope.closeViewMsg();
    },function error(response) {
		console.log(response.data);
        $scope.myPopup = $ionicPopup.alert({
        title: 'Error',
     template: 'An error occurred, please try again'
     });
	 $scope.closeViewMsg();
    });
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
