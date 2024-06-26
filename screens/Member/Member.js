import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { dummyData as DATA } from "../../assets/data/dummy";
import { Button, Divider, Snackbar } from "react-native-paper";
import styles from "./styles";
import MonthListItem from "../../components/MonthListItem/MonthListItem";
import { addMemberData, deleteMember, deleteMemberData, getMember, updateMember } from "../../utils/MemberManager";
import EditMemberDialog from "../../components/EditMemberDialog/EditMemberDialog";
import AddDataView from "../../components/AddDataView/AddDataView";
import DeleteConfirmDialog from "../../components/DeleteConfirmDialog/DeleteConfirmDialog";
import MessageConfirmDialog from "../../components/MessageConfirmDialog/MessageConfirmDialog";
import moment from "moment";
import conv from "number-to-words"

const Member = ({ route, navigation }) => {
  const { id } = route.params;
  const [member, setMember] = useState({});
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showAddDataView, setShowAddDataView] = useState(false);
  const [showMonthDelete, setShowMonthDelete] = useState(false);
  const [showSendSMS, setShowSendSMS] = useState(false);
  const [showSMSSnack, setShowSMSSnack] = useState(false);
  const [smsSnackData, setSmsSnackData] = useState("");
  const [smsDialogMessage, setSmsDialogMessage] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const member = await getMember(id);
      setMember(member);
    };
    fetchData();
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: member.name });
  }, [member]);

  const editMember = async (data) => {
    const newData = await updateMember(id, data);
    setMember(newData);
  };



  const handleEditSave = ({ name, phone }) => {
    editMember({
      name,
      phone,
    });
  };

  const handleEditDismiss = () => {
    setShowEditDialog(false);
  };

  const handleAddDataDismiss = () => {
    setShowAddDataView(false)
  };

  const handleAddDataSave = async (data) => {
    try{
      console.log(data);
      const res = await addMemberData(id,data);
      const dt = moment(new Date()).format("DD-MM-YYYY");
      setSmsDialogMessage(`\t THAQWA SUNNI JUMA MASJID \n\n Date: ${dt}\n\n Received from ${member.name} the sum of Rupees ${conv.toWords(data.paid).toUpperCase() } being donation. \n\n Rs: ${data.paid}/-`)
      setShowSendSMS(true)
      setMember(res)
    }catch(e){
      console.log(e);
    }
    
  };

  const handleMonthDelete = async(mid) => { 
    const nData = await deleteMemberData(id,mid);
    setMember(nData)
  }

  const showSnack = (msg) => {
    setSmsSnackData(msg)
    setShowSMSSnack(true)
  }

  const handleSMSError = (msg) => {
    showSnack(msg)
  }
  const handleSMSSend = () => {
    showSnack("SMS Sent")
  }


  return (
    <View style={styles.container}>
      <EditMemberDialog
        visible={showEditDialog}
        data={{ name: member.name, phone: member.phone }}
        onDismiss={handleEditDismiss}
        onSave={handleEditSave}
      />
      <DeleteConfirmDialog 
        title="Delete Month"
        message={`Do you want delete this month?`}
        visible={showMonthDelete}
        onDismiss={() => setShowMonthDelete(false)}
        onDelete={handleMonthDelete}
      />
      <MessageConfirmDialog 
        to={{ name: member.name, phone: member.phone, message: smsDialogMessage }}
        visible={showSendSMS}
        onDismiss={() => setShowSendSMS(false)}
        onSend={handleSMSSend}
        onError={handleSMSError}
      />
      
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.text}>{member.name}</Text>
            <Text style={styles.text}>{member.phone}</Text>
          </View>
          <View style={styles.col}>
            <Button mode="outlined" onPress={() => setShowEditDialog(true)}>
              Edit
            </Button>
            <Button mode="contained" onPress={() => setShowAddDataView(true)}>
              Add
            </Button>
          </View>
        </View>
        <Divider style={{ marginVertical: 10 }} />
        <View style={[styles.row]}>
          <Text style={styles.textListTitle}>Month/Year</Text>
          <Text style={[styles.textListTitle, { marginRight: 36 }]}>Paid</Text>
        </View>
        <FlatList
          style={{ marginTop: 10, flexGrow: 1 }}
          data={member.data}
          renderItem={({ item, index }) => (
            <MonthListItem index={index} item={item} onDelete={() => setShowMonthDelete(true)} />
          )}
        />
      </View>
      {showAddDataView && (
        <AddDataView onDismiss={handleAddDataDismiss} onSave={handleAddDataSave} />
      )}
      <Snackbar 
        visible={showSMSSnack}
        onDismiss={() => setShowSMSSnack(false)}
      >
        {smsSnackData}
      </Snackbar>
    </View>
  );
};

export default Member;
