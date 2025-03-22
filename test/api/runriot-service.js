import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const runriotService = {
  runriotUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.runriotUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.runriotUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.runriotUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.runriotUrl}/api/users`);
    return res.data;
  },

  async createTrail(trail) {
    const res = await axios.post(`${this.runriotUrl}/api/trails`, trail);
    return res.data;
  },

  async deleteAllTrails() {
    const response = await axios.delete(`${this.runriotUrl}/api/trails`);
    return response.data;
  },

  async deleteTrail(id) {
    const response = await axios.delete(`${this.runriotUrl}/api/trails/${id}`);
    return response;
  },

  async getAllTrails() {
    const res = await axios.get(`${this.runriotUrl}/api/trails`);
    return res.data;
  },

  async getTrail(id) {
    const res = await axios.get(`${this.runriotUrl}/api/trails/${id}`);
    return res.data;
  },

  async getAllResults() {
    const res = await axios.get(`${this.runriotUrl}/api/results`);
    return res.data;
  },


  async createResult(id, result) {
    const res = await axios.post(`${this.runriotUrl}/api/trails/${id}/results`, result);
    return res.data;
  },

  async deleteAllResults() {
    const res = await axios.delete(`${this.runriotUrl}/api/results`);
    return res.data;
  },

  async getResult(id) {
    const res = await axios.get(`${this.runriotUrl}/api/results/${id}`);
    return res.data;
  },

  async deleteResult(id) {
    const res = await axios.delete(`${this.runriotUrl}/api/results/${id}`);
    return res.data;
  },
};