import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    return (
        <div className="header flex">
            <Link to={'/dashboard'}>
                <FontAwesomeIcon icon={faBookOpen} />   
            </Link>
        </div>
    )
}

export default Header;