let canvas;
let button;
let gbutton;
let database;

let questions;
let inputs = [];
let buttons = [];

let inputEntered = true;

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

    questions = ["What’s your name? Enter N/A for anonymity.", "How long (approximately) was your Self-Discipline Pacifier therapy session?", "How likely is it that you would recommend Self-Discipline Pacifier (SDP) to others? Rate 1 to 10.", "What sensations are most important to you during Self-Discipline Pacifier therapy?", "Would you repeat the Self-Discipline Pacifier therapy session? Why?", "Do you think Self-Discipline Pacifier therapy is painful? Or pleasant?", "How does the Self-Discipline Pacifier therapy resonate with or challenge your ideas of pain/pleasure?", "How does the Self-Discipline Pacifier therapy resonate with or challenge your ideas of suicide?", "How do you imagine the experience of death? And how would you like to experience death?", "How does your imagination of death affects your ways of living?", "How can we improve the therapy experience to help you cope with self-harming intents?", "How can you improve your coping strategy for proactive self-healing and self-growth?"];

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
      console.log(inputs[i].value().trim());

      if(inputs[i].value().trim() == '')
      {
        inputEntered = false;
      }
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
          question3: inputs[2].value(),
          question4: inputs[3].value(),
          question5: inputs[4].value(),
          question6: inputs[5].value(),
          question7: inputs[6].value(),
          question8: inputs[7].value(),
          question9: inputs[8].value(),
          question10: inputs[9].value(),
          question11: inputs[10].value(),
          question12: inputs[11].value(),
          question13: inputs[12].value()
      }

      console.log( data );
      let ref = database.ref( 'responses' );
      ref.push( data );

      alert("Thank you for sharing your experience!");

      for (let i = 0; i < inputs.length; i++)
      {
        inputs[i].value('');
      }
    }

    inputEntered = true;
}

// function getData() {
//
//     console.log( 'getting...' );
//
//     let ref = database.ref( 'responses' );
//     ref.on( "value", gotData, errData );
//
// }
//
// function errData(error) {
//
//    console.log( "Something went wrong." );
//    console.log( error );
//
//  }
//
// function gotData(data) {
//   console.log( data );
//
//   let responses = data.val();
//
//   // Grab the keys to iterate over the object
//   let keys = Object.keys( responses );
//
//   for ( let i = 0; i < keys.length; i++ ) {
//
//       let key = keys[i];
//       // Look at each fruit object!
//       let response = responses[key];
//
//       console.log(response.question1);
//       console.log(response.question2);
//       console.log(response.question3);
//
//       createP(response.question1);
//       createP(response.question2);
//       createP(response.question3);
//
//
//       // for(let i = 0; i < response.length; i++)
//       // {
//       //   let a = createP(response[i]);
//       // }
//
//       ////// craete element
//       // var newDiv = document.createElement("div");
//       // newDiv.textContent = response.question1;
//       // newDiv.id = " ";
//       // var bodyElement = document.body;
//       // bodyElement.appendChild(newDiv);
//
//       // createDiv(response.question1);
//       // createDiv(response.question2);
//     }
// }
