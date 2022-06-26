import { Button } from "../types/button";
import { Flip, Remap } from "../types/setting";

export const flip_types = ["disable", "always", "ifPress"] as const;
export type FlipType = typeof flip_types[number];

export class ButtonState {
  button: Button;
  flip?: Flip;
  remap?: Remap;

  constructor(button: Button, flip?: Flip, remap?: Remap) {
    this.button = button;
    this.flip = flip;
    this.remap = remap;
  }

  isDisabledFlip(): boolean {
    if (!this.flip && !this.remap) {
      return true;
    }
    if (this.remap) {
      return true;
    }
    if (!this.flip) {
      return false;
    }
    return this.flip && !this.flip?.enable;
  }

  isAlwaysFlip(): boolean {
    if (!this.flip && !this.remap) {
      return false;
    }
    if (this.isDisabledFlip()) {
      return false;
    }
    return (
      !!this.flip &&
      !!this.flip.enable &&
      (this.flip?.if_pressed || [])?.length === 0
    );
  }

  isFlipIfPressedSelf(): boolean {
    if (!this.flip && !this.remap) {
      return false;
    }
    if (
      this.isDisabledFlip() ||
      this.isAlwaysFlip() ||
      !this.flip ||
      !this.flip.if_pressed
    ) {
      return false;
    }
    return (
      this.flip.if_pressed.length === 1 &&
      this.flip.if_pressed[0] === this.button
    );
  }

  isFlipIfPressedSomeButtons(): boolean {
    if (!this.flip) {
      return false;
    }
    if (
      this.isDisabledFlip() ||
      this.isAlwaysFlip() ||
      this.isFlipIfPressedSelf()
    ) {
      return false;
    }
    return true;
  }

  hasFlipSetting(): boolean {
    return !this.isDisabledFlip();
  }

  isRemap(): boolean {
    if (this.hasFlipSetting()) {
      return false;
    }
    if (this.remap && this.remap.to?.length > 0) {
      return true;
    }
    return false;
  }
}
