import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: 'all', label: 'All' },
          { value: 'checked-out', label: 'Checked out' },
          { value: 'checked-in', label: 'Checked in' },
          { value: 'unconfirmed', label: 'Unconfirmed' },
        ]}
      />

      <SortBy
        options={[
          { value: 'id-asc', label: 'Sort by booking # (low → high)' },
          { value: 'id-desc', label: 'Sort by booking # (high → low)' },

          { value: 'cabins(name)-asc', label: 'Sort by cabin name (A → Z)' },
          {
            value: 'cabins(name)-desc',
            label: 'Sort by cabin name(Z → A)',
          },

          { value: 'startDate-asc', label: 'Sort by date (oldest first)' },
          {
            value: 'startDate-desc',
            label: 'Sort by date (newest first)',
          },
          { value: 'totalPrice-asc', label: 'Sort by amount (lowest first)' },
          {
            value: 'totalPrice-desc',
            label: 'Sort by amount (highest first)',
          },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
