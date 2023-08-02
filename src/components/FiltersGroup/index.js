import {Component} from 'react'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

let employmentFilteredList = []

class FiltersGroup extends Component {
  getTheEmploymentFilter = employmentFilter => {
    const {updateTheEmploymentFilter} = this.props
    const {label, employmentTypeId} = employmentFilter
    const checkBoxSelected = event => {
      if (event.target.checked) {
        employmentFilteredList.push(employmentTypeId)
        console.log(employmentFilteredList)
        updateTheEmploymentFilter(employmentFilteredList)
      } else {
        employmentFilteredList = employmentFilteredList.filter(
          eachItem => eachItem !== employmentTypeId,
        )
        console.log(employmentFilteredList)
        updateTheEmploymentFilter(employmentFilteredList)
      }
    }
    return (
      <li className="employment-filter-item" key={employmentTypeId}>
        <input
          className="check-boxes"
          type="checkbox"
          onChange={checkBoxSelected}
          id={employmentTypeId}
        />
        <label htmlFor={employmentTypeId} className="check-box-labels">
          {label}
        </label>
      </li>
    )
  }

  getTheEmploymentFilters = () => (
    <ul className="filters-list">
      {employmentTypesList.map(eachType =>
        this.getTheEmploymentFilter(eachType),
      )}
    </ul>
  )

  getTheSalaryRangeFilter = range => {
    const {updateTheSalaryFilter} = this.props
    const {salaryRangeId, label} = range
    const radioInputSelected = () => {
      updateTheSalaryFilter(salaryRangeId)
    }
    return (
      <li className="employment-filter-item" key={salaryRangeId}>
        <input
          className="check-boxes"
          type="radio"
          name="salary"
          onChange={radioInputSelected}
          id={salaryRangeId}
        />
        <label htmlFor={salaryRangeId} className="check-box-labels">
          {label}
        </label>
      </li>
    )
  }

  getTheSalaryRangeFilters = () => (
    <ul className="filters-list">
      {salaryRangesList.map(eachRange =>
        this.getTheSalaryRangeFilter(eachRange),
      )}
    </ul>
  )

  render() {
    return (
      <div className="filters-group-container">
        <div className="employment-type-filters-container">
          <h1 className="employment-types">Type of Employment</h1>
          {this.getTheEmploymentFilters()}
        </div>
        <hr className="hr-line" />
        <div className="salary-range-filers-container">
          <h1 className="employment-types">Salary Range</h1>
          {this.getTheSalaryRangeFilters()}
        </div>
      </div>
    )
  }
}

export default FiltersGroup
