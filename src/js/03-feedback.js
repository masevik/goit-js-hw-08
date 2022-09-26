import throttle from 'lodash.throttle';
import storageApi from './storage';

const LOCAL_STORAGE_KEY = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form');

onLoadPage();

const throttledOnInputForm = throttle(onInputForm, 500);
formRef.addEventListener('input', throttledOnInputForm);

let inputData = {};
const saveData = storageApi.load(LOCAL_STORAGE_KEY);
inputData = saveData ? saveData : {};

function onInputForm(event) {
  const { value, name } = event.target;

  inputData[name] = value;
  storageApi.save(LOCAL_STORAGE_KEY, inputData);
}

function onLoadPage() {
  const saveData = storageApi.load(LOCAL_STORAGE_KEY);

  if (!saveData) {
    return;
  }

  Object.entries(saveData).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const { email, message } = event.currentTarget;
  console.log({ email: email.value, message: message.value });

  storageApi.remove(LOCAL_STORAGE_KEY);
  formRef.reset();
}
