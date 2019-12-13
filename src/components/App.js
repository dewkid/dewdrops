import React from 'react';
import { Route, Switch } from 'react-router-dom';
// eslint-disable-next-line import/no-named-as-default
import Header from './common/Header';
// eslint-disable-next-line import/no-named-as-default
import DewdropsPage from './dewdrops/DewdropsPage';
// eslint-disable-next-line import/no-named-as-default
import ViewDewdropPage from './dewdrops/ViewDewdropPage';
// eslint-disable-next-line import/no-named-as-default
import ManageDewdropsPage from './dewdrops/ManageDewdropsPage';
import AboutPage from './about/AboutPage';
import PageNotFound from './PageNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='container-fluid'>
      <Header />
      <div style={{ margin: 30 }}>
        <Switch>
          <Route exact path='/' component={DewdropsPage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/dewdropedit/:id' component={ManageDewdropsPage} />
          <Route path='/dewdropedit' component={ManageDewdropsPage} />
          <Route path='/dewdrop/:id' component={ViewDewdropPage} />
          <Route path='/dewdrop' component={ViewDewdropPage} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
