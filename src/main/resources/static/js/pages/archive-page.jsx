import React from "react";
import Table from "components/table.jsx";

class ArchivePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            column: ["#","Сорт","Рослина","Культура",""]
        }
    }

    render() {
        const {column} = this.state;
        return (
            <div>
                <div className="page-section">
                    <div className="page-section">
                        <Table column={column} title={"Архів"}>
                            <tbody>

                            </tbody>
                            <div></div>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export {ArchivePage}
