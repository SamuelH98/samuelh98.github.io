/* Single entry point: index.html loads only this file, which loads the rest in order.
   Each module is a self-contained IIFE; importing it runs it, same as the old script tags. */
import './main.js';
import './telemetry.js';
import './audio.js';
import './hud.js';
import './github.js';
