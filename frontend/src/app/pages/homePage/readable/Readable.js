// @flow
import React, {
	Component
} from "react";
import {
	Link
} from "react-router-dom";
import { connect } from "react-redux";
import Voter from '../../../components/voter/Voter';
import "./Readable.css";
import { vote, deleteReadable } from '../actions';

class Readable extends Component {
	vote = ( id, option ) => {
		if ( !this.props.voting ) {
			this.props.vote( id, option );
		}
	};
	deleteRead = (id) => {
		this.props.deleteReadable(id);
	}
	render() {
		const {
			readable,
			showDetail,
			voting,
			categorie
		} = this.props;
		return (
				<div className="readable">
		      <div className="header">
		          <div className="left">
		              [<span className="category">{readable.category}</span>]
		              <Link onClick={() => showDetail(readable.id)}
		                  to={`/${categorie}/${readable.id}`}
		                  className="title">
		                  {readable.title}
		              </Link>
		          </div>
		          <div className="right">
									<span className="vote">
											<button onClick={event => this.deleteRead(readable.id)}>delete</button>
									</span>
		              <span className="vote">
		                  vote:
											<span className={`score ${readable.voteScore > 0? "up": "down"}`}>
		                      {readable.voteScore}
		                  </span>
		              </span>
		              <span className="commentCount">
		                  comment:({readable.commentCount})
		              </span>
		          </div>
		      </div>
		      <div className="content">
		          <div className="body">{readable.body}</div>
			  </div>
			  <Voter vote={( id, option ) => this.vote(readable.id, option)} voting={voting} voteScore={readable.voteScore} />
		      <div className="footer">
		          <span className="date">{readable.date}</span>
		          <span className="author">
		              post by:{readable.author}
		          </span>
		      </div>
		  	</div>
		);
	}
}

function mapStateToProps( {
	homePage
} ) {
	const {
		categorie,
		voting
	} = homePage;
	return {
		categorie,
		voting
	};
}

function mapDispatchToProps( dispatch ) {
	return {
		vote: ( showId, option ) => dispatch( vote( showId, option ) ),
		deleteReadable: ( id ) => dispatch( deleteReadable( id ) )
	};
}

export default connect( mapStateToProps, mapDispatchToProps )( Readable );
