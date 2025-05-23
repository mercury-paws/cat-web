'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { sanitizeInput } from "./utils.js";
axios.defaults.baseURL = "https://profile-server-qbyd.onrender.com";
axios.defaults.withCredentials = true;
const COMMENT_STORAGE_KEY = 'comment-form-state';
const commentsForm = document.querySelector('.comments');
const urlParams = new URLSearchParams(window.location.search);
console.log("urlParams", urlParams);
const catArticleId = urlParams.get("id");
function readCommentsFormData(commentsForm) {
    const comment = commentsForm.elements.namedItem('comment').value.trim();
    const name = commentsForm.elements.namedItem('name').value.trim();
    const email = commentsForm.elements.namedItem('email').value.trim();
    return {
        comment,
        name,
        email,
    };
}
commentsForm === null || commentsForm === void 0 ? void 0 : commentsForm.addEventListener('input', event => {
    const data = readCommentsFormData(event.currentTarget);
    const jsonData = JSON.stringify(data);
    localStorage.setItem(COMMENT_STORAGE_KEY, jsonData);
});
const inputData = localStorage.getItem(COMMENT_STORAGE_KEY);
if (inputData) {
    const data = JSON.parse(inputData);
    commentsForm.elements.namedItem('comment').value = data.comment;
    commentsForm.elements.namedItem('name').value = data.name;
    commentsForm.elements.namedItem('email').value = data.email;
}
commentsForm === null || commentsForm === void 0 ? void 0 : commentsForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const comment = commentsForm.elements.namedItem("comment").value.trim();
    const name = commentsForm.elements.namedItem("name").value.trim();
    const email = commentsForm.elements.namedItem("email").value.trim();
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
    };
    console.log(readCommentsFormData(event.currentTarget));
    function addComment() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const response = yield axios.post(`/cat-comments/addComment/${catArticleId}`, data);
                console.log(response.data);
                return true;
            }
            catch (error) {
                console.error(`Error sending contact request: ${((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message}`);
                alert("There was an issue with submitting your request. Please try again.");
            }
        });
    }
    const success = yield addComment();
    if (success) {
        localStorage.removeItem(COMMENT_STORAGE_KEY);
        commentsForm.reset();
        alert("Ваш коментарій надісланий, буде оприлюднений після перевірки модератором");
    }
}));
