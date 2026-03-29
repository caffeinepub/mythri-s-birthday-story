import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Wish } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllWishes() {
  const { actor, isFetching } = useActor();
  return useQuery<Wish[]>({
    queryKey: ["wishes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllWishes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddWish() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      message,
    }: { name: string; message: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addWish(name, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishes"] });
    },
  });
}
