import AsyncStorage from '@react-native-async-storage/async-storage';

export type Book = {
  id: string;
  title: string;
  author: string;
  status: string;
  rating?: number | null;
};

const STORAGE_KEY = 'books';

export const getBooks = async (): Promise<Book[]> => {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveBooks = async (books: Book[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

export const deleteBookById = async (id: string) => {
  const books = await getBooks();
  const filtered = books.filter((b) => b.id !== id);
  await saveBooks(filtered);
};

export const updateBook = async (updatedBook: Book) => {
  const books = await getBooks();
  const updated = books.map((b) =>
    b.id === updatedBook.id ? updatedBook : b
  );
  await saveBooks(updated);
};

export const updateRating = async (id: string, rating: number) => {
    const books = await getBooks();
    const updated = books.map((b) =>
      b.id === id ? { ...b, rating } : b
    );
    await saveBooks(updated);
  };
  
  export const removeBookRating = async (id: string) => {
    const books = await getBooks();
    const updated = books.map((b) =>
      b.id === id ? { ...b, rating: null } : b
    );
    await saveBooks(updated);
  };  
