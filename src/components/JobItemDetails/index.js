import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {HiOutlineExternalLink} from 'react-icons/hi'
import SimilarJobCard from '../SimilarJobCard'
import Header from '../Header'
import './index.css'

const jobItemApiStatusConstants = {
  initial: 'JOB_ITEM_INITIAL',
  success: 'JOB_ITEM_SUCCESS',
  failure: 'JOB_ITEM_FAILURE',
  inProcess: 'JOB_ITEM_IN_PROCESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: jobItemApiStatusConstants.initial,
    jobItemDetails: {},
    similarJobItemDetails: [],
  }

  componentDidMount() {
    this.getTheJobItemAndSimilarJobs()
  }

  getTheJobItemAndSimilarJobs = async () => {
    this.setState({apiStatus: jobItemApiStatusConstants.inProcess})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        jobDetails: data.job_details,
        similarJobs: data.similar_jobs,
      }
      const {jobDetails, similarJobs} = updatedData
      console.log(updatedData)
      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: jobDetails.title,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
      }
      const updatedSimilarJobs = similarJobs.map(eachJobDetails => ({
        companyLogoUrl: eachJobDetails.company_logo_url,
        employmentType: eachJobDetails.employment_type,
        id: eachJobDetails.id,
        jobDescription: eachJobDetails.job_description,
        location: eachJobDetails.location,
        rating: eachJobDetails.rating,
        title: eachJobDetails.title,
      }))
      this.setState({
        jobItemDetails: updatedJobDetails,
        similarJobItemDetails: updatedSimilarJobs,
        apiStatus: jobItemApiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: jobItemApiStatusConstants.failure})
    }
  }

  renderTheLocationContainer = location => (
    <div className="job-item-location-container">
      <MdLocationOn size="26" color="#f8fafc" />
      <p className="job-item-location">{location}</p>
    </div>
  )

  renderTheEmploymentTypeContainer = employmentType => (
    <div className="job-item-location-container">
      <BsBriefcaseFill size="26" color="#f8fafc" />
      <p className="job-item-employment-type">{employmentType}</p>
    </div>
  )

  getTheSkillsContainer = skills => (
    <div className="skills-container">
      <h1 className="skills-heading">Skills</h1>
      <ul className="skills-list-container">
        {skills.map(eachSkill => (
          <li key={eachSkill.name}>
            <div className="skill-item">
              <img
                src={eachSkill.imageUrl}
                alt={eachSkill.name}
                className="skill-image"
              />
              <p className="skill-name">{eachSkill.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )

  getTheLifeAtCompany = lifeAtCompany => {
    const {description, imageUrl} = lifeAtCompany
    return (
      <div>
        <h1 className="life-at-company-heading">Life At Company</h1>
        <div className="life-at-company-description-container">
          <p className="life-at-company-description">{description}</p>
          <img src={imageUrl} alt="life at company" className="company-image" />
        </div>
      </div>
    )
  }

  renderJobItemSuccessView = () => {
    const {jobItemDetails, similarJobItemDetails} = this.state
    console.log(similarJobItemDetails)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobItemDetails
    console.log(skills)
    return (
      <>
        <div className="job-item-details-card">
          <div className="job-item-card-top-section">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-item-compony-logo"
            />
            <div className="job-item-title-container">
              <h1 className="job-item-title">{title}</h1>
              <div className="job-item-rating-container">
                <AiFillStar color="#fbbf24" size="20" />
                <p className="job-item-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-item-details">
            <div className="job-item-location-and-employment-container">
              {this.renderTheLocationContainer(location)}
              {this.renderTheEmploymentTypeContainer(employmentType)}
            </div>
            <p className="job-item-package">{packagePerAnnum}</p>
          </div>
          <hr className="job-item-card-hr-line" />
          <div>
            <div className="visit-container">
              <h1 className="job-item-description-heading">Description</h1>
              <a
                className="visit-item"
                target="_blank"
                rel="noreferrer"
                href={companyWebsiteUrl}
              >
                <p className="visit-text">Visit</p>
                <HiOutlineExternalLink color="#6366f1" size="18" />
              </a>
            </div>

            <p className="job-item-description">{jobDescription}</p>
            {this.getTheSkillsContainer(skills)}
            {this.getTheLifeAtCompany(lifeAtCompany)}
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list-container">
            {similarJobItemDetails.map(eachSimilarJob => (
              <SimilarJobCard
                details={eachSimilarJob}
                key={eachSimilarJob.id}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderJobItemFailureView = () => (
    <div className="jobs-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="jobs-failure-view-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-error-msg">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        onClick={this.getTheJobItemAndSimilarJobs}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderJobItemLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderTheAllViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case jobItemApiStatusConstants.success:
        return this.renderJobItemSuccessView()
      case jobItemApiStatusConstants.failure:
        return this.renderJobItemFailureView()
      case jobItemApiStatusConstants.inProcess:
        return this.renderJobItemLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">
          {this.renderTheAllViews()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
