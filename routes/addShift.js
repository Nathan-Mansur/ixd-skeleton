/*
 * Add task
 */

var data = require("../tasks.json");

exports.addTask = function(req, res) {

    var taskId = "";

    for (i = 0; i < req.query.name.length; i++) {
        if (req.query.name[i] != " " && req.query.name[i] != ":")
            taskId += req.query.name[i];
    }

    var newTask = {
        'id': taskId,
        'name': req.query.name,
        'time': req.query.time,
        'user': '123456abcdef',
        'done': false
    }

    data.tasks.unshift(newTask);
    res.render('homeAlt', {
        'tasks': data.tasks,
    });
};