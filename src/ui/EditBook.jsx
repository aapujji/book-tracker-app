import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { getBooksData, updateBook } from '../lib/supabase';
import { statusOptions } from '../lib/data';
import Dropdown from '../ui/Dropdown';
import TextInput from '../ui/TextInput';
import TextArea from '../ui/TextArea';

let newBook = {
    title: '',
    author: '',
    series: '',
    series_order: null,
    isbn: '',
    isbn13: '',
    publisher: '',
    num_of_pages: '0',
    genres: '',
    thumbnail: null,
    year_published: '',
    bookshelves: null,
    my_review: null,
    read_count: '0',
    owned_copies: '0',
    my_rating: '0',
    exclusive_shelf: 'to-read'
}

const EditBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [book, setBook] = useState(newBook);
    const [loading, setLoading] = useState(false);

    const getBook = useCallback(async () => {
        const bookData = await getBooksData('id', id);
        setBook(bookData.data[0]);
    }, []);

    useEffect(() => {
        getBook();
    }, [getBook]);

    const handleFieldChange = (event) => {
        const value = event.target.value;
        const key = event.target.name;
        let updatedBook = {...book}
        updatedBook[key] = value;
        setBook(updatedBook);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        updateBook(id,book);
        setLoading(false);
        navigate(`/books/${id}`);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-fields flex">
                <TextInput id="title" name="title" label="Title" value={book.title ?? ''} onChange={handleFieldChange} required />
                <TextInput id="author" name="author" label="Author" value={book.author ?? ''} onChange={handleFieldChange} required />
                <TextInput id="series" name="series" label="Series" value={book.series ?? ''} onChange={handleFieldChange} />
                <TextInput id="series_order" name="series_order" label="Series #" value={book.series_order ?? ''} onChange={handleFieldChange} />
                <Dropdown id="exclusive_shelf" label="Status" name="exclusive_shelf" options={statusOptions} defaultValue={book.exclusive_shelf} onChange={handleFieldChange} />    
                <TextInput id="bookshelves" name="bookshelves" label="Bookshelves" value={book.bookshelves ?? ''} onChange={handleFieldChange} />
                <TextInput id="isbn" name="isbn" label="ISBN" value={book.isbn ?? ''} onChange={handleFieldChange} size="10" />
                <TextInput id="isbn13" name="isbn13" label="ISBN13" value={book.isbn13 ?? ''} onChange={handleFieldChange} size="13" />
                <TextInput id="num_of_pages" name="num_of_pages" label="Pages" value={book.num_of_pages ?? ''} onChange={handleFieldChange} size="4"/>
                <TextInput id="year_published" name="year_published" label="Year Published" value={book.year_published} onChange={handleFieldChange} size="4" />
                <TextInput id="publisher" name="publisher" label="Publisher" value={book.publisher ?? ''} onChange={handleFieldChange} />
                <TextInput id="genres" name="genres" label="Genres" value={book.genres ?? ''} onChange={handleFieldChange} />
                {book.exclusive_shelf === 'read' && (
                    <>
                        <TextInput id="date_read" name="date_read" label="Date Read" value={book.date_read ?? ''} onChange={handleFieldChange} type="date" />
                        <TextInput id="my_rating" name="my_rating" size="5" label="Rating" value={book.my_rating ?? ''} onChange={handleFieldChange} />
                        <TextArea id="my_review" name="my_review" label="Review" />
                    </>
                )}
            </div>
            <button className="form-button" type="submit" disabled={loading}>Save</button>
        </form>
    )
}

export default EditBook;