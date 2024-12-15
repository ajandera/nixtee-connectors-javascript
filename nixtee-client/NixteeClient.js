const axios = require("axios");

class NixteeClient {
  constructor(apiUrl = "https://api.nixtee.com") {
    this.apiUrl = apiUrl;
    this.token = null;
  }

  // Authorize function to get JWT token
  async authorize(email, password) {
    const url = `${this.apiUrl}/auth/login`;
    try {
      const response = await axios.post(url, { email, password });
      this.token = response.data.token;
      if (!this.token) {
        throw new Error("Authorization token not found in response.");
      }
      return this.token;
    } catch (error) {
      throw new Error(`Authorization failed: ${error.response?.data?.message || error.message}`);
    }
  }

  // Train function
  async train(modelData) {
    return this._authorizedRequest("POST", "/train", modelData);
  }

  // Save function
  async save(modelId, data) {
    return this._authorizedRequest("POST", `/models/${modelId}/save`, data);
  }

  // Load function
  async load(modelId) {
    return this._authorizedRequest("GET", `/models/${modelId}/load`);
  }

  // Predict function
  async predict(modelId, inputData) {
    return this._authorizedRequest("POST", `/models/${modelId}/predict`, inputData);
  }

  // Classify function
  async classify(modelId, inputData) {
    return this._authorizedRequest("POST", `/models/${modelId}/classify`, inputData);
  }

  // Helper function for making authorized requests
  async _authorizedRequest(method, endpoint, data = null) {
    if (!this.token) {
      throw new Error("Authorization token is missing. Please login first.");
    }

    const url = `${this.apiUrl}${endpoint}`;
    const headers = {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios({
        method,
        url,
        headers,
        data,
      });
      return response.data;
    } catch (error) {
      throw new Error(`API request failed: ${error.response?.data?.message || error.message}`);
    }
  }
}

module.exports = NixteeClient;
