import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { Tabs } from "expo-router";



export default function RootLayout() {
  return ( 
    <Tabs screenOptions={{tabBarActiveTintColor:"green", tabBarLabel: () => null}}>
      <Tabs.Screen name="index" options={{headerShown: false,
        tabBarIcon: ({color}) =>(
          <Octicons name="home" size={30} color={color}
      
          />
        )
        }} />
      <Tabs.Screen name="inbox" options={{title: "Inbox", headerShown: false,
        tabBarIcon: ({color})=> (
          <Feather name="inbox" size={30} color={color} />
        )
        }}/>
      <Tabs.Screen name="offer" options={{title: "Post An Item",// headerShown: false,
        tabBarIcon: ({color}) => (
          <Feather name="camera" size={30} color={color}  />
        )
      }}/>
      <Tabs.Screen name="discount" options={{title: "Discount",
        tabBarIcon: ({color}) => (
          <MaterialIcons name="discount" size={30} color={color} />
        )
      }}/>
      <Tabs.Screen name="account" options={{title: "Account",
    tabBarIcon: ({color}) =>(
          <MaterialCommunityIcons name="account" size={35} color={color} />
        )
      }}/>
    </Tabs>
  );
}
