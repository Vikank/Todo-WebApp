(function(){


  var config = {
    apiKey: "apiKey",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://databaseName.firebaseio.com",
    storageBucket: "bucket.appspot.com"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  var app = angular.module('toDoApp', ['firebase']);
app
  .controller('ToDoController', ['$scope','$firebaseArray', function ($scope, $firebaseArray) {
    
    $scope.tasks = [];
    $scope.editIndex = false;
    $scope.addTask = function () {
      var task={};
      var ref = firebase.database().ref("tasks");
        if( $scope.editIndex === false){
          task={task: $scope.task, done: false};
            $scope.tasks.push(task);
            $scope.userdata = $firebaseArray(ref);
          $scope.userdata.$loaded()
              .then(function(){
                  console.log($scope.userdata);
              });
        } else {
          task= $scope.tasks[$scope.editIndex];
          task.task=$scope.task;
          //$scope.tasks[$scope.editIndex].task = $scope.task;
        }
        $scope.editIndex = false;
        //$scope.task = '';
        $firebaseArray(ref).$add(task)
        .then(
          function(ref){
            $scope.task = "";
          },
          function(error){
            console.log(error);
          }
        )
    }
        
    $scope.editTask = function (index) {
      $scope.task = $scope.tasks[index].task;
      $scope.editIndex = index;
    }
    $scope.doneTask = function (index) {
      $scope.tasks[index].done = true;
    }
    $scope.unDoneTask = function (index) {
      $scope.tasks[index].done = false;
    }
    $scope.deleteTask = function (index) {
      $scope.tasks.splice(index, 1);
    }
  }]);

}());




