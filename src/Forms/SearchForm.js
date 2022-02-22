import { useState } from "react";
import { Input, Button, Form } from "reactstrap";

function SearchForm({ filter }) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    filter(search);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="input-group m-3">
        <input
          value={search}
          onChange={handleChange}
          className="form-control"
        ></input>
        <div class="input-group-append">
          <button class="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
