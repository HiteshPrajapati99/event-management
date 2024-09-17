import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const Protect = () => {
  const navigate = useNavigate();

  const userId = localStorage.getItem("auth_user");

  useEffect(() => {
    if (!userId) navigate("/login");
  }, [userId]);

  return (
    <div>
      <div className="flex h-24 items-center bg-white shadow-lg justify-around mb-4">
        <h3 className="text-xl font-bold">Logo</h3>
        <div className="space-x-6">
          <NavLink
            className={({ isActive }) =>
              `text-lg font-semibold ${isActive ? "text-blue-500" : ""}`
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `text-lg font-semibold ${isActive ? "text-blue-500" : ""}`
            }
            to="/events"
          >
            Events
          </NavLink>
        </div>

        <div>
          <Button
            onClick={() => {
              localStorage.removeItem("auth_user");
              navigate("/login");
            }}
            variant="outline"
          >
            LogOut
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Protect;
