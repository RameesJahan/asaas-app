import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import styles from './styles';

const MembersListItem = ({ index, item, onPress, onDelete }) => {

  const getBgColor = () => {
    if (index % 2 === 0) return '#bfdbfe';
    return '#bbf7d0'
  }
  return (
    <Pressable onPress={() => onPress(item.id)} style={[styles.container,{backgroundColor: getBgColor()}]}>
      <Text style={styles.text}>{item.name}</Text>
      <Pressable onPress={() => onDelete(item.id)}>
        <Feather name="trash" size={18} color="red" />
      </Pressable>
    </Pressable>
  )
}

export default MembersListItem