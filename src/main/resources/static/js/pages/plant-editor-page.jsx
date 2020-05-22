import React from "react";

class PlantEditorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageTitle: "",
            pageModeEdit: false
        }
    }

    componentDidMount() {
        const matchParams = this.props.match.params;
        console.log(matchParams);
    }

    render() {
        return (
            <div>
                <div className="page-section">
                    <div className="card">
                        <div className="card-title">

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export {PlantEditorPage}
