import type { JewelryComponent } from "@shared/schema";

export const chains: JewelryComponent[] = [
  {
    id: "chain-1",
    type: "chain",
    imageUrl: "/images/jewelry/chains/silver-curb.png",
    position: { x: 0, y: 0 },
    properties: { style: "curb", material: "silver" }
  },
  {
    id: "chain-2",
    type: "chain",
    imageUrl: "/images/jewelry/chains/gold-curb.png",
    position: { x: 0, y: 0 },
    properties: { style: "curb", material: "gold" }
  },
  {
    id: "chain-3",
    type: "chain",
    imageUrl: "/images/jewelry/chains/silver-rope.png",
    position: { x: 0, y: 0 },
    properties: { style: "rope", material: "silver" }
  },
  {
    id: "chain-4",
    type: "chain",
    imageUrl: "/images/jewelry/chains/gold-rope.png",
    position: { x: 0, y: 0 },
    properties: { style: "rope", material: "gold" }
  },
  {
    id: "chain-5",
    type: "chain",
    imageUrl: "/images/jewelry/chains/silver-wheat.png",
    position: { x: 0, y: 0 },
    properties: { style: "wheat", material: "silver" }
  },
  {
    id: "chain-6",
    type: "chain",
    imageUrl: "/images/jewelry/chains/gold-wheat.png",
    position: { x: 0, y: 0 },
    properties: { style: "wheat", material: "gold" }
  }
];

export const gems: JewelryComponent[] = [
  {
    id: "gem-1",
    type: "gem",
    imageUrl: "/images/jewelry/gems/diamond.png",
    position: { x: 0, y: 0 },
    properties: { type: "diamond", size: 1 }
  },
  {
    id: "gem-2",
    type: "gem",
    imageUrl: "/images/jewelry/gems/ruby.png",
    position: { x: 0, y: 0 },
    properties: { type: "ruby", size: 0.8 }
  },
  {
    id: "gem-3",
    type: "gem",
    imageUrl: "/images/jewelry/gems/sapphire.png",
    position: { x: 0, y: 0 },
    properties: { type: "sapphire", size: 0.9 }
  },
  {
    id: "gem-4",
    type: "gem",
    imageUrl: "/images/jewelry/gems/emerald.png",
    position: { x: 0, y: 0 },
    properties: { type: "emerald", size: 0.7 }
  },
  {
    id: "gem-5",
    type: "gem",
    imageUrl: "/images/jewelry/gems/amethyst.png",
    position: { x: 0, y: 0 },
    properties: { type: "amethyst", size: 1.1 }
  },
  {
    id: "gem-6",
    type: "gem",
    imageUrl: "/images/jewelry/gems/topaz.png",
    position: { x: 0, y: 0 },
    properties: { type: "topaz", size: 0.95 }
  }
];

export const charms: JewelryComponent[] = [
  {
    id: "charm-1",
    type: "charm",
    imageUrl: "/images/jewelry/charms/heart-gold.png",
    position: { x: 0, y: 0 },
    properties: { style: "heart", material: "gold" }
  },
  {
    id: "charm-2",
    type: "charm",
    imageUrl: "/images/jewelry/charms/cross-silver.png",
    position: { x: 0, y: 0 },
    properties: { style: "cross", material: "silver" }
  },
  {
    id: "charm-3",
    type: "charm",
    imageUrl: "/images/jewelry/charms/star-gold.png",
    position: { x: 0, y: 0 },
    properties: { style: "star", material: "gold" }
  },
  {
    id: "charm-4",
    type: "charm",
    imageUrl: "/images/jewelry/charms/butterfly-silver.png",
    position: { x: 0, y: 0 },
    properties: { style: "butterfly", material: "silver" }
  },
  {
    id: "charm-5",
    type: "charm",
    imageUrl: "/images/jewelry/charms/key-gold.png",
    position: { x: 0, y: 0 },
    properties: { style: "key", material: "gold" }
  },
  {
    id: "charm-6",
    type: "charm",
    imageUrl: "/images/jewelry/charms/leaf-silver.png",
    position: { x: 0, y: 0 },
    properties: { style: "leaf", material: "silver" }
  }
];

