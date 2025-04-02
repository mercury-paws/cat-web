"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const isOpen = document.querySelector(".is-open");
const closeIcon = document.querySelector(".close-icon");
const orderService = document.querySelector(".subscribe-button");
const sendOrder = document.querySelector(".form-button");
const backdropUser = document.querySelector(".backdrop-user");
const termsCheckbox = document.getElementById("user-privacy");
const form = document.querySelector(".form");
const CONTACT_STORAGE_KEY = 'contact-form-state';
axios.defaults.baseURL = "https://profile-server-qbyd.onrender.com";
axios.defaults.withCredentials = true;
orderService === null || orderService === void 0 ? void 0 : orderService.addEventListener("click", () => {
    backdropUser === null || backdropUser === void 0 ? void 0 : backdropUser.classList.toggle("is-open");
});
backdropUser === null || backdropUser === void 0 ? void 0 : backdropUser.addEventListener('click', (event) => {
    if (event.target === backdropUser) {
        backdropUser.classList.toggle("is-open");
    }
});
closeIcon === null || closeIcon === void 0 ? void 0 : closeIcon.addEventListener("click", () => {
    backdropUser === null || backdropUser === void 0 ? void 0 : backdropUser.classList.toggle("is-open");
});
function sanitizeInput(input) {
    const dangerousChars = /['"<>&]/g;
    return input.replace(dangerousChars, '');
}
function readFormData(form) {
    var _a, _b, _c;
    const email = ((_a = form.elements.namedItem("email")) === null || _a === void 0 ? void 0 : _a.value.trim()) || "";
    const comment = ((_b = form.elements.namedItem('comment')) === null || _b === void 0 ? void 0 : _b.value.trim()) || "";
    const name = ((_c = form.elements.namedItem('name')) === null || _c === void 0 ? void 0 : _c.value.trim()) || "";
    return {
        email,
        comment,
        name,
    };
}
form === null || form === void 0 ? void 0 : form.addEventListener('input', event => {
    const data = readFormData(event.currentTarget);
    const jsonData = JSON.stringify(data);
    localStorage.setItem(CONTACT_STORAGE_KEY, jsonData);
});
const inputData = localStorage.getItem(CONTACT_STORAGE_KEY);
if (inputData) {
    const data = JSON.parse(inputData);
    (form === null || form === void 0 ? void 0 : form.elements.namedItem('email')).value = data.email;
    (form === null || form === void 0 ? void 0 : form.elements.namedItem('comment')).value = data.comment;
    (form === null || form === void 0 ? void 0 : form.elements.namedItem("name")).value = data.name;
}
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const email = form.elements.namedItem('email').value.trim();
    const comment = form.elements.namedItem('comment').value.trim();
    const name = form.elements.namedItem("name").value.trim();
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
    if (!(termsCheckbox === null || termsCheckbox === void 0 ? void 0 : termsCheckbox.checked)) {
        alert('You must accept the terms and conditions before submitting.');
        return;
    }
    const data = {
        email: sanitizedEmail,
        comment: sanitizedComment,
        name: sanitizedName,
    };
    function addContact() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const response = yield axios.post("/contacts/addContact", data);
                console.log(response.data);
                return true;
            }
            catch (error) {
                console.error(`Error adding comment: ${((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message}`);
                alert("There was an issue with submitting your comment. Please try again.");
                return false;
            }
        });
    }
    const success = yield addContact();
    if (success) {
        localStorage.removeItem(CONTACT_STORAGE_KEY);
        form.reset();
        backdropUser === null || backdropUser === void 0 ? void 0 : backdropUser.classList.toggle("is-open");
        alert("The comment was added succesfully, thank you");
    }
}));
