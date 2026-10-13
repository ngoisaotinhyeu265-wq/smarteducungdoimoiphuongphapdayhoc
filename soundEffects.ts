/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Re-export shared SoundManager singleton to ensure full compatibility across all components
import { sounds as audioSounds } from '../lib/audio';

export const sounds = audioSounds;
export default sounds;
