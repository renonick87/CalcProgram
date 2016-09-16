var express = require('express')
var app = express()

var fs = require('fs')
var _ = require('lodash')
var rules = []

fs.readFile('rules.json', {encoding: 'utf8'}, function(err, data) {
	if(err) throw err

	JSON.parse(data).forEach(function (rule) {
		rules.push(rule)
	})
})

app.get('/', function (req, res) {
	var ruleList = '<a href="/' + 'rules' + '">' + 'List of rules' + '</a><br>'	
  res.send(ruleList)
})

app.get('/rules', function (req, res) {
	var buffer = ''

	rules.forEach(function(rule) {
		buffer += '<a href="/' + rule.title + '">' + rule.title + '</a><br>'	
	})
	res.send(buffer)
})

app.get('/:title', function(req, res){
	rules.forEach(function(rule) {
		if (rule.title === req.params.title){
			buffer = rule.description
		}
	})
	var logger = ''
	buffer.forEach(function(eqtn){
		var ruleCat = Object.getOwnPropertyNames(eqtn)
		var first = Object.keys(eqtn)[0]
		logger += '<a href="/:' + first + '">' + first + '</a><br>'
	})
	//var Desc = JSON.parse(req.params.description)
		//var descArray = Desc.split(',')
	//buffer = ''
	/*Desc.forEach(function(description) {
		buffer += '<a href="/' + description + '">' + description + '</a><br>'
	})*/
	res.send(logger)
})

app.get('/:first', function(req, res){
	var Eqtn = req.params.first
	res.send(Eqtn)
})

var server = app.listen(5000, function () {
  console.log('Server running at http://localhost:' + server.address().port)
})