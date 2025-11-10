
export interface Point {
  x: number;
  y: number;
}

export interface BoundingBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

export interface ImageData {
  id: string;
  name: string;
  url: string;
  boxes: BoundingBox[];
}

export interface Project {
  name: string;
  images: ImageData[];
}

export interface TrainingMetric {
  epoch: number;
  loss: number;
  mAP: number;
}
