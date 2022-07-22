/// <reference types="@sveltejs/kit" />
import { API } from '../src-electron/preload';

declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}

declare global {
  const api: typeof API;
}
