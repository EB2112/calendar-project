import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Calendar from './Calendar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='mt-5'>
    
      <Calendar/>
    </div>
  )
}

export default App
