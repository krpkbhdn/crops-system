import React from "react";
import Table from "components/table.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {getSortsWhereIsCompletedResearch} from "api/api";
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
                                    <Link className="fab info" to={"/research/completed/" + item.id}><FontAwesomeIcon icon={faArrowRight}/></Link>
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
