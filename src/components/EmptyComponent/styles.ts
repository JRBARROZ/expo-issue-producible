import styled from "styled-components/native";

const EmptyMessageContainer = styled.Text`
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  padding: ${({ theme }) => theme.shape.padding};
  background-color: ${({ theme }) => theme.colors.secondary?.[100]};
  font-family: ${({ theme }) => theme.typography.fonts.primary.normal};
  font-size: ${({ theme }) => theme.typography.size.body};
  color: ${({ theme }) => theme.colors.secondary?.[600]};
`;

export { EmptyMessageContainer };
