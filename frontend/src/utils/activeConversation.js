// Modul kecil buat "titip" info conversation mana yang lagi kebuka
// di halaman Messages, biar ToastNotification (komponen global) bisa
// tau kapan harus skip notif chat (karena user udah liat langsung).

let activeConversationId = null;

export function setActiveConversationId(id) {
  activeConversationId = id;
}

export function getActiveConversationId() {
  return activeConversationId;
}
