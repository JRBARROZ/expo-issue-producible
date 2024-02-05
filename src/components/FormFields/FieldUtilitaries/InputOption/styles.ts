import styled from "styled-components/native";

interface IInputOptionContainer {
  selected: boolean;
}

const InputOptionContainer = styled.Pressable<IInputOptionContainer>`
  padding: ${({ theme }) => theme.shape.padding};
  border-bottom: 1px;
  border-color: ${({ theme }) => theme.colors.secondary?.[200]};
  background-color: ${({ theme, selected }) => (selected ? theme.colors.primary?.[0] : theme.colors.secondary?.[0])};
`;

const InputOptionLabel = styled.Text`
  font-family: ${({ theme }) => theme.typography.fonts.primary.medium};
  font-size: ${({ theme }) => theme.typography.size.body};
  color: ${({ theme }) => theme.colors.secondary?.[600]};
`;

export { InputOptionContainer, InputOptionLabel };
