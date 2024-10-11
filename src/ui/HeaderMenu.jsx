import styled from 'styled-components';
import Logout from '../features/authentication/Logout';
import ButtonIcon from './ButtonIcon';
import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import ToolTips from './ToolTips';
import DarkModeToggle from './DarkModeToggle';
import { useDarkMode } from '../context/darkModeContext/useDarkMode';

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  return (
    <StyledHeaderMenu>
      <li>
        <ToolTips
          content="Account"
          anchorTo="account"
          position="bottom">
          <ButtonIcon
            id="account"
            onClick={() => navigate(`/account`)}>
            <HiOutlineUser />
          </ButtonIcon>
        </ToolTips>
      </li>
      <li>
        <ToolTips
          content={isDarkMode ? 'Light Mode' : 'Dark Mode'}
          anchorTo="darkMode"
          position="bottom">
          <DarkModeToggle id="darkMode" />
        </ToolTips>
      </li>
      <li>
        <ToolTips
          content="Logout"
          anchorTo="logout"
          position="bottom">
          <Logout id="logout" />
        </ToolTips>
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
