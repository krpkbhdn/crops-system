import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCaretDown, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component{
    render() {
        return(
            <header id="header">
                <div className="nav-menu">
                    <ul className="menu">
                        <li className="menu-item">

                            <div className="user-card">
                                <div className="user-card__img">
                                    <img src="/file/user.png" alt=""/>
                                </div>
                                <div className="user-card__info">
                                    <div className="user-card__user-name">
                                        Кириленко Василь
                                    </div>
                                    <div className="user-card__user-position">
                                        Агроном
                                    </div>
                                </div>
                                <div className="user-card__caret">
                                    <FontAwesomeIcon icon={faCaretDown}/>
                                </div>
                            </div>
                        </li>
                        <li className="menu-item">
                            <div className="menu-btn">
                                <FontAwesomeIcon className="icon" icon={faSignOutAlt}/>
                                Вихід
                            </div>
                        </li>
                    </ul>
                </div>
            </header>
        );
    }
}

export default Header;
