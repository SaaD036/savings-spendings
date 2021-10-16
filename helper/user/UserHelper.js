module.exports = class UserHelper {
    formatComment(comments, email) {
        let data = [];

        comments.forEach((comment) => {
            if (comment != null) {
                if (!comment.isDeleted && comment.commenter == email) {
                    data.push({
                        id: comment.id,
                        comment: comment.comment,
                        reply: comment.reply
                    });
                }
            }
        })

        return data;
    }
    getCommentToSave(req, dataLength) {
        return {
            id: dataLength,
            comment: req.body.comment,
            commenter: req.token.email,
            reply: '',
            isDeleted: false
        }
    }
}