import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //FILTER
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };
  // {field: totalPrice", value: 5000, method: "gte"}

  //SORT
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  // const sortBy = { field, direction, referencedTable: referencedTable || null };
  const sortBy = {
    field,
    direction,
  };

  //PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  //QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {}, // using the {}is a way to set a default value for bookings and count in case the data object is undefined at initialization time
    error,
  } = useQuery({
    //queryKey can be seen as the dependency array of useQuery. initially it was just looking for data that matched bookings but by add the filter variable to the queryKey, it will now also look for data that matches the filter variable
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () =>
      getBookings({
        filter,
        sortBy,
        page,
      }),
  });

  //PRE-FETCHING
  //useQuery will automatically pre-fetch data for the next page when the user is on the last page
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          page: page + 1,
        }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          page: page - 1,
        }),
    });
  }

  return {
    isLoading,
    bookings,
    error,
    count,
    pageCount,
  };
};
