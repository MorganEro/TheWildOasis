import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: userData => {
      const userName = userData.user.user_metadata.fullName;
      toast.success(`${userName} account information successfully updated`);

      queryClient.setQueryData(['user'], userData.user);
    },
    onError: err => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
