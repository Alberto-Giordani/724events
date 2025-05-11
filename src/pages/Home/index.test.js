import { fireEvent, render, screen, within } from "@testing-library/react";
import Home from "./index";
import eventsData from "../../../public/events.json";
import { useData } from "../../contexts/DataContext";

jest.mock("../../contexts/DataContext", () => ({
  useData: jest.fn(),
}));

beforeEach(() => {
  jest.resetAllMocks()
  useData.mockReturnValue({ data: { events: eventsData.events } });
});

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />);
    const eventList = document.getElementById("events");
    expect(eventList).toBeDefined();
  })
  it("a list of people is displayed", async () => {
    render(<Home />);
    await screen.findAllByTestId("card-image-testid");
  })
  it("a footer is displayed", async () => {
    render(<Home />);
    const footer = document.querySelector('footer');
    expect(footer).not.toBeNull();
  })
  it("an event card, with the last event, is displayed", async () => {
    render(<Home />);

    const lastEvent = eventsData.events.reduce((prev, current) =>
      new Date(current.date) > new Date(prev.date) ? current : prev
    );

    const lastEventCard = await screen.findByTestId("last-event-card-testid");
    expect(lastEventCard).toBeInTheDocument();

    const lastImg = await within(lastEventCard).findByTestId("card-image-testid");
    expect(lastImg).toHaveAttribute("src", lastEvent.cover);
  })
});
