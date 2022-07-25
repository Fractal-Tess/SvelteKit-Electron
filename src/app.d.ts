/// <reference types="@sveltejs/kit" />
import { API } from '../src-electron/preload/src/index';

declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}

declare global {
  const api: typeof API;
}
