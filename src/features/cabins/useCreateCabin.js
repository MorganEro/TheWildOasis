import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUpdateCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import React from 'react';

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: newCabin => {
      toast.success(
        React.createElement(
          'span',
          null,
          React.createElement('b', null, newCabin.name),
          ' was successfully created'
        )
      );

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: err => toast.error(err.message),
  });

  return { createCabin, isCreating };
}
