import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function CabinTableOperations() {
  const filterOptions = [
    {
      value: 'all',
      label: 'All',
    },
    {
      value: 'discounted',
      label: 'Discounted',
    },
    {
      value: 'no-discount',
      label: 'No Discount',
    },
  ];

  const sortOptions = [
    { value: 'name-asc', label: 'Sort by name (A-Z)' },
    { value: 'name-desc', label: 'Sort by name (Z-A)' },
    { value: 'regularPrice-asc', label: 'Sort by price (low to high)' },
    { value: 'regularPrice-desc', label: 'Sort by price (high to low)' },
    { value: 'maxCapacity-asc', label: 'Sort by capacity (low to high)' },
    { value: 'maxCapacity-desc', label: 'Sort by capacity (high to low)' },
  ];

  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={filterOptions}
      />
      <SortBy options={sortOptions} />
    </TableOperations>
  );
}

export default CabinTableOperations;
