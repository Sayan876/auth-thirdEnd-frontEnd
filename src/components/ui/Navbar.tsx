import useAuth from "@/auth/store";
import { Button } from "./button";
import { NavLink, useNavigate } from "react-router";
import { Moon, Sun, Menu} from "lucide-react";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";



const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const checkLogin = useAuth((state) => state.checkLogin);
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);

  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const ThemeButton = (
    <Button
  variant="outline"
  size="icon"
  onClick={toggleTheme}
  className="cursor-pointer transition-all duration-500 hover:scale-110 active:scale-95"
>
  <div className="relative flex h-5 w-5 items-center justify-center">
    <Sun
      className={`absolute h-5 w-5 transition-all duration-500 ${
        theme === "dark"
          ? "rotate-0 scale-100"
          : "rotate-180 scale-0"
      }`}
    />

    <Moon
      className={`absolute h-5 w-5 transition-all duration-500 ${
        theme === "dark"
          ? "-rotate-180 scale-0"
          : "rotate-0 scale-100"
      }`}
    />
  </div>
</Button>
  );

return (
  <nav className="sticky top-0 z-50 h-16 border-b border-border/40 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 transition-colors duration-500">
    <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center px-6">

      {/* Brand */}

      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 font-semibold md:left-6 md:translate-x-0">
  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-r from-primary to-primary/40 text-primary-foreground">
    A
  </span>

  <span className="tracking-tight text-base">
    Auth App
  </span>
</div>

      {/* Desktop */}

      <div className="absolute right-6 hidden items-center gap-2 md:flex">

        {checkLogin() ? (
          <>
            <NavLink
              to="/dashboard/profile"
              className="font-medium hover:text-primary transition-colors"
            >
              {user?.name}
            </NavLink>

            <Button
              size="sm"
              variant="outline"
              className="cursor-pointer"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </Button>

            {ThemeButton}
          </>
        ) : (
          <>
            <NavLink
              to="/"
              className="hover:text-primary transition-colors"
            >
              Home
            </NavLink>

            <NavLink to="/login">
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer"
              >
                Login
              </Button>
            </NavLink>

            <NavLink to="/signup">
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer"
              >
                Register
              </Button>
            </NavLink>

            {ThemeButton}
          </>
        )}

      </div>

      {/* Mobile */}

      <div className="absolute right-4 md:hidden">
        <Sheet>
          <SheetTrigger >
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

    <SheetContent side="right" className="w-[280px] border-l border-white/10 bg-background/60 backdrop-blur-2xl">

            <div className="flex h-full flex-col py-8">

              {checkLogin() ? (
                <>
  <div className="mb-8 flex flex-col items-center border-b border-border pb-6">
    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-primary/10 ring-2 ring-primary/20">
  {user?.image ? (
    <img
      src={user.image}
      alt={user.name ?? "Profile"}
      className="h-full w-full object-cover"
    />
  ) : (
    <span className="text-xl font-bold text-primary">
      {user?.name?.charAt(0).toUpperCase() ?? "U"}
    </span>
  )}
</div>

    <h2 className="mt-3 text-lg font-semibold">
      {user?.name}
    </h2>

    <p className="text-sm text-muted-foreground">
      {user?.email}
    </p>
  </div>

  <div className="space-y-3">
    <NavLink to="/dashboard/profile">
      <Button variant="ghost" className="w-full justify-start">
        Profile
      </Button>
    </NavLink>

    <Button
      variant="ghost"
      className="w-full justify-start"
      onClick={() => {
        logout();
        navigate("/");
      }}
    >
      Logout
    </Button>
  </div>

  <div className="mt-auto flex justify-center">
    {ThemeButton}
  </div>
</>
              ) : (
                <>
  <div className="mb-8 border-b border-border pb-6 text-center">
    <h2 className="text-xl font-bold">
      Auth App
    </h2>

    <p className="text-sm text-muted-foreground">
      Secure Authentication
    </p>
  </div>

  <div className="space-y-3">
    <NavLink to="/">
      <Button variant="ghost" className="w-full justify-start">
        Home
      </Button>
    </NavLink>

    <NavLink to="/login">
      <Button variant="ghost" className="w-full justify-start">
        Login
      </Button>
    </NavLink>

    <NavLink to="/signup">
      <Button variant="ghost" className="w-full justify-start">
        Register
      </Button>
    </NavLink>
  </div>

  <div className="mt-auto flex justify-center">
    {ThemeButton}
  </div>
</>
              )}

            </div>

          </SheetContent>
        </Sheet>
      </div>

    </div>
  </nav>
);
};

export default Navbar;