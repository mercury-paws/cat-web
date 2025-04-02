'use strict';
import { sanitizeInput } from "./utils.js";

axios.defaults.baseURL = "https://profile-server-qbyd.onrender.com";
axios.defaults.withCredentials = true;

const COMMENT_STORAGE_KEY = 'comment-form-state';
const commentsForm = document.querySelector('.comments') as HTMLFormElement; 

const urlParams = new URLSearchParams(window.location.search);
    console.log("urlParams", urlParams)
const catArticleId = urlParams.get("id");
    
interface FormValues {
  email: string;
  comment: string;
  name: string;
}


function readCommentsFormData(commentsForm: HTMLFormElement): FormValues {
  const comment = (commentsForm.elements.namedItem('comment') as HTMLTextAreaElement).value.trim();
  const name = (commentsForm.elements.namedItem('name') as HTMLInputElement).value.trim();
  const email = (commentsForm.elements.namedItem('email') as HTMLInputElement).value.trim();
  return {
    comment,
    name,
    email,
  };
}

commentsForm?.addEventListener('input', event => {
  const data = readCommentsFormData(event.currentTarget as HTMLFormElement);
  const jsonData = JSON.stringify(data);
  localStorage.setItem(COMMENT_STORAGE_KEY, jsonData);
});

const inputData = localStorage.getItem(COMMENT_STORAGE_KEY);
if (inputData) {
  const data = JSON.parse(inputData);
  (commentsForm.elements.namedItem('comment') as HTMLTextAreaElement).value = data.comment;
  (commentsForm.elements.namedItem('name') as HTMLInputElement).value = data.name;
  (commentsForm.elements.namedItem('email') as HTMLInputElement).value = data.email;

}

commentsForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const comment =  (commentsForm.elements.namedItem("comment") as HTMLTextAreaElement).value.trim();
  const name = (commentsForm.elements.namedItem("name") as HTMLInputElement).value.trim();
  const email = (commentsForm.elements.namedItem("email") as HTMLInputElement).value.trim();
  
  const sanitizedComment = sanitizeInput(comment);
  const sanitizedName = sanitizeInput(name);
  const sanitizedEmail = sanitizeInput(email);

  if (!email || email === ' ' || !comment || !name || name === ' ' || comment === ' ') {
    alert('Please fill in both email and message fields.');
    return;
  }

  const data = {
    comment: sanitizedComment,
    name: sanitizedName,
    email: sanitizedEmail,

  }

  console.log(readCommentsFormData(event.currentTarget as HTMLFormElement));

  async function addComment() {
    try {
      const response = await axios.post(`/cat-comments/addComment/${catArticleId}`, data);
    console.log(response.data);
    return true;
    } catch (error: any) {
      console.error(`Error sending contact request: ${error.response?.data?.message || error.message}`);
      alert("There was an issue with submitting your request. Please try again.");
    }
  }

  const success = await addComment(); 

  if(success){
  localStorage.removeItem(COMMENT_STORAGE_KEY);
  commentsForm.reset();
  alert("Ваш коментарій надісланий, буде оприлюднений після перевірки модератором");
  }
});