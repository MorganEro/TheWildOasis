import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Textarea from '../../ui/Textarea';

import { useCreateCabin } from './useCreateCabin';
import { useForm } from 'react-hook-form';
import { useUpdateCabin } from './useUpdateCabin';
import { DevTool } from '@hookform/devtools';

function CreateCabinForm({ cabinToUpdate = {}, onCloseModal }) {
  const { id: updateId, ...updateValues } = cabinToUpdate;
  const isUpdateSession = Boolean(updateId);

  const { register, handleSubmit, reset, getValues, formState, control } =
    useForm({
      //we can pass in some options for the useForm hook. default values are the values that will be used to populate the form fields. We passed in the values from the cabin to the createCabinForm component as cabinToUpdate prop so that we can pass in the values from the cabin to the useForm hook. from the we got the id and the other values as updateValues
      defaultValues: isUpdateSession ? updateValues : {},
      mode: 'onChange',
    });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();

  const { isUpdating, updateCabin } = useUpdateCabin();

  const isWorking = isUpdating || isCreating;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isUpdateSession)
      updateCabin(
        {
          newCabinData: {
            ...data,
            image: image,
          },
          id: updateId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        {
          ...data,
          image: image,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  //if the onSubmit callback fails, the onError function will be called but I am not using it because we are using errors from useForm
  return (
    <>
      <DevTool
        control={control}
        placement="top-left"
      />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        type={onCloseModal ? 'modal' : 'regular'}>
        <FormRow
          label="Cabin name"
          error={errors?.name?.message}>
          <Input
            type="text"
            id="name"
            disabled={isWorking}
            {...register('name', { required: 'This field is required' })}
          />
        </FormRow>

        <FormRow
          label="Maximum capacity"
          error={errors?.maxCapacity?.message}>
          <Input
            type="number"
            id="maxCapacity"
            disabled={isWorking}
            {...register('maxCapacity', {
              required: 'This field is required',
              min: {
                value: '1',
                message: 'Capacity must be at least 1',
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Regular price"
          error={errors?.regularPrice?.message}>
          <Input
            type="number"
            id="regularPrice"
            disabled={isWorking}
            step="100"
            {...register('regularPrice', {
              required: 'This field is required',
              min: {
                value: '1',
                message: 'Capacity must be at least 1',
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Discount"
          error={errors?.discount?.message}>
          <Input
            type="number"
            id="discount"
            step="50"
            disabled={isWorking}
            defaultValue={0}
            {...register('discount', {
              required: 'This field is required',
              validate: value => {
                const discountValue = Number(value);
                const regularPriceValue = Number(getValues().regularPrice);
                return (
                  discountValue <= regularPriceValue ||
                  "Discount can't be equal or higher than regular price"
                );
              },
            })}
          />
        </FormRow>

        <FormRow
          label="Description for website"
          error={errors?.description?.message}>
          <Textarea
            type="number"
            id="description"
            disabled={isWorking}
            defaultValue=""
            {...register('description', { required: 'This field is required' })}
          />
        </FormRow>

        <FormRow label="Cabin photo">
          <FileInput
            id="image"
            accept="image/*"
            {...register('image', {
              required: isUpdateSession ? false : 'This field is required',
            })}
          />
        </FormRow>

        <FormRow>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}>
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isUpdateSession ? 'Edit Cabin' : 'Create new cabin'}
          </Button>
        </FormRow>
      </Form>
    </>
  );
}

export default CreateCabinForm;
