import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row:{
    flexDirection: 'row',
    padding: 12,
    gap: 12
  },
  rowItem:{
    flex: 1,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    elevation: 18,
    shadowColor: '#000000',
    aspectRatio: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f5f5f5'
  }
})