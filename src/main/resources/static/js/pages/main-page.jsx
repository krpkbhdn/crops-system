import React from "react";
import InfoCard from "components/card.jsx";
import Table from "components/table.jsx";

class MainPage extends React.Component {
    render() {
        return (
            <div>
                <div className="page-section">
                    <InfoCard/>
                    <InfoCard/>
                    <InfoCard/>
                    <InfoCard/>
                </div>

                <div className="page-section">
                </div>
            </div>
        );
    }
}

export  { MainPage };
