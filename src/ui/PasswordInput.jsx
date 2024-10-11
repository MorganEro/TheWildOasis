import { useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Input from './Input';

const PasswordInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled(Input)`
  flex-grow: 1;
`;

const TogglePasswordButton = styled.button`
  margin-left: -2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-grey-600);
`;

const PasswordInput = ({
  id,
  register,
  validation,
  disabled,
  autoComplete,
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <PasswordInputWrapper>
      <StyledInput
        className="password-input-wrapper"
        type={showPassword ? 'text' : 'password'}
        id={id}
        autoComplete={autoComplete}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...(register ? register(id, validation) : {})}
      />
      <TogglePasswordButton
        type="button"
        onClick={togglePasswordVisibility}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </TogglePasswordButton>
    </PasswordInputWrapper>
  );
};

export default PasswordInput;
