import { Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { Button, Dialog, Portal } from 'react-native-paper'

const DeleteConfirmDialog = ({title, message, visible, onDelete, onDismiss}) => {

  return (
    <Portal>
    <Dialog visible={visible} onDismiss={onDismiss}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Text>{message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button style={styles.btn} textColor='#ef4444' onPress={onDelete}>Delete</Button>
            <Button style={styles.btn} mode='contained'  onPress={onDismiss}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
  </Portal>
  )
}

export default DeleteConfirmDialog