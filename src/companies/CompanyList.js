import { useState, useEffect } from "react";

import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import SearchForm from "../Forms/SearchForm";

function CompanyList() {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function fetchCompanies() {
      let comps = await JoblyApi.getCompanies();
      setCompanies(comps);
      setIsLoading(false);
    }
    fetchCompanies();
  }, []);

  async function searchCompanies(searchTerm) {
    const results = await JoblyApi.filterCompanies(searchTerm);
    setCompanies(results);
  }


  if (isLoading) {
    return <p>Loading...</p>;
  }


  return (
    <>
      <div>
        <SearchForm filter={searchCompanies} />
      </div>
      <div>
        {companies.length ? companies.map((company) => (
          <CompanyCard key={company.handle} comp={company} />
        )): <p>No Companies Found</p>}
      </div>
    </>
  );
}

export default CompanyList;
