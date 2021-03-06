// @flow
const api = 'http://localhost:3001';
let token = localStorage.token;
if (!token)
	token = localStorage.token = Math.random()
		.toString(36)
		.substr(-8);
const headers = {
	Accept: 'application/json',
	Authorization: token,
	'Content-Type': 'application/json'
};

export const getCategories = (): Promise<Categories[]> =>
	fetch(`${api}/categories`, {
		headers
	})
		.then(res => res.json())
		.then(data => data.categories);

export const getAllPosts = (): Promise<DocDetail[]> =>
	fetch(`${api}/posts`, {
		headers
	}).then(res => res.json());

export const getPostBy = (type: string): Promise<DocDetail[]> =>
	fetch(`${api}/${type}/posts`, {
		headers
	}).then(res => res.json());

export const getDocDetail = (id: string): Promise<DocDetail> =>
	fetch(`${api}/posts/${id}`, {
		headers
	}).then(res => res.json());

export const postDoc = (doc: PostDocInfo) =>
	fetch(`${api}/posts`, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			...doc,
			id: `${token}${Date.now()}`, // !!! not truly uuid
			timestamp: Date.now()
		})
	}).then(res => res.json());

export const editDoc = ({ id, title, body }) =>
	fetch(`${api}/posts/${id}`, {
		method: 'PUT',
		headers,
		body: JSON.stringify({
			title,
			body
		})
	}).then(res => res.json());

export const voteDoc = (id: string, option: 'upVote' | 'downVote') =>
	fetch(`${api}/posts/${id}`, {
		method: 'POST',
		headers,
		body: JSON.stringify({ option })
	}).then(res => res.json());

export const deleteDoc = (id: string) =>
	fetch(`${api}/posts/${id}`, {
		method: 'DELETE',
		headers
	}).then(res => res.json());

export const getComments = (id: string): Promise<CommentDetail[]> =>
	fetch(`${api}/posts/${id}/comments`, {
		headers
	}).then(res => res.json());

export const postComment = (comment: PostCommentInfo) =>
	fetch(`${api}/comments`, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			id: `${token}${Date.now()}`,
			timestamp: Date.now(),
			...comment
		})
	}).then(res => res.json());

export const editComment = (id:string, body: string) =>
	fetch(`${api}/comments/${id}`, {
		method: 'PUT',
		headers,
		body: JSON.stringify({
			timestamp: Date.now(),
			body
		})
	}).then(res => res.json());

export const voteComment = (id: string, option: 'upVote' | 'downVote') =>
	fetch(`${api}/comments/${id}`, {
		method: 'POST',
		headers,
		body: JSON.stringify({option})
	}).then(res => res.json());

export const deleteComment = (id: string) =>
	fetch(`${api}/comments/${id}`, {
		method: 'DELETE',
		headers
	}).then(res => res.json());

export const sort = (list, by) => {
	let sortedList = [];
	if (by === "vote") {
		sortedList = list.sort((a, b) => {
			return a.voteScore < b.voteScore;
		});
	} else {
		sortedList = list.sort((a, b) => {
			return a.timestamp < b.timestamp;
		});
	}
	return sortedList;
}
