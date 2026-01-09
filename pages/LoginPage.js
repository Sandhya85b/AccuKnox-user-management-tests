const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;

    this.username = page.getByPlaceholder("Username");
    this.password = page.getByPlaceholder("Password");
    this.loginBtn = page.getByRole("button", { name: "Login" });
  }

  async open() {
    await this.page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();

    await expect(
      this.page.getByRole("heading", { name: "Dashboard" })
    ).toBeVisible();
  }
}

module.exports = { LoginPage };
