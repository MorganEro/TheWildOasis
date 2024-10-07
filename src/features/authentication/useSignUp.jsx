import { useMutation } from '@tanstack/react-query';

import { signUp as signUpApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: user => {
      const fullName = user.user.user_metadata.fullName;
      toast.success(
        <p>
          <b>{fullName}</b>&#39;s account has been successfully created! <br />
          Please verify the new account from the user&#39;s email address
        </p>,
        {
          duration: 8000,
        }
      );
    },
    onError: error => {
      console.error('ERROR', error);
      toast.error('Provided email or password is incorrect');
    },
  });

  return {
    signUp,
    isLoading,
  };
}
