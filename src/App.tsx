import { Provider } from 'react-redux'
import { store } from './app/store'
import Calculator from './features/calculator/Calculator'

function App() {
  return (
    // Wrap the entire app with Provider and pass in the Redux store
    // This allows all nested components to access Redux state and dispatch actions
    <Provider store={store}>
      <div className="App">
        <Calculator />
      </div>
    </Provider>
  )
}

export default App