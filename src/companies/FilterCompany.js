import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CompanyDetails from "./CompanyDetails";
import JobCard from "../jobs/JobCard";
import JoblyApi from "../api/api";

function FilterCompany() {
  const { handle } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(true);
  const [company, setCompany] = useState([]);

  useEffect(() => {
    async function findCompany() {
      try {
        const res = await JoblyApi.getCompany(handle);
        setCompany(res);
        setIsLoading(false);
        setNotFound(false)
      } catch (e) {
        setIsLoading(false);
      }
    }
    findCompany();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  if (notFound) {
    return <p>Company Not Found</p>;
  }

  return (
      <CompanyDetails company={company} />
  );
}

export default FilterCompany;
