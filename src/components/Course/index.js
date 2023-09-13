import {Link} from 'react-router-dom'
import './index.css'

const Course = props => {
  const {details} = props

  return (
    <li className="course">
      <Link to={`/courses/${details.id}`} className="nav-link">
        <img className="course-img" src={details.logoUrl} alt={details.name} />
        <p className="course-name"> {details.name}</p>
      </Link>
    </li>
  )
}

export default Course
