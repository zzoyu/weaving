// Utility to generate a random 19-digit provider_id string

import { faker } from "@faker-js/faker";

// First digit is guaranteed to be 1-9 (no leading zero)
export function generateProviderId(): string {
  faker.seed(faker.number.int({ min: 1, max: 9 }));
  let id = String(faker.number.int({ min: 1, max: 9 }));
  for (let i = 0; i < 18; i++) {
    faker.seed(); // re-seed to get different numbers
    id += String(faker.number.int({ min: 0, max: 9 }));
  }
  return id;
}

export function randomProvider(): { provider_id: string } {
  return { provider_id: generateProviderId() };
}
