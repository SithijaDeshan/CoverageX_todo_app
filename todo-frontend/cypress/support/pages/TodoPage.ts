export class TodoPage {
  visit() {
    cy.visit("/");
  }

  addTask(content: string) {
    cy.get('input[placeholder="Enter task title"]').type(content);
    cy.get('button[type="submit"]').click();
  }

  getTask(content: string) {
    // Return the element containing the text
    return cy.contains(content);
  }

  completeTask(content: string) {
    cy.contains(content).parents(".glass").find("button").click();
  }

  verifyTaskVisible(content: string) {
    this.getTask(content).should("be.visible");
  }

  getLoadingIndicator() {
    return cy.get('button[type="submit"]').find("svg.animate-spin");
  }

  getEmptyState() {
    return cy.contains("All caught up!");
  }

  getValidationError() {
    return cy.get("div.text-red-400");
  }

  getGlobalError() {
    return cy.get("div.border-red-500");
  }

  getSubmitButton() {
    return cy.get('button[type="submit"]');
  }
}
