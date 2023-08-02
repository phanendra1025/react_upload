import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  const renderTheLocationContainer = () => (
    <div className="location-container">
      <MdLocationOn size="26" color="#f8fafc" />
      <p className="location">{location}</p>
    </div>
  )

  const renderTheEmploymentTypeContainer = () => (
    <div className="location-container">
      <BsBriefcaseFill size="26" color="#f8fafc" />
      <p className="employment-type">{employmentType}</p>
    </div>
  )

  return (
    <Link to={`/jobs/${id}`} className="job-card-link-item">
      <li className="job-card">
        <div className="card-top-section">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="compony-logo"
          />
          <div className="job-title-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar color="#fbbf24" size="20" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details-container">
          <div className="location-and-employment-container">
            {renderTheLocationContainer()}
            {renderTheEmploymentTypeContainer()}
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="card-hr-line" />
        <div>
          <h1 className="job-description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
