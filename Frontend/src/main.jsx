import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import appStore from './store/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(appStore);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <App />
        <Toaster />
      {/* </PersistGate> */}

    </Provider>
  </StrictMode>
)
