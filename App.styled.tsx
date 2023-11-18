import styled from "styled-components/native";
import { Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  $type: 'number' | 'operator';
}

export const StyledButton = styled(TouchableOpacity)<ButtonProps>`
  background-color: ${props => props.$type === 'number' ? '#5f5054' : props.$type === 'operator' ? '#cc9933' : null};
  border-radius: 52px;
  height: 67px;
  width: 67px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`;

export const Head = styled.View`
  display: flex;
  width: 100%;
  background-color: #504747;
  height: 42px;
`;

export const StyledView = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  background-color: #3e3439;
`;

export const StyledText = styled.Text`
  color: white;
  font-size: 24px;
`;

export const ButtonText = styled.Text`
  color: white;
  font-size: 28px;
  align-self: center;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-self: center;
  gap: 24px;
`;

export const OperatorsContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  gap: 8px;
`;

export const AnswerContainer = styled.View`
  background-color: #31272c;
  border-radius: 6px;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 36px;
  padding: 8px;
  width: 100%;
  height: 40%;
`;

export const Answer = styled.Text`
  font-size: 46px;
  font-weight: 600;
  color: white;
`;

export const NumbersContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  width: 246px;
  height: 320px;
`;

export const EqualButton = styled(TouchableOpacity)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 47%;
  height: 67px;
  background-color: #ff6666;
  border-radius: 14px;
`;

export const EqualButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  justify-content: center;
  width: 100%;
`;

export const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: max-content;
`;

export const InputButton = styled(TouchableOpacity)`
  background-color: #31272c;
  border-radius: 6px;
  height: 45px;
  width: max-content;
  padding: 0 30px;
  align-items: center;
  justify-content: center;
`;

export const AllButtonsContainer = styled.View`
  display: flex;
  flex-direction: column;
  padding: 0 12px 14px 12px;
  
`;