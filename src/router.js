import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ReviewDisplay from './Reviewdisplay';


export default (
<Switch>
    <Route exact path='/' />
    <Route path="/:id/:key" component={ReviewDisplay} />
    <Route render={() => {
        return(<div>Page Not Found</div>)
    }} />
</Switch>

)