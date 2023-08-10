import React, { type MouseEventHandler, type ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { styled } from 'styled-components';

const StyledButton = styled.button`
  background: #F39813;
  border: none;
  padding: 8px 24px;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  box-shadow:
    0 1.9px 2.5px rgba(243, 152, 19, 0.057),
    0 5px 6.1px rgba(243, 152, 19, 0.076),
    0 10.1px 11.4px rgba(243, 152, 19, 0.086);
  transition-duration: .4s;
  &:hover{
    background: #EE730D;
  }
`;
const Icon = styled(FontAwesomeIcon)`
  margin-right: 8px;
`;

interface Props {
  children: ReactNode;
  icon: IconDefinition;
  disabled?: boolean;
}

const Component = ({ children, icon, disabled = false }: Props) => {
  return (
    <StyledButton disabled={disabled}>
      <Icon icon={icon} />
      {children}
    </StyledButton>
  );
};

export default Component;
