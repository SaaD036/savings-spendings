module.exports = class UserHelper {
    formatComment(comments, email) {
        let data = [];

        if (!comments) return data;

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

    formatCommentForAdmin(comments) {
        let data = [];

        if (!comments) return data;

        comments.forEach((comment) => {
            if (comment != null) {
                if (!comment.isDeleted) {
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

    formatUserStatusRequest(value) {
        let data = [];

        if (value == null) return data;

        Object.keys(value).forEach((key) => {
            data.push({
                key: key,
                email: value[key].email
            });
        });

        return data;
    }
}