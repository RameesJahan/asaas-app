import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 10
  },
  row:{
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2
  },
  title: {
    fontSize: 18,
    fontWeight: '500'
  },
  text: {
    fontSize: 14,
    fontWeight: '500'
  },
  btn: {
    paddingHorizontal: 8
  },
  error:{
    color: "#ef4444",
    backgroundColor: "#fecaca",
    borderColor: "#ef4444",
    borderRadius: 6,
    padding: 10,
    alignSelf: "stretch",
    marginVertical: 8,
    textAlign: 'center'
  }
})