import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function LibraryScreen() {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.quad),
        }),
      ])
    ).start();
  }, []);

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

      {/* Trennlinie */}
      <View style={styles.headerLine} />

      {/* Inhalt */}
      <View style={styles.body}>
        <Text style={styles.emptyText}>Keine Bücher vorhanden</Text>
        <Text style={styles.hintText}>
          Füge dein erstes Buch hinzu, um mit deiner Bibliothek zu starten
        </Text>
      </View>

      {/* Animierter Pfeil ganz unten */}
        <Animated.View
        style={{
          transform: [{ translateY: bounceAnim }],
          marginBottom: 20,
          alignItems: 'center',
        }}
      >
        <Ionicons name="arrow-down" size={40} color="#000" />
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerLine: {
    height: 2,
    backgroundColor: '#a1837a',
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
  spacer: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  hintText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginTop: 50
  },
  arrow: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 20,
    color: '#000', // schwarz
  },
});
