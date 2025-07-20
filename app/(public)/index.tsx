import { Colors } from "@/app-example/constants/Colors";
import { useSSO } from "@clerk/clerk-expo";
import { DMSans_700Bold, useFonts } from "@expo-google-fonts/dm-sans";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";


export default function Index() {
    const [fontsLoaded] = useFonts({
        DMSans_700Bold,
    });

    const { startOAuthFlow } = useSSO();
    const { startOAuthFlow: startGoogleOAuthFlow } = useSSO();


  return (
    <View style={style.container}>
      <Image
        source={require('@/assets/images/login.jpeg')}
        style={style.loginImage}
      />
      <ScrollView>
  <Text style = {style.title}>How would you like to use Threads?</Text>
      </ScrollView>
    
    </View>
  );
}


const style = StyleSheet.create({
  container : {
    flex:1,
    gap:20,
    alignItems:'center',
    backgroundColor:Colors.light.background
  },
  loginImage:{
    width: '100%',
    height:350
  },

  title:{
    fontFamily:'DMSans_700Bold',
    fontSize:17
   
  }
  

})
