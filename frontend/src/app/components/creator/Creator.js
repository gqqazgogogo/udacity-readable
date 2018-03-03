import React, {
	Component
} from "react";

import "./Creator.css";

class Creator extends Component {
	submit() {
		if ( this.contentDom.value !== '' && this.themeDom.value !== '' && this.authorDom.value !== '' ) {
			this.props.submit( {
				theme: this.themeDom ? this.themeDom.value : null,
				content: this.contentDom.value,
				type: this.typeDom ? this.typeDom.value : null,
				author: this.authorDom.value
			} );
		}
	}
	render() {
		const {
			title,
			types,
			type
		} = this.props;
		return (
			<div className="creator">
                <div className="title">
                    {title}
                    {
                        (types && types.length > 0)
                        ? <select ref={dom => this.typeDom = dom}>
                            {
                                types.map(type => (
                                    <option key={type.name} value={type.name}>{type.name}</option>
                                ))
                            }
                        </select>
                        : null
                    }
                </div>
								{
									type === 'read'
									? <input ref={dom => this.themeDom = dom} className="theme" placeholder="please input theme" />
									: null
								}
                <input ref={dom => this.authorDom = dom} className="author" placeholder="please input your name" />
                <textarea ref={dom => this.contentDom = dom} className="content" placeholder="please input content..."></textarea>
                <div className="buttons">
                    <span className="submit" onClick={event => this.submit()}>Submit</span>
                </div>
            </div>
		);
	}
}

export default Creator;
