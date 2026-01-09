const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { AdminPage } = require("../pages/AdminPage");

const user = {
  role: "ESS",
  employeeName: "Laura Christine Anderson",
  username: "Test_1",
  password: "Laura123",
  status: "Enabled"
};

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();
  await login.login("Admin", "admin123");
});

test("TC-01: Navigate to Admin", async ({ page }) => {
  const admin = new AdminPage(page);
  await admin.goToAdmin();
});

test("TC-02: Add New User", async ({ page }) => {
  const admin = new AdminPage(page);
  await admin.goToAdmin();
  await admin.addUser(user);
});

test("TC-03: Search User", async ({ page }) => {
  const admin = new AdminPage(page);
  await admin.goToAdmin();
  await admin.searchByUsername(user.username);
});

test("TC-04: Edit User", async ({ page }) => {
  const admin = new AdminPage(page);
  await admin.goToAdmin();
  await admin.searchByUsername(user.username);
  await admin.editEmployeeName("Timothy Lewis Amiano");
});

test("TC-05: Validate Updated User", async ({ page }) => {
  const admin = new AdminPage(page);
  await admin.goToAdmin();
  await admin.searchByUsername("Test_1");

  await expect(
    page.locator(".oxd-table-card")
  ).toBeVisible();
});

test("TC-06: Delete User", async ({ page }) => {
  const admin = new AdminPage(page);
  await admin.goToAdmin();
  await admin.searchByUsername(user.username);
  await admin.deleteUser();
});

test("TC-07: Verify User Deleted", async ({ page }) => {
  const admin = new AdminPage(page);
  await admin.goToAdmin();
  await admin.searchByUsername(user.username);

  await expect(
    page.getByText("No Records Found")
  ).toBeVisible();
});
