let canvas;
let button;
let gbutton;
let database;

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

    questions = ["What's your name?", "What is your favorite moment of Self-Discipline Pacifier therapy?", "How do you feel after surviving the symbolic death?"];

    for (let i = 0; i < questions.length; i++)
    {
      let q = createP(questions[i]);
      q.parent("questions");

      input = createInput('');
      input.parent("questions");
      inputs.push(input);
      // console.log(inputs.length);


      // input = document.createElement('textarea', '');
      // input.id = "questions";
      // var bodyElement = document.body;
      // bodyElement.appendChild(input);
      // inputs.push(input);

    }

    createDiv();
    button = createButton( 'Submit' );
    button.parent("form");
    button.mousePressed( sendData );
    button.parent("buttons");

    // gbutton = createButton( 'Get');
    // gbutton.mousePressed( getData );
    // gbutton.parent("form");
    // gbutton.parent("buttons");
}

function draw() {
}


function sendData() {

    for (let i = 0; i < inputs.length; i++)
    {

      if(inputs[i].value().trim() == '')
      {
        inputEntered = false;
        break;
      }

      // if(inputs[i].value().trim() == '')
      // {
      //   inputEntered = false;
      // }
      //
      // if(inputs[i].value().trim() !== '' && inputs[1].value().trim() !== ''&& inputs[0].value().trim() !== '')
      // {
      //   inputEntered = true;
      // }
    }

    if (inputEntered == false)
    {
      alert("Please complete the survey to share your experience.");
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
