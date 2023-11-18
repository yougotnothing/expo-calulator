import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { 
  StyledButton,
  StyledView,
  ButtonContainer, 
  ButtonText, 
  Answer, 
  InputButton, 
  InputContainer, 
  AnswerContainer, 
  NumbersContainer, 
  OperatorsContainer, 
  EqualButtonContainer, 
  EqualButton,
  AllButtonsContainer,
  Head, 
} from './App.styled';

const operators: string[] = ['+', '-', '×', '÷'];
const numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '±', '0', ','];

export default function App() {
  const [firstNumber, setFirstNumber] = useState<any>('');
  const [secondNumber, setSecondNumber] = useState<any>('');
  const [operator, setOperator] = useState<string>('');
  const [result, setResult] = useState<number | string>(null);
  const [whatNumberChanged, setWhatNumberChanged] = useState<'first' | 'second'>('first');
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSetOperator = (o: string) => {
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
    if (firstNumber && secondNumber && operator) {
      const num1 = parseFloat(firstNumber.replace(',', ''));
      const num2 = parseFloat(secondNumber.replace(',', ''));

      switch (operator) {
        case '+':
          setResult(num1 + num2);
          break;
        case '-':
          setResult(num1 - num2);
          break;
        case '×':
          setResult(num1 * num2);
          break;
        case '÷':
          setResult(num1 / num2);
          break;
        default:
          setResult('Unknown operation.');
      }
    }
  }

  const handleAddNumber = (number: string) => {
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
        setSecondNumber(secondNumber.substring(1));
      }else if(number === '±' && secondNumber[0] !== '-') {
        setSecondNumber('-' + secondNumber);
      }
    }
  }

  const handleClearNumbers = () => {
    if(!secondNumber) {
      setOperator('');
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
      <Head></Head>
      <AnswerContainer>
        <Answer>
          {result ? result : `${firstNumber && firstNumber} ${operator && operator} ${secondNumber && secondNumber}`}
        </Answer>
      </AnswerContainer>
      <AllButtonsContainer>
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
      </AllButtonsContainer>
      <StatusBar style="auto" />
    </StyledView>
  );
}