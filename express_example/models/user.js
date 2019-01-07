import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let userSchema = new Schema({
	gender: Boolean,
    fullName: {
	    first: {
            type: String,
            maxlength: [ 30, 'firstName is too long!' ]
        },
        last: {
            type: String,
            maxlength: [ 30, 'lastName is too long!' ],
        }
    },
    email: {
    	type: String,
        required: [ true, 'email is required field!'],
        maxlength: [ 30, 'email is too long!' ],
        unique: true
    },
    password: {
    	type: String,
    	required: [ true, 'password is required field!'],
    	maxlength: [ 255, 'password is too long!' ]
    },
    deletedAt: Date
});

userSchema.pre('find', function() {
    preFindMiddleware(this.getQuery());
});

userSchema.pre('findOne', function() {
    preFindMiddleware(this.getQuery());
});

userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        return next(new Error('this email has been using'));
    }
    return next(error);
});

function preFindMiddleware(query) {
    return query.deletedAt = null;
}

let User = mongoose.model('User', userSchema);

export default User;