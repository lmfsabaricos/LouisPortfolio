// ===================== DEBATE SECTION =====================
document.addEventListener("DOMContentLoaded", () => {
  //const sideInput = document.getElementById("side");
  const debateform = document.getElementById("debateForm");
  const commentsContainer = document.getElementById("debateComments");
  const identityFields = document.getElementById("identityFields");
  const changeIdentityBtn = document.getElementById("changeIdentityBtn");

  const nameInput = document.getElementById("name");
  const commentInput = document.getElementById("comment");
  const picInput = document.getElementById("profile-pic");
  const previewImg = document.getElementById("preview-pic");

  // Profile picture preview
picInput.addEventListener("change", () => {
  if (picInput.files && picInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewImg.style.display = "inline-block";
      previewImg.classList.add("visible");
    };
    reader.readAsDataURL(picInput.files[0]);
  }
});

  // Load identity if exists
  const savedName = localStorage.getItem("debateName");
  const savedSide = localStorage.getItem("debateSide");
  const savedPic = localStorage.getItem("debatePic");
  picInput.value = "";

  if (savedName && savedSide) {
    nameInput.value = savedName;
    //sideInput.value = savedSide;
    identityFields.classList.add("hidden");
    changeIdentityBtn.classList.remove("hidden");
  }

  // Load comments
  const loadComments = () => {
  console.log("🔁 Loading comments...");
  let comments = [];

  try {
    comments = JSON.parse(localStorage.getItem("debateComments") || "[]");
  } catch (err) {
    console.error("❌ Failed to parse comments:", err);
    return;
  }

  commentsContainer.innerHTML = "";
  comments.forEach(({ name, side, comment, pic }) => {
    const div = document.createElement("div");
    div.className = `comment-box ${side.toLowerCase()}`;
    div.innerHTML = `
      ${pic ? `<img src="${pic}" class="debate-profile-pic" />` : ""}
      <strong>${escapeHTML(name)} (${escapeHTML(side)})</strong>
      <p>${escapeHTML(comment)}</p>
    `;
    commentsContainer.appendChild(div);
  });

  commentsContainer.scrollTop = commentsContainer.scrollHeight;
};

 loadComments();

  // Submit comment
  debateform.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const side = "Weeb";
    //const side = sideInput.value;//
    const comment = commentInput.value.trim();

     if (name && side && comment) {
      if (picInput && picInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function () {
          const pic = reader.result;
          localStorage.setItem("debatePic", pic);
          saveComment(name, side, comment, pic);
        };
        reader.readAsDataURL(picInput.files[0]);
      } else {
        const savedPic = localStorage.getItem("debatePic") || "";
        saveComment(name, side, comment, savedPic);
      }
    }

  });

 // Change identity
  changeIdentityBtn.addEventListener("click", () => {
    identityFields.classList.remove("hidden");
    changeIdentityBtn.classList.add("hidden");
     loadComments();
  });

  // For clearing local storage commments
    const clearCommentsBtn = document.getElementById("clearCommentsBtn");
  if (clearCommentsBtn) {
    clearCommentsBtn.addEventListener("click", () => {
      const confirmClear = confirm("Are you sure you want to delete all comments?");
      if (confirmClear) {
        localStorage.removeItem("debateComments");
        commentsContainer.innerHTML = "";
      }
    });
  }

  // Save comments
function saveComment(name, side, comment, pic) {
  const newComment = {
    name: escapeHTML(name),
    side: escapeHTML(side),
    comment: escapeHTML(comment),
    pic
  };

  let comments = [];
  try {
    comments = JSON.parse(localStorage.getItem("debateComments") || "[]");
  } catch (err) {
    console.error("❌ Failed to load existing comments:", err);
  }

  comments.push(newComment);

  try {
    localStorage.setItem("debateComments", JSON.stringify(comments));
    localStorage.setItem("debateName", newComment.name);
    localStorage.setItem("debateSide", newComment.side);
    console.log("💾 Comment saved successfully!");
  } catch (err) {
    console.error("❌ Failed to save comment:", err);
    alert("⚠️ Unable to save comment. Try clearing localStorage or free up space.");
    return;
  }

  commentInput.value = "";
  identityFields.classList.add("hidden");
  changeIdentityBtn.classList.remove("hidden");
  loadComments();
}


});

