import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import styles from './styles';

const MonthListItem = ({ index, item, onDelete }) => {

  const getBgColor = () => {
    if (index % 2 === 0) return '#bfdbfe';
    return '#bbf7d0'
  }
  return (
    <View style={[styles.container,{backgroundColor: getBgColor()}]}>
      <Text style={styles.text}>{String(item.date)}</Text>
      <View style={styles.row}>
        <Text style={styles.text}>{item.paid}</Text>
        <Pressable onPress={() => onDelete(item.id)}>
          <Feather name="trash" size={20} color="#ef4444" />
        </Pressable>
      </View>
    </View>
  )
}

export default MonthListItem