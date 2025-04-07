import { View, Text, StyleSheet, Pressable, FlatList, Image,} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Book = {
  id: string;
  title: string;
  author: string;
  status: string;
};

export default function HomeScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filter, setFilter] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      const loadBooks = async () => {
        try {
          const storedBooks = await AsyncStorage.getItem('books');
          const parsed = storedBooks ? JSON.parse(storedBooks) : [];
          setBooks(parsed);
        } catch (error) {
          console.error('Fehler beim Laden der Bücher', error);
        }
      };

      loadBooks();
    }, [])
  );

  const filteredBooks = filter
    ? books.filter((b) => b.status === filter)
    : [];

  const hasAnyBooks = books.length > 0;

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

      {hasAnyBooks ? (
        <>
          <Text style={styles.heading}>Meine Bücher</Text>

          {/* Filter-Buttons */}
          <View style={styles.buttonRow}>
            <Pressable
              style={[
                styles.filterButton,
                filter === 'reading' && styles.activeFilter,
              ]}
              onPress={() => setFilter('reading')}
            >
              <Text>Lese ich gerade</Text>
            </Pressable>

            <Pressable
              style={[
                styles.filterButton,
                filter === 'unread' && styles.activeFilter,
              ]}
              onPress={() => setFilter('unread')}
            >
              <Text>Will ich lesen</Text>
            </Pressable>

            <Pressable
              style={[
                styles.filterButton,
                filter === 'finished' && styles.activeFilter,
              ]}
              onPress={() => setFilter('finished')}
            >
              <Text>Gelesen</Text>
            </Pressable>
          </View>

          {filteredBooks.length === 0 ? (
            <Text style={styles.emptyText}>Keine Bücher vorhanden</Text>
          ) : (
            <FlatList
              data={filteredBooks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.bookCard}>
                  <Text style={styles.bookTitle}>{item.title}</Text>
                  <Text style={styles.bookAuthor}>von {item.author}</Text>
                </View>
              )}
            />
          )}
        </>
      ) : (
        <View style={styles.body}>
          <Text style={styles.emptyText}>Keine Bücher vorhanden</Text>
          <Text style={styles.hintText}>
            Füge dein erstes Buch hinzu, um mit deiner Bibliothek zu starten
          </Text>
        </View>
      )}
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
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 50,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ade8f4',
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 50,
  },
  activeFilter: {
    backgroundColor: '#5fa8d3',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  hintText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  bookCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
  },
});
