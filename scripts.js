//Global Variables
var userIdea = {};
var stringifiedIdea;
var retrieveIdea;
var parsedIdea;

//Event Listeners

$('.save-btn').on('click', function(e) {
  e.preventDefault();
  getIdea();
  stringifyIdea();
  storeIdea();
  parseIdea();
  clearInputs();
});

$('.idea-section').on('click', '.upvote-btn', function() {
  console.log(this)
  var voteStatus = $('.quality-value').text();

  if ($('voteStatus').text('swill')) {
    $('voteStatus').text('plausible');
  }
  //  } else if ($('voteStatus').text('plausible')) {
  //   $('voteStatus').text('genius');
  // } else if ($('voteStatus').text('genius')) {
  //   $('voteStatus').text('genius');
  // }
})


//Functions

function addIdea(title, body, id) {
  $('.idea-section').prepend(`<div id="${id}" class="idea-container">
   <textarea class="idea-title">${title}</textarea>
   <textarea class="idea-body">${body}</textarea>
   <button class="delete-btn"></button>
   <div class="vote-icon-wrap">
     <button class="upvote-btn"></button>
     <button class="downvote-btn"></button>
     <p class="quality">quality:</p>
     <p class="quality-value"> swill</p>
    </div>
  </div>`);
}

function getIdea() {
  var ideaTitle = $('.user-title').val();
  var ideaBody = $('.user-body').val();
  var id = Date.now();
  userIdea = new Idea(ideaTitle, ideaBody, id);
  addIdea(ideaTitle, ideaBody, id);
  console.log(userIdea)
}

function stringifyIdea() {
  stringifiedIdea = JSON.stringify(userIdea);
  return stringifiedIdea;
}

function storeIdea() {
  localStorage.setItem('id', stringifiedIdea);
  retrieveIdea = localStorage.getItem('id');
  return retrieveIdea;
}

function parseIdea() {
  parsedIdea = JSON.parse(retrieveIdea);
  return parsedIdea;
}

function clearInputs() {
  $('.user-title').val('');
  $('.user-body').val('');
}

function Idea(title, body, id) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = id;
}
