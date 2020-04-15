import React from 'react';
import Header from 'components/header.jsx';
import Sidebar from 'components/sidebar.jsx';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {
    ClimateZonePage,
    CropPage,
    MainPage,
    ParameterPage,
    PlantPage,
    ResearchActivePage,
    ResearchNewPage,
    SortPage,
    StationPage,
    UnitPage
} from "pages/pages";

class App extends React.Component{
    render() {
        return(
            <div className="app">
                <Router>
                <div className="sidebar-container">
                    <Sidebar/>
                </div>
                <div className="main-container">
                    <div className="header-container">
                        <Header/>
                    </div>
                    <div className="page-container">

                            <Switch>
                                <Route exact path="/" component={MainPage}/>
                                <Route path="/crop" component={CropPage}/>
                                <Route path="/plant" component={PlantPage}/>
                                <Route path="/sort" component={SortPage}/>
                                <Route path="/climate-zone" component={ClimateZonePage}/>
                                <Route path="/station" component={StationPage}/>
                                <Route path="/unit" component={UnitPage}/>
                                <Route path="/parameter" component={ParameterPage}/>
                                <Route path="/research/new" component={ResearchNewPage}/>
                                <Route path="/research/active" component={ResearchActivePage}/>
                                <Route path="/research/completed" component={ResearchActivePage}/>
                            </Switch>

                        {/*<MainPage/>*/}
                        {/*<StationPage/>*/}
                        {/*<ClimateZonePage/>*/}
                        {/*<SortPage/>*/}
                        {/*<div className="page-section">*/}
                        {/*    <PlantPage/>*/}
                        {/*    <CropPage/>*/}
                        {/*</div>*/}
                        {/*<div className="page-section">*/}
                        {/*    <ParameterPage/>*/}
                        {/*    <UnitPage/>*/}
                        {/*</div>*/}
                    </div>
                </div>
                </Router>
            </div>

        );
    }
}

export default App;
