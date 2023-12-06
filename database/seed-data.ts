
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  createdAt: number;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
			description:
				"Pending: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem repudiandae tempore blanditiis, quo cupiditate at.",
			createdAt: Date.now(),
			status: "pending",
		},
		{
			description:
				"In-Progress: Nulla sunt anim in consequat laborum nostrud laborum sit duis velit.",
			createdAt: Date.now() - 1000000,
			status: "in-progress",
		},
		{
			description:
				"Finished: Dolore mollit exercitation sunt incididunt eu laborum amet laborum commodo aliquip minim laborum consequat.",
			createdAt: Date.now() - 100000,
			status: "finished",
		},
  ]
}