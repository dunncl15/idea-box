//Event Listeners

$('.save-btn').on('click', function(e) {
  e.preventDefault();
  getIdea();
});

//Functions

function addIdea(title, body) {
  $('.idea-section').prepend(`<div class="idea-container">
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
  var userIdea = new Idea(ideaTitle, ideaBody);
  console.log(userIdea);
  addIdea(ideaTitle, ideaBody);
}

function Idea(title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}
