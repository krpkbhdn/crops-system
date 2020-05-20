import React from "react";
import Table from "components/table.jsx";
import {getSortsWhereIsArchivedResearch} from "api/api";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

class ArchivePage extends React.Component {
    constructor() {
        super();
        this.state = {
            archive: [],
            column: ["#","Сорт","Рослина","Культура",""],
        }
    }

    componentDidMount() {
        this.handlePageChange()
    }

    handlePageChange() {
        getSortsWhereIsArchivedResearch().then(res => res.data).then(data => (this.setState({archive: data})));
    }

    render() {
        const {archive, column} = this.state;
        console.log(archive)
        return (
            <div>

                <div className="page-section">

                    <Table column={column} title={"Архів"}>

                        <tbody>
                        {archive.map((item, index) =>
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.plant.name}</td>
                                <td>{item.plant.crop.name}</td>
                                <td style={{display: "flex", justifyContent: "flex-end"}}>
                                    <Link className="fab info" to={"/archive/" + item.id}><FontAwesomeIcon icon={faArrowRight}/></Link>
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

export {ArchivePage}
