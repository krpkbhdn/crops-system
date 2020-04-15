import React from "react";
import Table from "components/table.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import {getPageResearches} from "api/api";
import {Link, Redirect} from "react-router-dom";

class ResearchActivePage extends React.Component {
    constructor() {
        super();
        this.state = {
            researches: [],
            pageCount: 0,
            activePage: 0,
            size: 4,
            column: ["#","Станція","Зона","Культура","Рослина","Сорт","Дата початку",""],
        }
    }

    componentDidMount() {
        this.handlePageChange(0)
    }

    handlePageChange(pageNumber) {
        getPageResearches(pageNumber.selected, this.state.size).then(res => res.data).then( data => (
            this.setState({
                researches: data.content,
                pageCount: data.totalPages,
                activePage: data.pageable.pageNumber
            })
        ));
    }

    render() {
        const {researches, column, activePage, pageCount, size} = this.state;
        return (
            <div>

                    <div className="page-section">

                        <Table column={column} title={"Активні дослідження"}>

                            <tbody>
                            {researches.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1 + (size * activePage)}</td>
                                    <td>{item.station.name}</td>
                                    <td>{item.station.climateZone.name}</td>
                                    <td>{item.sort.plant.crop.name}</td>
                                    <td>{item.sort.plant.name}</td>
                                    <td>{item.sort.name}</td>
                                    <td>{item.startDate}</td>

                                    <td style={{display: "flex", justifyContent: "flex-end"}}>
                                        <Link className="fab info" to={"/research/active/" + item.id}><FontAwesomeIcon icon={faArrowRight}/></Link>
                                    </td>
                                </tr>
                            )}
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

export {ResearchActivePage}
