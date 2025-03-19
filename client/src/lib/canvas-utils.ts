import type { JewelryComponent } from "@shared/schema";

const COMPONENT_DEFAULT_SIZE = 100;
const IMAGE_CACHE = new Map<string, HTMLImageElement>();

export function clearCanvas(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.clearRect(0, 0, width, height);
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (IMAGE_CACHE.has(src)) {
      resolve(IMAGE_CACHE.get(src)!);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous"; // Enable CORS for external images
    img.onload = () => {
      IMAGE_CACHE.set(src, img);
      resolve(img);
    };
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

export async function drawComponent(
  ctx: CanvasRenderingContext2D,
  component: JewelryComponent,
  scale = 1
) {
  try {
    const img = await loadImage(component.imageUrl);
    
    // Calculate size based on component type and properties
    let width = COMPONENT_DEFAULT_SIZE * scale;
    let height = COMPONENT_DEFAULT_SIZE * scale;

    // Adjust size based on component type
    switch (component.type) {
      case "chain":
        width *= 2; // Chains are typically wider
        height *= 0.5; // But not as tall
        break;
      case "gem":
        // Scale gems based on their size property
        const gemScale = component.properties.size as number || 1;
        width *= gemScale;
        height *= gemScale;
        break;
      case "charm":
        // Charms maintain aspect ratio
        break;
    }

    // Draw the component
    ctx.save();
    
    // Add shadow for depth
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    // Draw the image
    ctx.drawImage(
      img,
      component.position.x - width / 2,
      component.position.y - height / 2,
      width,
      height
    );

    ctx.restore();
  } catch (error) {
    console.error("Error drawing component:", error);
    // Draw a placeholder rectangle if image fails to load
    ctx.fillStyle = '#eee';
    ctx.fillRect(
      component.position.x - COMPONENT_DEFAULT_SIZE / 2,
      component.position.y - COMPONENT_DEFAULT_SIZE / 2,
      COMPONENT_DEFAULT_SIZE,
      COMPONENT_DEFAULT_SIZE
    );
  }
}

export function getCanvasPosition(
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY
  };
}

export function isPointInComponent(
  point: { x: number; y: number },
  component: JewelryComponent
): boolean {
  const halfSize = COMPONENT_DEFAULT_SIZE / 2;
  return (
    point.x >= component.position.x - halfSize &&
    point.x <= component.position.x + halfSize &&
    point.y >= component.position.y - halfSize &&
    point.y <= component.position.y + halfSize
  );
}

export function createPreviewImage(
  canvas: HTMLCanvasElement,
  components: JewelryComponent[]
): Promise<string> {
  return new Promise(async (resolve) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve('');
      return;
    }

    // Clear and draw all components
    clearCanvas(ctx, canvas.width, canvas.height);
    await Promise.all(components.map(comp => drawComponent(ctx, comp)));

    // Convert canvas to data URL
    resolve(canvas.toDataURL('image/png'));
  });
}

// Helper to maintain aspect ratio when resizing components
export function calculateAspectRatioFit(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
) {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return {
    width: srcWidth * ratio,
    height: srcHeight * ratio
  };
}
