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
      /** google authentication. */
      static async oAuth(user) {
        let res = await this.request("auth/oauth",user, "POST");
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
  /** delete a user. */

  static async deleteUser(id) {
    let res = await this.request(`users/${id}`,{},"DELETE");
  return res.deleted;
  }



  /** Get categories by userId. */

  static async getCategories(userId) {
    let res = await this.request(`categories/users/${userId}`);
    return res.categories;
  }

    /** Add a category. */

    static async addCategory(data) {
      let res = await this.request(`categories`,data,"POST");
      return res.category;
    }
   /** Update a category. */

  static async updateCategory(id, data) {
    let res = await this.request(`categories/${id}`,data,"PATCH");
    return res.category;
  }

    /** delete a category. */

    static async deleteCategory(id) {
      let res = await this.request(`categories/${id}`,{},"DELETE");
    return res.deleted;
    }

  /** Get categories by userId. */

  static async getTransactions(userId) {
    let res = await this.request(`transactions/users/${userId}`);
    return res.transactions;
  }

    /** Add a category. */

  static async addTransaction(data) {
    let res = await this.request(`transactions`,data,"POST");
    return res.transaction;
  }

     /** Update a category. */

   static async updateTransaction(id, data) {
      let res = await this.request(`transactions/${id}`,data,"PATCH");
      return res.transaction;
    }
  

  static async deleteTransaction(id) {
    let res = await this.request(`transactions/${id}`,{},"DELETE");
  return res.deleted;
  }

  static async getDashboard(userId) {
    let res = await this.request(`users/${userId}/dashboard`);
    return res.dashboard;
  }

}


export default Api;