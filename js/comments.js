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
import { sanitizeInput } from "./utils";
axios.defaults.baseURL = "https://profile-server-qbyd.onrender.com";
axios.defaults.withCredentials = true;
const COMMENT_STORAGE_KEY = 'comment-form-state';
const commentsForm = document.querySelector('.comments');
function readCommentsFormData(form) {
    const comment = form.elements.namedItem('comment').value.trim();
    const name = form.elements.namedItem('name').value.trim();
    return {
        comment,
        name,
    };
}
commentsForm === null || commentsForm === void 0 ? void 0 : commentsForm.addEventListener('input', event => {
    const data = readFormData(event.currentTarget);
    const jsonData = JSON.stringify(data);
    localStorage.setItem(COMMENT_STORAGE_KEY, jsonData);
});
const inputData = localStorage.getItem(COMMENT_STORAGE_KEY);
if (inputData) {
    const data = JSON.parse(inputData);
    commentsForm.elements.namedItem('comment').value = data.comment;
    commentsForm.elements.namedItem('name').value = data.name;
}
commentsForm === null || commentsForm === void 0 ? void 0 : commentsForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const comment = commentsForm.comment.value.trim();
    const name = commentsForm.value.trim();
    const sanitizedComment = sanitizeInput(comment);
    const sanitizedName = sanitizeInput(name);
    if (!comment || !name || name === ' ' || comment === ' ') {
        alert('Please fill in both email and message fields.');
        return;
    }
    if (!termsCheckbox.checked) {
        alert('You must accept the terms and conditions before submitting.');
        return;
    }
    const data = {
        comment: sanitizedComment,
        name: sanitizedName
    };
    console.log(readCommentsFormData(event.currentTarget));
    function addComment() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const response = yield axios.post("/cat-comments/addComment", data);
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
