export const CELL_EMPTY = 0;
export const CELL_SAND = 1;

export type CellType = typeof CELL_EMPTY | typeof CELL_SAND;

export type SandWorld = {
  width: number;
  height: number;
  cells: Uint8Array;
  tick: number;
};

export function createSandWorld(width: number, height: number): SandWorld {
  return {
    width,
    height,
    cells: new Uint8Array(width * height),
    tick: 0,
  };
}

export function clearWorld(world: SandWorld): void {
  world.cells.fill(CELL_EMPTY);
  world.tick = 0;
}

export function indexOf(world: SandWorld, x: number, y: number): number {
  return y * world.width + x;
}

export function inBounds(world: SandWorld, x: number, y: number): boolean {
  return x >= 0 && x < world.width && y >= 0 && y < world.height;
}

export function getCell(world: SandWorld, x: number, y: number): CellType {
  if (!inBounds(world, x, y)) {
    return CELL_EMPTY;
  }
  return world.cells[indexOf(world, x, y)] as CellType;
}

export function setCell(world: SandWorld, x: number, y: number, value: CellType): void {
  if (!inBounds(world, x, y)) {
    return;
  }
  world.cells[indexOf(world, x, y)] = value;
}

export function paintCircle(
  world: SandWorld,
  centerX: number,
  centerY: number,
  radius: number,
  value: CellType,
): void {
  const r2 = radius * radius;
  const minY = Math.max(0, centerY - radius);
  const maxY = Math.min(world.height - 1, centerY + radius);
  const minX = Math.max(0, centerX - radius);
  const maxX = Math.min(world.width - 1, centerX + radius);

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const dx = x - centerX;
      const dy = y - centerY;
      if (dx * dx + dy * dy <= r2) {
        setCell(world, x, y, value);
      }
    }
  }
}

function tryMoveDown(world: SandWorld, x: number, y: number): boolean {
  const from = indexOf(world, x, y);
  const downY = y + 1;

  if (downY >= world.height) {
    return false;
  }

  const down = indexOf(world, x, downY);
  if (world.cells[down] === CELL_EMPTY) {
    world.cells[down] = CELL_SAND;
    world.cells[from] = CELL_EMPTY;
    return true;
  }

  // Alternate diagonal preference each tick for less directional bias.
  const leftFirst = world.tick % 2 === 0;
  const firstDx = leftFirst ? -1 : 1;
  const secondDx = -firstDx;

  const nx1 = x + firstDx;
  if (nx1 >= 0 && nx1 < world.width) {
    const diag1 = indexOf(world, nx1, downY);
    if (world.cells[diag1] === CELL_EMPTY) {
      world.cells[diag1] = CELL_SAND;
      world.cells[from] = CELL_EMPTY;
      return true;
    }
  }

  const nx2 = x + secondDx;
  if (nx2 >= 0 && nx2 < world.width) {
    const diag2 = indexOf(world, nx2, downY);
    if (world.cells[diag2] === CELL_EMPTY) {
      world.cells[diag2] = CELL_SAND;
      world.cells[from] = CELL_EMPTY;
      return true;
    }
  }

  return false;
}

export function stepWorld(world: SandWorld): void {
  // Bottom-up iteration avoids moving a particle multiple rows in one frame.
  for (let y = world.height - 2; y >= 0; y -= 1) {
    if (world.tick % 2 === 0) {
      for (let x = 0; x < world.width; x += 1) {
        if (getCell(world, x, y) === CELL_SAND) {
          tryMoveDown(world, x, y);
        }
      }
    } else {
      for (let x = world.width - 1; x >= 0; x -= 1) {
        if (getCell(world, x, y) === CELL_SAND) {
          tryMoveDown(world, x, y);
        }
      }
    }
  }
  world.tick += 1;
}
