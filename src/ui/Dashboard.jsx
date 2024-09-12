import BookBanner from "./BookBanner";
import MonthBookCardList from "./MonthBookCardList";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <BookBanner />
            <MonthBookCardList />
        </div>
    )
}

export default Dashboard;