import ReactDOM from 'react-dom/client'
import './styles/reset.css'
import './styles/global.css'
import { Provider } from 'react-redux/es/exports'
import store from './store/ReduxStore'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
)
