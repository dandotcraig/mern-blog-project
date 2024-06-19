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
      <div className="post">
        <div className="image">
          <img src="https://images.pexels.com/photos/15818869/pexels-photo-15818869/free-photo-of-person-riding-extremely-packed-bike.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="lady on bike" />
        </div>
        <div className="texts">
          <h2>Lady on bike</h2>
          <p className="info">
            <a href="" className="author">Dan C</a>
            <time>2024-06-20 8:04</time>
          </p>
          <p className='summary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium ducimus ut et reprehenderit, totam autem aliquam doloribus vero rerum quis. Amet assumenda excepturi quas, quae labore aut cupiditate atque reprehenderit?</p>
        </div>
        
      </div>
      
    </main>
  )
}

export default App
