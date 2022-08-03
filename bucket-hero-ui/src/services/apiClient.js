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
            console.log("fetched data from", method, res.data);
            return {data: res.data, error: null}
        } catch (error) {
            console.error({errorResponse: error.response});
            const message = error?.response?.data?.error?.message;
            return {data: null, error: message || String(error)}
        }
    }
//


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

    async fetchLists() {
        return await this.request({endpoint: `list/lists`, method: "GET"});
    }

    async newList(form) {
        return await this.request({endpoint: `list/new`, method: "POST", data: form});
    }

    //fetch list items for a list id `user/items/${listId}`
    async fetchItemsById(id) {
        return await this.request({endpoint: `list/items/${id}`, method: "GET"});
    }

    async fetchCompletedItems() {
        return await this.request({endpoint: `list/items/completed`, method: "GET"});
    }

    //fetch list items for a list id `user/items/duedate`
    async fetchComingUpItems() {
        return await this.request({endpoint: `list/items/due_date`, method: "GET"});
    }

    async fetchAllUserListItems(userId) {
        return await this.request({endpoint: `list/items/${userId}/all`, method: "GET"});
    }

    async fetchGallery() {
        return await this.request({endpoint: `global/`, method: "GET"});
    }

    async newItem(form) {
        console.log("in api client")
        return await this.request({endpoint: `list/${form.list_id}/newItem`, method: 'POST', data: form})
    }

    async editItem(form) {
        return await this.request({endpoint: `list/${form.list_id}/item/${form.item_id}/edit`, method: 'PUT', data: form})
    } 
    
    async editList(form) {
        return await this.request({endpoint: `list/${form.list_id}/edit`, method: 'PUT', data: form})
    }  

    async editProfile(form) {
        return await this.request({endpoint: `profile/edit`, method: 'PUT', data: form})
    }

    async editPassword(form) {
        return await this.request({endpoint: `profile/edit/password`, method: 'PUT', data: form})
    }
    
    async deleteList(listId) {
        return await this.request({endpoint: `list/${listId}/delete`, method: 'DELETE'})
    } 

    async deleteItem(listId, itemId) {
        return await this.request({endpoint: `list/${listId}/item/${itemId}/delete`, method: 'DELETE'})
    } 

    async addProfilePicture(imageString) {
        return await this.request({endpoint: `profile`, method: 'PUT', data: imageString})
    } 

    async getViewerInfo(userId) {
        return await this.request({endpoint: `global/user/${userId}`, method: 'GET'})
    } 

}

export default new ApiClient(API_BASE_URL)