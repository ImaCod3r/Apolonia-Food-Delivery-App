import { View, Text } from "react-native";

import { styles } from "./styles";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Back } from "@/components/back";


export default function EditProfile(){
 
    return(
        <View style={styles.container}>
            <Back />

            <View>
                <Text style={styles.heading}>Detalhes Pessoais</Text>
                <Text>Modifique suas informações pessoais.</Text>
            </View>

            <Input placeholder="Nome"  />
            <Input placeholder="Sobrenome" />
            <Input placeholder="Email" />
            <Input placeholder="Senha nova" />
            <Input placeholder="Confirme a senha nova" />
            <Button text="Salvar" isPrimary onClick={() => console.log('Salvou')} />
        </View>
    )
}