import { useState } from 'react'

import './App.css'
import DotAnimation from './Components/dot_animation.tsx'

function App() {

  return (
    <>
      <DotAnimation count={100}  velocity={.5} stopDistance={100}  />

    </>
  )
}

export default App
