import { useContext } from "react";
import UserContext from "../Context/UserContext";
import "./JobCard.css"

function JobCard({ job }) {
  const { appIds, apply, unApply } = useContext(UserContext);

  async function handleApply(e) {
    await apply(e.target.id);
  }
  async function handleUnApply(e) {
    await unApply(e.target.id);
  }

  return (
    <div className="container">
      <div className="card m-3 shadow-sm mx-auto">
        <div className="card-header">
          <h5>{job.title}</h5>
        </div>
        <div className="card-body">
          {job.companyName ? (
            <h5 className="card-title">{job.companyName}</h5>
          ) : (
            ""
          )}
          {job.salary ? (
            <p className="card-subtitle text-muted my-3">
              Salary: {job.salary}
            </p>
          ) : (
            ""
          )}
          {job.equity ? (
            <p className="card-subtitle text-muted my-3">
              Equity: {job.equity}
            </p>
          ) : (
            ""
          )}
          <div className="text-end">
                 {appIds.find((id) => id === job.id) ? (
            <button
              className="btn btn-danger"
              id={job.id}
              onClick={handleUnApply}
            >
              Remove Application
            </button>
          ) : (
            <button
              className="btn btn-primary"
              id={job.id}
              onClick={handleApply}
            >
              Apply
            </button>
          )}
          </div>
     
        </div>
      </div>
    </div>
  );
}

export default JobCard;
