const { Schema, Types, model } = require('mongoose');


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

);

// Schema to create User model
const thoughtSchema = new Schema(
  {
    thoughtText:{
      type: String,
      required: true,
    },
    
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
   
    username:{
      type: String,
      required: true
    },

    reactions:[reactionSchema]
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);





// Create a virtual property `fullName` that gets and sets the user's full name
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our User model
const Thought = model('thought', thoughtSchema);




module.exports = Thought;

