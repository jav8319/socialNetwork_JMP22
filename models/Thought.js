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
      default: Date.now(),
      transform: v => v.toLocaleString('en-US')
    },
  },

);


const thoughtSchema = new Schema(
  {
    thoughtText:{
      type: String,
      required: true,
    },
    
    date:{
      type: Date, 
      default: Date.now(),
      transform: v => v.toLocaleString('en-US')

    },

    username:{
      type: String,
      required: true
    },

    reactions:[reactionSchema]
  },
  {

    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);




thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });


const Thought = model('thought', thoughtSchema);




module.exports = Thought;

