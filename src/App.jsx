import './App.css'
import router from './pages/index'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import store from './store/store'
import apiUrl from './url'
function App() {
  useEffect(() => {
    let url = `${apiUrl}auth/token`
    let token = localStorage.getItem('token')
    if (token) {
    let headers = {headers:{'Authorization':`Bearer ${token}`}}
    axios.post(url,null,headers)
    }
   },[])

  return (
    <Provider store={store} >
     <RouterProvider router={router} /> 
    </Provider>
  );
}


export default App
