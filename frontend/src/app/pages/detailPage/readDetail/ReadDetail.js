// @flow
import React, {
	Component
} from "react";
import {
	connect
} from "react-redux";
import Modal from "react-modal";

import "./ReadDetail.css";
import Voter from "../../../components/voter/Voter";
import Comments from '../comments/Comments';
import {
	vote,
	createComment,
	toggleEdit,
	editChange,

} from '../actions';
import Creator from '../../../components/creator/Creator';
import { editDoc } from '../../../../utils/api';

class ReadDetail extends Component {
	readable$;

	componentWillMount() {
		this.readable$ = { ...this.props.readable };
	}

	vote = ( id, option ) => {
		if ( !this.props.voting ) {
			this.props.vote( id, option );
		}
	};

	editHandle = () => {
		if (this.props.editing) {
			// upload
			const { readable } = this.props;
			editDoc({ id: readable.id, title: readable.title, body: readable.body }).then(res => {
				this.readable$ = { ...this.props.readable };
				this.props.toggleEdit();
			});
		} else {
			this.props.toggleEdit();
		}
	}

	cancelHandle = () => {
		this.props.editChange(this.readable$.body);
		this.props.toggleEdit();
	}

	createComment = (data) => {
		if (data.parentId !== null && data.body !== null && data.author !== null) {
			const postParams = {
				parentId: this.props.readable.id,
				body: data.content,
				author: data.author
			};
			this.props.createComment(postParams);
		}	
	}
	render() {
		const {
			readable,
			voteModalOpen,
			voting,
			editing,
			editChange
		} = this.props;
		return (
			<div className="read-detail">
                <h2 className="page-header">
                    {readable.title ? readable.title : readable.error}
				</h2>
                <div className="info">
                    <span>Author:{readable.author}</span>
                    <span>Category:{readable.category}</span>
                    <span>Date:{readable.date}</span>
				</div>
				{
					editing ? <textarea className="edit-body" value={readable.body} onChange={event => editChange(event.target.value)}></textarea>
					: <div className="body">{readable.body}</div>
				}
				{
					editing ? <button onClick={this.cancelHandle}>cancel</button> : null
				}
				<button onClick={this.editHandle}>{editing ? 'Commit' : 'Edit'}</button>
				
                <Voter id={readable.id} vote={this.vote} voting={voting} voteScore={readable.voteScore} />
                <Comments />
								<Creator
										type="comment"
										title="Create a new comment"
										submit={this.createComment}/>
                <Modal
                    appElement={document.getElementById("root")}
                    className="modal"
                    overlayClassName="overlay"
                    isOpen={voteModalOpen}
                    onRequestClose={this.closeVoteModal}
                    contentLabel="Modal"
                />
            </div>
		);
	}
}

function mapStateToProps( {
	detailPage
} ) {
	const {
		showId,
		voting,
		readable,
		voteModalOpen,
		editing
	} = detailPage;
	return {
		showId,
		voting,
		readable,
		voteModalOpen,
		editing
	};
}

function mapDispatchToProps( dispatch ) {
	return {
		vote: ( showId, option ) => dispatch( vote( showId, option ) ),
		createComment: params => dispatch( createComment(params) ),
		toggleEdit: () => dispatch( toggleEdit() ),
		editChange: body => dispatch(editChange(body))
	};
}

export default connect( mapStateToProps, mapDispatchToProps )( ReadDetail );
