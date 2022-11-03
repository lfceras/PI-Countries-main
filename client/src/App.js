import { Route } from 'react-router-dom';
import './App.css';

import countryDetail from './components/countryDetail';
import CreateActivity from './components/createActivity';

import Home from './components/home';
import LandingPage from './components/landinPage/LandingPage'

// import createActivity from './components/createActivity';







function App() {
  return (
    <div className="App">
      
       
      
      <Route exact path='/' component={LandingPage} />
      <Route exact path={'/home'} component={Home} />
      <Route  exact path = {'/activities'} component= {CreateActivity}/>
      <Route path = '/country/:id' component= {countryDetail}/>
    </div>
  );
}

export default App;
