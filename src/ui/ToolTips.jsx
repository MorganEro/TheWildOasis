import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const ToolTipsContainer = styled.div.withConfig({
  shouldForwardProp: prop => !['position', 'opacity', 'offset'].includes(prop),
})`
  position: absolute;
  background-color: var(--color-brand-600);
  color: white;
  padding: 0.7rem;
  border-radius: 7px;
  opacity: ${props => props.opacity};
  transition: opacity 0.3s ease-in-out;
  ${props =>
    props.position === 'top' &&
    css`
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
    `}
  ${props =>
    props.position === 'right' &&
    css`
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
    `}
  ${props =>
    props.position === 'bottom' &&
    css`
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    `}
  ${props =>
    props.position === 'left' &&
    css`
      top: 50%;
      right: 100%;
      transform: translateY(-50%);
    `}
  margin: ${props => props.offset}px;
`;

const ToolTips = ({
  children,
  content,
  position = 'top',
  duration,
  opacity = 0.6,
  offset = 10,
  anchorTo,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible && duration) {
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  const handleMouseEnter = () => setVisible(true);
  const handleMouseLeave = () => {
    if (!duration) {
      setVisible(false);
    }
  };

  return (
    <div
      id={anchorTo}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      {visible && (
        <ToolTipsContainer
          position={position}
          opacity={opacity}
          offset={offset}>
          {content}
        </ToolTipsContainer>
      )}
    </div>
  );
};

export default ToolTips;

//<ToolTips
//   content="This is a ToolTips"
//   position="right"
//   duration={5000}
//   opacity={0.9}
//   offset={15}
//   anchorTo="ToolTips-anchor"
// >
//   <button id="ToolTips-anchor">Hover over me</button>
// </ToolTips>
