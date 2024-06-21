import React, { useState } from 'react';
import { Input, VStack, Text, useTheme, IconButton, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const EntradaTexto = ({ label, placeholder, isPassword, value, onChangeText }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <VStack space={4} w="100%" position="relative">
      <Text
        position="absolute"
        ml={2}
        mt={1.5}
        bg="rgba(255, 255, 255, 0.4)"
        zIndex={1}
        px={1}
        fontSize="13"
        color={theme.colors.gray[600]}
        fontWeight="medium"
      >
        {label}
      </Text>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        variant="outline"
        size="18"
        w="100%"
        py={3}
        px={3}
        fontSize="15"
        borderWidth={1}
        borderRadius={4}
        borderColor={theme.colors.gray[300]}
        _focus={{
          borderColor: theme.colors.blue[500],
        }}
        type={isPassword && !showPassword ? "password" : "text"}
        InputRightElement={
          isPassword && (
            <IconButton
              icon={
                <Icon
                  as={Ionicons}
                  name={showPassword ? "eye-off" : "eye"}
                  size={5}
                  color={theme.colors.gray[600]}
                />
              }
              onPress={() => setShowPassword(!showPassword)}
              mr={2}
            />
          )
        }
      />
    </VStack>
  );
};

export default EntradaTexto;
