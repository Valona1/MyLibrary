import { View, Text, StyleSheet, Switch, Pressable, Alert, Image } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { scheduleReminderAfterMinutes } from '@/lib/notifications';

export default function SettingsScreen() {
  const [enabled, setEnabled] = useState(false);
  const [minutes, setMinutes] = useState('5');

  const toggleSwitch = () => {
    setEnabled(prev => !prev);
  };

  const handleSave = async () => {
    if (!enabled) {
      Alert.alert('Benachrichtigung deaktiviert ❌');
      return;
    }

    const min = parseInt(minutes);
    if (isNaN(min)) {
      Alert.alert('Ungültige Zeitangabe!');
      return;
    }

    await scheduleReminderAfterMinutes(min);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.icon}
        />
        <Text style={styles.headerTitle}>MyLibrary</Text>
      </View>
      <View style={styles.headerLine} />

      <Text style={styles.heading}>Einstellungen</Text>

      {/* Formularbereich */}
      <View style={styles.formArea}>
        <View style={styles.row}>
          <Text style={styles.label}>Leseerinnerung aktivieren:</Text>
          <Switch value={enabled} onValueChange={toggleSwitch} />
        </View>

        <Text style={styles.label}>Zeit auswählen</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={minutes}
            onValueChange={(val) => setMinutes(val)}
            enabled={enabled}
          >
            <Picker.Item label="In 1 Minute" value="1" />
            <Picker.Item label="In 5 Minuten" value="5" />
            <Picker.Item label="In 30 Minuten" value="30" />
            <Picker.Item label="In 1 Stunde" value={(60).toString()} />
            <Picker.Item label="In 2 Stunden" value={(60 * 2).toString()} />
            <Picker.Item label="In 3 Stunden" value={(60 * 3).toString()} />
            <Picker.Item label="In 4 Stunden" value={(60 * 4).toString()} />
            <Picker.Item label="In 5 Stunden" value={(60 * 5).toString()} />
          </Picker>
        </View>

        <Pressable
          style={[styles.button, { opacity: enabled ? 1 : 0.5 }]}
          onPress={handleSave}
          disabled={!enabled}
        >
          <Text style={styles.buttonText}>Erinnerung speichern</Text>
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
    marginTop: 40,
  },
  formArea: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 100,
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
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
