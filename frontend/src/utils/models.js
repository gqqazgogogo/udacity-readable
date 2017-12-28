// @flow
interface Categories {
    name: string;
    path: string;
}

interface ReadableDetail {
    id: string;
    timestamp: number;
    title: string;
    body: string;
    author: string;
    category: string;
    voteScore: number;
    deleted: boolean;
    commentCount: number;
    postDate: string;
}

interface PostReadableInfo {
    title: string;
    body: string;
    author: string;
    category: string;
}

interface CommentDetail {
    id: string;
    parentId: string;
    timestamp: any;
    body: string;
    author: string;
    voteScore: number;
    deleted: boolean;
    parentDeleted: boolean;
}

interface PostCommentInfo {
    parentId: string;
    body: string;
    author: string;
}
