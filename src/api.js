import axios from "axios";
import jwtDecode from "jwt-decode";


const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://expense-tracker-backend-jnmy.onrender.com";


/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class Api {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${Api.token}` };
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

/** user authentication. */
    static async login(user) {
      let res = await this.request("auth/token",user, "POST");
     return res.token;
    }
    /** register a user. */
    static async register(user) {
      let res = await this.request("auth/register",user, "POST");
     return res.token;
    }
    
    static decodeToken(token) {
      let user = jwtDecode(token);
     return user;
    }

  /** Get a user. */

    static async getUser(id) {
        let res = await this.request(`users/${id}`);
      return res.user;
    }

    /** Update user. */

    static async updateUser(id, data) {
        let res = await this.request(`users/${id}`,data,"PATCH");
      return res.user;
    }




  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }
  /** Get all companies. */

  static async getCompanies(name) {
    const path = name !=="" ?`companies?name=${name}`:"companies";
    let res = await this.request(path);
    return res.companies;
  }
   /** Get all jobs. */

   static async getJobs(title) {
    const path = title !=="" ?`jobs?title=${title}`:"jobs";
    let res = await this.request(path);
    return res.jobs;
  }
     /** Apply for a job. */

     static async applyToJob(username, jobId) {
      const path = `users/${username}/jobs/${jobId}`;
      let res = await this.request(path,{},"POST");
      return res.applied;
    }

   


  // obviously, you'll add a lot here ...
}


export default Api;