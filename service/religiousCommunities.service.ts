import ApiConfig from "@/config/api.config";
import mime from "mime";

const religiousCommunitiesURL = "religious-communities";

const religiousCommunitiesService = {
  getCommunityById: async (id: string | string[]) => {
    const response = await ApiConfig.get(`${religiousCommunitiesURL}/${id}`);
    return response.data;
  },
  countByUserId: async () => {
    const response = await ApiConfig.get(
      `${religiousCommunitiesURL}/count-religious-communities-by-user-id`
    );
    return response.data;
  },

  getListFromUserId: async () => {
    const response = await ApiConfig.get(
      `${religiousCommunitiesURL}/religious-communities-by-user-id`
    );
    return response.data;
  },

  createReligiousCommunity: async (payload: any) => {
    const response = await ApiConfig.post(
      `${religiousCommunitiesURL}/create-religious-community`,
      payload
    );
    return response.data;
  },

  updateReligiousCommunity: async (id: string, payload: any) => {
    const response = await ApiConfig.put(
      `${religiousCommunitiesURL}/update-religious-community/${id}`,
      payload
    );
    return response.data;
  },

  uploadMainPicture: async (id: string, file: any) => {
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: file.name,
      type: mime.getType(file.uri) || "image/jpeg",
    } as any);

    const response = await ApiConfig.post(
      `${religiousCommunitiesURL}/upload-main-picture/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
};

export default religiousCommunitiesService;
