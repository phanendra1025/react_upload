import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    loginErrorMessage: '',
  }

  usernameOnChange = event => {
    this.setState({username: event.target.value})
  }

  passwordOnChange = event => {
    this.setState({password: event.target.value})
  }

  submitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submissionFailure = errorMsg => {
    this.setState({loginErrorMessage: errorMsg, username: '', password: ''})
  }

  submitTheLoginDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submissionFailure(data.error_msg)
    }
  }

  render() {
    const {loginErrorMessage, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-route-container">
        <form className="login-card" onSubmit={this.submitTheLoginDetails}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="app-logo"
          />
          <div className="username-container">
            <label className="login-labels" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              value={username}
              type="text"
              placeholder="Username"
              id="username"
              className="login-inputs"
              onChange={this.usernameOnChange}
            />
            <br />
          </div>
          <div className="username-container">
            <label className="login-labels" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              value={password}
              type="password"
              placeholder="Password"
              id="password"
              className="login-inputs"
              onChange={this.passwordOnChange}
            />
            <br />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="login-error-message">{loginErrorMessage}</p>
        </form>
      </div>
    )
  }
}

export default LoginRoute
