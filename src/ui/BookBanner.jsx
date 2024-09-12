import { useState, useEffect, useCallback } from 'react';
import { getBooksData } from "../lib/supabase";
import BookBannerCard from './BookBannerCard';

const BookBanner = () => {
    const [currentlyReading, setCurrentlyReading] = useState([]);

    const getCurrentlyReading = useCallback(async () => {
        const booksData = await getBooksData('exclusive_shelf', 'currently-reading');
        setCurrentlyReading(booksData.data);
    }, []);

    useEffect(() => {
        getCurrentlyReading();
    }, [getCurrentlyReading]);

    return (
        <section className="flex book-banner">
            {currentlyReading.map(book => (
                <BookBannerCard book={book} key={book.id} />
            ))}
        </section>
    )
}

export default BookBanner;