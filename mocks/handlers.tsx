import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://rickandmortyapi.com/api/character", ({ params }) => {
    return HttpResponse.json({
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
