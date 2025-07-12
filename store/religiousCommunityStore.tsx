import { IReligiousCommunity } from "@/@types/religiousCommunity.type";
import religiousCommunitiesService from "@/service/religiousCommunities.service";
import { create } from "zustand";

type CountReligiousCommunities = {
  approved: number;
  pending: number;
  rejected: number;
};

type State = {
  currentCommunityId: string | null;
  currentCommunity?: IReligiousCommunity[] | undefined;
  isLoading: boolean;
  listByUserId: any[];
  error: string | undefined;
};

type Actions = {
  fetchCountByUserId: () => Promise<CountReligiousCommunities | null>;
  fetchListFromUserId: () => Promise<void>;
  fecthCommunity: (id: string | string[]) => Promise<IReligiousCommunity | undefined>;
  setCurrentCommunity(currentCommunity: IReligiousCommunity[]): void;
};

export const useReligiousCommunityStore = create<State & Actions>(
  (set, get) => ({
    currentCommunityId: null,
    currentCommunity: undefined,
    isLoading: false,
    listByUserId: [],
    error: undefined,

    fetchCountByUserId: async () => {
      set({ isLoading: true, error: undefined });
      try {
        const response = await religiousCommunitiesService.countByUserId();

        if (response.status) {
          set({ isLoading: false });
          return response.data as CountReligiousCommunities;
        } else {
          set({ isLoading: false, error: "Falha ao obter dados de contagem." });
          return null;
        }
      } catch (error: any) {
        console.error("Erro ao obter totais com base no id do usuário:", error);
        set({ isLoading: false, error: error.message || "Erro desconhecido." });
        return null;
      }
    },

    fetchListFromUserId: async () => {
      set({ isLoading: true, error: undefined });
      try {
        const response = await religiousCommunitiesService.getListFromUserId();

        if (response.status) {
          set({ isLoading: false, listByUserId: response.data });
        }
      } catch (error: any) {
        console.error(
          "Erro ao obter registros com base no id do usuário:",
          error
        );
        set({ isLoading: false, error: error.message || "Erro desconhecido." });
      }
    },

    fecthCommunity: async (id) => {
      set({ isLoading: true, error: undefined });
      try {
        if (!id) return [];
        const response = await religiousCommunitiesService.getCommunityById(id);

        if (response.status) {
          set({ isLoading: false, currentCommunity: response.data });
          return response.data[0];
        }

        set({ isLoading: false, error: "Comunidade não encontrada" });
        return [];
      } catch (error) {
        console.error("Erro ao obter comunidade:", error);
        set({ isLoading: false, error: "Erro ao obter comunidade" });
        return [];
      }
    },

    setCurrentCommunity(currentCommunity) {
      set({ currentCommunity });
    },
  })
);
