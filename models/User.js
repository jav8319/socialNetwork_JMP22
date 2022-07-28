const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username:{
      type: String,
      required: true,
    },

    email:{
      type: String,
      required: true,
    },
    
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {     
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
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
userSchema
  .virtual('friendcount')
  // Getter
  .get(function () {
    return this.friends.length;
  });





// Initialize our User model
const User = model('user', userSchema);

const handleError = (err) => console.error(err);

User.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    User.insertMany(
      [
        { username: "lernantino", email: "lernantino@gmail.com"},
        { username: 'kabal', email: "kabal@gmail.com"},
        { username: 'rayden', email: "rayden@gmail.com"},
        { username: 'kitana', email: "kitana@gmail.com"},
        { username: 'terminator', email: "terminator@gmail.com"},
 
      ],
      (err) => (err ? handleError(err) : console.log('error'))
    );
  }
});

module.exports = User;
