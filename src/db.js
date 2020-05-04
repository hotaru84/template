import Dexie from "dexie";

export const db = new Dexie("device");

db.version(1).stores({
  device: "&serial,uptime,ip,status,battery",
  stats: "[serial+date],screen,log,image,step",
  log: "[time+serial],data",
  gallery:"[time+serial],name,blob",
});

db.on("populate", function() {});
db.open()
