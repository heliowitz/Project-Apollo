angular.module('listApp')
  .factory('userFactory', ['$http', function($http) {
    var factory = {};

    factory.hello = "world";
    factory.print = function() {
      console.log('success: print, userFactory');
    };

    factory.proxyIndex = 0;

    factory.user;

    factory.backlogListTaskTitle="";
    factory.backlogListTaskTag="";
    factory.backlogListTaskPoints="";

    factory.toEditId="";

    // The task that is meant to be opened in the edit modal!
    factory.toEditTask;
    factory.setEditTask = function(toEditTask) {
      console.log('CALLED: setEditTask, userFactory');
      console.log(factory.toEditTask);

      // Gives the actual task
      factory.toEditTask = toEditTask;

      // Fills out the models for the update form
      factory.backlogListTaskTitle = factory.toEditTask.taskTitle;
      factory.backlogListTaskTag = factory.toEditTask.taskTag;
      factory.backlogListTaskPoints = factory.toEditTask.taskPoints;

      // factory.backlogListTaskTitle = "hello";

      console.log(factory.toEditTask);
    };

    factory.addBacklogTask = function() {
      console.log('CALLED: userFactory, addBacklogTask()');
      return $http({
              method: 'POST',
              url:'/backlogList',
              data: {
                  taskTitle: factory.backlogListTaskTitle,
                  taskTag: factory.backlogListTaskTag,
                  taskPoints: factory.backlogListTaskPoints,
                  taskStatus: "backlog",
                  taskOrder: factory.proxyIndex
              }
          })
          .then(
            function(res) {
              console.log('SUCCESS: userFactory, addBacklogTask()');
              factory.backlogListTaskTitle="";
              factory.backlogListTaskTag="";
              factory.backlogListTaskPoints="";
              factory.clearBacklogListModels();

              factory.proxyIndex++;

              angular.copy(res.data, factory.user.backlogList);
            },
            function(res) {
              console.log('FAILED: userFactory, addBacklogTask()');
            }
          );
    };

    factory.deleteBacklogTask = function(toDeleteId) {
      console.log('CALLED: userFactory, deleteBacklogTask()');
      console.log(toDeleteId);
      return $http({
        method: 'PUT',
        url: '/deleteBacklogListTask',
        data: {
          taskId: toDeleteId
        }
      })
        .then(
          function(res) {
            console.log('YASS');
            angular.copy(res.data, factory.user.backlogList);
          },
          function(res) {
            console.log('NUUU');
          }
        );
    };

    factory.editBacklogTask = function(toEditId) {
      console.log('CALLED: editBacklogTask, userFactory');
      console.log(toEditId);

      return $http({
        method: 'PUT',
        url: '/editBacklogListTask',
        data: {
          taskId: toEditId,
          taskTitle: factory.backlogListTaskTitle,
          taskTag: factory.backlogListTaskTag,
          taskPoints: factory.backlogListTaskPoints
        }
      })
        .then(
          function(res) {
            console.log('SUCCESS: editBacklogTask, userFactory');
            angular.copy(res.data, factory.user.backlogList);
          },
          function(res){
            console.log('FAILED: editBacklogTask, userFactory');
          }
        );

    };

    factory.getBacklogList = function() {
      console.log('CALLED: userFactory, getBacklogList()');
      return $http.get('/backlogList')
        .then(
          function(res) {
            console.log('SUCCESS: userFactory, getBacklogList()');
            angular.copy(res.data, factory.user.backlogList);
          },
          function(res) {
            console.log('FAILED: userFactory, getBacklogList()');
          }
        );
    };

    factory.moveTaskToProgressList = function(toMoveId) {
      console.log('CALLED: userFactory, moveTaskToProgressList');
      console.log(toMoveId);


    }


    // VERY EXPERIMENTALLLLLLLLL
    factory.saveBacklogList = function() {
      console.log('Hello');
      console.log(factory.user.backlogList);

      return $http({
        method: 'PUT',
        url: '/backlogList',
        data: {
          backlogList: factory.user.backlogList
        }
      })
        .then(
          function(res) {
            console.log('hjygvuyjgiuhiuhuilhuil');
            angular.copy(res.data, factory.user.backlogList);
          },
          function(res){
            console.log('nuuuu');
          }
        );
    }
    ////////////////////////////


    factory.clearBacklogListModels = function() {
      if (factory.backlogListTaskTitle != "") {
        factory.backlogListTaskTitle = "";
      }
      if (factory.backlogListTaskTag != "") {
        factory.backlogListTaskTag = "";
      }
      if (factory.backlogListTaskPoints != "") {
        factory.backlogListTaskPoints = "";
      }
    };



    return factory;
  }]);
