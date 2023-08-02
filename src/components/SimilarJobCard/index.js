import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobCard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = details

  const renderTheLocationContainer = () => (
    <div className="similar-job-location-container">
      <MdLocationOn size="26" color="#f8fafc" />
      <p className="similar-job-location">{location}</p>
    </div>
  )

  const renderTheEmploymentTypeContainer = () => (
    <div className="similar-job-location-container">
      <BsBriefcaseFill size="26" color="#f8fafc" />
      <p className="similar-job-employment-type">{employmentType}</p>
    </div>
  )

  return (
    <Link to={`/jobs/${id}`} className="similar-job-card-link-item">
      <li className="similar-job-card">
        <div className="similar-job-card-top-section">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similar-job-compony-logo"
          />
          <div className="similar-job-title-container">
            <h1 className="similar-job-title">{title}</h1>
            <div className="similar-job-rating-container">
              <AiFillStar color="#fbbf24" size="20" />
              <p className="similar-job-rating">{rating}</p>
            </div>
          </div>
        </div>

        <div>
          <h1 className="similar-job-description-heading">Description</h1>
          <p className="similar-job-description">{jobDescription}</p>
        </div>
        <div className="similar-job-details-container">
          <div className="similar-job-location-and-employment-container">
            {renderTheLocationContainer()}
            {renderTheEmploymentTypeContainer()}
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobCard
