import Dexie from "dexie";

export const db = new Dexie("template");

db.version(1).stores({
  log: "[time+serial],data",
  device: "&serial,time,ip,status,battery,active,action,image,step",
  image:"[time+serial],name,blob",
});

db.on("populate", function() {});
db.open()
