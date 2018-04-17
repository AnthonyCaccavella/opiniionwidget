import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ReviewDisplay from './Components/ReviewDisplay/Reviewdisplay';
import Placefinder from './Components/PlaceFinder/Placefinder';
import SelfService from './Components/SelfServiceSignUp/SelfServiceSignUp';
import ManualEntry from './Components/ManualEntry/ManualEntry';


export default (
<Switch>
    <Route exact path='/' />
    <Route path="/:id/:key" component={ReviewDisplay} />
    <Route path="/placefinder" component={Placefinder} />
    <Route path="/sign-up" component={SelfService} />
    <Route path="/manual-sign-up" component={ManualEntry} />
    <Route render={() => {
        return(<div>Page Not Found</div>)
    }} />
</Switch>

)