import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useUpdateSetting } from './useUpdateSetting';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';

function UpdateSettingForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();

  const { updateSetting, isUpdating } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  // using the unBlur method to update single settings at a time
  function handleUpdate(e, field) {
    const { value } = e.target;
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={e => {
            if (e.target.value !== minBookingLength) {
              handleUpdate(e, 'minBookingLength');
            }
          }}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={e => {
            if (e.target.value !== maxBookingLength) {
              handleUpdate(e, 'maxBookingLength');
            }
          }}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={e => {
            if (e.target.value !== maxGuestsPerBooking) {
              handleUpdate(e, 'maxGuestsPerBooking');
            }
          }}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={e => {
            if (e.target.value !== breakfastPrice) {
              handleUpdate(e, 'breakfastPrice');
            }
          }}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingForm;
