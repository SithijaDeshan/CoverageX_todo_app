import { TodoPage } from "../support/pages/TodoPage";

describe("Task Creation Scenarios", () => {
  const todoPage = new TodoPage();

  beforeEach(() => {
    // Start with empty state
    cy.intercept("GET", "http://localhost:8080/api/tasks/recent", []).as(
      "getRecent"
    );
    todoPage.visit();
    cy.wait("@getRecent");
  });

  it("should successfully create task with title only", () => {
    const title = "Simple Task";
    cy.intercept("POST", "http://localhost:8080/api/tasks", {
      id: 101,
      title,
      description: "",
      completed: false,
    }).as("createTask");
    cy.intercept("GET", "http://localhost:8080/api/tasks/recent", [
      { id: 101, title, description: "", completed: false },
    ]).as("getRecentUpdated");

    todoPage.addTask(title);
    cy.wait("@createTask");

    // Validate form cleared
    cy.get('input[placeholder="Enter task title"]').should("have.value", "");
    todoPage.verifyTaskVisible(title);
  });

  it("should successfully create task with title and description", () => {
    const title = "Detailed Task";
    const desc = "This is a description";

    cy.intercept("POST", "http://localhost:8080/api/tasks", {
      id: 102,
      title,
      description: desc,
      completed: false,
    }).as("createTask");
    cy.intercept("GET", "http://localhost:8080/api/tasks/recent", [
      { id: 102, title, description: desc, completed: false },
    ]);

    cy.get('input[placeholder="Enter task title"]').type(title);
    cy.get('textarea[placeholder="Enter task description (optional)"]').type(
      desc
    );
    todoPage.getSubmitButton().click();

    cy.wait("@createTask");
    todoPage.verifyTaskVisible(title);
    cy.contains(desc).should("be.visible");
  });

  it("should show error when submitting empty title", () => {
    todoPage.getSubmitButton().click();
    todoPage.getValidationError().should("contain.text", "Title is required");
  });

  it("should show error when submitting whitespace-only title", () => {
    cy.get('input[placeholder="Enter task title"]').type("   ");
    todoPage.getSubmitButton().click();
    todoPage.getValidationError().should("contain.text", "Title is required");
  });

  it("should handle very long titles", () => {
    const longTitle = "A".repeat(100);
    cy.intercept("POST", "http://localhost:8080/api/tasks", {
      id: 103,
      title: longTitle,
      description: "",
      completed: false,
    }).as("createTask");
    cy.intercept("GET", "http://localhost:8080/api/tasks/recent", [
      { id: 103, title: longTitle, description: "", completed: false },
    ]);

    todoPage.addTask(longTitle);
    cy.wait("@createTask");
    todoPage.verifyTaskVisible(longTitle);
  });

  it("should handle special characters in title", () => {
    const specialTitle = '!@#$%^&*()_+<>?:"{}|';
    cy.intercept("POST", "http://localhost:8080/api/tasks", {
      id: 104,
      title: specialTitle,
      description: "",
      completed: false,
    }).as("createTask");
    cy.intercept("GET", "http://localhost:8080/api/tasks/recent", [
      { id: 104, title: specialTitle, description: "", completed: false },
    ]);

    todoPage.addTask(specialTitle);
    cy.wait("@createTask");
    todoPage.verifyTaskVisible(specialTitle);
  });

  it("should clear form values after success", () => {
    const title = "Task to Clear";
    cy.intercept("POST", "http://localhost:8080/api/tasks", {
      id: 105,
      title,
      description: "",
      completed: false,
    }).as("createTask");

    // Simulate description entry too
    cy.get('input[placeholder="Enter task title"]').type(title);
    cy.get('textarea[placeholder="Enter task description (optional)"]').type(
      "Desc"
    );
    todoPage.getSubmitButton().click();

    cy.wait("@createTask");
    cy.get('input[placeholder="Enter task title"]').should("have.value", "");
    cy.get('textarea[placeholder="Enter task description (optional)"]').should(
      "have.value",
      ""
    );
  });

  it("should show loading state during submission", () => {
    // Delay response to catch loading state
    cy.intercept("POST", "http://localhost:8080/api/tasks", (req) => {
      req.reply({
        delay: 500,
        body: {
          id: 106,
          title: "Loading Task",
          description: "",
          completed: false,
        },
      });
    }).as("createTaskDelayed");

    cy.get('input[placeholder="Enter task title"]').type("Loading Task");
    todoPage.getSubmitButton().click();

    // Check loading indicator during delay
    todoPage.getSubmitButton().should("be.disabled");
    todoPage.getLoadingIndicator().should("exist"); // Checks for svg.animate-spin
    cy.contains("Adding...").should("exist");

    cy.wait("@createTaskDelayed");
    todoPage.getSubmitButton().should("not.be.disabled");
  });

  it("should keep input focus behavior (polish check)", () => {
    todoPage.getSubmitButton().click(); // Error
    cy.get('input[placeholder="Enter task title"]')
      .click()
      .should("have.focus");
  });
});
