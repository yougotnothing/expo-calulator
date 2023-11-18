import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import styled from "styled-components/native";
import { Text, TouchableOpacity } from 'react-native';

const StyledButton = styled(TouchableOpacity)`
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

const StyledView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 12px;
  background-color: #3e3439;
`;

const StyledText = styled.Text`
  color: white;
  font-size: 24px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-content: space-between;
  align-self: center;
`;

const OperatorsContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  gap: 8px;
`;

const AnswerContainer = styled.View`
  background-color: #31272c;
  border-radius: 6px;
  align-items: flex-end;
  justify-content: center;
  padding: 8px;
  width: 100%;
  height: 64px;
`;

const Answer = styled.Text`
  font-size: 34px;
  font-weight: 600;
  color: white;
`;

const NumbersContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  width: 246px;
  height: 320px;
`;

const EqualButton = styled(TouchableOpacity)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 47%;
  height: 67px;
  background-color: #ff6666;
  border-radius: 14px;
`;

const EqualButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  justify-content: center;
  width: 100%;
`;

const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: max-content;
`;

const InputButton = styled(TouchableOpacity)`
  background-color: #31272c;
  border-radius: 6px;
  height: 45px;
  width: max-content;
  padding: 0 30px;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  const [firstNumber, setFirstNumber] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(null);
  const [whatNumberChanged, setWhatNumberChanged] = useState('first');
  const [isDisabled, setIsDisabled] = useState(true);
  const operators = ['+', '-', '×', '÷'];
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '±', '0', ','];

  const handleSetOperator = (o) => {
    setOperator(o);
    setWhatNumberChanged('second');
  }

  useEffect(() => {
    if(firstNumber && secondNumber) {
      setIsDisabled(false);
    }
  }, [firstNumber, secondNumber]);

  useEffect(() => {
    setResult(null);
  }, [secondNumber]);

  const operation = () => {
    switch(operator) {
      case '+':
        setResult(
          (!firstNumber.includes(',') ? parseInt(firstNumber) : parseFloat(firstNumber))
            + 
          (!secondNumber.includes(',') ? parseInt(secondNumber) : parseFloat(secondNumber))
        );
        break;
      case '-':
        setResult(
          (!firstNumber.includes(',') ? parseInt(firstNumber) : parseFloat(firstNumber))
           -
          (!secondNumber.includes(',') ? parseInt(secondNumber) : parseFloat(secondNumber))
        );
        break;
      case '×':
        setResult(
          (!firstNumber.includes(',') ? parseInt(firstNumber) : parseFloat(firstNumber))
            *
          (!secondNumber.includes(',') ? parseInt(secondNumber) : parseFloat(secondNumber))
        );
        break;
      case '÷':
        setResult(
          (!firstNumber.includes(',') ? parseInt(firstNumber) : parseFloat(firstNumber))
            /
          (!secondNumber.includes(',') ? parseInt(secondNumber) : parseFloat(secondNumber))
        );
        break;
    }
  }

  const handleAddNumber = (number) => {
    if(whatNumberChanged === 'first') {
      if(number !== '±' && number !== ',') {
        if(!firstNumber) {
          setFirstNumber(number);
        }else{
          setFirstNumber(firstNumber + number);
        }
      }else{
        if(number !== '±' && firstNumber[0] === '-') {
          setFirstNumber(firstNumber.substring(1));
        }else if(number === '±' && firstNumber[0] !== '-') {
          setFirstNumber('-' + firstNumber);
        }else if(number === '±' && firstNumber.includes('±')) {
          setFirstNumber(firstNumber.substring(1, firstNumber.length));
        } 
      }
    }else{
      if(!secondNumber) {
        setSecondNumber(number);
      }else{
        setSecondNumber(secondNumber + number);
      }

      if(number === '±' && secondNumber[0] === '-') {
        setFirstNumber(secondNumber.substring(1));
      }else if(number === '±' && !secondNumber[0] === '-') {
        setFirstNumber('-' + secondNumber);
      }
    }
  }

  const handleClearNumbers = () => {
    if(!secondNumber) {
      setOperator(null);
    }

    if(!secondNumber && operation) {
      setWhatNumberChanged('first');
    }

    if(whatNumberChanged === 'first' && firstNumber) {
      setFirstNumber(firstNumber.slice(0, -1));
    }else if(whatNumberChanged === 'second' && secondNumber) {
      setSecondNumber(secondNumber.slice(0, -1));
    }
  }

  return (
    <StyledView>
      <InputContainer>
        <InputButton>
          <Answer>{firstNumber && firstNumber}</Answer>
        </InputButton>
        <InputButton>
          <Answer>{operator && operator}</Answer>
        </InputButton>
        <InputButton>
          <Answer>{secondNumber && secondNumber}</Answer>
        </InputButton>
      </InputContainer>
      <AnswerContainer>
        <Answer>{result}</Answer>
      </AnswerContainer>
      <ButtonContainer>
        <NumbersContainer>
          {numbers.map((number, index) => (
            <StyledButton onPress={() => handleAddNumber(number)} $type='number' key={index}>
              <ButtonText>{number}</ButtonText>
            </StyledButton>
          ))}
        </NumbersContainer>
        <OperatorsContainer>
          {operators.map((operator, index) => (
            <StyledButton onPress={() => handleSetOperator(operator)} $type="operator" key={index}>
              <ButtonText>{operator}</ButtonText>
            </StyledButton>
          ))}
        </OperatorsContainer>
      </ButtonContainer>
      <EqualButtonContainer>
        <EqualButton onPress={() => handleClearNumbers()}>
          <ButtonText>←</ButtonText>
        </EqualButton>
        <EqualButton disabled={isDisabled} onPress={() => operation()}>
          <ButtonText>=</ButtonText>
        </EqualButton>
      </EqualButtonContainer>
      <StatusBar style="auto" />
    </StyledView>
  );
}