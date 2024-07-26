jest.mock("next/navigation", () => ({
  usePathname() {
    return "";
  },
}));
