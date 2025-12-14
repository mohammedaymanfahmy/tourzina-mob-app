import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';

import Button from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    expect(getByText('Test Button')).toBeDefined();
  });

  it('handles onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Press Me</Button>);
    
    fireEvent.press(getByText('Press Me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button disabled onPress={onPress}>
        Disabled
      </Button>
    );
    
    fireEvent.press(getByText('Disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders icon-only button', () => {
    const icon = <Text>←</Text>;
    const { getByTestId } = render(
      <Button icon={icon} iconOnly testID="icon-button" />
    );
    
    expect(getByTestId('icon-button')).toBeDefined();
  });
});

