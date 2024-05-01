import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  content:{
    padding: 10,
    height: "100%"

  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  col: {
    justifyContent: 'center',
    gap: 6
  },
  textListTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
})