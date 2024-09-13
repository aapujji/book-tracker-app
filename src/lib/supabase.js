import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

export const getBooks = async (from, to) => {
    const data = supabase.from('books').select('*').order('id', { ascending: true }).range(from, to);
    return data;
};

export const searchBooks = async (query) => {
    const data = await supabase.from('books').select().textSearch('title', query);
    return data;
};

export const getBooksData = async (key, value) => {
    const data = supabase.from('books').select().eq(key, value);
    return data;
};

export const getBooksDataByBookshelf = async (value) => {
    const data = supabase.from('books').select().like('bookshelves', value);
    return data;
};

export const updateBookStatus = async (value, id) => {
    const { error } = await supabase
    .from('books')
    .update({'exclusive_shelf': value})
    .eq('id', id);

    if (error) { console.log(error); }
};

export const updateBook = async (id, book) => {
    const { error } = await supabase
    .from('books')
    .update([book])
    .eq('id', id)

    if (error) { console.log(error); }
};

export const addBook = async (book) => {
    const result = supabase.from('books').insert(book).select().single();
    return result;
};

export const getBookAnnotationsData = async (id) => {
    const data = supabase.from('book_notes').select().eq('book_id', id);
    return data;
};