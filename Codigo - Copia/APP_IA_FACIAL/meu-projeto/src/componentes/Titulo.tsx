import {Text, ITextProps} from "native-base"
import { ReactNode } from "react"

interface TituloPros extends ITextProps {
    children: ReactNode
}

export function Titulo( { children, ...rest}: TituloPros){
    return (
        <Text
        fontSize="3xl"  
               fontWeight="bold" 
               color="blue.500"
               textAlign="center"  
               mt={2} 
               {...rest}
               >
                {children}
    
               </Text>
    )
}