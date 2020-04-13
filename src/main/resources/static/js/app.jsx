import React from 'react';
import Header from 'components/header.jsx';
import Sidebar from 'components/sidebar.jsx';

import { MainPage, CropPage, PlantPage } from "pages/pages";

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
                        {/*<MainPage/>*/}
                        {/*<CropPage/>*/}
                        <PlantPage/>
                    </div>
                </div>

            </div>

        );
    }
}

export default App;
