const loginButton = document.getElementById('login-button');

const errorToString = (e) => {
  e.name = '';
  return e.toString();
};

loginButton.addEventListener('click', () => {
  loginButton.classList.add('is-loading');
  document.getElementById('incorrect_error').classList.add('is-hidden');

  const emailInput = document.getElementById('email').value;
  const passwordInput = document.getElementById('password').value;

  fetch('/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: emailInput,
      password: passwordInput,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        loginButton.classList.remove('is-loading');

        throw new Error(response.status);
      }

      return response.json();
    })
    .then(() => {
      loginButton.classList.remove('is-loading');

      window.location.href = '/dashboard';
    })
    .catch((error) => {
      if (errorToString(error) === '401') {
        document
          .getElementById('incorrect_error')
          .classList.remove('is-hidden');
      }
    });
});
