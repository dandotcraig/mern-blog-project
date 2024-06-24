
import Layout from './Layout';
import './app.css'
import Post from './components/Post'
// import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './components/pages/IndexPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import { UserContextProvider } from './context/UserContext';

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route patjh="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App
