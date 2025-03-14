import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://rickandmortyapi.com/api/character", ({ request }) => {
    // Extract URL parameters
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1"; // Default to page "1"

    return HttpResponse.json({
      info: {
        next: page === "1" ? "2" : null, // Simulate pagination
        page: Number(page),
      },
      results: [
        {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          type: "",
          gender: "Male",
          origin: { name: "Earth", url: "" },
          location: { name: "Citadel of Ricks", url: "" },
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        },
      ],
    });
  }),
];
