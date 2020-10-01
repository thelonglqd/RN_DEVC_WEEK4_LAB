import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const messages = [
  {
    author: "John Wick",
    content:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa",
  },
  { author: "Gandaf", content: "You shall not pass" },
  {
    author: "Harry Maguire",
    content:
      "Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus",
  },
  {
    author: "Lindelof",
    content:
      "Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus",
  },
  {
    author: "Rashford",
    content:
      "Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo",
  },
  {
    author: "Martial",
    content:
      "Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,",
  },
  { author: "Greenwood", content: "Goallllllllllllllllll" },
];

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

const MessagesStack = () => {
  return (
    <Stack.Navigator initialRouteName="Messages">
      <Stack.Screen
        options={{
          headerTitle: (props) => <MessagesTitle {...props} />,
        }}
        name="Messages"
        component={MessagesDrawer}
      />
      <Stack.Screen name="Conversation" component={Conversation} />
    </Stack.Navigator>
  );
};

const MessagesDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Messages" component={Messages}></Drawer.Screen>
      <Drawer.Screen name="drawer1" component={Drawer1}></Drawer.Screen>
      <Drawer.Screen name="drawer2" component={Drawer2}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

const Messages = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {messages.map((mess) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Conversation", mess)}
          style={styles.messageContainer}
          key={mess.author}
        >
          <Text style={styles.authorText}>{mess.author}</Text>
          <Text>{mess.content}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const MessagesTitle = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <AntDesign name="menuunfold" size={24} color="black" />
      </TouchableOpacity>
      <Text>Message</Text>
    </View>
  );
};

const Conversation = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text>Conversation</Text>
      <Text>{route.params?.author}</Text>
      <Text>{route.params?.content}</Text>
    </View>
  );
};

const Contacts = () => <Text>Contacts</Text>;
const Groups = () => <Text>Groups</Text>;
const Timeline = () => <Text>Timeline</Text>;
const More = () => <Text>More</Text>;
const Drawer1 = () => <Text>Drawer1</Text>;
const Drawer2 = () => <Text>Drawer2</Text>;

const routeIcons = {
  Messages: "message1",
  Contacts: "contacts",
  Groups: "team",
  Timeline: "barschart",
  More: "bars",
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name={routeIcons[route.name]}
              size={24}
              color={focused ? "blue" : "grey"}
            />
          ),
        })}
        tabBarOptions={{
          activeTintColor: "blue",
          inactiveTintColor: "grey",
        }}
      >
        <Tab.Screen name="Messages" component={MessagesStack} />
        <Tab.Screen name="Contacts" component={Contacts} />
        <Tab.Screen name="Groups" component={Groups} />
        <Tab.Screen name="Timeline" component={Timeline} />
        <Tab.Screen name="More" component={More} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  authorText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  messageContainer: {
    borderWidth: 1,
    borderColor: "grey",
    marginTop: 10,
    padding: 5,
  },
  headerContainer: {
    flexDirection: "row",
  },
});