export const metals: JewelryComponent[] = [
  {
    id: "metal-1",
    type: "metal",
    imageUrl: "/images/jewelry/metals/gold.png",
    position: { x: 0, y: 0 },
    properties: { type: "gold", karat: 14 }
  },
  {
    id: "metal-2",
    type: "metal",
    imageUrl: "/images/jewelry/metals/silver.png",
    position: { x: 0, y: 0 },
    properties: { type: "silver", purity: 925 }
  },
  {
    id: "metal-3",
    type: "metal",
    imageUrl: "/images/jewelry/metals/rose-gold.png",
    position: { x: 0, y: 0 },
    properties: { type: "rose-gold", karat: 14 }
  },
  {
    id: "metal-4",
    type: "metal",
    imageUrl: "/images/jewelry/metals/platinum.png",
    position: { x: 0, y: 0 },
    properties: { type: "platinum", purity: 950 }
  },
  {
    id: "metal-5",
    type: "metal",
    imageUrl: "/images/jewelry/metals/white-gold.png",
    position: { x: 0, y: 0 },
    properties: { type: "white-gold", karat: 18 }
  },
  {
    id: "metal-6",
    type: "metal",
    imageUrl: "/images/jewelry/metals/bronze.png",
    position: { x: 0, y: 0 },
    properties: { type: "bronze", composition: "copper-tin" }
  }
];

export const jewels: JewelryComponent[] = [
  {
    id: "jewel-1",
    type: "jewel",
    imageUrl: "/images/jewelry/jewels/diamond.png",
    position: { x: 0, y: 0 },
    properties: { type: "diamond", carat: 1.0, clarity: "VS1" }
  },
  {
    id: "jewel-2",
    type: "jewel",
    imageUrl: "/images/jewelry/jewels/ruby.png",
    position: { x: 0, y: 0 },
    properties: { type: "ruby", carat: 0.75, origin: "Burma" }
  },
  {
    id: "jewel-3",
    type: "jewel",
    imageUrl: "/images/jewelry/jewels/sapphire.png",
    position: { x: 0, y: 0 },
    properties: { type: "sapphire", carat: 0.8, color: "Blue" }
  },
  {
    id: "jewel-4",
    type: "jewel",
    imageUrl: "/images/jewelry/jewels/emerald.png",
    position: { x: 0, y: 0 },
    properties: { type: "emerald", carat: 0.7, origin: "Colombia" }
  },
  {
    id: "jewel-5",
    type: "jewel",
    imageUrl: "/images/jewelry/jewels/amethyst.png",
    position: { x: 0, y: 0 },
    properties: { type: "amethyst", carat: 1.2, color: "Purple" }
  },
  {
    id: "jewel-6",
    type: "jewel",
    imageUrl: "/images/jewelry/jewels/topaz.png",
    position: { x: 0, y: 0 },
    properties: { type: "topaz", carat: 0.9, color: "Blue" }
  }
];

export const accessories: JewelryComponent[] = [
  {
    id: "accessory-1",
    type: "accessory",
    imageUrl: "/images/jewelry/accessories/clasp-lobster.png",
    position: { x: 0, y: 0 },
    properties: { type: "clasp", style: "lobster", material: "gold" }
  },
  {
    id: "accessory-2",
    type: "accessory",
    imageUrl: "/images/jewelry/accessories/clasp-spring.png",
    position: { x: 0, y: 0 },
    properties: { type: "clasp", style: "spring", material: "silver" }
  },
  {
    id: "accessory-3",
    type: "accessory",
    imageUrl: "/images/jewelry/accessories/pendant-round.png",
    position: { x: 0, y: 0 },
    properties: { type: "pendant", shape: "round", material: "gold" }
  },
  {
    id: "accessory-4",
    type: "accessory",
    imageUrl: "/images/jewelry/accessories/pendant-heart.png",
    position: { x: 0, y: 0 },
    properties: { type: "pendant", shape: "heart", material: "rose-gold" }
  },
  {
    id: "accessory-5",
    type: "accessory",
    imageUrl: "/images/jewelry/accessories/spacer-beads.png",
    position: { x: 0, y: 0 },
    properties: { type: "spacer", style: "beads", material: "silver" }
  },
  {
    id: "accessory-6",
    type: "accessory",
    imageUrl: "/images/jewelry/accessories/bail-simple.png",
    position: { x: 0, y: 0 },
    properties: { type: "bail", style: "simple", material: "gold" }
  }
];

export const completedPieces = [
  {
    id: "1",
    name: "Gold Rope Necklace",
    type: "necklace",
    imageUrl: "/images/jewelry/completed/gold-rope-necklace.png",
    chain: "gold-rope",
    components: ["pendant-1", "clasp-1"],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Silver Curb Bracelet",
    type: "bracelet",
    imageUrl: "/images/jewelry/completed/silver-curb-bracelet.png",
    chain: "silver-curb",
    components: ["charm-1", "clasp-2"],
    createdAt: new Date().toISOString(),
  },
];

export const jewelryComponents = {
  metals,
  jewels,
  accessories,
  chains,
  gems,
  charms
};