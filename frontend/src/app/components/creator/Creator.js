import React, {
	Component
} from "react";

import "./Creator.css";

class Creator extends Component {
	submitInfo = {
		theme: null,
		content: null,
		type: null,
		author: null
	};
	submit() {
		this.props.submit(this.submitInfo);
	}
	render() {
		const {
			title,
			types,
			type
		} = this.props;
		if (this.submitInfo.type === null && types && types.length > 0) {
			this.submitInfo.type = types[0].name;
		}
		return (
			<div className="creator">
                <div className="title">
                    {title}
                    {
                        (types && types.length > 0)
                        ? <select onChange={event => this.submitInfo.type = event.target.value}>
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
									? <input onChange={event => this.submitInfo.theme = event.target.value} className="theme" placeholder="please input theme" />
									: null
								}
                <input onChange={event => this.submitInfo.author = event.target.value} className="author" placeholder="please input your name" />
                <textarea onChange={event => this.submitInfo.content = event.target.value} className="content" placeholder="please input content..."></textarea>
                <div className="buttons">
                    <span className="submit" onClick={event => this.submit()}>Submit</span>
                </div>
            </div>
		);
	}
}

export default Creator;
