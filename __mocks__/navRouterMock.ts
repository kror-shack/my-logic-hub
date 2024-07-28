jest.mock("next/navigation", () => ({
  useSearchParams: () => {
    const get = (key: string) => {
      return "";
    };
    return { get };
  },
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname() {
    return "";
  },
}));
