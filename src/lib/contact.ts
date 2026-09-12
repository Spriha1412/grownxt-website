import { scrollToId } from "./utils";

const KEY = "grownxt-service";

export function goToContact(service?: string) {
  if (service) {
    sessionStorage.setItem(KEY, service);
    window.dispatchEvent(new CustomEvent("grownxt-prefill", { detail: service }));
  }
  scrollToId("contact");
}

export function consumePrefillService() {
  const value = sessionStorage.getItem(KEY);
  if (value) sessionStorage.removeItem(KEY);
  return value;
}
