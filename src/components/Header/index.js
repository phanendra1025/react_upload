import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link className="nav-link-items" to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="header-website-logo"
          />
        </Link>

        <ul className="nav-items-container">
          <Link className="nav-link-items" to="/">
            <li className="nav-item">Home</li>
          </Link>
          <Link className="nav-link-items" to="/jobs">
            <li className="nav-item">Jobs</li>
          </Link>
        </ul>
        <div>
          <button type="button" className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
        <ul className="mobile-nav-items-container">
          <Link className="nav-link-items" to="/">
            <li>
              <AiFillHome size="30" color=" #cbd5e1" />
            </li>
          </Link>
          <Link className="nav-link-items" to="/jobs">
            <li>
              <BsFillBriefcaseFill size="30" color=" #cbd5e1" />
            </li>
          </Link>
          <li>
            <button
              className="logout-image-button"
              onClick={logout}
              type="button"
            >
              <FiLogOut size="30" color=" #cbd5e1" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
