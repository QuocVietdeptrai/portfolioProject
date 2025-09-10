document.addEventListener("DOMContentLoaded", function() {
  const texts = ["Web Developer", "Backend Developer"];
  const typingElement = document.getElementById("typing-text");

  if (!typingElement) return; // Nếu không tìm thấy thì dừng

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1000);
        return;
      }
    } else {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
  }

  typeEffect();
});
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("#contact-form");
  if (form) {
    const validation = new JustValidate('#contact-form');

    validation
      .addField('#name', [
        { rule: 'required', errorMessage: 'Vui lòng nhập tên của bạn!' }
      ])
      .addField('#email', [
        { rule: 'required', errorMessage: 'Vui lòng nhập email!' },
        { rule: 'email', errorMessage: 'Email không hợp lệ!' }
      ])
      .addField('#title', [
        { rule: 'required', errorMessage: 'Vui lòng nhập tiêu đề!' }
      ])
      .addField('#message', [
        { rule: 'required', errorMessage: 'Vui lòng nhập nội dung!' },
        { rule: 'minLength', value: 10, errorMessage: 'Nội dung phải ít nhất 10 ký tự!' }
      ])
      .onSuccess((event) => {
        event.preventDefault();
        console.log("Validation thành công!");

        const formData = {
          name: document.querySelector('#name').value,
          email: document.querySelector('#email').value,
          title: document.querySelector('#title').value,
          message: document.querySelector('#message').value,
        };

        fetch("/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        })
          .then(res => res.json())
          .then(data => {
            if (data.code === "error") {
              alert(data.message);
            } else if (data.code === "success") {
              alert("You have successfully sent your contact!");
              window.location.href = "/";
            }
          })
          .catch(error => {
            console.error("Lỗi khi gửi dữ liệu:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
          });
      });
  }
});
