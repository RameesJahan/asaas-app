import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Dialog, Portal, TextInput } from 'react-native-paper'
import { styles } from './styles';

const EditMemberDialog = ({visible, data, onDismiss, onSave}) => {

  const [name, setName] = useState(data.name);
  const [phone, setPhone] = useState(data.phone);
  const [error, setError] = useState(false)

  useEffect(() => {
    setName(data.name)
    setPhone(data.phone)
  }, [data])
  

  handleOnSave = () => {
    if(name.length <= 2 || phone.length < 10) {
      setError(true)
      return ;
    }
    onSave({name, phone});
    handleDismiss();
  }

  const handleDismiss = () => {
    setError(false)
    onDismiss()
  }

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={handleDismiss}>
            <Dialog.Title>Edit Member</Dialog.Title>
            <Dialog.Content>
              <View>
                {error && <Text style={styles.error}>Must fill required field!</Text>}
                <TextInput 
                  label="Name"
                  mode='outlined'
                  onChangeText={(text) => setName(text)}
                  value={name}
                />
                <TextInput 
                  label="Phone"
                  mode='outlined'
                  onChangeText={(text) => setPhone(text)}
                  value={phone}
                  inputMode='tel'
                />
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button style={styles.btn} onPress={handleDismiss}>Cancel</Button>
              <Button style={styles.btn} mode='contained'  onPress={handleOnSave}>Save</Button>
            </Dialog.Actions>
          </Dialog>
    </Portal>
  )
}

export default EditMemberDialog