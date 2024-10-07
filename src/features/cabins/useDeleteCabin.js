//not in hooks folder because it is not reusable in any component. it will be only for the CabinRow component
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: deletedCabin => {
      toast.success(`Cabin ${deletedCabin.name}successfully deleted`);
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },

    onError: error => {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteCabin };
}
// This hook is used in the CabinRow component to delete a cabin. It uses the useMutation hook from react-query to create a mutation function that calls the deleteCabin function from the apiCabins service(as deleteCabinApi). The onSuccess callback invalidates the 'cabins' query key in the queryClient instance, which triggers a refetch of the 'cabins' query. The hook returns the isDeleting flag and the deleteCabin mutation function to be used in the component.
