let button;
let database;

let sbutton;
let questions;

let answers = [];

let a1;
let a2;
let a3;


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

      let a = createDiv('');
      a.parent("questions");
      answers.push(a);

    }

    sbutton = createButton("Shuffle Review");
    sbutton.mousePressed(getData);
    sbutton.parent("buttons");

    getData();


    a1 = createP('');
    a1.parent("answers");

    a2 = createP('');
    a2.parent("answers");

    a3 = createP('');
    a3.parent("answers");
}

function draw() {
    // inp0.position(window.innerWidth/2, window.innerHeight/2);
    // background(20);
}

function getData() {

    console.log( 'getting...' );

    let ref = database.ref( 'responses' );
    ref.on( "value", gotData, errData);

}

function errData(error) {

   console.log( "Something went wrong." );
   console.log( error );

 }

function gotData( data ) {

  // console.log( data );

  let responses = data.val();

  // Grab the keys to iterate over the object
  let keys = Object.keys( responses );

  let i = Math.floor(Math.random() * keys.length);
  console.log("random index is ", i);

  let key = keys[i];
  let response = responses[key];

  // a1.html(response.question1);
  answers[0].html(response.question1);
  // a2.html(response.question2);
  answers[1].html(response.question2);
  // a3.html(response.question3);
  answers[2].html(response.question3);

  //// Tested putting answers in textbox
  // for(let i = 0; i < answers.length; i++)
  // {
  //   answers[0].value(response.question1);
  //   // a2.html(response.question2);
  //   answers[1].value(response.question2);
  //   // a3.html(response.question3);
  //   answers[2].value(response.question3);
  //
  // }


//// Print all answers at once
  // for ( let i = 0; i < keys.length; i++ ) {
  //
  //     let key = keys[i];
  //     // Look at each fruit object!
  //     let response = responses[key];
  //
  //     let a1 = createP(response.question1);
  //     a1.parent("answers");
  //     let a2 = createP(response.question2);
  //     a2.parent("answers");
  //     let a3 = createP(response.question3);
  //     a3.parent("answers");
  //
  //     console.log(response.question1);
  //     console.log(response.question2);
  //     console.log(response.question3);
  //
  //   }
}
