import { View, Text, StyleSheet, TextInput, Pressable, Alert, Image } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function AddBookScreen() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('');

  const handleAddBook = () => {
    if (!title || !author || !status) {
      Alert.alert('Bitte alle Felder ausfüllen!');
      return;
    }

    // nacher tuen ich das speichere da hinzufüge
    Alert.alert('Buch hinzugefügt ✅');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View>
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={styles.icon}
          />
          <Text style={styles.headerTitle}>MyLibrary</Text>
        </View>
        <View style={styles.headerLine} />
      </View>


      <Text style={styles.heading}>Zur Bibliothek hinzufügen</Text>

      {/* Formular */}
      <View style={styles.formArea}>
        <Text style={styles.label}>Name des Buches</Text>
        <TextInput
          style={styles.input}
          placeholder='z.B "Der Hobbit"'
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Autor des Buches</Text>
        <TextInput
          style={styles.input}
          placeholder='z.B "J.R.R. Tolkien"'
          value={author}
          onChangeText={setAuthor}
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label="Wähle deinen aktuellen Status" value="" />
            <Picker.Item label="Noch nicht gelesen" value="unread" />
            <Picker.Item label="Lese ich gerade" value="reading" />
            <Picker.Item label="Fertig gelesen" value="finished" />
          </Picker>
        </View>

        <Pressable style={styles.button} onPress={handleAddBook}>
          <Text style={styles.buttonText}>Hinzufügen</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 15,
  },
  headerLine: {
    height: 2,
    backgroundColor: '#a1837a',
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
  },
  formArea: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 50,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#f3e5e1',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
