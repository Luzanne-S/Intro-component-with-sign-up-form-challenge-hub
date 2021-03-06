const validationMessage = {
  'empty': ':attribute cannot be empty',
  'email': 'Looks like this is not an email',
  'password': ''
}

function capitalize(string) {
  return string.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}

function isEmail(email) {
  return email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)
}

function reset(form) {
  const errorFields = form.getElementsByClassName('has-error')
  
  for (let i = 0; i < errorFields.length; i++) {
      const errorTexts = errorFields[i].getElementsByClassName('error-text');

      for (let index = 0; index < errorTexts.length; index++) {
          errorTexts[index].remove();
      }
  }
}

function isValid(form) {
  let inputFields = form.getElementsByTagName('input')

  for (let index = 0; index < inputFields.length; index++) {
      const input = {
          name: capitalize((inputFields[index].name).split('_').join(' ')),
          type: inputFields[index].getAttribute('type'),
          value: inputFields[index].value,
          validation: {
              isValid: true,
              message: null
          },
          parent: inputFields[index].parentElement
      } 

      input.parent.classList.remove('has-error')

      if(input.value === '' || input.value === null) {
          input.validation.isValid = false
          input.validation.message = validationMessage.empty.replace(':attribute', input.name)
      }

      if(input.type === 'email' && !isEmail(input.value)) {
          input.validation.isValid = false
          input.validation.message = validationMessage.email
      }

      if(!input.validation.isValid) {
          const errorText = document.createElement("div")
          errorText.classList.add('error-text')
          errorText.innerText = input.validation.message

          input.parent.classList.add('has-error')
          input.parent.append(errorText)
      }
  }

  return false;
}

window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('form')
  
  form.addEventListener('submit', function(event) {
      reset(form)

      if (isValid(form)) {
          form.classList.add('success')
      }
  
      event.preventDefault()
  })
})