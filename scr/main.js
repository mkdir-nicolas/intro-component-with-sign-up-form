const patternEmpty = new RegExp(/^\s*$/);

const errorMessage = (value) => {
  return `<span class="errorMessage"> ${value} cannot be empty</span>`;
};
const errorMessageEmail = () => {
  return `<span class="errorMessageEmail"> Looks like this is not an email</span>`;
};

const toArray = (list) => {
  return Array.from(list).map((e) => {
    return e;
  });
};

const isEmpty = (element) => patternEmpty.test(element);

const isEmailValid = (id) => {
  const pattern = new RegExp(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/);
  if (!id.value) return false;
  return pattern.test(id.value);
};

const addErrorMessage = (e) => {
  if (!e.nextElementSibling.classList.contains("errorMessage")) {
    e.insertAdjacentHTML("afterend", errorMessage(e.placeholder));
    e.classList.add("error");
  }
};

const addErrorMessageEmail = (e) => {
  if (e.nextElementSibling.classList.contains("errorMessage"))
    e.nextElementSibling.remove();
  if (!e.nextElementSibling.classList.contains("errorMessageEmail")) {
    e.classList.add("error");
    e.insertAdjacentHTML("afterend", errorMessageEmail());
  }
};
const removeErrorMessage = (e) => {
  if (
    e.nextElementSibling.classList.contains("errorMessage") ||
    e.nextElementSibling.classList.contains("errorMessageEmail")
  ) {
    e.classList.remove("error");
    e.nextElementSibling.remove();
  }
};

btnInput.addEventListener("click", (e) => {
  e.preventDefault();
  const $inputList = toArray(document.querySelectorAll(".input"));
  const $inputEmail = document.getElementById("email");
  // console.log(isEmpty($inputEmail.value));
  if (isEmpty($inputEmail.value)) {
    removeErrorMessage($inputEmail);
    addErrorMessage($inputEmail);
  } else {
    isEmailValid($inputEmail)
      ? removeErrorMessage($inputEmail)
      : addErrorMessageEmail($inputEmail);
  }
  $inputList.forEach((e) => {
    if (isEmpty(e.value)) {
      return addErrorMessage(e);
    }
    removeErrorMessage(e);
  });
});

btnClose.addEventListener("click", () => {
  footer.remove();
});
