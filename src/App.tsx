import { Provider } from 'react-redux'
import { store } from './app/store'
import Calculator from './features/calculator/Calculator'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Calculator />
      </div>
    </Provider>
  )
}

export default App