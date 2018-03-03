// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';
import './Voter.css';

class Voter extends Component {
	render() {
		const { id, voting, vote, voteScore } = this.props;
		return (
			<div className={voting ? 'voter disabled' : 'voter'}>
				<div
					className="button up"
					onClick={() => vote( id, 'upVote')}
					title={voteScore}
				>
					{voteScore > 0 ? `(${voteScore > 99 ? '99+' : voteScore})` : ''}
					<FaThumbsOUp />
				</div>
				<div
					className="button down"
					onClick={() => vote( id, 'downVote')}
					title={voteScore}
				>
					{voteScore < 0 ? `(${voteScore < -99 ? '99-' : voteScore})` : ''}
					<FaThumbsODown />
				</div>
			</div>
		);
	}
}

function mapStateToProps({ detailPage }) {
	const { voting } = detailPage;
	return {
		voting
	};
}

export default connect(mapStateToProps)(Voter);
