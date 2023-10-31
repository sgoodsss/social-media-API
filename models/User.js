// Model Requirements
// username: String, Unique, Required, Trimmed
// email: String, Required, Unique, Must match valid email address
// thoughts: reference the Thoughts model
// friends: reference the User model
// Schema Settings: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;