export type TextStyleType = 
  | '3d' 
  | 'neon' 
  | 'metallic' 
  | 'crystal' 
  | 'fire' 
  | 'matrix' 
  | 'hologram' 
  | 'glass' 
  | 'plasma' 
  | 'cyber';

export type BackgroundType = 
  | 'space' 
  | 'clouds' 
  | 'sunset' 
  | 'night' 
  | 'cyber' 
  | 'galaxy' 
  | 'aurora' 
  | 'ocean';

export interface SceneProps {
  targetDate: Date;
  textColor: string;
  customText: string;
  rotationSpeed: number;
  textStyle: TextStyleType;
  textSize: number;
  background: BackgroundType;
}

export interface ControlsProps {
  targetDate: Date;
  onTargetDateChange: (date: Date) => void;
  textColor: string;
  onTextColorChange: (color: string) => void;
  customText: string;
  onCustomTextChange: (text: string) => void;
  rotationSpeed: number;
  onRotationSpeedChange: (speed: number) => void;
  showCustomText: boolean;
  onShowCustomTextChange: (show: boolean) => void;
  textStyle: TextStyleType;
  onTextStyleChange: (style: TextStyleType) => void;
  textSize: number;
  onTextSizeChange: (size: number) => void;
  background: BackgroundType;
  onBackgroundChange: (bg: BackgroundType) => void;
}

export interface ExportButtonProps {
  targetDate: Date;
  textColor: string;
  customText: string;
  rotationSpeed: number;
  textStyle: TextStyleType;
  textSize: number;
  background: BackgroundType;
}