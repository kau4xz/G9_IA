import { Button, IButtonProps, ITextProps } from 'native-base';
import { ReactNode } from "react";

interface ButtonProps extends IButtonProps {
  children: ReactNode;
  buttonColor?: string; // Prop para customizar a cor do botão
  textStyle?: ITextProps; // Prop para customizar estilos de texto
}

export function Botao({
  children,
  buttonColor = 'blue.500', // Valor padrão modificado para garantir que sempre haja uma cor de fundo
  textStyle = {}, // Inicializando com um objeto vazio para garantir que exista um objeto
  width = "90%",
  height = 100,
  borderRadius = "full",
  ...rest
}: ButtonProps) {
  return (
    <Button
      size="md"
      w="75%"
      h={50}
      bg={buttonColor}
      mt={8}
      mb={1}
      borderRadius="full"
      _text={{
        color: 'white', // Cor de texto padrão para garantir visibilidade
        fontSize: "sm",
        fontWeight: "bold",
        ...textStyle // Aplicar estilos adicionais fornecidos via prop
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
