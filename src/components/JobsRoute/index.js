import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
// import AllJobs from '../AllJobs'
import JobCard from '../JobCard'
import './index.css'

const profileAPIStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

const jobApistatusConstants = {
  JobInitial: 'JOB_INITIAL',
  JobSuccess: 'JOB_SUCCESS',
  JobFailure: 'JOB_FAILURE',
  JobInProcess: 'JOB_IN_PROCESS',
}

class JobsRoute extends Component {
  state = {
    profileDetailsApiStatus: profileAPIStatusConstants.initial,
    profileDetails: {},
    jobsData: [],
    jobsAPIStatus: jobApistatusConstants.initial,
    employmentTypeList: [],
    minimumPackage: '',
    searchQuery: '',
  }

  componentDidMount() {
    this.getTheProfileDetails()
    this.getTheAllJobs()
  }

  getTheProfileDetails = async () => {
    this.setState({
      profileDetailsApiStatus: profileAPIStatusConstants.inProcess,
    })
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      console.log(updatedData)
      this.setState({
        profileDetails: updatedData,
        profileDetailsApiStatus: profileAPIStatusConstants.success,
      })
    } else {
      this.setState({
        profileDetailsApiStatus: profileAPIStatusConstants.failure,
      })
    }
  }

  getTheSuccessProfileContainer = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-details-container">
        <div>
          <img src={profileImageUrl} alt="profile" />
          <h1 className="user-name">{name}</h1>
          <p className="short-bio">{shortBio}</p>
        </div>
      </div>
    )
  }

  getTheFailureProfileContainer = () => (
    <div>
      <button
        type="button"
        className="retry-button"
        onClick={this.getTheProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  getTheProfileLoadingContainer = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getTheProfileContainer = () => {
    const {profileDetailsApiStatus} = this.state
    switch (profileDetailsApiStatus) {
      case profileAPIStatusConstants.success:
        return this.getTheSuccessProfileContainer()
      case profileAPIStatusConstants.failure:
        return this.getTheFailureProfileContainer()
      case profileAPIStatusConstants.inProcess:
        return this.getTheProfileLoadingContainer()
      default:
        return null
    }
  }

  updateTheEmploymentFilter = filteredList => {
    this.setState(
      {
        employmentTypeList: filteredList,
      },
      this.getTheAllJobs,
    )
  }

  updateTheSalaryFilter = id => {
    console.log(id)
    this.setState({minimumPackage: id}, this.getTheAllJobs)
  }

  getTheAllJobs = async () => {
    this.setState({jobsAPIStatus: jobApistatusConstants.JobInProcess})
    const {employmentTypeList, minimumPackage, searchQuery} = this.state
    const filters =
      employmentTypeList.length === 0 ? '' : employmentTypeList.join(',')

    const url = `https://apis.ccbp.in/jobs?employment_type=${filters}&minimum_package=${minimumPackage}&search=${searchQuery}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data
      const updatedJobData = jobs.map(eachJobDetails => ({
        companyLogoUrl: eachJobDetails.company_logo_url,
        employmentType: eachJobDetails.employment_type,
        id: eachJobDetails.id,
        jobDescription: eachJobDetails.job_description,
        location: eachJobDetails.location,
        packagePerAnnum: eachJobDetails.package_per_annum,
        rating: eachJobDetails.rating,
        title: eachJobDetails.title,
      }))
      this.setState({
        jobsData: updatedJobData,
        jobsAPIStatus: jobApistatusConstants.JobSuccess,
      })
    } else {
      this.setState({jobsAPIStatus: jobApistatusConstants.JobFailure})
    }
  }

  renderJobsSuccessView = () => {
    const {jobsData} = this.state
    if (jobsData.length === 0) {
      return (
        <div className="no-jobs-found-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-image"
          />
          <h1 className="no-jobs-found-heading">No Jobs Found</h1>
          <p className="no-jobs-error-msg">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <div>
        <ul className="jobs-container">
          {jobsData.map(eachJob => (
            <JobCard jobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobsFailureView = () => (
    <div className="jobs-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="jobs-failure-view-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-error-msg">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        onClick={this.getTheAllJobs}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  jobsLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderTheAllJobs = () => {
    const {jobsAPIStatus} = this.state
    switch (jobsAPIStatus) {
      case jobApistatusConstants.JobSuccess:
        return this.renderJobsSuccessView()
      case jobApistatusConstants.JobFailure:
        return this.renderJobsFailureView()
      case jobApistatusConstants.JobInProcess:
        return this.jobsLoadingView()
      default:
        return null
    }
  }

  searchJobsByQuery = () => {
    this.getTheAllJobs()
  }

  searchOnChange = event => {
    this.setState({searchQuery: event.target.value})
  }

  render() {
    const {searchQuery} = this.state
    return (
      <>
        <Header />
        <div className="jobs-route-container">
          <div className="profile-and-filters-container">
            <div className="search-bar-container">
              <input
                type="search"
                className="jobs-route-search-bar"
                placeholder="Search"
                value={searchQuery}
                onChange={this.searchOnChange}
              />
              <button
                type="button"
                className="search-icon-button"
                data-testid="searchButton"
                onClick={this.searchJobsByQuery}
              >
                <BsSearch color="#cbd5e1" />
              </button>
            </div>
            <div className="profile-container">
              {this.getTheProfileContainer()}
            </div>
            <hr className="hr-line" />
            <FiltersGroup
              updateTheEmploymentFilter={this.updateTheEmploymentFilter}
              updateTheSalaryFilter={this.updateTheSalaryFilter}
            />
          </div>
          <div className="all-jobs-container">
            <div className="big-search-bar-container">
              <input
                type="search"
                placeholder="search"
                className="big-search-bar"
                value={searchQuery}
                onChange={this.searchOnChange}
              />
              <button
                type="button"
                onClick={this.searchJobsByQuery}
                className="big-search-button"
              >
                <BsSearch color="#f1f5f9" size="17" />
              </button>
            </div>
            <div className="all-jobs">{this.renderTheAllJobs()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute
