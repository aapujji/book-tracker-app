import BookBanner from "./BookBanner";
import MonthBookCardList from "./MonthBookCardList";
import SearchForm from "./searchForm";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <SearchForm />
            <BookBanner />
            <MonthBookCardList />
        </div>
    )
}

export default Dashboard;