import { useState } from 'react'
import './app.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <header>
        <a href="" className="logo">Blog</a>
        <nav>
          <a href="">Login</a>
          <a href="">Register</a>
        </nav>
      </header>
    </main>
  )
}

export default App
