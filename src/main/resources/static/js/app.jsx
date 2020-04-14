import React from 'react';
import Header from 'components/header.jsx';
import Sidebar from 'components/sidebar.jsx';

import {
    MainPage,
    CropPage,
    PlantPage,
    SortPage,
    ParameterPage,
    UnitPage,
    StationPage,
    ClimateZonePage
} from "pages/pages";

class App extends React.Component{
    render() {
        return(
            <div className="app">
                <div className="sidebar-container">
                    <Sidebar/>
                </div>
                <div className="main-container">
                    <div className="header-container">
                        <Header/>
                    </div>
                    <div className="page-container">

                        <MainPage/>
                        <StationPage/>
                        <ClimateZonePage/>
                        <SortPage/>
                        <div className="page-section">
                            <PlantPage/>
                            <CropPage/>
                        </div>
                        <div className="page-section">
                            <ParameterPage/>
                            <UnitPage/>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default App;
