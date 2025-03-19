import { completedPieces } from "@/lib/jewelry-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SearchResults() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {completedPieces.map((piece) => (
        <Card key={piece.id}>
          <CardHeader className="p-0">
            <img
              src={piece.imageUrl}
              alt={piece.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-lg">{piece.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">{piece.price}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
