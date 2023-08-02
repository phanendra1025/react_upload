import { Component } from 'react'
import Cookies from 'js-cookie'
import { BsSearch } from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import JobCard from '../JobCard'

import './index.css'

const jobApistatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class AllJobs extends Component {
  state = {
    jobsData: [],
    jobsAPIStatus: jobApistatusConstants.initial,
  }

  componentDidMount() {
    this.getTheAllJobs()
  }

  getTheAllJobs = async () => {
    this.setState({ jobsAPIStatus: jobApistatusConstants.inProcess })

    const { employmentTypeList } = this.props
    const filtersByType =
      employmentTypeList.length === 0 ? '' : employmentTypeList.join(',')

    const url = `https://apis.ccbp.in/jobs?employment_type=${filtersByType}`

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
      const { jobs } = data
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
        jobsAPIStatus: jobApistatusConstants.success,
      })
    } else {
      this.setState({ jobsAPIStatus: jobApistatusConstants.failure })
    }
  }

  renderJobsSuccessView = () => {
    const { jobsData } = this.state
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
    const { jobsAPIStatus } = this.state
    switch (jobsAPIStatus) {
      case jobApistatusConstants.success:
        return this.renderJobsSuccessView()
      case jobApistatusConstants.failure:
        return this.renderJobsFailureView()
      case jobApistatusConstants.inProcess:
        return this.jobsLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="all-jobs">
        <div className="big-search-bar-container">
          <input
            type="search"
            placeholder="search"
            className="big-search-bar"
          />
          <button type="button" className="big-search-button">
            <BsSearch color="#f1f5f9" size="17" />
          </button>
        </div>
        {this.renderTheAllJobs()}
      </div>
    )
  }
}

export default AllJobs
