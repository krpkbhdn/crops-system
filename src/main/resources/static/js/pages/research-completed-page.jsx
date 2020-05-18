import React from "react";
import Table from "components/table.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {getSortsWhereIsCompletedResearch, getSummaryOfSort} from "api/api";
import {Link} from "react-router-dom";

class ResearchCompletedPage extends React.Component {
    constructor() {
        super();
        this.state = {
            sorts: [],
            column: ["#","Сорт","Рослина","Культура",""],
        }
    }

    componentDidMount() {
        this.handlePageChange()
    }

    handlePageChange() {
        getSortsWhereIsCompletedResearch().then(res => res.data).then(data => (this.setState({sorts: data})));
    }

    handlerOnClick(id) {
        getSummaryOfSort(id).then( res => res.data).then(data => console.log(data));
    }

    render() {
        const {sorts, column} = this.state;
        return (
            <div>

                <div className="page-section">

                    <Table column={column} title={"Завершені дослідження"}>

                        <tbody>
                        {sorts.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.plant.name}</td>
                                <td>{item.plant.crop.name}</td>
                                <td style={{display: "flex", justifyContent: "flex-end"}}>
                                    <button className="fab info" onClick={() => this.handlerOnClick(item.id)}>
                                        <FontAwesomeIcon icon={faArrowRight}/>
                                    </button>
                                    {/*<Link className="fab info" to={"/research/active/" + item.id}><FontAwesomeIcon icon={faArrowRight}/></Link>*/}
                                </td>
                            </tr>
                        )}
                        </tbody>
                        <div></div>
                    </Table>
                </div>
            </div>
        );
    }
}

export {ResearchCompletedPage}
