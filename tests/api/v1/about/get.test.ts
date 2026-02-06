describe("GET /api/v1/about", () => {
  test("Expecting an string response.", async () => {
    const response = await fetch("http:localhost:3000/api/v1/about", {
      method: "GET",
    });

    const responseBody = await response.json();
    expect(typeof responseBody.text).toBe("string");
    expect(response.status).toBe(200);
  });
});
