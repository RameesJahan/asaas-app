import { Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { Button, Dialog, Portal } from 'react-native-paper'
import { sendMessage } from '../../utils/MessageService'

const MessageConfirmDialog = ({to, visible, onSend, onDismiss, onError}) => {


  const message = to.message;

  const handleSend = async() => {
    sendSMS()
    onDismiss()
  }

  const sendSMS = async() => {
    try{
      const isSuccess = await sendMessage({
        to: to.phone,
        message
      })
      if(isSuccess){
        onSend()
        return;
      }
      //onError("Unknown Error")
    }catch(e){
      onError(e.message)
    }
  }

  return (
    <Portal>
    <Dialog visible={visible} onDismiss={onDismiss}>
          <Dialog.Title>Send Message</Dialog.Title>
          <Dialog.Content>
            <Text>{message}</Text>
            <Text>To: {to.name}</Text>
            <Text>Phone: {to.phone}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button style={styles.btn} textColor='#ef4444' onPress={onDismiss}>Cancel</Button>
            <Button style={styles.btn} mode='contained'  onPress={handleSend}>Send</Button>
          </Dialog.Actions>
        </Dialog>
  </Portal>
  )
}

export default MessageConfirmDialog