import { TodoPage } from "../support/pages/TodoPage";

describe("Task Completion Scenarios", () => {
  const todoPage = new TodoPage();

  it("should complete a single task successfully", () => {
    const task = {
      id: 201,
      title: "Solo Task",
      description: "",
      completed: false,
    };

    // Initial state: task exists
    cy.intercept("GET", "http://localhost:8080/api/tasks/recent", [task]).as(
      "getTasks"
    );
    todoPage.visit();
    cy.wait("@getTasks");

    // After completion: task removed
    cy.intercept("GET", "http://localhost:8080/api/tasks/recent", []).as(
      "refresh"
    );
    cy.intercept("PUT", `http://localhost:8080/api/tasks/${task.id}`, {}).as(
      "complete"
    );

    todoPage.completeTask(task.title);
    cy.wait("@complete");
    cy.contains(task.title).should("not.exist");
  });

  it("should complete the first task in a list", () => {
    const tasks = [
      { id: 202, title: "First Task", description: "", completed: false },
      { id: 203, title: "Second Task", description: "", completed: false },
    ];

    cy.intercept("GET", "http://localhost:8080/api/tasks/recent", tasks).as(
      "getTasks"
    );
    todoPage.visit();
    cy.wait("@getTasks");

    // After completing first task, only second remains
    cy.intercept("GET", "http://localhost:8080/api/tasks/recent", [
      tasks[1],
    ]).as("refresh");
    cy.intercept(
      "PUT",
      `http://localhost:8080/api/tasks/${tasks[0].id}`,
      {}
    ).as("completeFirst");

    todoPage.completeTask("First Task");
    cy.wait("@completeFirst");

    cy.contains("First Task").should("not.exist");
    cy.contains("Second Task").should("be.visible");
  });

  it("should complete the last task in a list", () => {
    const tasks = [
      { id: 204, title: "Top Task", description: "", completed: false },
      { id: 205, title: "Bottom Task", description: "", completed: false },
    ];

    cy.intercept("GET", "http://localhost:8080/api/tasks/recent", tasks).as(
      "getTasks"
    );
    todoPage.visit();
    cy.wait("@getTasks");

    // After completing last task, only first remains
    cy.intercept("GET", "http://localhost:8080/api/tasks/recent", [
      tasks[0],
    ]).as("refresh");
    cy.intercept(
      "PUT",
      `http://localhost:8080/api/tasks/${tasks[1].id}`,
      {}
    ).as("completeLast");

    todoPage.completeTask("Bottom Task");
    cy.wait("@completeLast");

    cy.contains("Bottom Task").should("not.exist");
    cy.contains("Top Task").should("be.visible");
  });

  it("should verify task removal from view immediately", () => {
    const task = {
      id: 206,
      title: "Fast Remove",
      description: "",
      completed: false,
    };

    cy.intercept("GET", "http://localhost:8080/api/tasks/recent", [task]).as(
      "getTasks"
    );
    todoPage.visit();
    cy.wait("@getTasks");

    // Setup post-completion state
    cy.intercept("GET", "http://localhost:8080/api/tasks/recent", []);
    cy.intercept("PUT", `http://localhost:8080/api/tasks/${task.id}`, {});

    todoPage.completeTask("Fast Remove");
    cy.contains("Fast Remove").should("not.exist");
  });
});
