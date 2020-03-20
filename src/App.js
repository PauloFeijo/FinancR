import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation'
import ListConta from './components/ListConta'

function App() {
  return (
    <BrowserRouter>
      <div className="container">

        <h3 className="m-3 d-flex justify-content-center">
          Financ</h3>
        <h5 className="m-3 d-flex justify-content-center">
          Sistema financeiro pessoal</h5>

        <Navigation />

        <Switch>
          <Route path='/conta' component={ListConta} exact />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
