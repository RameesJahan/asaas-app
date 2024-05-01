import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";
import MonthSelector from "react-native-month-selector";
import { TextInput } from "react-native-paper";
import moment from "moment";


const AddDataView = ({  onDismiss, onSave }) => {
  const [iptDate, setIptDate] = useState(new Date());
  const [paid, setPaid] = useState("");
  const [error, setError] = useState(true);


  const handleOnSave = () => {
    onSave({ 
      date: moment(iptDate).format('MM/yyyy'),
      paid 
    });
    handleDismiss();
  };

  const handleDismiss = () => {
    setError(false);
    setIptDate("");
    setPaid("");
    onDismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.titleContainer}>
          <Pressable onPress={handleDismiss}>
            <Feather name="x" size={28} color="black" />
          </Pressable>
          <Text style={styles.title}>Add Payment Data</Text>
        </View>
        <Pressable disabled={error} onPress={handleOnSave}>
          <Feather name="check" size={28} color={error?"#808080":"black"}  />
        </Pressable>
      </View>
      <View>
        <Text style={styles.text}>
          Select Month:
        </Text>
        <View style={{borderWidth: 1,borderColor: '#000'}}>
          <MonthSelector 
            selectedDate={moment(iptDate)}
            onMonthTapped={(value) => setIptDate(value)}
            maxDate={moment(new Date('Dec 2026'))}
          />
        </View>
        <TextInput 
          label='Paid'
          mode="outlined"
          value={paid}
          onChangeText={(txt) => {
            setPaid(txt)
            if(txt <= 0) setError(true)
            else setError(false)
          }}
          inputMode="numeric"
        />
      </View>
    </View>
  );
};

export default AddDataView;
