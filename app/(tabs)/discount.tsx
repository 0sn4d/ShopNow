import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function DiscountScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
        <Link href="/auth">AUTHENTICATION SCREEN</Link> 
      <Link href="/messages">MESSAGES</Link>
      <Link href='/productivity'>prod</Link>
      <Link href='/sellerprofie'>here</Link>
      <Link href='/prodetails'>yeaa</Link>
      
    </View>
  );
}
