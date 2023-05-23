import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/home';
import {ActivityCreate} from './components/Form/Form'
import Detail from './components/Detail/Detail';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path= '/' component={LandingPage}/>
          <Route exact path= '/home' component={Home}/>
          <Route exact path= '/activity' component={ActivityCreate}/>
          <Route path='/detail/:id' component = {Detail}/>
          <Route exact path = '/Home/:*' component = {Detail}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
