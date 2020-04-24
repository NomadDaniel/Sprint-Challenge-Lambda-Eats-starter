describe("Testing the form", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000/");
  })
  
  it("Test1: User clicks order, adds inputs, click checkboxes, and clicks submit button", function() {
    cy
    .get('button[name="orderbutton"]')
    .click()
    cy
    .get('input[name="name"]')
    .type("Jojo")
    .should("have.value", "Jojo")
    cy
    .get('textarea[name="specialInstructions"]')
    .type("Crispy crust please")
    .should("have.value", "Crispy crust please")
    cy
    .get('select[name="size"]')
    .select('Small')
    .should("have.value", "Small")
    cy
    .get('[type=checkbox]')
    .check()
    .should("be.checked")
    cy
    .get('button[name="submit"]')
    .click()
  })

  it("Test2: User clicks order, doesn't select toppings or special Instructions, clicks submit button", function() {
      cy
      .get('button[name="orderbutton"]')
      .click()
      cy
      .get('input[name="name"]')
      .type("Jojo")
      .should("have.value", "Jojo")
      cy
      .get('select[name="size"]')
      .select('Large')
      .should("have.value", "Large")
      cy
      .get('button[name="submit"]')
      .click()

  })
  it("Error validation test", function () {
    cy
    .get('button[name="orderbutton"]')
    .click()
    cy
    .get('input[name="name"]')
    .type('Dan').clear()
  })
})