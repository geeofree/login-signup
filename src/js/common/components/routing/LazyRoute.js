import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import Proptypes from 'prop-types'

const defaultState = () => ({
  AsyncComponent: null,
})

class LazyComponent extends React.Component {
  state = defaultState()

  static propTypes = {
    load: Proptypes.func.isRequired,
  }

  componentWillMount() {
    this.setState(defaultState())
    this.props.load()
      .then(mod => mod.default ? mod.default : mod)
      .then(AsyncComponent => this.setState({AsyncComponent}))
  }

  componentWillUnmount() {
    this.setState(defaultState())
  }

  render() {
    const { AsyncComponent } = this.state
    const { load, ...props } = this.props

    return AsyncComponent ? <AsyncComponent {...props} /> : null
  }
}

const LazyRoute = ({ load, ...rest }) => (
  <Route
    {...rest}
    render={props => <LazyComponent load={load} {...props}/>}
  />
)

export default LazyRoute