import { Customizer } from "@/components/jewelry/customizer";

export default function NecklaceDesigner() {
  return (
    <div className="max-w-7xl mx-auto py-16">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-8">
          Design Your Perfect Necklace
        </h2>
        <Customizer jewelryType="necklace" />
      </div>
    </div>
  );
}
