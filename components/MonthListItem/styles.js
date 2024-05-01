import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center'
  }
})