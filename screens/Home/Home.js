import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import styles from "./style";
import AddMemberDialog from "../../components/AddMemberDialog/AddMemberDialog";
import { addMember } from "../../utils/MemberManager";
import { Snackbar } from "react-native-paper";

const Home = ({ navigation }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showSnack, setShowSnack] = useState(false);

  const handleAddPress = () => {
    setShowDialog(true);
  };

  const handleDismiss = () => {
    setShowDialog(false);
  };

  const handleOnSave = async (data) => {
    await addMember(data);
    setShowSnack(true);
  };

  return (
    <View style={styles.container}>
      <AddMemberDialog
        visible={showDialog}
        onDismiss={handleDismiss}
        onSave={handleOnSave}
      />
      <Snackbar
        visible={showSnack}
        onDismiss={() => setShowSnack(false)}
        duration={3000}
      >
        Member Added Successfully
      </Snackbar>
      <View style={styles.row}>
        <Pressable
          onPress={() => navigation.navigate("Members")}
          style={[{ backgroundColor: "#3b82f6" }, styles.rowItem]}
        >
          <View>
            <Text style={styles.text}>Members</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={handleAddPress}
          style={[{ backgroundColor: "#22c55e" }, styles.rowItem]}
        >
          <Text style={styles.text}>Add Members</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;
