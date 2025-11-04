import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

import Axios from "axios";
const axios = Axios.create({
  withCredentials: true,
});

const BASE_URL = "http://localhost:3030/api/bug/";

export const bugService = {
  query,
  getById,
  save,
  remove,
};

function query(filterBy = {}) {
  filterBy = { ...filterBy };
  return axios
    .get(BASE_URL)
    .then((res) => res.data)
    .then((bugs) => {
      if (!filterBy.title) filterBy.title = "";
      if (!filterBy.description) filterBy.description = "";
      if (!filterBy.maxSeverity) filterBy.maxSeverity = Infinity;
      if (!filterBy.minSeverity) filterBy.minSeverity = -Infinity;

      const titleRegExp = new RegExp(filterBy.title, "i");
      const descriptionRegExp = new RegExp(filterBy.description, "i");

      return bugs.filter(
        (bug) =>
          titleRegExp.test(bug.title || "") &&
          descriptionRegExp.test(bug.description || "") &&
          bug.severity <= filterBy.maxSeverity &&
          bug.severity >= filterBy.minSeverity
      );
    });
}
function getById(bugId) {
  return axios.get(BASE_URL + bugId).then((res) => res.data);
}
function remove(bugId) {
  return axios.get(BASE_URL + bugId + "/remove");
}
function save(bug) {
  return axios.get(BASE_URL + "save", { params: bug }).then((res) => res.data);
}
