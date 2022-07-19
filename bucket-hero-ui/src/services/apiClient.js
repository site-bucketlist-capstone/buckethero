import axios from 'axios';
import API_BASE_URL from "../../constants";

class ApiClient { 
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl;
        this.token = null;
        this.tokenName = "buckethero-token";
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem(this.tokenName, token);
    }

    async request({endpoint, method = "GET", data = {}}) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-Type" : "application/json"
        }

        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }

        try {
            const res = await axios({url, method, data, headers});
            console.log("fetched data", res.data);
            return {data: res.data, error: null}
        } catch (error) {
            console.error({errorResponse: error.response});
            const message = error?.response?.data?.error?.message;
            return {data: null, error: message || String(error)}
        }
    }



    async loginUser(credentials) {
        return await this.request({endpoint: `auth/login`, method: "POST", data: credentials});
    }

    async signupUser(credentials) {
        return await this.request({endpoint: `auth/register`, method: "POST", data: credentials});
    }

    async fetchUserFromToken() {
        return await this.request({endpoint: `auth/me`, method: "GET"});
    }

    async logoutUser() {
        this.setToken(null)
        localStorage.setItem(this.tokenName, "")
    }
}

export default new ApiClient(API_BASE_URL)