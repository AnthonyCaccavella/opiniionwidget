import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ReviewDisplay from './Components/ReviewDisplay/Reviewdisplay';
import Placefinder from './Components/PlaceFinder/Placefinder';


export default (
<Switch>
    <Route exact path='/' />
    <Route path="/:id/:key" component={ReviewDisplay} />
    <Route path="/placefinder" component={Placefinder} />
    <Route render={() => {
        return(<div>Page Not Found</div>)
    }} />
</Switch>

)