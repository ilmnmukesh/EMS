import React from "react";
import { HashRouter as BrowserRouter, Switch, Route } from "react-router-dom";
import ClassSection from "../../teacher/components/class";
import MarkUpdate from "../../teacher/components/markUpdate";
import Profile from "../../teacher/components/profile";
import { UploadMarks } from "../../teacher";
const StaffRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/uploadMark" component={UploadMarks} />
                <Route exact path="/profile" component={Profile} />
                <Route path="/class" component={ClassSection} />
                {/* <Route path="/update" component={MarkUpdate} /> */}
                <Route exact path="/update/:slug" component={MarkUpdate} />
            </Switch>
        </BrowserRouter>
    );
};
export default StaffRoutes;
