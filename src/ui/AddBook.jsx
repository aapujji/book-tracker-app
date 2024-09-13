import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase} from '../lib/supabase';
import TextInput from "./TextInput";
import Dropdown from "./Dropdown";
import TextArea from "./TextArea";

let newBook = {
    title: '',
    author: '',
    series: '',
    series_order: null,
    isbn: '',
    isbn13: '',
    publisher: '',
    num_of_pages: 0,
    genres: '',
    thumbnail: null,
    year_published: null,
    bookshelves: 'needs-star',
    my_review: null,
    read_count: '0',
    owned_copies: '0',
    my_rating: '0',
    exclusive_shelf: 'to-read'
}

const AddBook = () => {
    const location = useLocation();
    const state = location.state;
    const googleBook = state.googleBook;
    console.log(new Date(googleBook.publishedDate).getFullYear());

    const [ book, setBook ] = useState(newBook);
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    if (googleBook.length !== 0) {
        let genres = '';
        googleBook.categories.map((category) => genres += `${category},` );
        newBook = {
            title: googleBook.title,
            author: googleBook.authors[0],
            series: book.series,
            series_order: book.series_order,
            isbn: googleBook.industryIdentifiers[0].identifier,
            isbn13: googleBook.industryIdentifiers[1].identifier,
            publisher: googleBook.publisher,
            num_of_pages: googleBook.pageCount,
            genres: genres,
            thumbnail: googleBook.imageLinks.thumbnail,
            year_published: new Date(googleBook.publishedDate).getFullYear(),
            my_rating: book.my_rating,
            bookshelves: book.bookshelves,
            my_review: book.my_review,
            read_count: book.read_count,
            owned_copies: book.owned_copies,
            exclusive_shelf: book.exclusive_shelf
        }
    }

    useEffect(() => {
        if (googleBook.length !== 0) {
            setBook(newBook);
        }
    }, [googleBook, setBook])

    const statusOptions = [
        {
            label: 'Want To Read',
            value: 'to-read'
        },
        {
            label: 'Currently Reading',
            value: 'currently-reading'
        },
        {
            label: 'Read',
            value: 'read'
        }
    ];

    const handleFieldChange = (event) => {
        const label = event.target.name;
        const value = event.target.value
        let updatedBook = {...book};
        updatedBook[label] = value;
        setBook(updatedBook);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        const result = await supabase.from('books').insert(book).select().single();
        let id = result.data.id;
        setBook(result.data);
        setLoading(false);
        //console.log(book_id);
        navigate(`/books/${id}/`);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            {book.thumbnail && (
                <img src={book.thumbnail} alt={book.title} />
            )}
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
            <button className="form-button" type="submit" disabled={loading}>Add Book</button>
        </form>
    )
}

export default AddBook;