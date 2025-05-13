import { v4 as uuidv4 } from "https://cdn.skypack.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForms.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const todosContainer = document.querySelector(".todos__list");

const Todocounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formData) => {
    const date = new Date(formData.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const values = {
      name: formData.name,
      date: date,
      id: uuidv4(),
    };

    const todoElement = generateTodo(values);
    section.addItem(todoElement);

    newTodoValidator.resetValidation();
  },
});
addTodoPopup.setEventListeners();

function handleCheck(completed) {
  Todocounter.updateCompleted(completed);
}

function handleDelete(completed) {
  Todocounter.updateCompleted(false);
  Todocounter.updateTotal(false);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);

  const todoElement = todo.getView();
  return todoElement;
};

const items = [];

const section = new Section({
  items: initialTodos,
  renderer: (items) => {
    const todoElement = generateTodo(items);

    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
