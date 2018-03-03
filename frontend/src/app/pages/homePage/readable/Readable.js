// @flow
import React, {
	Component
} from "react";
import {
	Link
} from "react-router-dom";

import "./Readable.css";

class Readable extends Component {
	render() {
		const {
			readable,
			showDetail
		} = this.props;
		return (
				<div className="readable">
		      <div className="header">
		          <div className="left">
		              [<span className="category">{readable.category}</span>]
		              <Link onClick={() => showDetail(readable.id)}
		                  to="/detail"
		                  className="title">
		                  {readable.title}
		              </Link>
		          </div>
		          <div className="right">
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

export default Readable;
