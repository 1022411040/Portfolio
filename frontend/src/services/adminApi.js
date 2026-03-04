import ApiClient from "../Common/ApiClient";
import SummaryApi from "../Common/SummaryApi";

export const fetchProjects = () =>
  ApiClient({ ...SummaryApi.getProjects });

export const createProject = (data) =>
  ApiClient({ ...SummaryApi.createProject, data });

export const updateProject = (id, data) =>
  ApiClient({ ...SummaryApi.updateProject(id), data });

export const deleteProject = (id) =>
  ApiClient({ ...SummaryApi.deleteProject(id) });
