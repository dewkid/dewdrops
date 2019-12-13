const dewdrops = [
  {
    id: 1,
    userid: 1,
    imageName: 'character.jpg',
    caption: 'My next D&D character!'
  },
  {
    id: 2,
    userid: 2,
    imageName: 'sunset.jpg',
    caption: 'Check out this sunset'
  },
  {
    id: 3,
    userid: 1,
    imageName: 'ski.jpg',
    caption: 'Killer shot of me hitting the slopes.'
  },
  {
    id: 4,
    userid: 3,
    imageName: 'bob.jpg',
    caption: 'THIS guy!'
  }
];

const comments = [
  { id: 1, dewdropid: 1, userid: 2, commentText: 'Sweet!' },
  { id: 2, dewdropid: 1, userid: 3, commentText: "What's his name?" },
  {
    id: 3,
    dewdropid: 2,
    userid: 4,
    commentText: 'Where did you take that?  Is that near your place?'
  },
  { id: 4, dewdropid: 1, userid: 1, commentText: "I'm thinking Garr or Frank" },
  { id: 5, dewdropid: 1, userid: 3, commentText: 'Frank?' },
  { id: 6, dewdropid: 2, userid: 1, commentText: 'Yeah, where is that?' },
  { id: 7, dewdropid: 1, userid: 4, commentText: 'LOL - how about Jeeves' },
  { id: 8, dewdropid: 1, userid: 1, commentText: 'LOL' },
  { id: 9, dewdropid: 2, userid: 2, commentText: 'Not my pic, just liked it.' },
  {
    id: 10,
    dewdropid: 3,
    userid: 2,
    commentText: 'Right, like you could do that.'
  },
  { id: 11, dewdropid: 2, userid: 3, commentText: 'Lame!' },
  { id: 12, dewdropid: 3, userid: 1, commentText: "That's me!" },
  { id: 13, dewdropid: 2, userid: 1, commentText: 'I knew it!' },
  {
    id: 14,
    dewdropid: 4,
    userid: 4,
    commentText: 'Is that what you are wearing for the party?'
  },
  { id: 15, dewdropid: 4, userid: 3, commentText: 'Thinking about it...' },
  {
    id: 16,
    dewdropid: 4,
    userid: 3,
    commentText: 'You totally should, that would be hilarious.'
  }
];

const users = [
  { id: 1, name: 'Robin', username: 'robin', password: 'robin' },
  { id: 2, name: 'Dave', username: 'dave', password: 'dave' },
  { id: 3, name: 'Ross', username: 'ross', password: 'ross' },
  { id: 4, name: 'Ryan', username: 'ryan', password: 'ryan' },
  { id: 5, name: 'Lance', username: 'lance', password: 'lance' },
  { id: 6, name: 'Paul', username: 'paul', password: 'lance' },
  { id: 7, name: 'Nathaniel', username: 'nathaniel', password: 'nathaniel' },
  { id: 8, name: 'Chris', username: 'chris', password: 'chris' },
  { id: 9, name: 'Sam', username: 'sam', password: 'sam' }
];

const newDewdrop = {
  id: null,
  userid: null,
  imageName: '',
  caption: ''
};

const newComment = {
  id: null,
  dewdropid: null,
  userid: null,
  commentText: ''
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newDewdrop,
  newComment,
  dewdrops,
  comments,
  users
};
