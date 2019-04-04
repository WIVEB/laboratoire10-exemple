let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let mongoose = require('mongoose');
let app = express();
const uuidv1 = require('uuid/v1');
let User = require('./user');
let corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
    credentials: true
};

mongoose.connect('mongodb://localhost/mydb', function(err) {
    if (err) { throw err; }
});

app.use(bodyParser());
app.use(cors(corsOptions));

app.post('/users', function(req, res) {
    userId = uuidv1();
    new User({_id: userId, name: req.body.name}).save();
    res.send({id:userId});
});

app.get('/users', function(req, res) {
    User.find({}).then(function (usersBD) {
        let users = [];
        usersBD.forEach(function(user) {
            users.push({id:user._id, name:user.name})
        });

        res.send(users);
    });
});

app.listen(8080);
console.log('Listening on port 8080...');
