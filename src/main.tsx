import { Provider } from 'react-redux'
import { store } from '@app/store'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'gridjs/dist/theme/mermaid.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
)
