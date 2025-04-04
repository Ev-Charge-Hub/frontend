// src/__mocks__/next_navigation.js
export const useRouter = jest.fn().mockReturnValue({
  push: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn()
});

export const usePathname = jest.fn().mockReturnValue('/');
export const useSearchParams = jest.fn().mockReturnValue(new URLSearchParams());