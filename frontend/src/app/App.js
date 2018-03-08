// @flow
import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux'
import {
	Route,
	Redirect,
	withRouter
} from 'react-router-dom'

import HomePage from './pages/homePage/HomePage'
import DetailPage from './pages/detailPage/DetailPage'
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Redirect exact to="/all" />
				<Route exact path="/:categorie" component={HomePage} />
				<Route exact path="/:categorie/:id" component={DetailPage} />
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
