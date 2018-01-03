import React from 'react'
import { render } from 'react-dom'
import 'sass/app.style.sass'

import { Switch, BrowserRouter } from 'react-router-dom'
import LazyRoute from 'common/components/routing/LazyRoute'

const Application = () => (
  <BrowserRouter>
    <Switch>
      <LazyRoute path="/" load={() => import('landing')} />
    </Switch>
  </BrowserRouter>
)

render(<Application />, document.getElementById('app'))