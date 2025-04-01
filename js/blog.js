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
const blogList = document.querySelector('.blog');
axios.defaults.baseURL = "https://profile-server-qbyd.onrender.com";
// axios.defaults.baseURL = "http://localhost:5500"
axios.defaults.withCredentials = true;
function fetchCatArticle() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const response = yield axios.get("/cat-article");
            console.log("3data", response.data.data.data);
            console.log("2data", response.data.data.items);
            console.log("1data", response.data.items);
            return response.data.data.items;
        }
        catch (error) {
            throw new Error(`Error fetching blog: ${((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || error.message}`);
        }
    });
}
function renderCatArticle() {
    return __awaiter(this, void 0, void 0, function* () {
        let blog = yield fetchCatArticle();
        console.log("blog", blog);
        if (!blog || blog.length === 0)
            return;
        blogList.innerHTML = blog
            .map(({ title, header, _id, photo }) => {
            console.log("id", _id);
            return `<li class="blog-item">
                <a href="pages/article.html?id=${_id}" class="blog-link">
                <img src="./img/${photo}.png" alt="cat" class="blog-photo" />
<div class="wrapper">
              <h2 class="blog-title sub-title">${DOMPurify.sanitize(title)}</h2>
              <p class="blog-text">${DOMPurify.sanitize(header)}</p>
              </div>
      </a>
            </li>`;
        })
            .join('');
    });
}
window.onload = renderCatArticle;
