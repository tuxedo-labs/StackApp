import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import app from "../../src";
import { AuthTest } from "./test-utils";
import { logger } from "../application/logging";

describe("POST /api/auth/register", () => {
  afterEach(async () => {
    await AuthTest.delete();
  });

  it("should reject registration if request is invalid", async () => {
    const response = await app.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: "",
        password: "",
        name: "",
      }),
    });
    const body = await response.json();
    logger.debug(body);
    expect(response.status).toBe(400);
    expect(body.errors).toBeDefined();
  });

  it("should register user successfully", async () => {
    const response = await app.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: "example",
        password: "example",
        name: "example",
      }),
    });
    const body = await response.json();
    logger.debug(body);
    expect(response.status).toBe(200);
    expect(body.data).toBeDefined();
    expect(body.data.username).toBe("example");
    expect(body.data.name).toBe("example");
  });

  it("should reject register new user if username already exists", async () => {
    await AuthTest.create();

    const response = await app.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: "example",
        password: "example",
        name: "example",
      }),
    });
    const body = await response.json();
    logger.debug(body);
    expect(response.status).toBe(400);
    expect(body.errors).toBeDefined();
  });
});

describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    await AuthTest.create();
  });

  afterEach(async () => {
    await AuthTest.delete();
  });

  it("should be able to login", async () => {
    const response = await app.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: "example",
        password: "example",
      }),
    });
    const body = await response.json();
    logger.debug(body);
    expect(response.status).toBe(200);
    expect(body.data).toBeDefined();
  });
  it("should be reject if username or password wrong!", async () => {
    const response = await app.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: "test1",
        password: "test1",
      }),
    });
    const body = await response.json();
    logger.debug(body);
    expect(response.status).toBe(401);
    expect(body.errors).toBeDefined();
  });
});
