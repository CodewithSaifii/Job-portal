import React, { useEffect, useState } from "react";
import API from "../services/api";
import CompanyCard from "../components/company/CompanyForm";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    API.get("/companies")
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Companies</h2>
      {companies.map((c) => (
        <CompanyCard key={c._id} company={c} />
      ))}
    </div>
  );
};

export default Companies;
