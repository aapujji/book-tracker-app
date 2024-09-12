import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { getBooksDataByBookshelf } from '../lib/supabase';
import { months } from '../lib/data';
import Dropdown from './Dropdown';
import BookCardList from './BookCardList';

const MonthBookCardList = () => {
    const [books, setBooks] = useState([]);
    const today = new Date();
    const thisMonthShort = today.toLocaleString('default', { month: 'short' }).toLowerCase();
    const thisMonthLong = today.toLocaleString('default', { month: 'long' });
    const [month, setMonth] = useState(thisMonthShort);
    const [heading, setHeading] = useState(thisMonthLong);
    const [readCount, setReadCount] = useState(0);

    const getBooks = useCallback(async (month) => {
        const booksData = await getBooksDataByBookshelf(`%${month}-tbr%`);
        setBooks(booksData.data);
        console.log(booksData);
        const booksRead = booksData.data.filter(book => book.exclusive_shelf === 'read');
        setReadCount(booksRead.length);
    }, []);

    useEffect(() => {
        getBooks(month);
    }, [getBooks, month]);

    const handleStatusChange = (event) => {
        const monthValue = event.target.value;
        const selected = months.filter(month => month.value === monthValue);
        const monthLabel = selected[0].label;
        setMonth(monthValue);
        setHeading(monthLabel);
        getBooks(monthValue);
    }

    return (
        <div className="book-list-container">
            <div className="book-list-header flex">
                <h2 className="book-list-heading">TBR | {heading}</h2>
                <div className="book-list-filters flex">
                    <Dropdown id="months" name="months" options={months} defaultValue={month} onChange={handleStatusChange} />
                    <div className="book-list-read">
                        <FontAwesomeIcon className="icon" icon={faCircleCheck} />
                        {readCount}/{books.length}
                    </div>
                </div>
            </div>
            <BookCardList books={books} />
        </div>
    )
}

export default MonthBookCardList;