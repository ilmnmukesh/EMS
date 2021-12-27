import React from 'react';
import { HashRouter as BrowserRouter, Switch, Route } from "react-router-dom";
import App from '../../app';
import Mark from '../../pages/attendance';
import Auth from '../../pages/auth';
import Enrollment from '../../pages/enrollment';
import Fee from '../../pages/fee';
import Home from '../../pages/home'
import { StudentList, UploadMarks } from '../../teacher'
import StaffAuth from '../../teacher/auth';
import ClassSection from '../../teacher/components/class';
import MarkUpdate from '../../teacher/components/markUpdate';
import Profile from '../../teacher/components/profile';
import StaffRoutes from './staffRoutes';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/studentLogin" component={Auth} />
                <Route exact path="/staffLogin" component={StaffAuth} />
                <Route exact path="/studentHome" component={Home} />
                <Route path="/enrollment" component={Enrollment} />
                <Route path="/mark" component={Mark} />
                <Route path="/fee" component={Fee} />

                <Route
                    path="/staff"
                    component={({ match: { url } }) => (
                        <>
                            {/* <Route path="/staff/studentlist component={StudentList} /> */}
                            <Route path={`${url}/uploadMark`} component={UploadMarks} />
                            <Route exact path={`${url}/`} component={Profile} />
                            <Route path="/staff/class" component={ClassSection} />
                            <Route path="/staff/update" component={MarkUpdate} />
                        </>
                    )}
                />
            </Switch>
        </BrowserRouter>
    )
}
export default Routes;