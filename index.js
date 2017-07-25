import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Route } from 'react-router-dom'
import Index from './pages/index'
import Search from './pages/search'

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Index} />
          <Route path="/search" component={Search} />
        </div>
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
