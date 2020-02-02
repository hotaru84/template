import Dexie from "dexie";

export const db = new Dexie("template");

db.version(1).stores({
  log: "time,data",
  device: "serial,ip,screen,battery"
});

db.on("populate", function() {
  db.log.bulkAdd([]);
  db.device.bulkAdd([
    {
      serial:'11111',
      ip:'192.168.1.1',
      screen:true,
      battery:0.8
    },
    {
      serial:'22222',
      ip:'192.168.1.2',
      screen:true,
      battery:0.8
    },
    {
      serial:'33333',
      ip:'192.168.1.3',
      screen:true,
      battery:0.6
    },
    {
      serial:'44444',
      ip:'192.168.1.4',
      screen:false,
      battery:0.4
    },
    {
      serial:'55555',
      ip:'192.168.1.5',
      screen:true,
      battery:0.2
    }
  ])
});
db.open()
