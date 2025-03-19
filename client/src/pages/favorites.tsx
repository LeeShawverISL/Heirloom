import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('favoriteDesigns');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (id: number) => {
    const updated = favorites.filter(f => f.id !== id);
    setFavorites(updated);
    localStorage.setItem('favoriteDesigns', JSON.stringify(updated));
    
    toast({
      title: "Design removed",
      description: "The design has been removed from favorites."
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Saved Designs</h1>
      {favorites.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No saved designs yet. Start creating!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((design) => (
            <Card key={design.id}>
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    Design #{design.id}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(design.date).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(design.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                {/* Canvas preview of saved design */}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
