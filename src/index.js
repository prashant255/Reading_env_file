const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fh = require('./filehandling.js')
const app = express()
const port = process.env.PORT || 3000   


const publicPathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPathDirectory, {index: 'loadEnvironment.html'}))

app.use(express.json())

app.get('', (req, res) => {
    res.render('loadEnvironment', {
        title: 'Load Environment'
    })
})

app.get('/updateEnvironment', (req, res) => {
    res.render('updateEnvironment', {
        title: 'Update Environment'
    })
})

app.get('/createEnvironment', (req, res) => {
    res.render('createEnvironment', {
        title: 'Create Environment'
    })
})

app.get('/getEnvironment/:process', (req, res) => {
    try{
        res.send(fh.loadEnvironment(req.params.process))
    } catch(e) {
        res.status(400).send()
    }   
})

app.get('/setEnvironment/:process/:key/:value', (req, res) => {
    try{
        res.send(fh.addEnvironmentVariable(req.params.process, req.params.key, req.params.value))
    } catch(e) {
        res.status(400).send()
    }
    
})

app.get('/createNewEnvironment/:process', (req, res) => {
    try{
        res.send(fh.createNewEnironment(req.params.process))
    } catch(e) {
        res.status(400).send()
    }
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, ()=> {
    console.log('Server is up on port ' + port)
})