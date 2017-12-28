// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';
import './Voter.css';
import { vote } from '../actions';

class Voter extends Component {
	vote = (showId, option) => {
		if (!this.props.voting) {
			this.props.vote(showId, option);
		}
	};
	render() {
		const { showId, voting } = this.props;
		const { voteScore } = this.props.readable;
		return (
			<div className={voting ? 'voter disabled' : 'voter'}>
				<div
					className="button up"
					onClick={() => this.vote(showId, 'upVote')}
				>
					{voteScore > 0 ? `(${voteScore})` : ''}
					<FaThumbsOUp />
				</div>
				<div
					className="button down"
					onClick={() => this.vote(showId, 'downVote')}
				>
					{voteScore < 0 ? `(${voteScore})` : ''}
					<FaThumbsODown />
				</div>
			</div>
		);
	}
}

function mapStateToProps({ detailPage }) {
	const { showId, readable, voting } = detailPage;
	return {
		showId,
		readable,
		voting
	};
}

function mapDispatchToProps(dispatch) {
	return {
		vote: (showId, option) => dispatch(vote(showId, option))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Voter);
