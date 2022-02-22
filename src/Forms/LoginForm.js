import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Label } from "reactstrap";

function LoginForm({ login }) {
  const INITIAL_DATA = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formErrors, setFormErrors] = useState([]);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await login(formData);
    if (res.success) history.push("/companies");
    else setFormErrors(res.errors);
  }

  return (
    <div className="container m-5">
      <div className="container shadow p-3">
        <h3 className="text-center">Login</h3>
        <form onSubmit={handleSubmit} className="p-3">
          <div className="mb-3">
            <label for="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              type="password"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
