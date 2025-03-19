import { jewelryDesigns, type JewelryDesign, type InsertJewelryDesign } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getAllDesigns(): Promise<JewelryDesign[]>;
  getDesign(id: number): Promise<JewelryDesign | undefined>;
  createDesign(design: InsertJewelryDesign): Promise<JewelryDesign>;
}

export class MemStorage implements IStorage {
  private designs: Map<number, JewelryDesign>;
  currentId: number;

  constructor() {
    this.designs = new Map();
    this.currentId = 1;
  }

  async getAllDesigns(): Promise<JewelryDesign[]> {
    return Array.from(this.designs.values());
  }

  async getDesign(id: number): Promise<JewelryDesign | undefined> {
    return this.designs.get(id);
  }

  async createDesign(insertDesign: InsertJewelryDesign): Promise<JewelryDesign> {
    const id = this.currentId++;
    const design: JewelryDesign = { ...insertDesign, id };
    this.designs.set(id, design);
    return design;
  }
}

// Use database storage if db connection exists, otherwise use in-memory storage
export const storage = new MemStorage();