// Model Requirements
// thoughtText: String, Required, Between 1-280 char
// createdAt: Date, Set default value to current timestamp, Use getter method to format the timestamp on query
// username: String, required
// reactions: array of nested documents created with the reactionSchema
// Schema Settings: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

// Reaction (SCHEMA ONLY)
// reactionId: Use Mongoose's ObjectId data type, Default value is set to a new ObjectId
// reactionBody: String, Required, 280 character maximum
// username: String, Required
// createdAt: Date, Set default value to the current timestamp, Use a getter method to format the timestamp on query
// Schema Settings: This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

const { Schema, model, Types } = require("mongoose");
// Require Moment.js to format dates and times
const moment = require('moment');
 
// Reaction Schema to be used in thoughtSchema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMMM Do YYYY, h:mm a'),
    },
});

// Schema to create Thought model
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMMM Do YYYY, h:mm a'),
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Get total count of reactions
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;