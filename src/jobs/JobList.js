import { useState, useEffect } from "react";

import JoblyApi from "../api/api";
import JobCard from "./JobCard";
import SearchForm from "../Forms/SearchForm";

function JobList() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      let jobs = await JoblyApi.getJobs();
      setJobs(jobs);
      setIsLoading(false);
    }
    fetchJobs();
  }, []);

  async function searchJobs(searchTerm) {
    const results = await JoblyApi.filterJobs(searchTerm);
    setJobs(results);
  }


  if (isLoading) {
    return <p>Loading...</p>;
  }


  return (
    <div className="container">
      <div className="container">
        <SearchForm filter={searchJobs} />
      </div>
      <div className="container">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div >
  );
}

export default JobList;
