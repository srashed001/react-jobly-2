import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get list of all companies */

  static async getCompanies() {
    let res = await this.request(`companies`);
    return res.companies;
  }

  /** fitler from all companies */

  static async filterCompanies(filter) {
    let res = await this.request(`companies?name=${filter}`);
    return res.companies;
  }
  /** fitler from all companies */

  static async filterJobs(filter) {
    let res = await this.request(`jobs?title=${filter}`);
    return res.jobs;
  }

  /** Get details on a job by id */

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Get list of all jobs */

  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs;
  }

  /** Get details on a user by username */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** edit user details */

  static async editUser(username, data) {
    let res = await this.request(`users/${username}`, data, 'patch');
    return res.user;
  }

  /** verify token */

  static async verifyToken(token) {
    let res = await this.request(`auth/verifyToken`, token, 'post');
    return res
  }
  /** when user logs in, returns JWT token which can be used to authenticate further requests  */

  static async login(userInfo) {
    let res = await this.request(`auth/token`, userInfo, 'post');
    return res.token
  }
  /** when new user signs up, returns JWT token which can be used to authenticate further requests  */

  static async signup(newUserInfo) {
    let res = await this.request(`auth/register`, newUserInfo, 'post');
    return res.token
  }
  /** user applies for job  */

  static async apply(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {} ,'post');
    return res.applied
  }
  /** user un-applies for job  */

  static async unApply(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {} ,'delete');
    return res.deleted
  }



  
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

    export default JoblyApi