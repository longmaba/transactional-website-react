import alertify from 'alertifyjs';

export default {
  confirm: (title, message) =>
    new Promise((resolve, reject) => {
      alertify.confirm(title, message, resolve, reject);
    }),
  prompt: (title, description, defaultValue) =>
    new Promise((resolve, reject) => {
      alertify.prompt(
        title,
        description,
        defaultValue,
        (e, value) => resolve(value),
        reject
      );
    })
};
