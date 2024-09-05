import styled from 'styled-components';
import GlobalStyles from './styles/globalStyles';
import Heading from './ui/Heading';

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background-color: purple;
  color: white;

  &:hover {
    background-color: blue;
  }
`;

const StyledApp = styled.div`
  //use this instead of div. the convention is to use the name of the component prefixed with 'Styled'. It will show up in the dom tree as a div
  background-color: orange;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">Heading 1</Heading>
        <Heading as="h2">Heading 2</Heading>
        <Heading as="h3">Heading 3</Heading>
        <Button onClick={() => alert('Checked in')}>Check In</Button>
      </StyledApp>
    </>
  );
}

export default App;
