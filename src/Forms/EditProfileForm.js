import { useContext, useState } from "react";
import UserContext from "../Context/UserContext";
import JoblyApi from "../api/api";
import {
  Form,
  Label,
  Input,
  FormGroup,
  Button,
  FormFeedback,
} from "reactstrap";

function EditProfileForm() {
  const { currUser, setCurrUser } = useContext(UserContext);
  const INITIAL_DATA = {
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
  };
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [password, setPassword] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await JoblyApi.login({ username: currUser.username, password: password });
      const res = await JoblyApi.editUser(currUser.username, formData);
      setCurrUser(res);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="container m-5">
      <div className="container shadow p-3">
        <h3 className="text-center">Edit Profile</h3>
        <form onSubmit={handleSubmit} className="p-3">
          <div className="mb-3">
            <label for="username" className="form-label">
              Username
            </label>
            <input
              readOnly
              value={currUser.username}
              id="username"
              name="username"
              className="form-control-plaintext"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label for="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              id="firstName"
              name="firstName"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label for="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              id="lastName"
              name="lastName"
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              id="email"
              name="email"
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">
              Confirm Password to make changes:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              required
              className="form-control"
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileForm;
