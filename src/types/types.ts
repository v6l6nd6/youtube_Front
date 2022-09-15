
export type postUserType = {
    _id: string,
    fullName: string,
    email: string,
    passwordHash: string,
    avatarUrl: string,
    createdAt: string,
    updatedAt: string
}

export type OnePostType = {
    _id: string,
    title: string,
    text: string,
    tags: Array<string>,
    viewsCount: number,
    user: postUserType,
    imageUrl: string,
    createdAt: string,
    updatedAt: string
}

export type commentUserType = {
    _id: string
    fullName: string
    avatarUrl: string
    postId: string
    createdAt: string
    updatedAt: string
}

export type commentType = {
    _id: string
    text: string
    postId: string
    user:commentUserType
    createdAt: string
    updatedAt: string
}


export type fullPostCommentType = {
    post: OnePostType,
    id: string
}