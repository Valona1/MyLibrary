import { View, Text, StyleSheet, Pressable, FlatList, Image, Modal, } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Book } from '@/models/book';
import { getBooks, deleteBookById, updateBook } from '@/lib/bookStorage';
import { updateRating, removeBookRating } from '@/lib/bookStorage';


export default function HomeScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [ratingBook, setRatingBook] = useState<Book | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const loadBooks = async () => {
    const loaded = await getBooks();
    setBooks(loaded);
  };  

  useFocusEffect(
    useCallback(() => {
      loadBooks();
    }, [])
  );

  const filteredBooks = filter
    ? books.filter((b) => b.status === filter)
    : [];

  const hasAnyBooks = books.length > 0;

  const openBookModal = (book: Book) => {
    setSelectedBook(book);
    setNewStatus(book.status);
    setModalVisible(true);
  };

  const deleteBook = async () => {
    if (!selectedBook) return;

    await deleteBookById(selectedBook.id);
    await loadBooks();
    setModalVisible(false);
    setSelectedBook(null);
  };

  const changeStatus = async () => {
    if (!selectedBook) return;

    await updateBook({ ...selectedBook, status: newStatus });
    await loadBooks();
    setModalVisible(false);
    setSelectedBook(null);
  };

  const openRatingModal = (book: Book) => {
    setRatingBook(book);
    setSelectedRating(book.rating || 0);
    setRatingModalVisible(true);
  };

  const saveRating = async () => {
    if (!ratingBook) return;
    await updateRating(ratingBook.id, selectedRating);
    await loadBooks();
    setRatingModalVisible(false);
    setRatingBook(null);
  };
  
  const removeRating = async () => {
    if (!ratingBook) return;
    await removeBookRating(ratingBook.id);
    await loadBooks();
    setRatingModalVisible(false);
    setRatingBook(null);
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

      {hasAnyBooks ? (
        <>
          <Text style={styles.heading}>Meine Bücher</Text>

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
                <Pressable onPress={() => openBookModal(item)}>
                  <View style={styles.bookCard}>
                    <View style={styles.bookRow}>
                      <View>
                      <Text style={styles.bookTitle}>
                          {item.title}{' '}
                          {item.rating ? `⭐ ${item.rating}/5` : ''}
                        </Text>
                        <Text style={styles.bookAuthor}>von {item.author}</Text>
                      </View>
                      {item.status === 'finished' && (
                        <Pressable onPress={() => openRatingModal(item)}>
                          <Text style={styles.starButton}>⭐</Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </Pressable>
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

      {/* Modal – Buchdetails */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>❌</Text>
            </Pressable>

            {selectedBook && (
              <>
                <Text style={styles.modalTitle}>{selectedBook.title}</Text>
                <Text style={styles.modalAuthor}>von {selectedBook.author}</Text>

                <View style={styles.modalButtons}>
                  <Pressable style={styles.deleteButton} onPress={deleteBook}>
                    <Text style={styles.deleteText}>🗑️ Löschen</Text>
                  </Pressable>

                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={newStatus}
                      onValueChange={(value) => setNewStatus(value)}
                    >
                      <Picker.Item label="Noch nicht gelesen" value="unread" />
                      <Picker.Item label="Lese ich gerade" value="reading" />
                      <Picker.Item label="Fertig gelesen" value="finished" />
                    </Picker>

                    <Pressable
                      style={styles.saveStatusButton}
                      onPress={changeStatus}
                    >
                      <Text style={styles.saveStatusText}>Speichern</Text>
                    </Pressable>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal – Bewertung */}
      <Modal visible={ratingModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setRatingModalVisible(false)}
            >
              <Text style={styles.closeText}>❌</Text>
            </Pressable>

            <Text style={styles.modalTitle}>Bewertung</Text>

            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              {[1, 2, 3, 4, 5].map((num) => (
                <Pressable key={num} onPress={() => setSelectedRating(num)}>
                  <Text style={{ fontSize: 30, marginHorizontal: 5 }}>
                    {num <= selectedRating ? '★' : '☆'}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Pressable style={styles.saveStatusButton} onPress={saveRating}>
              <Text style={styles.saveStatusText}>Speichern</Text>
            </Pressable>

            <Pressable
              style={[styles.deleteButton, { marginTop: 10 }]}
              onPress={removeRating}
            >
              <Text style={styles.deleteText}>🗑 Bewertung löschen</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    width: 120,
    height: 120,
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
    marginBottom: 30,
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
  bookRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#555',
  },
  starButton: {
    fontSize: 22,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 25,
    width: '85%',
    alignItems: 'center',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalAuthor: {
    fontSize: 16,
    color: '#444',
    marginBottom: 20,
  },
  modalButtons: {
    width: '100%',
  },
  deleteButton: {
    backgroundColor: '#ffe5e5',
    padding: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  deleteText: {
    fontSize: 14,
    color: '#b00020',
    fontWeight: 'bold',
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    marginTop: 30,
  },
  saveStatusButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    alignSelf: 'stretch',
  },
  saveStatusText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 18,
  },
});
