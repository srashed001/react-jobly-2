import { NavLink } from "react-router-dom";
import "../jobs/JobCard.css"

function CompanyCard({ comp }) {
 
  return (
    <div className="container">
      <NavLink to={`/companies/${comp.handle}`} className="text-decoration-none">
        <div className="card m-3 shadow-sm mx-auto">
          <div className="card-body">
            <div className="card-title row">
              <div className="col">
                <h5>{comp.name}</h5>
              </div>
              <div className="col text-end">
                {comp.logoUrl ? <img src={comp.logoUrl} /> : ""}
              </div>
            </div>
            <p className="card-text">{comp.description}</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default CompanyCard;
