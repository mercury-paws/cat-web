const isOpen = document.querySelector(".is-open");
const closeIcon = document.querySelector(".close-icon");
const orderService = document.querySelector(".subscribe-button");
const sendOrder = document.querySelector(".form-button");
const backdropUser = document.querySelector(".backdrop-user");
const termsCheckbox = document.getElementById("user-privacy") as HTMLInputElement;
const form = document.querySelector(".form") as HTMLFormElement;
const CONTACT_STORAGE_KEY = 'contact-form-state';


axios.defaults.baseURL = "https://profile-server-qbyd.onrender.com";
axios.defaults.withCredentials = true;


orderService?.addEventListener("click", () => {
  backdropUser?.classList.toggle("is-open");
});

backdropUser?.addEventListener('click', (event) => {
  if (event.target === backdropUser) {
    backdropUser.classList.toggle("is-open");
  }
});

closeIcon?.addEventListener("click", () => {
  backdropUser?.classList.toggle("is-open");
});

function sanitizeInput(input: string): string {
  const dangerousChars = /['"<>&]/g;
  return input.replace(dangerousChars, '');
}

interface FormValues{
  email: string;
  comment: string;
  name: string;
}

function readFormData(form: HTMLFormElement): FormValues {
  const email = (form.elements.namedItem("email") as HTMLInputElement)?.value.trim() || "";
  const comment = (form.elements.namedItem('comment') as HTMLTextAreaElement)?.value.trim() || "";
  const name = (form.elements.namedItem('name') as HTMLInputElement)?.value.trim() || "";
  return {
    email,
    comment,
    name,
  };
}

form?.addEventListener('input', event => {
  const data = readFormData(event.currentTarget as HTMLFormElement);
  const jsonData = JSON.stringify(data);
  localStorage.setItem(CONTACT_STORAGE_KEY, jsonData);
});

const inputData = localStorage.getItem(CONTACT_STORAGE_KEY);
if (inputData) {
  const data: FormValues = JSON.parse(inputData);
  (form?.elements.namedItem('email') as HTMLInputElement).value = data.email;
  (form?.elements.namedItem('comment') as HTMLTextAreaElement).value = data.comment;
   (form?.elements.namedItem("name") as HTMLInputElement).value = data.name;
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
  const comment =  (form.elements.namedItem('comment') as HTMLTextAreaElement).value.trim();
  const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();

  const sanitizedEmail = sanitizeInput(email);
  const sanitizedComment = sanitizeInput(comment);
  const sanitizedName = sanitizeInput(name);

  if (!email || !comment || !name || email === ' ' || name === ' ' || comment === ' ') {
    alert('Please fill in email, name and message fields.');
    return;
  }

  if (!sanitizedEmail.includes('@') || !sanitizedEmail.includes('.')) {
    alert('Please enter a valid email address.');
    return;
  }
  
  if (!termsCheckbox?.checked) {
    alert('You must accept the terms and conditions before submitting.');
    return;
  }

   const data: FormValues = {
    email: sanitizedEmail,
    comment: sanitizedComment,
    name: sanitizedName,
  };

  async function addContact(): Promise<boolean> {
    try {
      const response = await axios.post("/contacts/addContact", data);
    console.log(response.data);
    return true;
    } catch (error: any) {
      console.error(`Error adding comment: ${error.response?.data?.message || error.message}`);
      alert("There was an issue with submitting your comment. Please try again.");
       return false;
    }
  }

  const success = await addContact(); 

  if(success){
  localStorage.removeItem(CONTACT_STORAGE_KEY);
  form.reset();
  backdropUser?.classList.toggle("is-open");
  alert("The comment was added succesfully, thank you");
  }
  
})