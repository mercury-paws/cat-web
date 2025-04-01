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
const container = document.getElementById("container");
axios.defaults.baseURL = "https://profile-server-qbyd.onrender.com";
axios.defaults.withCredentials = true;
function fetchArticle(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const response = yield axios.get(`/cat-article/${id}`);
            console.log(response.data.data);
            return response.data.data.items;
        }
        catch (error) {
            throw new Error(`Error fetching cat-article: ${((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message}`);
        }
    });
}
function renderArticle() {
    return __awaiter(this, void 0, void 0, function* () {
        const urlParams = new URLSearchParams(window.location.search);
        console.log("urlParams", urlParams);
        const catArticleId = urlParams.get("id");
        console.log("catArticleId", catArticleId);
        if (!catArticleId) {
            console.error("No article ID provided.");
            return;
        }
        const article = yield fetchArticle(catArticleId);
        if (article) {
            container.innerHTML = DOMPurify.sanitize(article.text);
        }
    });
}
window.onload = renderArticle;
