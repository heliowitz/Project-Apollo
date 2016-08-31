var taskModel = require('../models/taskModel');
var path = require('path');

module.exports = function(app, passport) {

    // LOGIN STUFF ---
    // --------------
    /*app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });*/

    /*app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));*/

    app.post('/login', passport.authenticate('local-login'),
        function(req, res) {
            console.log('Passport local-login auth passed');
            res.sendStatus(200);
        }
    );

    /*app.post('/login', function(req, res) {
        console.log(req.body);
    });*/

    // SIGNUP STUFF ---
    // ---------------
    /*app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });*/

    /*app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));*/

    app.post('/signup', passport.authenticate('local-signup'),
        function(req, res) {
            console.log('Passport local-signup auth passed');
            res.sendStatus(200);
        }
    );

    // PROFILE STUFF ---
    // -----------------
    app.get('/profile', isLoggedIn, function(req, res) {

        if (req.user != null) {
          console.log('Success HELLOOOO');
          return res.json({user: req.user});
        }
        else {
          res.redirect('/');
        }
        /*res.sendFile(path.resolve('public/views/test.html'));*/
    });

    app.get('/home', isLoggedIn, function(req, res) {
        console.log('home express route reached');
        res.sendFile(path.resolve('/public/views/test.html'));
    });

    // GOOGLE AUTH STUFF ---
    // ----------
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect : '/profile',
            failureRedirect : '/'
        })
    );

    // LOGOUT STUFF ---
    // ----------------
    /*app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });*/

    app.get('/logout', function(req, res) {
        console.log('logout route called');
        req.logout();
        res.sendStatus(200);
        /*res.redirect('/');*/
    });

    // GET ALL TASKS FOR USER ---
    // --------------------------

    app.post('/backlogList', isLoggedIn, function(req, res) {
      console.log(req.user);
      console.log(req.body);

      var newTask = new taskModel({
        taskTitle: req.body.taskTitle,
        taskTag: req.body.taskTag,
        taskPoints: req.body.taskPoints,
        taskStatus: req.body.taskStatus
      });

      newTask.save(function(err) {
        if(err) {
          console.log(err.toString());
          res.json({error: err.toString()});
        }
        else {
          res.json({message: "Successfully added new backlog task!"});
        }
      });

    });

    /*app.route('/tasks')
        // Gets all tasks
        .get(isLoggedIn, function(req, res) {
            taskModel.find({}, function(err, docs) {
                if(err) {
                    res.json({error: err.toString()});
                }
                if(!docs || docs.length == 0) {
                    res.json({error: "None found"});
                }
                else {
                    res.json(docs);
                }
            });
        })
        // Create new task
        .post(function(req, res) {
            var newTask = new taskModel({
                taskTitle: req.body.taskTitle,
                taskTag: req.body.taskTag,
                taskPoints: req.body.taskPoints,
                taskComments: []
            });
            newTask.save(function(err) {
                if(err) {
                    res.json({error: err.toString()});
                }
                else {
                    res.json({message: "Successfully added new task!"});
                }
            });
        });

    app.route('/tasks/:id')
        // Edits task
        .put(function(req, res) {
            taskModel.findByIdAndUpdate(
                {_id: req.params.id},
                { $set:
					{
						taskTitle: req.body.taskTitle,
						taskTag: req.body.taskTag,
						taskPoints: req.body.taskPoints
					}
				},
                function(err) {
                    if(err) {
                        res.json({error: err.toString()});
                    }
                    else {
                        res.json({message: "Successfully updated task!"});
                    }
                }
            );
        })
        // Deletes task
        .delete(function(req, res) {
            taskModel.remove(
                {_id: req.params.id},
                function(err) {
                    if(err) {
                        res.json({error: err.toString()});
                    }
                    else {
                        res.json({message: "Successfully removed task!"});
                    }
                }
            );
        });

    app.route('/tasks/:id/comments')
        // Creates comment
        .put(function(req, res) {
            taskModel.findByIdAndUpdate(
                {_id: req.params.id},
                { $push:
					{
                        "taskComments": {
                            commentPost: req.body.commentPost
                        }
                    }
				},
                function(err) {
                    if(err) {
                        res.json({error: err.toString()});
                    }
                    else {
                        res.json({message: "Successfully added new comment!"});
                    }
                }
            );
        });

     app.route('/tasks/:id/comments/:commentId')
        // Edits comment
        .put(function(req, res) {
            taskModel.findOneAndUpdate(
                {"_id": req.params.id, "taskComments._id": req.params.commentId},
                { "$set":
					{
						"taskComments.$.commentPost": req.body.commentPost
					}
                },
                function(err) {
                    if(err) {
                        res.json({error: err.toString()});
                    }
                    else {
                        res.json({message: "Successfully updated comment!"});
                    }
                }
            );
        });

    app.route('/tasks/:id/comments/:commentId/delete')
        // Deletes comment
        .put(function(req, res) {
            taskModel.findByIdAndUpdate(
                {"_id": req.params.id},
                { $pull:
					{
                        "taskComments": {
                            "_id" : req.params.commentId
                        }
                    }
                },
                function(err, docs) {
                    if(err) {
                        res.json({error: err.toString()});
                    }
                    else {
                        res.json({message: "Successfully removed comment!"});
                    }
                }
            );
        });*/

    /*app.get('*', function(req, res) {
        res.sendFile(path.resolve('public/views/landing.html'));
    });*/

    app.get('*', function(req, res) {
        res.sendFile(path.resolve('public/views/index.html'));
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
