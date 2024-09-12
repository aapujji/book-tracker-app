import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(import.meta.env.VITE_PUBLIC_SUPABASE_URL, import.meta.env.VITE_PUBLIC_SUPABASE_KEY);

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