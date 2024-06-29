import { useState } from 'react'

import './App.css'
import { Navbar } from './components/Navbar'
import { InputForm } from './components/InputForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <div className='min-h-screen border border-black flex flex-col p-5'>
        <Navbar />
        <div className="flex border h-screen border-black justify-center items-center">
          <InputForm />
        </div>


      </div>
    </>
  )
}

export default App
