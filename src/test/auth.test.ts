import { describe, it, expect, afterEach } from "bun:test";
import app from "../../src";
import { AuthTest } from "./test-utils";

describe("POST /api/auth/register", () => {
  it("should reject registration if request is invalid", async () => {
    AuthTest.delete()
    const response = await app.request("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "",
        password: "",
        name: "",
      }),
    });
    const body = await response.json();
    expect(response.status).toBe(400);
    expect(body.errors).toBeDefined();
  });

  it("should register user successfully", async () => {
    const response = await app.request("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "example",
        password: "example",
        name: "example",
      }),
    });
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(body.data).toBeDefined();
    expect(body.data.username).toBe("example");
    expect(body.data.name).toBe("example");
  });

  it("should reject register new user if username already exists", async () => {
    const response = await app.request("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "example",
        password: "example",
        name: "example",
      }),
    });
    const body = await response.json();
    expect(response.status).toBe(400);
    expect(body.errors).toBeDefined();
  });
});

