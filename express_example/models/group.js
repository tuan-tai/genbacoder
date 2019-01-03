import mongoose from 'mongoose';
import User from './user';

let Schema = mongoose.Schema;
let ObjectId = mongoose.Types.ObjectId;

let groupSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required field !'],
    maxlength: [255, 'name is too long']
  },
  author: {
    type: Schema.Types.ObjectId,
    required: [true, 'author is required field !'],
    ref: 'User'
  },
  lastMessage: {
    type: Schema.Types.ObjectId,
    default: new ObjectId()
  },
  members: {
    type: [Schema.Types.ObjectId]
  },
  deletedAt: {
    type: Date,
    default: null
  }
});

groupSchema.pre('find', function () {
  let query = this.getQuery();
  query.deleteAt = null;
});

groupSchema.pre('findOne', function () {
  let query = this.getQuery();
  query.deleteAt = null;
});

groupSchema.pre('save', async function (next) {
  const author = await User.findOne({ _id: this.author });
  if (!author) {
    return next(new Error('Cannot find author!'));
  }

  const users = await User.find();
  const listUsersId = users.map(user => JSON.stringify(user._id));
  const members = this.members;
  console.log(this.members);
  const listMembers = members.map(member => listUsersId.includes(member));


});

let Group = mongoose.model('Group', groupSchema);

export default Group;