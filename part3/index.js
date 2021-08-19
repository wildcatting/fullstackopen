require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const { response } = require('express')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

morgan.token('body', request => JSON.stringify(request.body));

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/info', (request, response) => {
  Person.find({})
    .then(persons => {
      persons.map(person);
      response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${Date()}</p>
      `)
    })
})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const person = new Person ({
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 100000)
  })

  person.save()
    .then(savedPerson => response.json(savedPerson))
    .then(savedAndFormattedPerson => response.json(savedAndFormattedPerson))
    .catch(error => response.status(400).json({ error: 'name must be unique' }))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  
  const person = {
    name: body.name,
    number: body.number
  }
  
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updateNumber => response.json(updateNumber))
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => 
  response.status(404).send({ error: 'unknown endpoint' })


app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})