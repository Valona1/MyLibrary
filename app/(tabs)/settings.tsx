import {View, Text, StyleSheet, Switch, Pressable, Alert, Image,} from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function SettingsScreen() {
  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState('');

  const toggleSwitch = () => setEnabled(!enabled);

  const handleSave = () => {
    if (enabled && !time) {
      Alert.alert('Bitte eine Zeit auswählen!');
      return;
    }

    // später tuen ich speichere
    Alert.alert('Erinnerung gespeichert ✅');
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


      <Text style={styles.heading}>Einstellungen</Text>

      {/* Formularbereich */}
      <View style={styles.formArea}>
        <View style={styles.row}>
          <Text style={styles.label}>Tägliche Leseerinnerung aktivieren:</Text>
          <Switch value={enabled} onValueChange={toggleSwitch} />
        </View>

        <Text style={styles.label}>Zeit</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={time}
            onValueChange={(itemValue) => setTime(itemValue)}
            enabled={enabled}
          >
            <Picker.Item label="Wähle die Zeit deiner Leseerinnerung aus" value="" />
            <Picker.Item label="08:00" value="08:00" />
            <Picker.Item label="12:00" value="12:00" />
            <Picker.Item label="18:00" value="18:00" />
            <Picker.Item label="20:00" value="20:00" />
          </Picker>
        </View>

        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Erinnerung Speichern</Text>
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
    marginTop: 50,
  },
  formArea: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 120,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
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
