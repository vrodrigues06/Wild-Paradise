import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const {
    isLoading: isUpdating,
    mutate: updateSettings,
    error,
  } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Settings was successfuly updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: () =>
      toast.error(
        "An error occurred while updating the settings. Please try again."
      ),
  });

  return {
    isUpdating,
    updateSettings,
    error,
  };
}
