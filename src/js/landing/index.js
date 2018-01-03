import React from 'react'
import LazyRoute from 'common/components/routing/LazyRoute'

import { Link } from 'react-router-dom'

const Landing = ({ match }) => (
  <div>
    <div>
      <Link to={match.url}>Home</Link>
      <Link to={`${match.url}login`}>Login</Link>
      <Link to={`${match.url}signup`}>Sign Up</Link>
    </div>

    <LazyRoute
      path={`${match.url}login`}
      load={() => import('landing/login')}
    />

    <LazyRoute
      path={`${match.url}signup`}
      load={() => import('landing/signup')}
    />
  </div>
)

export default Landing