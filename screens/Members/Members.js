import { FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { Searchbar, Snackbar } from "react-native-paper";
import MembersListItem from "../../components/MembersListItem/MembersListItem";

import { deleteMember, getMembers } from "../../utils/MemberManager";
import DeleteConfirmDialog from "../../components/DeleteConfirmDialog/DeleteConfirmDialog";

const Members = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [DATA, setDATA] = useState([]);
  const [listData, setListData] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showDeleteSnack, setShowDeleteSnack] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    getMembers().then((data) => {
      setDATA(data);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const filteredData = DATA.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
      setListData(filteredData);
    }, 300);

    return () => clearInterval(interval);
  }, [DATA, search]);

  const handlePress = (id) => {
    navigation.navigate("Member", {
      id: id,
    });
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const handleOnDelete = () => {
    memberDelete(deleteId)
    setShowDelete(false);
    setShowDeleteSnack(true);
  };

  const handleOnDismiss = () => {
    setDeleteId(null);
    setShowDelete(false);
  };

  const memberDelete = async (id) => {
    if(id) {  
      const newData = await deleteMember(id);
      setDATA(newData);
    }
  }

  return (
    <View style={styles.container}>
      <DeleteConfirmDialog
        title="Delete Member"
        message="Are you sure you want to delete this member?"
        visible={showDelete}
        onDismiss={handleOnDismiss}
        onDelete={handleOnDelete}
      />
      <View>
        <Searchbar
          mode="bar"
          placeholder="Search"
          onChangeText={(text) => setSearch(text)}
          value={search}
          elevation={2}
        />
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.memberList}
          data={listData}
          renderItem={({ item, index }) => (
            <MembersListItem
              onPress={handlePress}
              onDelete={handleDelete}
              index={index}
              item={item}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Snackbar
        visible={showDeleteSnack}
        onDismiss={() => setShowDeleteSnack(false)}
      >
        Item Deleted
      </Snackbar>
    </View>
  );
};

export default Members;
