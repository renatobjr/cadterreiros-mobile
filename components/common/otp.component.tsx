import { useTheme } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';

interface OtpInputKittenProps {
  numberOfDigits?: number;
  onTextChange?: (text: string) => void;
  onFilled?: (text: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control';
  size?: 'small' | 'medium' | 'large';
  placeholder?: string;
  secureTextEntry?: boolean;
  blurOnFilled?: boolean;
}

export const OtpInputKitten: React.FC<OtpInputKittenProps> = ({
  numberOfDigits = 6,
  onTextChange,
  onFilled,
  autoFocus = true,
  disabled = false,
  status = 'basic',
  size = 'medium',
  placeholder,
  secureTextEntry = true,
  blurOnFilled = false,
}) => {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'primary':
        return theme['color-primary-default'];
      case 'success':
        return theme['color-success-default'];
      case 'info':
        return theme['color-info-default'];
      case 'warning':
        return theme['color-warning-default'];
      case 'danger':
        return theme['color-danger-default'];
      case 'control':
        return theme['color-control-default'];
      default:
        return theme['color-basic-600'];
    }
  };

  const getSizeStyles = (size: string) => {
    switch (size) {
      case 'small':
        return {
          height: 40,
          width: 32,
          fontSize: 13,
          borderRadius: 4,
        };
      case 'large':
        return {
          height: 60,
          width: 48,
          fontSize: 16,
          borderRadius: 8,
        };
      default: // medium
        return {
          height: 50,
          width: 40,
          fontSize: 15,
          borderRadius: 6,
        };
    }
  };

  const sizeStyles = getSizeStyles(size);
  const statusColor = getStatusColor(status);
  const borderColor = disabled
    ? theme['color-basic-300']
    : theme['color-basic-400'];

  const styles = StyleSheet.create({
    container: {
      width: 'auto',
      gap: 8,
    } as ViewStyle,

    pinCodeContainer: {
      width: sizeStyles.width,
      height: sizeStyles.height,
      borderWidth: 1,
      borderColor: borderColor,
      borderRadius: sizeStyles.borderRadius,
      backgroundColor: disabled
        ? theme['color-basic-200']
        : theme['background-basic-color-1'],
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,

    focusedPinCodeContainer: {
      borderColor: statusColor,
      borderWidth: 2,
      backgroundColor: theme['background-basic-color-1'],
    } as ViewStyle,

    filledPinCodeContainer: {
      borderColor: statusColor,
      backgroundColor: theme['background-basic-color-1'],
    } as ViewStyle,

    disabledPinCodeContainer: {
      borderColor: theme['color-basic-300'],
      backgroundColor: theme['color-basic-200'],
    } as ViewStyle,

    pinCodeText: {
      fontSize: sizeStyles.fontSize,
      fontFamily: theme['text-font-family'],
      color: disabled
        ? theme['color-basic-500']
        : theme['text-basic-color'],
      fontWeight: '600',
    } as TextStyle,

    placeholderText: {
      fontSize: sizeStyles.fontSize,
      fontFamily: theme['text-font-family'],
      color: theme['color-basic-500'],
    } as TextStyle,

    focusStick: {
      backgroundColor: statusColor,
      height: sizeStyles.fontSize + 4,
      width: 2,
    } as ViewStyle,
  });

  return (
    <OtpInput
      numberOfDigits={numberOfDigits}
      onTextChange={onTextChange}
      onFilled={onFilled}
      autoFocus={autoFocus}
      disabled={disabled}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      blurOnFilled={blurOnFilled}
      focusColor={statusColor}
      theme={{
        containerStyle: styles.container,
        pinCodeContainerStyle: styles.pinCodeContainer,
        focusedPinCodeContainerStyle: styles.focusedPinCodeContainer,
        filledPinCodeContainerStyle: styles.filledPinCodeContainer,
        disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
        pinCodeTextStyle: styles.pinCodeText,
        placeholderTextStyle: styles.placeholderText,
        focusStickStyle: styles.focusStick,
      }}
    />
  );
};

export default OtpInputKitten;

