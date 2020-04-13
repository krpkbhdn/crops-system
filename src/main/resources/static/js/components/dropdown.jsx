import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";


class Dropdown extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            items: [
                {id: "1", value: "Item 1"},
                {id: "2", value: "Item 2"},
                {id: "3", value: "Item 3"},
                {id: "4", value: "Item 4"},
                {id: "5", value: "Item 5"},
                {id: "6", value: "Item 6"},
                {id: "7", value: "Item 7"},
            ]
        }
    }

    openDropdown() {
        this.setState({
            isOpen: true
        })
    }

    closeDropdown() {
        this.setState({
            isOpen: false
        })
    }

    render() {
        const {items, isOpen} = this.state;
        return (
            <div className="dropdown" onClick={() => this.openDropdown()}  onBlur={() => this.closeDropdown()} >
                <div className="dr-header ">
                    <input type="text" />
                    <FontAwesomeIcon className="dr-icon" icon={faAngleDown}/>
                </div>
                <div  className="dr-container" style={{display: isOpen ? "block" : "none"}}>
                    <ul>
                        {items.map((item, index) =>
                            <li key={index} className="dr-item"
                                onClick={(e)=>console.log(item) }>{item.value}</li>
                        )}
                    </ul>
                </div>

            </div>
        );
    }
}

export default Dropdown;
