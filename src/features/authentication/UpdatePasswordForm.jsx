import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';

import { useUpdateUser } from './useUpdateUser';
import PasswordInput from '../../ui/PasswordInput';

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Hidden username field for accessibility */}
      <input
        type="text"
        name="username"
        id="username"
        autoComplete="username"
        style={{ display: 'none' }}
        {...register('username')}
      />

      <FormRow
        label="New Password (min 8 characters)"
        error={errors?.password?.message}>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          register={register}
          validation={{
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          }}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}>
        <PasswordInput
          id="passwordConfirm"
          autoComplete="new-password"
          disabled={isUpdating}
          register={register}
          validation={{
            required: 'This field is required',
            validate: value =>
              getValues().password === value || 'Passwords need to match',
          }}
        />
      </FormRow>
      <FormRow>
        <Button
          onClick={reset}
          type="reset"
          variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
