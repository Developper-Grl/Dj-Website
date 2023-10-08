class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.texte-loop');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

// Humburger menu
document.addEventListener('DOMContentLoaded', function () {
  const nav = document.querySelector('nav');
  const icons = document.querySelector('#icons');
  const links = document.querySelectorAll('nav li');

  icons.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  })
});

//Control form 
const form = document.querySelector('#form');
const name = document.querySelector('.name-input');
const email = document.querySelector('.email-input');
const subject = document.querySelector('.subject-input');
const phone = document.querySelector('.phone-input');
const choice = document.querySelector('.choix-input');
const date = document.querySelector('.date-input');
const place = document.querySelector('.where-input');
const message = document.querySelector('.message-input');

// submit form
//evenements
form.addEventListener('submit', (e) => {
  e.preventDefault();

  formVerify();
})

//fonctions 

function formVerify() {
  //obtenir toutes les valeurs des input
  const userValue = name.value.trim();
  const emailValue = email.value.trim();
  const subjectValue = subject.value.trim();
  const phoneValue = phone.value.trim();
  const choiceValue = choice.value;
  const dateValue = date.value;
  const messageValue = message.value.trim();

  //verifications 
  // Name verification
  if (userValue === '') {
    let error = "Ce champ ne peut pas être vide !";
    setError(name, error);
  } else if (!userValue.match(/^[a-zA-Z]/)) {
    let error = "Le nom doit commencer par une lettre";
    setError(name, error);
  } else {
    if (userValue.length < 3) {
      let error = "Le nom doit contenir au moins 6 caractères !";
      setError(name, error);
    } else {
      setSuccess(name);
    }
  }

  //email verification 
  if(emailValue === '') {
    let error = "Ce champ ne peut pas être vide !";
    setError(email, error);
  } else if(!emailValue.match(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)){
    let error = "email non valide !";
    setError(email, error);
  }else{
      setSuccess(email);
    }

    //subject verification 
    if(subjectValue === ''){
      let error= "ce champ ne peut pas être vide !";
      setError(subject, error);
    }else{
      setSuccess(subject);
    }

    //Phone verification 
    if(phoneValue === ''){
      let error= "Ce champ ne peut pas être vide !";
      setError(phone, error);
    }else if(!phoneValue.match(/^\d{10}$/)){
      let error="Numéro de télephone non valide !";
      setError(phone, error);
    }else{
      setSuccess(phone);
    }

    //Choice verification 
    if(choiceValue === ''){
      let error= "Vous devrez selectionner ";
      setError(choice, error);
    }else if(choiceValue === "option0"){
      let error="Vous devez selectionner une option!";
      setError(choice, error);
    }else{
      setSuccess(choice);
    }

    //Calendrier verification 
    if(dateValue === ''){
      let error= "Vous devez choisir une date";
      setError(date, error);
    }else if(dateValue === "date"){
      setSuccess(date);
    }

}

function setError(element, error) {
  const form = element.parentElement;
  const small = form.querySelector('small');
  //ajout message d'erreur
  small.innerText = error;

  //ajout classerror
  form.className = 'form-group error';
}

function setSuccess(element) {
  const form = element.parentElement;

  //ajout classesuccess
  form.className = 'form-group success';
}