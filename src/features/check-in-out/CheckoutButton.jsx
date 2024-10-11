import Button from '../../ui/Button';
import { useCheckOut } from './useCheckOut';

function CheckoutButton({ bookingId }) {
  const { checkOut, isCheckingOut } = useCheckOut();

  return (
    <Button
      onClick={() => checkOut(bookingId)}
      disabled={isCheckingOut}
      variation="danger"
      size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
