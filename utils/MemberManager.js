import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("MEMBERS_DATA", jsonValue);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("MEMBERS_DATA");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

export const addMember = async ({ name, phone }) => {
  if (!name || !phone) {
    throw Error("No Parameters")
  }
  const id = uuidv4();
  const old = await getData();
  const newData = {
    id,
    name,
    phone,
    data: []
  };
  const newDataList = [...old, newData];
  await storeData(newDataList);
};

export const deleteMember = async (id) => {
  const old = await getData();
  const newDataList = old.filter((item) => item.id !== id);
  await storeData(newDataList);
  return newDataList
};

export const updateMember = async (id, data) => {
  const old = await getData();
  const newDataList = old.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...data,
      };
    }
    return item;
  });
  await storeData(newDataList);
  return newDataList.find((item) => item.id === id);
};

export const getMember = async (id) => {
  const old = await getData();
  const member = old.find((item) => item.id === id);
  return member;
};

export const getMembers = async () => {
  const old = await getData();
  return old;
}

export const addMemberData = async (id,nData) => {
  const dataId = uuidv4();
  const oldData = await getMember(id);

  const existingItem = oldData.data.find((item) => item.date === nData.date);

  if (existingItem) {
    existingItem.paid = Number(existingItem.paid) + Number(nData.paid);
  } else {
    oldData.data.push({
      id: dataId,
      date: nData.date,
      paid: nData.paid,
    });
  }

  const newData = await updateMember(id, {
    data: oldData.data,
  });

  return newData;
}

export const deleteMemberData = async(id,mid) => {
  const oldData = await getMember(id);
  const newData = oldData.data.filter((item) => item.id !== mid);

  const newMember = await updateMember(id, {
    data: newData,
  });

  return newMember;
}
