import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

let groupSchema = new Schema({
  _id: {

  },
  name: {
    type: String,
    required: [ true, 'Name is required field!' ],
    maxlength: [ 255, 'Name is too long!' ]
  },
  lastMessage: ObjectId,
  author: ObjectId,
  members: [{_id}],
  deletedAt: Date
});
userSchema.pre('find', function() {
  const query = this.getQuery();
  query['$or'] = [
    {
      isDelete: false
    },
    {
      isDelete: null
    }
  ]
});

let User = mongoose.model('User', userSchema);

export default User;