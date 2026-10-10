import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import Gallery from "@/components/Gallery";
import ContactModal from "@/components/ContactModal";
import VideoTheater from "@/components/VideoTheater";
import Hero from "@/components/Hero";

beforeAll(() => {
  vi.stubGlobal("IntersectionObserver", class {
    observe() {}
    unobserve() {}
    disconnect() {}
  });
});

afterEach(cleanup);

describe("mobile portfolio", () => {
  it("links hero navigation and View My Work to sections and opens contact", () => {
    const onContactClick = vi.fn();
    render(<Hero onContactClick={onContactClick} />);
    expect(screen.getByRole("link", { name: "View My Work" })).toHaveAttribute("href", "#gallery");
    const navigation = screen.getByRole("navigation", { name: "Section navigation" });
    expect(within(navigation).getByRole("link", { name: "Work" })).toHaveAttribute("href", "#gallery");
    expect(within(navigation).getByRole("link", { name: "Film" })).toHaveAttribute("href", "#video");
    fireEvent.click(within(navigation).getByRole("button", { name: "Contact" }));
    fireEvent.click(screen.getByRole("button", { name: "Contact Me" }));
    expect(onContactClick).toHaveBeenCalledTimes(2);
  });

  it("reserves image space and keeps All ordering stable across interactions", async () => {
    render(<Gallery />);
    const photoOrder = () => screen.getAllByRole("button", { name: /^View / }).map((button) => button.getAttribute("aria-label"));
    const order = photoOrder();
    const image = screen.getAllByRole("img")[0];
    expect(Number(image.getAttribute("width"))).toBeGreaterThan(0);
    expect(Number(image.getAttribute("height"))).toBeGreaterThan(0);
    const widths = image.getAttribute("srcset")!.split(", ").map((candidate) => Number(candidate.split(" ")[1].replace("w", "")));
    expect(widths.slice(0, 3)).toEqual([320, 640, 960]);
    expect(widths[3]).toBeGreaterThanOrEqual(960);
    expect(widths[3]).toBeLessThanOrEqual(1600);
    expect(image).toHaveAttribute("loading", "lazy");

    const trigger = screen.getAllByRole("button", { name: /^View / })[0];
    fireEvent.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(photoOrder()).toEqual(order);

    fireEvent.click(screen.getByRole("button", { name: /^Ocean$/ }));
    expect(screen.getAllByRole("button", { name: /^View / })).toHaveLength(4);
    fireEvent.click(screen.getByRole("button", { name: /^All$/ }));
    expect(photoOrder()).toEqual(order);
    expect(screen.queryByRole("button", { name: /^A Mood$/ })).not.toBeInTheDocument();
  });

  it("does not create a YouTube player until Play is selected", () => {
    const { container } = render(<VideoTheater />);
    expect(container.querySelector("iframe")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /^Play / }));
    expect(container.querySelector("iframe")).toHaveAttribute(
      "src", "https://www.youtube.com/embed/-NVZB0Aay0Y?autoplay=1",
    );
  });

  it("browses the selected category with swipes, buttons, and arrow keys without wrapping", async () => {
    render(<Gallery />);
    fireEvent.click(screen.getByRole("button", { name: /^Ocean$/ }));
    const photos = screen.getAllByRole("button", { name: /^View / });
    const expectedAlts = photos.map((photo) => within(photo).getByRole("img").getAttribute("alt"));
    fireEvent.click(photos[0]);
    const dialog = screen.getByRole("dialog");
    const currentImage = () => within(dialog).getByRole("img");
    const swipe = (dx: number, dy = 0) => {
      const surface = currentImage().parentElement!;
      fireEvent.touchStart(surface, {
        touches: [{ clientX: 200, clientY: 200 }],
        targetTouches: [{ clientX: 200, clientY: 200 }],
        changedTouches: [{ clientX: 200, clientY: 200 }],
      });
      fireEvent.touchEnd(surface, {
        touches: [],
        changedTouches: [{ clientX: 200 + dx, clientY: 200 + dy }],
      });
    };
    expect(screen.getByRole("button", { name: "Previous photo" })).toBeDisabled();
    expect(currentImage()).toHaveAttribute("alt", expectedAlts[0]);
    swipe(-20);
    swipe(-60, 100);
    expect(currentImage()).toHaveAttribute("alt", expectedAlts[0]);
    swipe(-100);
    expect(currentImage()).toHaveAttribute("alt", expectedAlts[1]);
    expect(within(dialog).getByText("Ocean · 2 / 4")).toBeInTheDocument();
    swipe(100);
    expect(currentImage()).toHaveAttribute("alt", expectedAlts[0]);
    swipe(100);
    expect(currentImage()).toHaveAttribute("alt", expectedAlts[0]);
    fireEvent.click(screen.getByRole("button", { name: "Next photo" }));
    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    fireEvent.keyDown(dialog, { key: "ArrowRight" });
    expect(currentImage()).toHaveAttribute("alt", expectedAlts[3]);
    expect(screen.getByRole("button", { name: "Next photo" })).toBeDisabled();
    swipe(-100);
    expect(currentImage()).toHaveAttribute("alt", expectedAlts[3]);
    fireEvent.keyDown(dialog, { key: "ArrowLeft" });
    expect(currentImage()).toHaveAttribute("alt", expectedAlts[2]);

    const surface = currentImage().parentElement!;
    fireEvent.touchStart(surface, {
      touches: [{ clientX: 200, clientY: 200 }],
      targetTouches: [{ clientX: 200, clientY: 200 }],
      changedTouches: [{ clientX: 200, clientY: 200 }],
    });
    fireEvent.touchMove(surface, {
      touches: [{ clientX: 150, clientY: 200 }, { clientX: 250, clientY: 200 }],
      targetTouches: [{ clientX: 150, clientY: 200 }, { clientX: 250, clientY: 200 }],
      changedTouches: [{ clientX: 150, clientY: 200 }, { clientX: 250, clientY: 200 }],
    });
    fireEvent.touchEnd(surface, { touches: [], changedTouches: [{ clientX: 100, clientY: 200 }] });
    expect(currentImage()).toHaveAttribute("alt", expectedAlts[2]);
    fireEvent.touchStart(surface, {
      touches: [{ clientX: 200, clientY: 200 }],
      targetTouches: [{ clientX: 200, clientY: 200 }],
      changedTouches: [{ clientX: 200, clientY: 200 }],
    });
    fireEvent.touchCancel(surface);
    fireEvent.touchEnd(surface, { touches: [], changedTouches: [{ clientX: 100, clientY: 200 }] });
    expect(currentImage()).toHaveAttribute("alt", expectedAlts[2]);

    fireEvent.keyDown(dialog, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(photos[0]).toHaveFocus());
  });

  it("makes contact details scrollable and closes on Escape", () => {
    const onClose = vi.fn();
    render(<ContactModal isOpen onClose={onClose} />);
    expect(screen.getByRole("dialog")).toHaveClass("overflow-y-auto");
    expect(screen.getByRole("button", { name: "Close contact details" })).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });
});
