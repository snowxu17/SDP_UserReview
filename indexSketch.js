let canvas;
let inp0;
let inp1;
let button;
let gbutton;
let database;

let prompt;
let note;

let questions;
let inputs = [];

let buttons = [];

let inputEntered = false;

function setup() {

    // Initialize Firebase
    var config = {

    apiKey: "AIzaSyDTMbRrhGUgGA-uYkSavflJDfXqGlpe6hg",
    authDomain: "test-snowx.firebaseapp.com",
    databaseURL: "https://test-snowx.firebaseio.com",
    projectId: "test-snowx",
    storageBucket: "test-snowx.appspot.com",
    messagingSenderId: "789553867295"

    };

    firebase.initializeApp( config );
    database = firebase.database();

    questions = ["What's your name?", "Do you enjoy the Self-Discipline Pacifier?", "How do you feel after surviving the symbolic death?"];

    for (let i = 0; i < questions.length; i++)
    {
      let q = createP(questions[i]);
      q.parent("questions");

      input = createInput('');
      input.parent("questions");
      inputs.push(input);
      // console.log(inputs.length);
    }

    createDiv();
    button = createButton( 'Submit' );
    button.parent("form");
    button.mousePressed( sendData );
    button.parent("buttons");

    gbutton = createButton( 'Get');
    gbutton.mousePressed( getData );
    gbutton.parent("form");
    gbutton.parent("buttons");

    // note = "";
    // prompt = document.createElement("div");
    // prompt.textContent = note;
    // prompt.id = "notes";
    // var bodyElement = document.body;
    // bodyElement.appendChild(prompt);
}

function draw() {
}


function sendData() {

    for (let i = 0; i < inputs.length; i++)
    {
      if(inputs[i].value() == '')
      {
        inputEntered = false;
      }

      if(inputs[i].value() !== '')
      {
        inputEntered = true;
      }
    }

    // note = "Thank you for sharing your experience!";
    // prompt.textContent = note;

    if (inputEntered == false)
    {
      alert("Please answer the survey to share your experience.");
    }

    if (inputEntered == true)
    {
      console.log( 'sending...' );

      let data = {
          question1: inputs[0].value(),
          question2: inputs[1].value(),
          question3: inputs[2].value()
      }

      console.log( data );
      let ref = database.ref( 'responses' );
      ref.push( data );

      alert("Thank you for sharing your experience!");
      inputEntered = false;
      for (let i = 0; i < inputs.length; i++)
      {
        inputs[i].value('');
      }
    }

}

function getData() {

    console.log( 'getting...' );

    let ref = database.ref( 'responses' );
    ref.on( "value", gotData, errData );

}

function errData(error) {

   console.log( "Something went wrong." );
   console.log( error );

 }

function gotData(data) {
  console.log( data );

  let responses = data.val();

  // Grab the keys to iterate over the object
  let keys = Object.keys( responses );

  for ( let i = 0; i < keys.length; i++ ) {

      let key = keys[i];
      // Look at each fruit object!
      let response = responses[key];

      console.log(response.question1);
      console.log(response.question2);
      console.log(response.question3);

      createP(response.question1);
      createP(response.question2);
      createP(response.question3);

      // console.log("getting length");
      // console.log(response[0]);

      // for(let i = 0; i < response.length; i++)
      // {
      //   let a = createP(response[i]);
      // }

      ////// craete element
      // var newDiv = document.createElement("div");
      // newDiv.textContent = response.question1;
      // newDiv.id = " ";
      // var bodyElement = document.body;
      // bodyElement.appendChild(newDiv);

      // createDiv(response.question1);
      // createDiv(response.question2);

    }
}
