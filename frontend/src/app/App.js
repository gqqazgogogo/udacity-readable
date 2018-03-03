// @flow
import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux'
import {
	Route,
	withRouter
} from 'react-router-dom'

import HomePage from './pages/homePage/HomePage'
import DetailPage from './pages/detailPage/DetailPage'
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Route exact path="/" component={HomePage} />
				<Route exact path="/detail" component={DetailPage} />
      		</div>
		)
	}
}

function mapStateToProps( {
	homePage,
	detailPage
} ) {
	return {}
}

function mapDispatchToProps( dispatch ) {
	return {}
}
export default withRouter(connect( mapStateToProps, mapDispatchToProps )( App ))
