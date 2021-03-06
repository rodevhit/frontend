import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Attribute from './components/Attribute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar/>
				<div className="content">
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/attributes">
							<Attribute />
						</Route>

					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
