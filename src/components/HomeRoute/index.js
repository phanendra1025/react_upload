import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

class HomeRoute extends Component {
  logOutFromHomeRoute = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-route-container">
          <div className="home-route-details-container">
            <h1 className="home-route-heading">
              Find The Job That Fits Your Life
            </h1>
            <p className="home-route-description">
              Millions of people are searching for jobs, salary, information,
              company reviews. Find the job that fits your abilities and
              potential
            </p>
            <Link to="/jobs">
              <button type="button" className="find-jobs-button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default HomeRoute
