var userIdea = {};

$(document).ready(function() {
  for (var i = 0; i < localStorage.length; i++) {
    var ideaObject = JSON.parse(localStorage.getItem(localStorage.key(i)));
    addIdea(ideaObject);
  }
})

//Event Listeners

//Save Button Click Event

$('.save-btn').on('click', function(e) {
  e.preventDefault();
  getIdea();
  clearInputs();
});

//Upvote Click Event

$('.idea-section').on('click', '.upvote-btn', function() {
  var voteStatus = $(this).siblings('.quality-value').text();
  if (voteStatus === 'swill') {
    $(this).siblings('.quality-value').text('plausible');

  } else if (voteStatus === 'plausible') {
    $(this).siblings('.quality-value').text('genius');
  }

  var id = $(this).closest('.idea-container').attr('id');
  console.log(id);
  localStorage.setItem(id, JSON.stringify(userIdea));
})

//Downvote Button Click Event

$('.idea-section').on('click', '.downvote-btn', function() {
  var voteStatus = $(this).siblings('.quality-value').text();
  if (voteStatus === 'genius') {
    $(this).siblings('.quality-value').text('plausible');

  } else if (voteStatus === 'plausible') {
    $(this).siblings('.quality-value').text('swill');
  }
})

//Delete Button Click Event

$('.idea-section').on('click', '.delete-btn', function() {
  $(this).closest('.idea-container').remove();
  var key = $(this).closest('.idea-container').attr('id');
  console.log(key);
  localStorage.removeItem(key);
})

//Functions

function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
}

function addIdea(idea) {
  $('.idea-section').prepend(`<div id="${idea.id}" class="idea-container">
   <textarea class="idea-title">${idea.title}</textarea>
   <textarea class="idea-body">${idea.body}</textarea>
   <button class="delete-btn"></button>
   <div class="vote-icon-wrap">
     <button class="upvote-btn"></button>
     <button class="downvote-btn"></button>
     <p class="quality">quality:</p>
     <p class="quality-value">${idea.quality}</p>
    </div>
  </div>`);
}

function getIdea() {
  var ideaTitle = $('.user-title').val();
  var ideaBody = $('.user-body').val();
  userIdea = new Idea(ideaTitle, ideaBody);
  addIdea(userIdea);
  localStorage.setItem(userIdea.id, JSON.stringify(userIdea));
  console.log(userIdea)
}

function clearInputs() {
  $('.user-title').val('');
  $('.user-body').val('');
}

// function toggleSaveBtn() {
//   var saveBtn = $('.save-btn');
//   var title = $('.user-title').val();
//   var body = $('.user-body').val();
//   if (title !== '' && body !== '') {
//     saveBtn.removeAttr('disabled');
//   }
// }
