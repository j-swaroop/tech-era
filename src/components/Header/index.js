import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="header-container">
    <nav className="nav-responsive">
      <Link to="/" className="nav-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
      </Link>
    </nav>
  </nav>
)

export default withRouter(Header)
