import { AiOutlineCloseSquare } from 'react-icons/ai';

import styled from 'styled-components';

const ToastContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-grey-600);
  font-size: 20px;
  align-self: flex-end;
`;

function Toast({ children, onClick }) {
  return (
    <ToastContainer>
      <CloseButton onClick={onClick}>
        <AiOutlineCloseSquare />
      </CloseButton>

      <div>{children}</div>
    </ToastContainer>
  );
}

export default Toast;
