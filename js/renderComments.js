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
const receivedComment = document.querySelector(".received-comment");
axios.defaults.baseURL = "https://profile-server-qbyd.onrender.com";
axios.defaults.withCredentials = true;
const localComments = [
    {
        name: "Sebastian",
        comment: "Working with you was an absolute pleasure! The process was smooth and easy. Thank you for teamwork and for building great page!",
    },
    {
        name: "Юлія",
        comment: "Дуже добре попрацювали разом над проектом. Завжди допомагала колегам, якщо виникали якісь питання, роботу робила вчасно. Дякую!",
    },
    {
        name: "Natalia",
        comment: "Working with you felt like having a deep conversation with someone who understands human and the need for education. Thanks a lot!",
    },
    {
        name: "Helen",
        comment: "I couldn't be happier with the result! Your expertise and innovative approach made the entire experience smooth and rewarding.",
    },
];
let index = 0;
function fetchCatComments() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get("/cat-comments");
            return response.data.data.data;
        }
        catch (error) {
            console.warn("Server request failed. Using local comments.json instead.");
            // return localComments;
        }
    });
}
function renderCatComments() {
    return __awaiter(this, void 0, void 0, function* () {
        let comments = yield fetchCatComments();
        let markup;
        if (comments) {
            const { name, comment } = comments[index];
            const sanitizedComment = DOMPurify.sanitize(comment);
            const sanitizedName = DOMPurify.sanitize(name);
            markup = `
    <p class="client-text-review">${sanitizedComment}</p>
    <p class="client-name">${sanitizedName}</p>
  `;
        }
        else {
            const { name, comment } = localComments[index];
            const sanitizedComment = DOMPurify.sanitize(comment);
            const sanitizedName = DOMPurify.sanitize(name);
            markup = `
    <p class="client-text-review">${sanitizedComment}</p>
    <p class="client-name">${sanitizedName}</p>
  `;
        }
        if (receivedComment) {
            receivedComment.innerHTML = markup;
        }
    });
}
window.onload = renderCatComments;
