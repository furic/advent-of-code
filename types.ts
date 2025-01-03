export type Point = { x: number; y: number };

export type QueueItem = Point & { score: number };

export type OneWayQueueItem = QueueItem & { visited: Point[] };
