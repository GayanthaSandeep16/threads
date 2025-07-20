import { useSSO } from "@clerk/clerk-expo";
import { Text, View, StyleSheet, Image } from "react-native";

export default function Index() {

    const { startOAuthFlow } = useSSO();
    const { startOAuthFlow: startGoogleOAuthFlow } = useSSO();


  return (
    <View style={style.container}>
      <Image
        source={require('@/assets/images/login.jpeg')}
        style={style.loginImage}
      />
      <Text>Hello Tread</Text>
    </View>
  );
}


const style = StyleSheet.create({
  container : {
    flex:1,
    gap:20,
    alignItems:'center'

  },
  loginImage:{
    width: '100%',
    height: 350,
    resizeMode: 'cover'
  }

})
