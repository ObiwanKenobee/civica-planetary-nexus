import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { GuardianSession, GuardianCredentials } from "../types/guardian";
import { DEMO_CREDENTIALS } from "../data/guardianData";

interface GuardianAuthContextType {
  session: GuardianSession | null;
  login: (credentials: GuardianCredentials) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const GuardianAuthContext = createContext<GuardianAuthContextType | undefined>(
  undefined,
);

export function GuardianAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<GuardianSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedSession = localStorage.getItem("guardian-session");
    if (storedSession) {
      try {
        const parsedSession = JSON.parse(storedSession);
        const expiresAt = new Date(parsedSession.expiresAt);

        if (expiresAt > new Date()) {
          setSession({
            ...parsedSession,
            expiresAt,
          });
        } else {
          localStorage.removeItem("guardian-session");
        }
      } catch (error) {
        console.error("Error parsing guardian session:", error);
        localStorage.removeItem("guardian-session");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: GuardianCredentials): Promise<boolean> => {
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      credentials.username === DEMO_CREDENTIALS.username &&
      credentials.password === DEMO_CREDENTIALS.password
    ) {
      const newSession: GuardianSession = {
        isAuthenticated: true,
        user: credentials.username,
        accessLevel: "demo",
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours
      };

      setSession(newSession);
      localStorage.setItem("guardian-session", JSON.stringify(newSession));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setSession(null);
    localStorage.removeItem("guardian-session");
  };

  return (
    <GuardianAuthContext.Provider value={{ session, login, logout, isLoading }}>
      {children}
    </GuardianAuthContext.Provider>
  );
}

export function useGuardianAuth() {
  const context = useContext(GuardianAuthContext);
  if (context === undefined) {
    throw new Error(
      "useGuardianAuth must be used within a GuardianAuthProvider",
    );
  }
  return context;
}
