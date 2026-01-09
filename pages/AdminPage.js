const { expect } = require("@playwright/test");

class AdminPage {
  constructor(page) {
    this.page = page;

    this.adminMenu = page.getByRole("link", { name: "Admin" });
    this.addBtn = page.getByRole("button", { name: "Add" });
    this.searchBtn = page.getByRole("button", { name: "Search" });
    this.saveBtn = page.getByRole("button", { name: "Save" });
  }

  async goToAdmin() {
    await this.adminMenu.click();
    await expect(
      this.page.getByRole("heading", { name: "Admin" })
    ).toBeVisible();
  }

  async addUser(user) {
    await this.addBtn.click();

    await this.page.getByText("User Role").click();
    await this.page.getByRole("option", { name: user.role }).click();

    await this.page.getByPlaceholder("Type for hints...")
      .fill(user.employeeName);
    await this.page.getByText(user.employeeName).click();

    await this.page.getByText("Status").click();
    await this.page.getByRole("option", { name: user.status }).click();

    await this.page.getByLabel("Username").fill(user.username);
    await this.page.getByLabel("Password").fill(user.password);
    await this.page.getByLabel("Confirm Password").fill(user.password);

    await this.saveBtn.click();

    await expect(
      this.page.getByText("Successfully Saved")
    ).toBeVisible();
  }

  async searchByUsername(username) {
    await this.page.getByLabel("Username").fill(username);
    await this.searchBtn.click();
  }

  async editEmployeeName(newName) {
    await this.page.locator("i.bi-pencil-fill").first().click();

    await this.page.getByPlaceholder("Type for hints...")
      .fill(newName);
    await this.page.getByText(newName).click();

    await this.saveBtn.click();

    await expect(
      this.page.getByText("Successfully Updated")
    ).toBeVisible();
  }

  async deleteUser() {
    await this.page.locator("i.bi-trash").first().click();
    await this.page.getByRole("button", { name: "Yes, Delete" }).click();

    await expect(
      this.page.getByText("Successfully Deleted")
    ).toBeVisible();
  }
}

module.exports = { AdminPage };
