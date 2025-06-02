import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"
import { AuthProvider } from "./contexts/AuthContext"
import { ProjectsProvider } from "./contexts/ProjectsContext"
import MapScreen from "./screens/MapScreen"
import ProjectDetailScreen from "./screens/ProjectDetailScreen"
import ReportScreen from "./screens/ReportScreen"
import LoginScreen from "./screens/LoginScreen"
import SplashScreen from "./screens/SplashScreen"

const Stack = createStackNavigator()

export default function App() {
  return (
    <AuthProvider>
      <ProjectsProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name="Map"
              component={MapScreen}
              options={{
                title: "City Infrastructure",
                headerStyle: { backgroundColor: "#2563eb" },
                headerTintColor: "#fff",
              }}
            />
            <Stack.Screen
              name="ProjectDetail"
              component={ProjectDetailScreen}
              options={{
                title: "Project Details",
                headerStyle: { backgroundColor: "#2563eb" },
                headerTintColor: "#fff",
              }}
            />
            <Stack.Screen
              name="Report"
              component={ReportScreen}
              options={{
                title: "Submit Report",
                headerStyle: { backgroundColor: "#2563eb" },
                headerTintColor: "#fff",
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: "Login",
                headerStyle: { backgroundColor: "#2563eb" },
                headerTintColor: "#fff",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ProjectsProvider>
    </AuthProvider>
  )
}
