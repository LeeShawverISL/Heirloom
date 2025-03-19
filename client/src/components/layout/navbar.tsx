import { Link } from "wouter";
import { Button } from "@/components/ui/button";
// Added import for Icons.  The original file likely needs to be created.
import { Icons } from "@/components/ui/icons";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="py-3 px-4 border-b">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-6">
          <Link href="/">
            {/* Removed nested <a> tag */}
            <span className="flex items-center space-x-2 cursor-pointer">
              <Icons.logo className="h-6 w-6" />
              <span className="font-semibold text-lg">Jewelry Custom Design</span>
            </span>
          </Link>
        </div>
        <div className="flex space-x-4 items-center">
          <Link href="/favorites">
            {/* Removed nested <a> tag */}
            <span>
              <Button variant="ghost" size="sm">
                <Icons.heart className="mr-2 h-4 w-4" />
                Favorites
              </Button>
            </span>
          </Link>

          {user ? (
            <>
              <span className="text-sm mr-2">Welcome, {user.name}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                disabled={isLoading}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/login">
              {/* Removed nested <a> tag */}
              <span>
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}