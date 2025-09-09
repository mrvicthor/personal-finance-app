import Bills from "@/components/bills";
import { screen, render } from "@testing-library/react";
const bills = [
  {
    avatar: "./assets/images/avatars/emma-richardson.jpg",
    name: "Emma Richardson",
    category: "General",
    date: new Date("2024-08-19T14:23:11Z"),
    amount: 75.5,
    recurring: false,
  },
  {
    avatar: "./assets/images/avatars/savory-bites-bistro.jpg",
    name: "Savory Bites Bistro",
    category: "Dining Out",
    date: new Date("2024-08-19T20:23:11Z"),
    amount: -55.5,
    recurring: false,
  },
];
describe("Bills Component", () => {
  test("should render bills list", () => {
    render(<Bills data={bills} />);
    expect(screen.getByTestId("bills-container")).toBeInTheDocument();
  });
});
