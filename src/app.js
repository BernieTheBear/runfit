const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cors = require('cors');
const morgan = require('morgan')
const helmet = require('helmet')
const itemEntry = require('./models/item')
const userEntry = require('./models/user')
const mongoose = require('mongoose')
require('./db/mongoose.js') //relative path from index.js



//const cartRouter = require('./routes/cartRoutes');
//const helpRouter = require('./routes/helpRoutes');
//const shopRouter = require('./routes/shopRoutes');
//const accountRoutes = require('./routes/accountRoutes')

//create new express app
const app = express()

app.enable('trust proxy'); // needed for rate limiting by Client IP

//setting paths for static resources (views,paths)
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//configuring express app
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))
app.use(morgan('common'));
app.use(helmet());
app.use(cors());

app.use(express.json());

//routes
app.get('/',(req,res)=>{
	res.render('index', {title: "RunFit"})
})
app.get('/home',(req,res)=>{
	res.render('index', {title: "RunFit"})
})
app.get('/mens',(req,res) =>{
	res.render('mens')
})
app.get('/mens/items',async (req,res) => {
	try{
		const entries = await itemEntry.find({category:'mens'});
		res.send(entries)
		//res.render('mens', )
	} catch(e) {
		res.json(e)
	}
})
app.get('/womens',(req,res) =>{
	res.render('womens')
})
app.get('/womens/items',async (req,res) => {
	try{
		const entries = await itemEntry.find({category:'womens'});
		res.send(entries)
	} catch(e) {
		res.json(e)
	}
})

app.get('/sale',(req,res) =>{
	res.render('sale')
})
app.get('/sale/items',async (req,res) => {
	try{
		const entries = await itemEntry.find({category:'sale'});
		res.send(entries)
	} catch(e) {
		res.json(e)
	}
})

app.get('/login',(req,res) =>{
	res.render('login')
})

app.get('/signup',(req,res) =>{
	res.render('signup')
})

app.post('/signup', async (req,res) =>{
	const user = new userEntry(req.body)
	try{
		await item.save()
		res.status(200).send(user)
	} catch(e) {
		res.status(400).send(e)
	}
})

app.post('/mens', async (req,res) =>{
	const item = new itemEntry(req.body)
	try{
		await item.save()
		res.status(200).send(item)
	} catch(e) {
		res.status(400).send(e)
	}
})

app.post('/womens',async (req,res)=>{
	const item = new itemEntry(req.body)
	try{
		await item.save()
		res.status(200).send(item)
	} catch (e){
		res.status(400).send(e)
	}
})

app.post('/sale', async (req,res) =>{
	const item = new itemEntry(req.body)
	try{
		await item.save()
		res.status(200).send(item)
	} catch(e) {
		res.status(400).send(e)
	}
})


//-------------------

app.listen(1337,()=> {
	console.log('server listening on 1337')
})