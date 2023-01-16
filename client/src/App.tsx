import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Profile from './pages/Profile'
import { RootState } from './store/ReduxStore'
import './styles/App.css'

const App = () => {
    const user = useSelector((state: RootState) => state.authReducer.authData)

    return (
        <div className='App'>
            <div className="blur" id='first-blur'></div>
            <div className="blur" id='second-blur'></div>
            <Routes>
                <Route path='/' element={user ? <Navigate to='home' /> : <Navigate to='auth' />} />
                <Route path='/home' element={user ? <Home /> : <Navigate to='../auth' />} />
                <Route path="/auth" element={user ? <Navigate to='../home' /> : <Auth />} />
                <Route path='/profile/:id' element={user ? <Profile /> : <Navigate to='../auth' />} />
                <Route path="*" element={
                    <main style={{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                    </main>
                } />
            </Routes>
        </div>
    )
}

export default App