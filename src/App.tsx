import './styles/global.css'
import { Provider as ReduxProvider } from 'react-redux'

import { store } from './store'
import { ClassPlayer } from './pages/Player'

export const App = () => {
  return (
    <ReduxProvider store={store}>
      <ClassPlayer />
    </ReduxProvider>
  )
}

export default App
