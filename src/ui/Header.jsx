import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    return (
        <div className="header flex">
            <FontAwesomeIcon icon={faBookOpen} />   
        </div>
    )
}

export default Header;