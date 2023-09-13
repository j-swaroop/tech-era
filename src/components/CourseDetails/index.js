import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetails extends Component {
  state = {
    coursesDetails: {},
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getCoursesData()
  }

  getCoursesData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
        description: data.course_details.description,
      }
      console.log(updatedData)

      this.setState({
        apiStatus: apiConstants.success,
        coursesDetails: updatedData,
      })
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
    const {coursesDetails} = this.state

    return (
      <div className="course-details-container">
        <img
          src={coursesDetails.imageUrl}
          alt={coursesDetails.name}
          className="course-details-img"
        />
        <div className="course-details">
          <h1 className="course-details-name"> {coursesDetails.name} </h1>
          <p className="course-details-description">
            {' '}
            {coursesDetails.description}
          </p>
        </div>
      </div>
    )
  }

  renderCoursesDetails = () => {
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
          <div className="responsive-container">
            {this.renderCoursesDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default CourseDetails
