import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Course from '../Course'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TechEra extends Component {
  state = {
    coursesList: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getCoursesData()
  }

  getCoursesData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.courses.map(item => ({
        id: item.id,
        logoUrl: item.logo_url,
        name: item.name,
      }))

      this.setState({apiStatus: apiConstants.success, coursesList: updatedData})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onClickRetry = () => {
    this.getCoursesData()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="faliure-img"
      />
      <h1 className="failure-heading"> Oops! Something Went Wrong</h1>
      <p className="failure-text">
        {' '}
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={this.onClickRetry} type="button" className="retry-btn">
        {' '}
        Retry{' '}
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {coursesList} = this.state
    return (
      <>
        <h1 className="heading"> Courses</h1>
        <ul className="courses-list">
          {coursesList.map(item => (
            <Course key={item.id} details={item} />
          ))}
        </ul>
      </>
    )
  }

  renderCoursesList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.inProgress:
        return this.renderLoader()
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="bg-container">
          <div className="responsive-container">{this.renderCoursesList()}</div>
        </div>
      </>
    )
  }
}

export default TechEra
