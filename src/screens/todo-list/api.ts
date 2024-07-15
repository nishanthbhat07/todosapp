import api, { API_ENDPOINTS } from "../../apis";

export const fetchAllSpaceIds = async () => api.get(API_ENDPOINTS.spaceIds);
