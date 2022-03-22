import './App.css';
import Navbar from './components/Navbar';
import Register from './components/Register';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from './components/Home';
import Edit from './components/Edit';
import Details from './components/Details';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/edit/:id" component={Edit} />
        <Route exact path="/view/:id" component={Details} />
      </Router>
    </div>
  );
}

export default App;
