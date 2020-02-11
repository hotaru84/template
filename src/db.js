import Dexie from "dexie";

export const db = new Dexie("template");

db.version(1).stores({
  log: "[time+serial],data",
  device: "[date+serial],ip,screen,battery",
  image:"[time+serial],name,blob",
});

db.on("populate", function() {});
db.open()
