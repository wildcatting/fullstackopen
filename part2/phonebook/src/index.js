import ReactDOM from 'react-dom'
import App from './App.js'

const persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    important: true
  }
]

ReactDOM.render(
  <App persons={persons} />,
  document.getElementById('root')
)