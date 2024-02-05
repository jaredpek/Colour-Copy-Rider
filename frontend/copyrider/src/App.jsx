import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='text-gray-50'>
    <HomePage/>
    </div>
  )
}

export default App
