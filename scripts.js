
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
  var storedObject = JSON.parse(localStorage.getItem(id));

  var currentQuality = $(this).siblings('.quality-value').text();
  storedObject.quality = currentQuality;

  localStorage.setItem(id, JSON.stringify(storedObject));
})

//Downvote Button Click Event

$('.idea-section').on('click', '.downvote-btn', function() {
  var voteStatus = $(this).siblings('.quality-value').text();
  if (voteStatus === 'genius') {
    $(this).siblings('.quality-value').text('plausible');
  } else if (voteStatus === 'plausible') {
    $(this).siblings('.quality-value').text('swill');
  }

  var id = $(this).closest('.idea-container').attr('id');
  var storedObject = JSON.parse(localStorage.getItem(id));

  var currentQuality = $(this).siblings('.quality-value').text();
  storedObject.quality = currentQuality;

  localStorage.setItem(id, JSON.stringify(storedObject));
})

//Delete Button Click Event

$('.idea-section').on('click', '.delete-btn', function() {
  $(this).parent('.idea-container').remove();
  var key = $(this).parent('.idea-container').attr('id');
  console.log(key);
  localStorage.removeItem(key);
})

//Search Field

$('.search-field').on('keyup', function() {
  var searchInput = $(this).val().toLowerCase();
  var ideaBoxes = $('.idea-container');

  ideaBoxes.each(function(i, ideaBox) {
    var ideaText = $(ideaBox).text().toLowerCase();
    var matchedIdea = !!ideaText.match(searchInput);
    $(ideaBox).toggle(matchedIdea);
  })
})


//Functions

function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
}

function addIdea(idea) {
  $('.idea-section').prepend(`
  <div id="${idea.id}" class="idea-container">
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
  var userIdea = new Idea(ideaTitle, ideaBody);
  addIdea(userIdea);
  sendToStorage(userIdea.id, userIdea);

  console.log(userIdea)
}

function sendToStorage(id, object) {
  localStorage.setItem(id, JSON.stringify(object));
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
