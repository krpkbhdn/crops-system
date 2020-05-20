import React from "react";
import Table from "components/table.jsx"
import ReactPaginate from "react-paginate";
import {getPageRegister} from "api/api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faEdit} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            column: ["#","Запис","Сорт","Рослина","Культура",""],
            register: [],
            activePage: 0,
            size: 5,
            pageCount: 0,
        }
    }

    componentDidMount() {
        this.handlePageChange(this.state.activePage);
    }

    handlePageChange(pageNumber) {
        getPageRegister(pageNumber.selected, this.state.size).then(res => res.data).then( data => (
            console.log(data),
            this.setState({
                register: data.content,
                pageCount: data.totalPages,
                activePage: data.pageable.pageNumber
            })
        ));
    }

    render() {
        const {column, register, size, activePage} = this.state;
        return (
            <div>
                <div className="page-section">
                    <Table column={column} title={"Реєстр"}>
                        <tbody>
                        {register.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1 + (size * activePage)}</td>
                                <td>{item.name}</td>
                                <td>{item.sort.name}</td>
                                <td>{item.sort.plant.name}</td>
                                <td>{item.sort.plant.crop.name}</td>
                                <td  style={{display: "flex", justifyContent: "flex-end"}}>
                                    <Link className="fab info" to={"/register/" + item.id}><FontAwesomeIcon icon={faArrowRight}/></Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        <div className="pagination"><ReactPaginate
                            pageCount={this.state.pageCount}
                            nextLabel='&#10095;'
                            previousLabel='&#10094;'
                            onPageChange={this.handlePageChange.bind(this)}
                        />
                        </div>
                    </Table>
                </div>
            </div>
        );
    }
}

export {RegisterPage}
