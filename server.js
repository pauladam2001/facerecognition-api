const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// const db = knex({
//   client: 'pg',
//   connection: {
//     host : 'postgresql-dimensional-46345',			// 127.0.0.1
//     // port : 3306,
//     user : 'postgres',
//     password : 'Pericol2001',		// how to get rid of that? Or do we need to?
//     database : 'smartbrain'
//   }
// });

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl:true
	}
})

const app = express();

// for database -> npm install knex, npm install pg

app.use(express.json());	// parse json
app.use(cors());


app.get('/', (req, res) => {
	res.send('It is working!');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', register.handleRegister(db, bcrypt))		// or we can do like this, see also register.js

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })		// /name is called endpoint


// app.listen(3001, () => {
	// console.log('app is running on port 3001');
// });

app.listen(process.env.PORT || 3001, () => {
	console.log(`app is running on port ${process.env.PORT}`);
});

// const PORT = process.env.PORT
// app.listen(PORT, () => {									// in bash: PORT=3001 node server.js			
// 	console.log(`Server is listening on port ${PORT}`);
// })


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = newUser
/profile/:userId --> GET = user
/image --> PUT = updatedUser
*/