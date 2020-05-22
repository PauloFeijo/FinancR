import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navigation from './components/Navigation'
import ListConta from './pages/ListConta'
import ListCategoria from './pages/ListCategoria'
import ListLancamento from './pages/ListLancamento'

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
          <Route path='/categoria' component={ListCategoria} exact />
          <Route path='/lancamento' component={ListLancamento} exact />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
