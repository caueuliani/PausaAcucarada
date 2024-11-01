import { StyleSheet } from 'react-native';
import  DrawerMenu  from './navigation/DrawerMenu'

export default function App() {
  return <DrawerMenu />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
