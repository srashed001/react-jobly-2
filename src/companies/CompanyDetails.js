
import JobCard from "../jobs/JobCard";

function CompanyDetails({company}) {
  
  return (
      <div>
        <div className="container text-center">
          <h2>{company.name}</h2>
          <p>{company.description}</p>
        </div>
        <div className="container">
          {company.jobs.map(job => <JobCard key={job.id} job={job} />)}
        </div>          
      </div>

  )
}

export default CompanyDetails
